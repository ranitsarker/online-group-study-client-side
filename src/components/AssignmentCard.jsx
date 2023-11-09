import PropTypes from 'prop-types';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const AssignmentCard = ({ assignment, onDelete }) => {
    const marks = parseInt(assignment.marks);
    const { user } = useContext(AuthContext);

    const handleUpdateClick = (event) => {
        if (assignment.createdBy === user.email) {
            // User can update the assignment
            toast.success('You can update this assignment');
        } else {
            // User is not the creator, show an error message
            toast.error('Only the creator can update this assignment');
            event.preventDefault(); // Prevent the link from being followed
        }
    };

    const handleDeleteClick = (event) => {
        if (!user) {
            // User is not logged in, redirect to the login page
            window.location.href = '/login'; // Replace with your actual login URL
            return;
        }
        if (assignment.createdBy === user.email) {
            // User can delete the assignment
            Swal.fire({
                title: 'Are you sure?',
                text: 'You want to delete this assignment?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            }).then((result) => {
                if (result.isConfirmed) {
                    onDelete(assignment._id);
                    Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Your assignment is safe :)', 'error');
                }
            });
        } else {
            // User is not the creator, show an error message
            toast.error('Only the creator can delete this assignment');
            event.preventDefault(); // Prevent the button click action
        }
    };

    return (
        <div className="border border-gray-200 p-4 rounded-md hover:shadow-md">
            <img
                src={assignment.thumbnailUrl}
                alt={assignment.title}
                className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-xl font-semibold">{assignment.title}</h3>
            <p className="mt-2">Marks: {marks}</p>
            <p>Difficulty: {assignment.difficulty}</p>
            <div className='my-3'>
                <Link 
                    to={`/assignment/${assignment._id}`} 
                    className="border md:inline-block px-4 py-1 font-bold my-2 mx-1"
                    >View
                </Link>
                <Link
                    to={`/update-assignment/${assignment._id}`}
                    className="border md:inline-block px-4 py-1 font-bold my-2 mx-1"
                    onClick={handleUpdateClick}
                >Update
                </Link>
                <Link
                    onClick={handleDeleteClick}
                    className="border md:inline-block px-4 py-1 font-bold my-2 mx-1"
                    >Delete
                </Link>
            </div>


        </div>
    );
};

AssignmentCard.propTypes = {
    assignment: PropTypes.shape({
        thumbnailUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        marks: PropTypes.number.isRequired,
        difficulty: PropTypes.string.isRequired,
        createdBy: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default AssignmentCard;

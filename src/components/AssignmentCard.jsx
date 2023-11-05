import PropTypes from 'prop-types';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const AssignmentCard = ({ assignment }) => {
    const marks = parseInt(assignment.marks);
    const {user} = useContext(AuthContext);

    // for createdBy validation
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
            <div className="mt-4 flex space-x-2">
                <Link to={`/assignment/${assignment._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    View Assignment
                </Link>
                <Link
                to={`/update-assignment/${assignment._id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                onClick={handleUpdateClick} // Add this line
                >
                Update Assignment
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
        createdBy: PropTypes.string.isRequired, // Add this line for createdBy
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default AssignmentCard;

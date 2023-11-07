import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyAssignment = () => {
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      // Fetch completed assignments for the logged-in user using the new endpoint
      fetch(`http://localhost:5000/completed-assignments/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setCompletedAssignments(data);
        })
        .catch((error) => {
          console.error('Error fetching completed assignments:', error);
        });
    }
  }, [user]);

  const handleDeleteAssignment = (assignmentId) => {
    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "To delete that completed assignment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the assignment from the frontend
        const updatedAssignments = completedAssignments.filter(
          (assignment) => assignment._id !== assignmentId
        );
        setCompletedAssignments(updatedAssignments);

        // Send a request to delete the assignment from the database
        fetch(`http://localhost:5000/delete-assignment/${assignmentId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Log the deletion result
          })
          .catch((error) => {
            console.error('Error deleting assignment:', error);
          });

        // Show another SweetAlert to indicate the success
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-md p-4">
        <h1 className="text-2xl font-semibold mb-4">My Completed Assignments</h1>
        {completedAssignments.length === 0 ? (
          <p>No assignments have been completed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {completedAssignments.map((assignment) => (
              <div key={assignment._id} className="relative bg-white border p-4 rounded-md shadow">
                <button
                  className="absolute top-2 right-2 text-red-600 cursor-pointer text-2xl"
                  onClick={() => handleDeleteAssignment(assignment._id)}
                >
                  <FaTimes />
                </button>
                <h2 className="text-lg font-semibold mb-2">{assignment.assignmentTitle}</h2>
                <p className="text-gray-600">Examinee Name: {assignment.userEmail}</p>
                <p className="text-gray-600">Given Marks: {assignment.marks}</p>
                <p className="text-gray-600">Feedback: {assignment.feedback}</p>
                <p className="text-green-600 font-bold">Status: {assignment.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssignment;

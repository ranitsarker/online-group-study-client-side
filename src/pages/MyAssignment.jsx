import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

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

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-md p-4">
        <h1 className="text-2xl font-semibold mb-4">My Completed Assignments</h1>
        {completedAssignments.length === 0 ? (
          <p>No assignments have been completed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {completedAssignments.map((assignment) => (
              <div key={assignment._id} className="bg-white border p-4 rounded-md shadow">
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

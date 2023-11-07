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
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Completed Assignments</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignment Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Examinee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Given Marks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {completedAssignments.map((assignment) => (
              <tr key={assignment._id} className="odd:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.assignmentTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.userEmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.marks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.feedback}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {assignment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignment;

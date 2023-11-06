import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/submitted-assignment/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setAssignments(data);
          setIsLoading(false); 
        })
        .catch((error) => {
          console.error('Error fetching submitted assignments:', error);
          setIsLoading(false); 
        });
    }
  }, [user]);

  // Function to handle giving marks handler 
  const giveMark = (assignmentId) => {
    navigate(`/give-mark/${assignmentId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Submitted Assignments</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : assignments.length === 0 ? (
        <p>No assignments have been submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Examinee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="odd:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.assignmentTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.assignmentMarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.userEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assignment.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => giveMark(assignment._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover-bg-blue-600"
                    >
                      Give Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignments;

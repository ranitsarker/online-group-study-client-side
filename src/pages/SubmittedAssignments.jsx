import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  // Fetch the submitted assignments from your API endpoint
  useEffect(() => {
    // Replace with your actual API endpoint
    fetch('http://localhost:5000/submitted-assignment')
      .then((response) => response.json())
      .then((data) => setAssignments(data))
      .catch((error) => console.error('Error fetching submitted assignments:', error));
  }, []);

  // Function to handle giving marks
  const giveMark = (assignmentId) => {
    // You can navigate to a page to give marks or show a modal for giving marks
    navigate(`/give-mark/${assignmentId}`);
  };

  return (
    <div>
      <h1>Submitted Assignments</h1>
      <table>
        <thead>
          <tr>
            <th>Assignment Title</th>
            <th>Marks</th>
            <th>Examinee Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.assignmentTitle}</td>
              <td>{assignment.assignmentMarks}</td>
              <td>{assignment.examineeName}</td>
              <td>
                <button onClick={() => giveMark(assignment._id)}>Give Mark</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedAssignments;

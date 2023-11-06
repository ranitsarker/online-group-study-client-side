import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GiveMark = () => {
  const { assignmentId } = useParams();
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Fetch assignment details using the assignmentId
    fetch(`http://localhost:5000/give-mark/${assignmentId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setAssignmentDetails(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching assignment details:', error);
      });
  }, [assignmentId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Give Marks</h1>
        <div>
          <p>Assignment Title: {assignmentDetails.assignmentTitle}</p>
          <p>Examinee Name: {assignmentDetails.userEmail}</p>
          <p>PDF Link: {assignmentDetails.pdfLink}</p>
          <p>Quick Note: {assignmentDetails.quickNote}</p>
          <p>Total Marks: {assignmentDetails.assignmentMarks}</p>
        </div>
        <form>
          <div className="mt-4">
            <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
              Marks:
            </label>
            <input
              type="number"
              id="marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback:
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 h-32"
            />
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveMark;

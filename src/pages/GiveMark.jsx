import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const GiveMark = () => {
  const { assignmentId } = useParams();
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assignment details using the assignmentId
    fetch(`https://online-group-study-server-side.vercel.app/give-mark/${assignmentId}`, {
      credentials: "include"
    })
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

  const handleSubmit = async () => {
    // Prepare the data for the server to update the assignment status
    const statusData = {
      assignmentTitle: assignmentDetails.assignmentTitle,
      userEmail: assignmentDetails.userEmail,
      marks,
      feedback,
      status: 'completed',
    };
  
    try {
      // Send a POST request to update the assignment status
      const statusResponse = await fetch('https://online-group-study-server-side.vercel.app/complete-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusData),
      });
  
      if (statusResponse.status === 201) {
        console.log('Assignment status updated successfully');
  
        // Send a request to remove the assignment from the 'submitted' collection
        const removeResponse = await fetch(`https://online-group-study-server-side.vercel.app/remove-submitted-assignment/${assignmentId}`, {
          method: 'DELETE',
        });
  
        if (removeResponse.status === 200) {
          console.log('Assignment removed from submitted collection');
          toast.success('Assignment has been completed successfully.');
          // Clear the form fields
          setMarks('');
          setFeedback('');
          navigate('/my-assignment');

        } else {
          console.error('Error removing assignment from submitted collection');
        }
      } else {
        console.error('Error updating assignment status');
      }
    } catch (error) {
      console.error('Error updating assignment status:', error);
    }
  };
  
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
          <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveMark;

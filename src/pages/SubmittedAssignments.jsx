import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import PdfPreview from '../components/PdfPreview';

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState({}); // Store selected PDF for each assignment
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`https://online-group-study-server-side.vercel.app/submitted-assignment/${user.email}`, {
        credentials: "include"
      })
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

  // Function to handle opening and closing PDF preview for a specific assignment
  const togglePdfPreview = (assignmentId, pdfLink) => {
    if (selectedPdf[assignmentId] === pdfLink) {
      setSelectedPdf({ ...selectedPdf, [assignmentId]: null }); // Close the preview
    } else {
      setSelectedPdf({ ...selectedPdf, [assignmentId]: pdfLink }); // Open the preview
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-md p-4">
        <h1 className="text-2xl font-semibold mb-4">Submitted Assignments</h1>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        ) : assignments.length === 0 ? (
          <p className='text-center my-4'>No assignments are pending yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="bg-white border p-4 rounded-md shadow">
                <h2 className="text-lg font-semibold mb-2">{assignment.assignmentTitle}</h2>
                <button
                  onClick={() => togglePdfPreview(assignment._id, assignment.pdfLink)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600"
                >
                  {selectedPdf[assignment._id] ? 'Close PDF' : 'Preview PDF'}
                </button>
                {selectedPdf[assignment._id] && (
                  <div className="pdf-preview">
                    <PdfPreview pdfLink={selectedPdf[assignment._id]} />
                  </div>
                )}
                <p className="mt-2 text-gray-600">{assignment.assignmentMarks} Total Marks</p>
                <p className="mt-2 text-gray-600">Submitted by {assignment.userEmail}</p>
                <p className="mt-2 text-gray-700">Quick Note: {assignment.quickNote}</p>
                <p className="mt-2 text-red-600 font-bold">Status: {assignment.status}</p>
                <button
                  onClick={() => giveMark(assignment._id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600"
                >
                  Give Mark
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedAssignments;

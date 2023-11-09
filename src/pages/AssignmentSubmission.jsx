import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useAssignment } from '../providers/AssignmentProvider'; 
import { AuthContext } from '../providers/AuthProvider';

const AssignmentSubmission = () => {
    // my custom hook
  const { assignmentDetails } = useAssignment();
    // for user email 
  const { user } = useContext(AuthContext); 

  const [pdfLink, setPdfLink] = useState('');
  const [quickNote, setQuickNote] = useState('');

  const handlePdfLinkChange = (e) => {
    const input = e.target.value;
    
    // Regular expression to check if the input is a valid Google Drive PDF link
    const urlRegex = /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view(\?usp=sharing)?$/;
    
    if (urlRegex.test(input) || input.toLowerCase().endsWith('.pdf')) {
      setPdfLink(input);
    } else {
      toast.error('Please enter a valid Google Drive PDF link or any online PDF link');
    }
  };
  
  

  const handleQuickNoteChange = (e) => {
    setQuickNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pdfLink || !quickNote) {
      toast.error('Please fill in all required fields');
      return;
    }
    const submissionData = {
      pdfLink,
      quickNote,
      userEmail: user.email,
      assignmentTitle: assignmentDetails.title,
      assignmentMarks: assignmentDetails.marks,
    };

    // Send the submissionData to server
    fetch('http://localhost:5000/assignment-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success('Assignment submitted successfully');
        // Clear the form fields
        setPdfLink('');
        setQuickNote('');
      })
      .catch((error) => {
        toast.error('Failed to submit assignment');
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Assignment Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pdfLink" className="block text-sm font-medium text-gray-700">
            PDF Link:
          </label>
          <input
            type="text"
            id="pdfLink"
            name="pdfLink"
            value={pdfLink}
            onChange={handlePdfLinkChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label htmlFor="quickNote" className="block text-sm font-medium text-gray-700">
            Quick Note:
          </label>
          <textarea
            id="quickNote"
            name="quickNote"
            value={quickNote}
            onChange={handleQuickNoteChange}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300 h-32"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover-bg-blue-600">
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;
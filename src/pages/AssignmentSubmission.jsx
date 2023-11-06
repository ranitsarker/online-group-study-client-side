import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import { useLocation } from 'react-router-dom';

const AssignmentSubmission = () => {
    const [pdfLink, setPdfLink] = useState('');
    const [quickNote, setQuickNote] = useState('');
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const assignmentTitle = query.get('title');
    const assignmentMarks = query.get('marks');

    const handlePdfLinkChange = (e) => {
        setPdfLink(e.target.value);
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

        // Create an object with the form data including user's email, assignment title, and assignment marks
        const submissionData = {
            pdfLink,
            quickNote,
            userEmail: user.email,
            assignmentTitle,
            assignmentMarks
        };
        
        // Send the submissionData to your server
        fetch('http://localhost:5000/assignment-submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                toast.success('Assignment submitted successfully');
                // Clear the form fields if needed
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

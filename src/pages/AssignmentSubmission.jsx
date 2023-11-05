import { useState } from 'react';

const AssignmentSubmission = () => {
    const [pdfLink, setPdfLink] = useState('');
    const [quickNote, setQuickNote] = useState('');

    const handlePdfLinkChange = (e) => {
        setPdfLink(e.target.value);
    };

    const handleQuickNoteChange = (e) => {
        setQuickNote(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, you can send the pdfLink and quickNote to your server
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Submit Assignment
                </button>
            </form>
        </div>
    );
};

export default AssignmentSubmission;

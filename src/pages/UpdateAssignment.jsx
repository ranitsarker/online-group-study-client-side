import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateAssignment = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const loadedAssignment = useLoaderData();
    
    // Initialize form state with default values
    const [formData, setFormData] = useState({
        title: loadedAssignment.title || '',
        description: loadedAssignment.description || '',
        marks: loadedAssignment.marks || 0,
        difficulty: loadedAssignment.difficulty || 'easy',
        thumbnailUrl: loadedAssignment.thumbnailUrl || '',
    });

    const handleAssignmentUpdate = (e) => {
        e.preventDefault();
        const { title, description, marks, difficulty, thumbnailUrl } = formData;

        // You can access `loadedAssignment._id` to identify the assignment to be updated
        const assignmentId = loadedAssignment._id;

        // Send a request to your server to update the assignment
        fetch(`http://localhost:5000/update-assignment/${assignmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                marks,
                difficulty,
                thumbnailUrl,
                createdBy: user ? user.email : null,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success('Assignment updated successfully');
                // Redirect to the view assignment page or any other page
                navigate('/assignments');
            })
            .catch((error) => {
                toast.error('An error occurred while updating the assignment');
                console.error(error);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Update Assignment</h2>
            <form className="space-y-4 mx-4" onSubmit={handleAssignmentUpdate}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="marks" className="block text-sm font-medium text-gray-700">
                        Marks:
                    </label>
                    <input
                        type="number"
                        id="marks"
                        name="marks"
                        value={formData.marks}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                        Difficulty:
                    </label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
                        Thumbnail Image URL:
                    </label>
                    <input
                        type="url"
                        id="thumbnailUrl"
                        name="thumbnailUrl"
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover-bg-indigo-700"
                >
                    Update Assignment
                </button>
            </form>
        </div>
    );
};

export default UpdateAssignment;
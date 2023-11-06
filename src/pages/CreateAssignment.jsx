import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

const CreateAssignment = () => {
    const [dueDate, setDueDate] = useState(null);
    const { user } = useContext(AuthContext);

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const title = form.get('title');
        const description = form.get('description');
        const marks = form.get('marks');
        const difficulty = form.get('difficulty');
        const thumbnailUrl = form.get('thumbnailUrl');

        // Ensure dueDate is in the desired format for the server
        const formattedDueDate = dueDate ? dueDate.toISOString().split('T')[0] : null;

        fetch('http://localhost:5000/create-assignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                marks,
                difficulty,
                dueDate: formattedDueDate,
                thumbnailUrl,
                createdBy: user ? user.email : null,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success('Assignment created successfully');
            })
            .catch((error) => {
                toast.error('An error occurred while creating the assignment');
                console.error(error);
            });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create Assignment</h2>
            <form className="space-y-4" onSubmit={handleCreateAssignment}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
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
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                        Difficulty:
                    </label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date:
                    </label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
                        Thumbnail Image URL:
                    </label>
                    <input
                        type="url"
                        id="thumbnailUrl"
                        name="thumbnailUrl"
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover-bg-indigo-700"
                >
                    Create Assignment
                </button>
            </form>
        </div>
    );
};

export default CreateAssignment;

import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

const CreateAssignment = () => {
    const [dueDate, setDueDate] = useState(null);
    const { user } = useContext(AuthContext);

    const initialFormState = {
        title: '',
        description: '',
        marks: '',
        difficulty: 'easy',
        thumbnailUrl: '',
    };

    const [formData, setFormData] = useState(initialFormState);

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

        fetch('https://online-group-study-server-side.vercel.app/create-assignment', {
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
                // Clear the form input values
                setDueDate(null);
                setFormData(initialFormState);
            })
            .catch((error) => {
                toast.error('An error occurred while creating the assignment');
                console.error(error);
            });
    };

    return (
        <div className="max-w-md mx-auto p-4">
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
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                        value={formData.marks}
                        onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
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
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
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
                        value={formData.thumbnailUrl}
                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                        className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover-bg-blue-600"
                >
                    Create Assignment
                </button>
            </form>
    </div>
    );
};

export default CreateAssignment;

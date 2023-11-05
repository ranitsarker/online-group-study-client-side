import { Link } from 'react-router-dom';

const AssignmentCard = ({ assignment }) => {
    return (
        <div className="border border-gray-200 p-4 rounded-md hover:shadow-md">
            <img
                src={assignment.thumbnailUrl}
                alt={assignment.title}
                className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-xl font-semibold">{assignment.title}</h3>
            <p className="mt-2">Marks: {assignment.marks}</p>
            <p>Difficulty: {assignment.difficulty}</p>
            <div className="mt-4 flex space-x-2">
                <Link to={`/assignment/${assignment._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    View Assignment
                </Link>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Update Assignment
                </button>
            </div>
        </div>
    );
};
export default AssignmentCard;

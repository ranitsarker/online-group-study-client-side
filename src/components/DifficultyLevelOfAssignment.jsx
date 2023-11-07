import { useState, useEffect } from 'react';
import AssignmentCard from '../components/AssignmentCard';

const DifficultyLevelOfAssignment = () => {
    const [allAssignments, setAllAssignments] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all'); // 'all' to show all assignments

    useEffect(() => {
        // Fetch all assignments or filtered assignments based on selectedDifficulty
        fetch(`http://localhost:5000/all-assignment?difficulty=${selectedDifficulty}`)
            .then((res) => res.json())
            .then((data) => setAllAssignments(data));
    }, [selectedDifficulty]);

    return (
        <div>
            {/* Difficulty Filter Buttons */}
            <div className="text-center my-4">
                <button
                    onClick={() => setSelectedDifficulty('all')}
                    className={`${
                        selectedDifficulty === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-800'
                    } py-2 px-4 mx-1 rounded-md hover:bg-indigo-600`}
                >
                    All
                </button>
                <button
                    onClick={() => setSelectedDifficulty('easy')}
                    className={`${
                        selectedDifficulty === 'easy' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-800'
                    } py-2 px-4 mx-1 rounded-md hover:bg-indigo-600`}
                >
                    Easy
                </button>
                <button
                    onClick={() => setSelectedDifficulty('medium')}
                    className={`${
                        selectedDifficulty === 'medium' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-800'
                    } py-2 px-4 mx-1 rounded-md hover-bg-indigo-600`}
                >
                    Medium
                </button>
                <button
                    onClick={() => setSelectedDifficulty('hard')}
                    className={`${
                        selectedDifficulty === 'hard' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-800'
                    } py-2 px-4 mx-1 rounded-md hover:bg-indigo-600`}
                >
                    Hard
                </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {allAssignments.map((assignment) => (
                    <AssignmentCard key={assignment._id} assignment={assignment} />
                ))}
            </div>
        </div>
    );
};

export default DifficultyLevelOfAssignment;

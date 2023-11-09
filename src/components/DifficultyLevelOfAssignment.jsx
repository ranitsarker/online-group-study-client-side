import { useState, useEffect } from 'react';
import AssignmentCard from '../components/AssignmentCard';
import { motion } from "framer-motion";

const DifficultyLevelOfAssignment = () => {
    const [allAssignments, setAllAssignments] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

    const difficultyLabels = {
        all: 'All',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
    };

    useEffect(() => {
        fetch(`http://localhost:5000/all-assignment?difficulty=${selectedDifficulty}`)
            .then((res) => res.json())
            .then((data) => setAllAssignments(data));
    }, [selectedDifficulty]);

    const handleDeleteAssignment = (assignmentId) => {
        fetch(`http://localhost:5000/assignments/${assignmentId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Assignment deleted successfully') {
                    setAllAssignments((prevAssignments) =>
                        prevAssignments.filter((assignment) => assignment._id !== assignmentId)
                    );
                }
            });
    };

    return (
        <div>
            <div className="text-center my-4">
                <h3 className='text-center text-2xl py-4 mt-4'>Difficulties Levels of Assignment</h3>
                {Object.keys(difficultyLabels).map((level) => (
                    <motion.button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={`${selectedDifficulty === level ? '' : ''} py-2 px-4 mx-1 rounded-md `}

                        whileHover={{
                            scale: 1.1,
                            textShadow: "0px 0px 8px rgb(225, 225, 225)",
                            boxShadow: "0px 0px 8px rgb(225, 225, 225)",
                        }}
                    >
                        {difficultyLabels[level]}
                    </motion.button>
                ))}
            </div>

            {allAssignments.length === 0 ? (
                <p className="text-center mt-4 text-gray-500">
                    In {difficultyLabels[selectedDifficulty]} level, no assignment created yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {allAssignments.map((assignment) => (
                        <AssignmentCard key={assignment._id} assignment={assignment} onDelete={handleDeleteAssignment} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DifficultyLevelOfAssignment;

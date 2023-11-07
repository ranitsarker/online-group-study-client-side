import { useEffect, useState } from 'react';
import AssignmentCard from '../components/AssignmentCard';

const AllAssignments = () => {
    const [allAssignment, setAllAssignment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-assignment')
            .then((res) => res.json())
            .then((data) => setAllAssignment(data));
    }, []);

    const handleDeleteAssignment = (assignmentId) => {
        fetch(`http://localhost:5000/assignments/${assignmentId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Assignment deleted successfully') {
                    // Remove the deleted assignment from the list
                    setAllAssignment((prevAssignments) =>
                        prevAssignments.filter((assignment) => assignment._id !== assignmentId)
                    );
                }
            });
    };

    return (
        <div>
            {allAssignment.length === 0 ? (
                <p>No assignment has been created yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {allAssignment.map((assignment) => (
                        <AssignmentCard key={assignment._id} assignment={assignment} onDelete={handleDeleteAssignment} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllAssignments;

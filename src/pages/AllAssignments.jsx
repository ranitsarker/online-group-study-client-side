import { useEffect, useState } from 'react';
import AssignmentCard from '../components/AssignmentCard';

const AllAssignments = () => {
    const [allAssignment, setAllAssignment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-assignment')
            .then((res) => res.json())
            .then((data) => setAllAssignment(data));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {allAssignment.map((assignment) => (
                <AssignmentCard key={assignment._id} assignment={assignment} />
            ))}
        </div>
    );
};

export default AllAssignments;

import { useEffect, useState } from 'react';
import AssignmentCard from '../components/AssignmentCard';

const AllAssignments = () => {
    const [allAssignments, setAllAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 4;

    useEffect(() => {
        // Fetch data here
        fetch('https://online-group-study-server-side.vercel.app/all-assignment')
            .then((res) => res.json())
            .then((data) => setAllAssignments(data));
    }, []);

    const handleDeleteAssignment = (assignmentId) => {
        // Delete assignment and update the state here
        fetch(`https://online-group-study-server-side.vercel.app/assignments/${assignmentId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Assignment deleted successfully') {
                    // Remove the deleted assignment from the list
                    setAllAssignments((prevAssignments) =>
                        prevAssignments.filter((assignment) => assignment._id !== assignmentId)
                    );
                }
            });
    };

    // Calculate the current page assignments
    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = allAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

    // Pagination logic
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allAssignments.length / assignmentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {allAssignments.length === 0 ? (
                <p>No assignment has been created yet.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        {currentAssignments.map((assignment) => (
                            <AssignmentCard key={assignment._id} assignment={assignment} onDelete={handleDeleteAssignment} />
                        ))}
                    </div>
                    <div className="flex justify-center my-4">
                        <nav className="block">
                            <ul className="flex pl-0 rounded list-none flex-wrap">
                                {currentPage > 1 && (
                                    <li className="relative block px-3 py-2 ml-0.5 text-sm font-semibold text-gray-900 border border-gray-300 bg-white">
                                        <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                    </li>
                                )}
                                {pageNumbers.map((number) => (
                                    <li
                                        key={number}
                                        className={`relative block px-3 py-2 ml-0.5 text-sm font-semibold text-gray-900 border border-gray-300 ${
                                            currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'
                                        }`}
                                    >
                                        <button onClick={() => setCurrentPage(number)}>{number}</button>
                                    </li>
                                ))}
                                {currentPage < pageNumbers.length && (
                                    <li className="relative block px-3 py-2 ml-0.5 text-sm font-semibold text-gray-900 border border-gray-300 bg-white">
                                        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllAssignments;

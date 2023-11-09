import { useState, useEffect } from 'react';
import AssignmentCard from '../components/AssignmentCard';
import { motion } from 'framer-motion';

const DifficultyLevelOfAssignment = () => {
  const [allAssignments, setAllAssignments] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const assignmentsPerPage = 4;

  const difficultyLabels = {
    all: 'All',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://online-group-study-server-side.vercel.app/all-assignment?difficulty=${selectedDifficulty}`)
      .then((res) => res.json())
      .then((data) => {
        setAllAssignments(data);
        setIsLoading(false);
      });
  }, [selectedDifficulty]);

  const handleDeleteAssignment = (assignmentId) => {
    fetch(`https://online-group-study-server-side.vercel.app/assignments/${assignmentId}`, {
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
      <div className="text-center my-4">
        <h3 className="text-center text-2xl py-4 mt-4 font-bold">Difficulties Levels of Assignment</h3>
        {Object.keys(difficultyLabels).map((level) => (
          <motion.button
            key={level}
            onClick={() => {
              setSelectedDifficulty(level);
              setCurrentPage(1); // Reset current page when difficulty changes
            }}
            className={`${selectedDifficulty === level ? '' : ''} py-2 px-4 mx-1 rounded-md `}
            whileHover={{
              scale: 1.1,
              textShadow: '0px 0px 8px rgb(225, 225, 225)',
              boxShadow: '0px 0px 8px rgb(225, 225, 225)',
            }}
          >
            {difficultyLabels[level]}
          </motion.button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : allAssignments.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">
          In {difficultyLabels[selectedDifficulty]} level, no assignment created yet.
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {currentAssignments.map((assignment) => (
              <AssignmentCard 
              key={assignment._id} 
              assignment={{...assignment, marks:parseInt(assignment.marks)}} 
              onDelete={handleDeleteAssignment} />
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

export default DifficultyLevelOfAssignment;

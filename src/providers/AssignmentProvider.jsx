import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [assignmentDetails, setAssignmentDetails] = useState({ title: '', marks: '' });

  return (
    <AssignmentContext.Provider value={{ assignmentDetails, setAssignmentDetails }}>
      {children}
    </AssignmentContext.Provider>
  );
};
AssignmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAssignment = () => {
  return useContext(AssignmentContext);
};
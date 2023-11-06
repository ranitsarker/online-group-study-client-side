import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const AssignmentContext = createContext();

export function AssignmentProvider({ children }) {
  const [assignmentDetails, setAssignmentDetails] = useState({ title: '', marks: '' });

  return (
    <AssignmentContext.Provider value={{ assignmentDetails, setAssignmentDetails }}>
      {children}
    </AssignmentContext.Provider>
  );
}
AssignmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
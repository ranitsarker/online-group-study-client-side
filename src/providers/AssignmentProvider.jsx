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

export const useAssignment = () => {
  return useContext(AssignmentContext);
};
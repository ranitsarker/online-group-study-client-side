import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line react/prop-types
const AssignmentContext = createContext();

// eslint-disable-next-line react/prop-types
export function AssignmentProvider({ children }) {
  const [assignmentDetails, setAssignmentDetails] = useState({ title: '', marks: '' });

  return (
    <AssignmentContext.Provider value={{ assignmentDetails, setAssignmentDetails }}>
      {children}
    </AssignmentContext.Provider>
  );
}

// eslint-disable-next-line react/prop-types
export function useAssignment() {
  return useContext(AssignmentContext);
}

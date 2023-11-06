import { useContext } from 'react';
import { AssignmentContext } from '../providers/AssignmentProvider';

export function useAssignment() {
  return useContext(AssignmentContext);
}

import {ASSIGN_STUDENT} from '../actionType'

export const assignStudents = (students) => {
    return (dispatch) => {
      dispatch({ type: ASSIGN_STUDENT, payload: students });
    };
  };
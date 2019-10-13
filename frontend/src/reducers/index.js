import {
  STORE_CLASSES,
  STORE_DEFAULT_TIME,
  STORE_STUDENTS,
  STORE_INSTRUCTOR_ID,
  INCREASE_STUDENT_COUNT,
  STORE_STUDENT_PRESENT
} from "../actions/actionTypes";

const initialState = {
  classes: [],
  time: [],
  students: [],
  id: [],
  studentCount: 0
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_CLASSES:
      return {
        ...state,
        classes: action.payload
      };
    case STORE_DEFAULT_TIME:
      return {
        ...state,
        time: action.payload
      };
    case STORE_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    case STORE_INSTRUCTOR_ID:
      return {
        ...state,
        id: action.payload
      };
    case INCREASE_STUDENT_COUNT:
      return {
        ...state,
        studentCount: action.payload
      };
    default:
      return state;
  }
}

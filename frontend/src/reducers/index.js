import { STORE_CLASSES, STORE_DEFAULT_TIME, STORE_STUDENTS, STORE_INSTRUCTOR_ID } from '../actions/actionTypes';

const initialState = {
    classes: [],
    time: [],
    students: [],
    id: [],
}

export function rootReducer(state=initialState, action){
    switch(action.type) {
        case STORE_CLASSES:
            return {
                ...state, 
                classes: action.payload,
            }
        case STORE_DEFAULT_TIME:
            return {
                ...state, 
                time: action.payload,
            }
        case STORE_STUDENTS:
            return{
                ...state,
                students: action.payload,
            }
        case STORE_INSTRUCTOR_ID:
            return{
                ...state,
                id: action.payload,
            }
        default:
            return state;
    }
}
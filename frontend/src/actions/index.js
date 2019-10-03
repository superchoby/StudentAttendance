import { STORE_CLASSES, STORE_DEFAULT_TIME, STORE_STUDENTS, STORE_INSTRUCTOR_ID } from './actionTypes';

export function storeDefaultTime(time){
    return {
        type: STORE_DEFAULT_TIME,
        payload: time,
    }
}

export function storeClasses(classes){
    return{
        type: STORE_CLASSES,
        payload: classes,
    }
}

export function storeStudents(students){
    return{
        type: STORE_STUDENTS,
        payload: students,
    }
}

export function storeInstructorId(id){
    return{
        type: STORE_INSTRUCTOR_ID,
        payload: id,
    }
}
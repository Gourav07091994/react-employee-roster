export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';

// Action Creators
export const fetchEmployees = () => ({ type: FETCH_EMPLOYEES });
export const setEmployees = (employees) => ({ type: SET_EMPLOYEES, payload: employees });
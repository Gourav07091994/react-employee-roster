import { SET_EMPLOYEES } from './actions';

const initialState = {
    employees: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMPLOYEES:
            return { ...state, employees: action.payload };
        default:
            return state;
    }
}

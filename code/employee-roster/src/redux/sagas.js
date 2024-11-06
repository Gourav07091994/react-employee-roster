import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_EMPLOYEES, setEmployees } from './actions';

function* fetchEmployeesSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost:5000/api/employees');
        const { employees } = response.data;
        yield put(setEmployees(employees));
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

export default function* rootSaga() {
    yield takeEvery(FETCH_EMPLOYEES, fetchEmployeesSaga);
}

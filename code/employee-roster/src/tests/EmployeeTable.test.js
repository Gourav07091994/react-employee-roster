import React from 'react';
import { render, screen, fireEvent, waitFor, within, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EmployeeTable from '../components/EmployeeTable';

const mockStore = configureStore([]);
const employees = [
    { id: 1, firstName: 'John', lastName: 'Doe', contactNo: '1234567890', address: '1234 Elm St', avatar: 'avatar1.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', contactNo: '0987654321', address: '4321 Oak St', avatar: 'avatar2.jpg' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', contactNo: '2345678901', address: '5678 Pine St', avatar: 'avatar3.jpg' }
];

describe('EmployeeTable Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            employees,
        });
    });

    it('filters employees based on search term', () => {
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search across all fields');
        fireEvent.change(searchInput, { target: { value: 'John' } });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('displays an error message when no employees match the search term', () => {
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search across all fields');
        fireEvent.change(searchInput, { target: { value: 'NonExistentName' } });

        expect(screen.getByText('No employees found for the search criteria.')).toBeInTheDocument();
    });

    it('sorts employees by ID in ascending and descending order', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <EmployeeTable />
                </Provider>
            );
        });

        fireEvent.click(screen.getByText('ID'));
        let rows = screen.getAllByRole('row');
        expect(within(rows[1]).getByText('1')).toBeInTheDocument(); 

        fireEvent.click(screen.getByText('ID'));
        rows = screen.getAllByRole('row');
        expect(within(rows[1]).getByText('3')).toBeInTheDocument();
    });

});

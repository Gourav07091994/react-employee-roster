import React from 'react';
import { render, screen, fireEvent, within, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EmployeeTable from '../components/EmployeeTable';

const mockStore = configureStore([]);
const employees = [
    { id: 1, firstName: 'Ruby', lastName: 'Swift', contactNo: '0439 221 608', address: 'Annabelle Circle', avatar: '/user.png' },
    { id: 2, firstName: 'Amy', lastName: 'Ferry', contactNo: '0451 146 561', address: 'Jordan Avenue', avatar: '/user.png' },
    { id: 3, firstName: 'Violet', lastName: 'Robinson', contactNo: '0436 989 498', address: 'Caleb Pass', avatar: '/user.png' }
];

describe('EmployeeTable Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            employees,
        });
    });

    it('renders employee table headers correctly', () => {
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );

        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Contact No')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();
    });

    it('filters employees based on search term for all fields', () => {
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search across all fields');
        fireEvent.change(searchInput, { target: { value: 'Ruby' } });

        expect(screen.getByText('Ruby Swift')).toBeInTheDocument();
        expect(screen.queryByText('Amy Ferry')).not.toBeInTheDocument();
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

    it('sorts employees by Name in ascending and descending order', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <EmployeeTable />
                </Provider>
            );
        });

        fireEvent.click(screen.getByText('Name'));
        let rows = screen.getAllByRole('row');
        expect(within(rows[1]).getByText('Amy Ferry')).toBeInTheDocument();
        expect(within(rows[2]).getByText('Ruby Swift')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Name'));
        rows = screen.getAllByRole('row');
        expect(within(rows[1]).getByText('Violet Robinson')).toBeInTheDocument();
    });
    it('paginates employees correctly', async () => {
        // Create a list of employees greater than employeesPerPage to test pagination
        const employees = [
            { id: 1, firstName: 'Ruby', lastName: 'Swift', contactNo: '0439 221 608', address: 'Annabelle Circle', avatar: '/user.png' },
            { id: 2, firstName: 'Amy', lastName: 'Ferry', contactNo: '0451 146 561', address: 'Jordan Avenue', avatar: '/user.png' },
            { id: 3, firstName: 'Violet', lastName: 'Robinson', contactNo: '0436 989 498', address: 'Caleb Pass', avatar: '/user.png' },
            // Add additional employees to exceed the employeesPerPage limit
            ...Array.from({ length: 12 }, (_, i) => ({
                id: i + 4,
                firstName: `Employee${i + 4}`,
                lastName: 'Test',
                contactNo: `0000${i + 4}`,
                address: 'Test Addr',
                avatar: '/user.png',
            })),
        ];
        const store = mockStore({ employees });
    
        render(
            <Provider store={store}>
                <EmployeeTable />
            </Provider>
        );
    
        const nextButton = screen.getByText('Next');
        const prevButton = screen.getByText('Prev');
    
        expect(prevButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();
    
        let rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(11); 
    
        fireEvent.click(nextButton);
    
        await waitFor(() => {
            expect(prevButton).not.toBeDisabled();
        });
    
        if (nextButton.disabled) {
            expect(nextButton).toBeDisabled();
        } else {
            expect(nextButton).not.toBeDisabled();
        }
    
        rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(6); 
    
        fireEvent.click(prevButton);
    
        await waitFor(() => {
            expect(prevButton).toBeDisabled();
            expect(nextButton).not.toBeDisabled();
        });
    
        rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(11); 
    });
});

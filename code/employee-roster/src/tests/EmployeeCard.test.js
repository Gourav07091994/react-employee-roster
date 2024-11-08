import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EmployeeCard from '../components/EmployeeCard';

describe('EmployeeCard Component', () => {
    const employee = {
        avatar: 'avatar-url.jpg',
        firstName: 'John',
        name: 'John Doe',
    };

    it('renders employee details correctly', () => {
        render(<EmployeeCard employee={employee} onClick={jest.fn()} />);
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByAltText("John Doe's avatar")).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const onClick = jest.fn();
        render(<EmployeeCard employee={employee} onClick={onClick} />);
        fireEvent.click(screen.getByRole('img'));
        expect(onClick).toHaveBeenCalledWith(employee);
    });
});

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EmployeeModal from '../components/EmployeeModal';

describe('EmployeeModal Component', () => {
    const employee = {
        avatar: 'avatar-url.jpg',
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Software Engineer',
        contactNo: '123-456-7890',
        address: '1234 Elm Street',
        bio: 'A passionate developer.',
    };

    it('renders employee details in modal correctly', () => {
        render(<EmployeeModal employee={employee} onClose={jest.fn()} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
        expect(screen.getByText('1234 Elm Street')).toBeInTheDocument();
        expect(screen.getByText('A passionate developer.')).toBeInTheDocument();
    });

    it('closes the modal when the close button is clicked', () => {
        const onClose = jest.fn();
        render(<EmployeeModal employee={employee} onClose={onClose} />);
        fireEvent.click(screen.getByText('X'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not render modal if employee is null', () => {
        render(<EmployeeModal employee={null} onClose={jest.fn()} />);
        expect(screen.queryByText('X')).not.toBeInTheDocument();
    });
});

// /code/employee-roster/src/components/EmployeeModal.js
import React from 'react';
import './EmployeeModal.css';

const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <img src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} className="avatar" />
                <div className="employee-details">
                    <h2>{employee.firstName} {employee.lastName}</h2>
                    <p><strong>Job Title:</strong> {employee.jobTitle}</p>
                    <p><strong>Contact No:</strong> {employee.contactNo}</p>
                    <p><strong>Address:</strong> {employee.address}</p>
                    <p><strong>Bio:</strong> {employee.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;
import React from 'react';

const EmployeeCard = ({ employee, onClick }) => (
    <div className="employee-card" onClick={() => onClick(employee)}>
        <img src={employee.avatar} alt={`${employee.name}'s avatar`} />
        <h3>{employee.firstName}</h3>
    </div>
);

export default EmployeeCard;
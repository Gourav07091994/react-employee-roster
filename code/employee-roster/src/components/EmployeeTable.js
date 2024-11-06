// /code/employee-roster/src/components/EmployeeTable.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../redux/actions';
import EmployeeModal from './EmployeeModal';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [employees, searchTerm]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleRowClick = (employee) => setSelectedEmployee(employee);
    const closeModal = () => setSelectedEmployee(null);

    return (
        <div className="employee-table-container">
            {/* Header Section */}
            <div className="header-section">
                <div className="company-info">
                    <h1>Company Name</h1>
                    <p>Company Motto</p>
                    <p>Since (Company Establishment Date)</p>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button>Search</button>
                </div>
            </div>

            {/* Record Count */}
            <div className="record-count">
                Showing {filteredEmployees.length > employeesPerPage ? employeesPerPage : filteredEmployees.length} of {filteredEmployees.length}
            </div>

            {/* Employee Table */}
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact No</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.slice((currentPage - 1) * employeesPerPage, currentPage * employeesPerPage).map(employee => (
                        <tr key={employee.id} onClick={() => handleRowClick(employee)}>
                            <td>{employee.id}</td>
                            <td>
                                <div className="employee-info">
                                    <img src={employee.avatar} alt="Avatar" className="employee-avatar" />
                                    {employee.firstName} {employee.lastName}
                                </div>
                            </td>
                            <td>{employee.contactNo}</td>
                            <td>{employee.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage)).keys()].map(pageNum => (
                    <button
                        key={pageNum + 1}
                        onClick={() => handlePageChange(pageNum + 1)}
                        className={currentPage === pageNum + 1 ? 'active' : ''}
                    >
                        {pageNum + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}>Next</button>
            </div>

            {/* Employee Modal */}
            {selectedEmployee && <EmployeeModal employee={selectedEmployee} onClose={closeModal} />}
        </div>
    );
};

export default EmployeeTable;
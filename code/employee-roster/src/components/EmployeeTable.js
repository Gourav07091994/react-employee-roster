import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../redux/actions';
import EmployeeModal from './EmployeeModal';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    useEffect(() => {
        try {
            setError('');
            const searchValue = searchTerm.toLowerCase();
            const filtered = employees.filter(employee => {
                return (
                    employee.firstName.toLowerCase().includes(searchValue) ||
                    employee.lastName.toLowerCase().includes(searchValue) ||
                    employee.id.toString().includes(searchValue) ||
                    employee.contactNo.toString().includes(searchValue) ||
                    employee.address.toLowerCase().includes(searchValue)
                );
            });

            if (filtered.length === 0) {
                setError('No employees found for the search criteria.');
            }
            setFilteredEmployees(filtered);
        } catch (err) {
            setError('An error occurred during the search.');
        }
    }, [employees, searchTerm]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const order = sortConfig.direction === 'asc' ? 1 : -1;
        
        if (typeof a[sortConfig.key] === 'string') {
            return a[sortConfig.key].localeCompare(b[sortConfig.key]) * order;
        } else {
            return (a[sortConfig.key] - b[sortConfig.key]) * order;
        }
    });

    const renderSortArrows = (key) => (
        <span className="sort-arrows">
            <span className={`arrow ${sortConfig.key === key && sortConfig.direction === 'asc' ? 'active' : ''}`}>&#9650;</span>
            <span className={`arrow ${sortConfig.key === key && sortConfig.direction === 'desc' ? 'active' : ''}`}>&#9660;</span>
        </span>
    );

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
                        placeholder="Search across all fields"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button>Search</button>
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Record Count */}
            <div className="record-count">
                Showing {filteredEmployees.length > employeesPerPage ? employeesPerPage : filteredEmployees.length} of {filteredEmployees.length}
            </div>

            {/* Employee Table */}
            <table className="employee-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>
                            <span className="header-with-arrows">ID {renderSortArrows('id')}</span>
                        </th>
                        <th onClick={() => handleSort('firstName')}>
                            <span className="header-with-arrows">Name {renderSortArrows('firstName')}</span>
                        </th>
                        <th onClick={() => handleSort('contactNo')}>
                            <span className="header-with-arrows">Contact No {renderSortArrows('contactNo')}</span>
                        </th>
                        <th onClick={() => handleSort('address')}>
                            <span className="header-with-arrows">Address {renderSortArrows('address')}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.slice((currentPage - 1) * employeesPerPage, currentPage * employeesPerPage).map(employee => (
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

import React from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, deleteEmployee, editEmployee }) => {
  return (
    <div className="list-container">
      {employees.map((employee, index) => (
        <div key={index} className="employee-card">
          <h3 className="employee-name">{employee.name}</h3>
          <p className="employee-email">{employee.email}</p>
          <p className="employee-position">{employee.position}</p>
          <div className="button-group">
            <button className="edit-button" onClick={() => editEmployee(index)}>Edit</button>
            <button className="delete-button" onClick={() => deleteEmployee(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;

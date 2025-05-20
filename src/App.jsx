import React, { useState } from 'react';
import EmployeeForm from './components/Employeeform/employeeform'
import EmployeeList from './components/Employeelist/employeelist'
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(null);

  const addEmployee = (employee) => {
    if (currentEmployeeIndex !== null) {
      const updatedEmployees = employees.map((emp, index) =>{
        return index === currentEmployeeIndex ? employee : emp}
      );
      setEmployees(updatedEmployees);
      setCurrentEmployeeIndex(null);
    } else {
      setEmployees([...employees, employee]);
    }
  };

  const deleteEmployee = (index) => {
    setEmployees(employees.filter((h, i) => i !== index));
  };

  const editEmployee = (index) => {
    setCurrentEmployeeIndex(index);
  };

  const employeeToEdit = currentEmployeeIndex !== null ? employees[currentEmployeeIndex] : null;

  return (
    <div className="app-container">
      <h1 className="app-title">Employee Management</h1>
      <EmployeeForm addEmployee={addEmployee} employeeToEdit={employeeToEdit} />
      <h2 className="list-title">Employee List</h2>
      <EmployeeList
        employees={employees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ addEmployee, employeeToEdit }) => {
  const [employee, setEmployee] = useState({ name: '', email: '', position: '' });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for(let key in employee)
    {
      if(employee[key].trim()=='')
      {
        alert('Please fill all fields');
        return;
      }
    }
    addEmployee(employee);
    setEmployee({ name: '', email: '', position: '' });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeForm;

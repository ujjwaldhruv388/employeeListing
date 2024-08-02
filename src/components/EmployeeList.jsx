// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseurl = process.env.REACT_APP_BASE_URL;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${baseurl}/Getemployees`);
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-100 rounded-lg shadow-lg mt-9">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Employee List</h1>
      <Link
        to="/add-employee"
        className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
      >
        Add New Employee
      </Link>
      {employees.length ? (
        <ul className="mt-6 space-y-4">
          {employees.map((employee) => (
            <li
              key={employee._id}
              className="flex justify-between items-center p-6 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <div className="text-lg font-semibold text-gray-700">
                •{employee.name} ({employee._id})
              </div>
              <Link
                to={`/employee-details/${employee._id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-gray-600 text-lg">No Employees in the system.</p>
      )}
    </div>
  );
};

export default EmployeeList;

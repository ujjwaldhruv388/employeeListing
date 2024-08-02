// src/components/EmployeeDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const baseurl = process.env.REACT_APP_BASE_URL;

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployee();
  }, [id]);

  const getEmployee = async () => {
    try {
      const res = await axios.get(`${baseurl}/employees/${id}`);
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Error fetching employee details');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseurl}/employees/${id}`);
      navigate('/');
      toast.success('Employee deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting employee');
    }
  };

  if (!employee) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white rounded-lg shadow-lg mt-3">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Employee Details</h1>
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Name:</p>
        <p className="text-gray-600">{employee.name}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Employee ID:</p>
        <p className="text-gray-600">{employee._id}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Address:</p>
        <p className="text-gray-600">
          {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Contact Methods:</p>
        <ul className="list-disc list-inside text-gray-600">
          {employee.contactMethods.map((method, index) => (
            <li key={index}>
              {method.contactMethod}: {method.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;

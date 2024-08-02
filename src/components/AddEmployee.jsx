// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const baseurl = process.env.REACT_APP_BASE_URL;

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    email:'',
    address: {
      line1: '',
      city: '',
      country: '',
      zip: ''
    },
    contactMethods: [{ contactMethod: 'EMAIL', value: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const newContactMethods = [...employee.contactMethods];
    newContactMethods[index][name] = value;
    setEmployee(prevState => ({
      ...prevState,
      contactMethods: newContactMethods
    }));
  };

  const addContactMethod = () => {
    setEmployee(prevState => ({
      ...prevState,
      contactMethods: [...prevState.contactMethods, { contactMethod: 'EMAIL', value: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/employees`, employee);
      navigate('/');
      toast.success('Employee Added Successfully');
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Error Creating Employee');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>

          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Name:
          </label>
          
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Email:
          </label>

          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-800">Address</legend>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="line1">
              Line 1:
            </label>
            <input
              type="text"
              name="line1"
              value={employee.address.line1}
              onChange={handleAddressChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="city">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={employee.address.city}
              onChange={handleAddressChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="country">
              Country:
            </label>
            <input
              type="text"
              name="country"
              value={employee.address.country}
              onChange={handleAddressChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="zip">
              Zip Code:
            </label>
            <input
              type="text"
              name="zip"
              value={employee.address.zip}
              onChange={handleAddressChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-800">Contact Methods</legend>
          {employee.contactMethods.map((contact, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Contact Method:
                </label>
                <select
                  name="contactMethod"
                  value={contact.contactMethod}
                  onChange={(e) => handleContactChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EMAIL">SECONDARY EMAIL</option>
                  <option value="PHONE">PHONE</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Value:
                </label>
                <input
                  type="text"
                  name="value"
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, e)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addContactMethod}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Add Contact Method
          </button>
        </fieldset>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

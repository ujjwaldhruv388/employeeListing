const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique constraint on email
  address: {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true }
  },
  contactMethods: [
    {
      contactMethod: { type: String, enum: ['EMAIL', 'PHONE'], required: true },
      value: { type: String, required: true }
    }
  ]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

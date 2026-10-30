import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration submitted successfully!");
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username"
          value={formData.username} onChange={handleChange} required />

        <input name="firstName" placeholder="First Name"
          value={formData.firstName} onChange={handleChange} required />

        <input name="lastName" placeholder="Last Name"
          value={formData.lastName} onChange={handleChange} required />

        <input name="email" type="email" placeholder="Email"
          value={formData.email} onChange={handleChange} required />

        <input name="password" type="password" placeholder="Password"
          value={formData.password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

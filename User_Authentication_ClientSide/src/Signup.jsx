import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMobileNumber(mobile)) {
      setError('Mobile number must be exactly 10 digits.');
      setMessage('');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be 8-10 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.');
      setMessage('');
      return;
    }

    try {
      const emailCheckResponse = await axios.post('http://localhost:3001/check-email', { email });
      if (emailCheckResponse.data.exists) {
        setError('Email is already registered.');
        setMessage('Email is already registered.');
        return;
      }

      const result = await axios.post('http://localhost:3001/register', { name, mobile, email, password });
      setMessage('User created successfully!');
      setError('');
      navigate('/login');
    } catch (err) {
      console.log(err);
      //setError('An error occurred during registration.');
      setMessage('Email is already registered.');
    }
  };

  const validateMobileNumber = (mobile) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,10}$/;
    return regex.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-100 w-md-50 w-lg-25" style={{ maxWidth: '400px' }}>
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile"><strong>Mobile No</strong></label>
            <input
              type="text"
              placeholder="Enter Mobile number"
              autoComplete="off"
              name="mobile"
              className="form-control rounded-0"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email Address"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              className="position-absolute"
              style={{
                right: '10px',
                top: '65%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          {message && <div className="alert alert-success mb-3">{message}</div>}
          <button className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p className="mt-1">Already have an Account?</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  // State hooks for email, password, showPassword, error, and success messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  axios.defaults.withCredentials = true; // Ensure credentials are included in requests

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        if (res.data.Status === "Success") {
          // Redirect user based on their role
          if (res.data.role === "admin") {
            navigate('/dashboard');
          } else if (res.data.role === "visitor") {
            navigate('/');
          }
        } else {
          setError('Incorrect email or password.');
        }
      })
      .catch(err => {
        console.log(err);
        setError('Login failed. Please check your credentials and try again.');
      });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-100 w-md-50 w-lg-25" style={{ maxWidth: '400px' }}>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email Address"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
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
          {/* Display error message if there is an error */}
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          {/* Display success message if there is a success message */}
          {success && <div className="alert alert-success mb-3">{success}</div>}
          <button className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p className="mt-1">
          {/* Link to the registration page */}
          If you don't have an account, <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</Link>
          <br />
          {/* Link to the forget password page */}
          <Link to="/forget-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

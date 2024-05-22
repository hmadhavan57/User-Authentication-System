import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  const [error, setError] = useState();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate('/dashboard')
          }
          else if (res.data.role === "visitor") {
            navigate('/')
          }
        }
      })
      .catch(err => {
        console.log(err),
          setError('Registration failed. Please try again.')
      }
      )
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-25">
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
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p className="mt-1">If you have an Account yet?
          <br />
          <Link to="/forget-password">Forget Password</Link>
        </p>
        <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</Link>
      </div>
    </div>
  );
}

export default Login;

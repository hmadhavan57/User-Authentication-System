import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
  
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register',{name,mobile,email,password})
    .then(result => {console.log(result)
      navigate('/login')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-25">
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
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p className="mt-1">Already have an Account?</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
      </div>
    </div>
  );
}

export default Signup;

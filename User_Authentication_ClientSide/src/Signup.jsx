import { useState } from "react";
function Signup(){
  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
<div className="bg-white p-3 rounded w-25">
<h2> User Registration</h2>
<form>
<div className="mb-3">
< label htmlFor="email">
<strong>Name</strong>
</label >
<input
type="text"
placeholder="Enter Name"
autoCompIete=" off "
name="email"
className="form-control rounded-0"
  />
  </div>
  <div className="mb-3">
< label htmlFor="email">
<strong>Mobile.No</strong>
</label >
<input
type="number"
placeholder="Enter Mobile number"
autoCompIete=" off "
name="mobile-no"
className="form-control form-control-l rounded-0"

  />
  </div>
  <div className="mb-3">
< label htmlFor="email">
<strong>Emai</strong>
</label>
<input
type="email"
placeholder="Enter Email"
autoComp1ete="off"
className="form-control rounded-0"/>
</div>
<div className="mb-3">
  <label htmlFor="email">
    <strong>Password</strong>
  </label>
  <input
  type="password"
placeholder="password"
autoComp1ete="off"
className="form-control rounded-0"/>
</div>
<button className="btn btn-success w-100 rounded-0">
Register
</button>
<p className="mt-1">Already have an Account ?</p>
<button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
  Login
</button>
  </form>
  </div>
  </div>
);
}

export default Signup;
import { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import axios from 'axios'; // Importing axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation

function ForgetPassword() {
    // State hooks for email, success message, and error message
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Initializing useNavigate hook
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    axios.defaults.withCredentials = true; // Ensuring credentials are included in requests

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        axios.post('http://localhost:3001/forget-password', { email }) // Sending POST request to forget-password endpoint
            .then(res => {
                if (res.data.Status === "Success") {
                    // Display success message if email is sent successfully
                    setSuccess('Email sent successfully. Please check your inbox.');
                    setError('');
                } else {
                    // Display error message if email sending fails
                    setError('Email sending failed. Please try again later.');
                    setSuccess('');
                }
            })
            .catch(err => {
                console.log(err);
                // Display error message if an error occurs
                setError('Email sending failed. Please try again later.');
                setSuccess('');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-success vh-100">
            <div className="bg-white p-3 rounded w-100 w-md-50 w-lg-25" style={{ maxWidth: '400px' }}>
                <h4>Forget Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)} // Updating email state on change
                        />
                    </div>
                    {/* Display error message if there is an error */}
                    {error && <div className="alert alert-danger mb-3">{error}</div>}
                    {/* Display success message if email is sent successfully */}
                    {success && <div className="alert alert-success mb-3">{success}</div>}
                    <button className="btn btn-success w-100 rounded-0">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;

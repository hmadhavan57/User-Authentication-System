import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/forget-password', { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    setSuccess('Email sent successfully. Please check your inbox.');
                    setError('');
                } else {
                    setError('Email sending failed. Please try again later.');
                    setSuccess('');
                }
            })
            .catch(err => {
                console.log(err);
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && <div className="alert alert-danger mb-3">{error}</div>}
                    {success && <div className="alert alert-success mb-3">{success}</div>}
                    <button className="btn btn-success w-100 rounded-0">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;

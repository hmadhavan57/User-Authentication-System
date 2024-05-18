import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Use the correct backend route for the reset password
        axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { password })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login'); // Redirect to login on success
                }
            })
            .catch(err => console.log(err)); // Log any errors
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        axios.post(`http://localhost:3001/reset_password/${id}/${token}`, { password })
            .then(res => {
                if (res.data.Status === "Success") {
                    setSuccess('Password updated successfully.');
                    setError('');
                    setTimeout(() => navigate('/login'), 2000); // Navigate to login after 2 seconds
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again later.');
            });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-100 w-md-50 w-lg-25" style={{ maxWidth: '400px' }}>
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>New Password</strong>
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                autoComplete="new-password"
                                name="password"
                                className="form-control rounded-0"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                name="confirmPassword"
                                className="form-control rounded-0"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center mb-3">
                            <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                            {error}
                        </div>
                    )}
                    {success && <div className="alert alert-success mb-3">{success}</div>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">Update</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;

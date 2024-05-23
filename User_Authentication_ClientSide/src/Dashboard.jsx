import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [suc, setSuc] = useState(); // State to store success message
    const navigate = useNavigate(); // Hook to navigate between routes

    useEffect(() => {
        // Set axios to include credentials with requests
        axios.defaults.withCredentials = true;

        // Check if the user is authenticated and has access to the admin dashboard
        axios.get('http://localhost:3001/dashboard')
            .then(res => {
                if (res.data === "Success") {
                    // If the response is "Success", set the success message
                    setSuc("Successed OK");
                } else {
                    // If not, redirect to the home page
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    // Handle user logout
    const handleLogout = () => {
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div>
            {/* Header with title and logout button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            {/* Display success message if present */}
            {suc && <p>{suc}</p>}
        </div>
    );
}

export default Dashboard;

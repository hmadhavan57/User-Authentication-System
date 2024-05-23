import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        // Set axios to include credentials with requests
        axios.defaults.withCredentials = true;

        // Check if the user is authenticated by making a request to the server
        axios.get('http://localhost:3001/home')
            .then(result => {
                console.log(result);
                // If the server response is not "Success", redirect to login page
                if (result.data !== "Success") {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    // Handle user logout
    const handleLogout = () => {
        // Remove the token from cookies
        Cookies.remove('token');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                {/* Logout button */}
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            {/* Main content */}
            <h2>Welcome to the Home Page</h2>
            <p>This is a simple user authentication system implemented in React. Users need to log in with their credentials to access this page.</p>
            <p>When a user tries to access the home page without being authenticated, they are automatically redirected to the login page.</p>
            <p>Click the "Logout" button at the top right corner to log out and return to the login page.</p>
        </div>
    );
}

export default Home;

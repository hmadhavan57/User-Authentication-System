import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/home')
            .then(result => {
                console.log(result);
                if (result.data !== "Success") {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    const handleLogout = () => {

        Cookies.remove('token');

        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <h2>Welcome to the Home Page</h2>
            <p>This is a simple user authentication system implemented in React. Users need to log in with their credentials to access this page.</p>
            <p>When a user tries to access the home page without being authenticated, they are automatically redirected to the login page.</p>
            <p>Click the "Logout" button at the top right corner to log out and return to the login page.</p>
        </div>
    );
}

export default Home;

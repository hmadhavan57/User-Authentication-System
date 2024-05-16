import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/home')
            .then(result => {
                console.log(result)
                if (result.data !== "Success") {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err))
    }, [navigate]);

    const handleLogout = () => {
        // Clear token from storage
        Cookies.remove('token');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div>
            <h2>Home</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;

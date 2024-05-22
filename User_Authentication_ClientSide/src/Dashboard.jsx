import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [suc, setSuc] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/dashboard')
            .then(res => {
                if (res.data === "Success") {
                    setSuc("Successed OK");
                } else {
                    navigate('/');
                }
            })
            .catch(err => console.log(err));

    }, []);

    const handleLogout = () => {

        navigate('/login');
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            {suc && <p>{suc}</p>}
        </div>
    );
}

export default Dashboard;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Dashboard() {
    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
            .then(res => {
                if (res.data === "Success") {
                    setSuc("Successed OK")
                }
                else {
                    navigate('/')
                }
            })
            .catch(err => console.log(err))

    }, [])
    return (
        <div>DashBoard</div>
    );
}

export default Dashboard;
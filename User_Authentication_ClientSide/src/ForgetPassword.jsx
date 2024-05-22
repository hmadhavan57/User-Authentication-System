import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ForgetPassword() {


    const [email, setEmail] = useState();
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/forget-password', { email })
            .then(res => {
                console.log(res.data)
                if (res.data.Status === "Success") {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-success vh-100">
            <div className="bg-white p-3 rounded w-25">
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

                    <button className="btn btn-success w-100 rounded-0">send</button>
                </form>

            </div>
        </div>
    );
}

export default ForgetPassword;

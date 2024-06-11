import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            if (res) console.log(res.data);
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(`Error: ${err.message}`);
        }
    }


    return (
        <Layout title={"Register - Shop Now"}>
            <div className="register">
                <h1>Registration Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className='makeFlex'>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label register-input">Name*</label>
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="Name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label register-input">Email*</label>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="Email" required />
                        </div>
                    </div>
                    <div className='makeFlex'>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label register-input">Password*</label>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="Password" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label register-input">Phone*</label>
                            <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="Phone" required />
                        </div>
                    </div>
                    <div className='makeFlex'>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label register-input">Address*</label>
                            <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control" id="Address" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Answer" className="form-label register-input">first school name?*</label>
                            <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} className="form-control" id="Answer" required />
                        </div>
                    </div>
                    <div className="registerBTN">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Register
import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(process.env.REACT_APP_API);
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name: Name, email: Email, password: Password, phone: Phone, address: Address});
            if(res.data.status){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }
        }catch(err){
            console.log(err);
            toast.error(`Error: ${err}`);
        }
        toast.success("Registered Successfully");
    }

    return (
        <Layout title={"Register - Shop Now"}>
            <div className="register">
                <h1>Registration Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className='makeFlex'>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Name*</label>
                            <input type="text" value={Name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="Name" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email*</label>
                            <input type="email" value={Email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="Email" required />
                        </div>
                    </div>
                    <div className='makeFlex'>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password*</label>
                            <input type="password" value={Password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="Password" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label">Phone*</label>
                            <input type="tel" value={Phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="Phone" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address*</label>
                        <input type="text" value={Address} onChange={(e) => { setAddress(e.target.value) }} className="form-control" id="Address" required />
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
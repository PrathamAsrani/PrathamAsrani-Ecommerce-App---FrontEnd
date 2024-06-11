import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(process.env.REACT_APP_API);
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
          email,
          answer,
          newPassword
        });
        if (res && res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error(`Error: ${err.message}`);
      }
    }
  
  
  return (
    <Layout title={'Forgot Password - Shop Now'}>
        <div className="register">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className='makeFlex'>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                className="form-control login-input"
                id="Email"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">New Password*</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value) }}
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              className="form-control login-input"
              id="Password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Answer" className="form-label">First School Name?*</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => { setAnswer(e.target.value) }}
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              className="form-control login-input"
              id="Answer"
              required
            />
          </div>
          <div className="registerBTN">
            <button type="submit" className="btn btn-primary" style={{marginLeft:"1vw"}}>Submit</button>
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default ForgotPassword
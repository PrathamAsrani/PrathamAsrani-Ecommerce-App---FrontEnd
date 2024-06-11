import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Components/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err.message}`);
    }
  }


  return (
    <Layout title={"Login - Shop Now"}>
      <div className="register">
        <h1>Login Page</h1>
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
            <label htmlFor="Password" className="form-label">Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              className="form-control login-input"
              id="Password"
              required
            />
          </div>
          <div className="registerBTN">
            <button type="button" className="btn btn-primary" style={{marginRight:"1vw"}} onClick={() => {navigate('/forgot-password')}}>Forgot Password</button>
            <button type="submit" className="btn btn-primary" style={{marginLeft:"1vw"}}>Submit</button>
          </div>
        </form>

      </div>
    </Layout>
  )
}

export default Login
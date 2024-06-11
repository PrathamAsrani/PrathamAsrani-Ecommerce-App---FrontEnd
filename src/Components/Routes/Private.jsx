import React, { useState, useEffect } from 'react'
import { useAuth } from '../auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Supporters/Spinner'

const PrivateRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if(res.data.success){
                setOk(true);
            }else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    }, [auth?.token]);

    return ok === true ? <Outlet /> : <Spinner />;
}

export default PrivateRoute
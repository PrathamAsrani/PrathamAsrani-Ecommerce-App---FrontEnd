import React, {useEffect} from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../Components/auth'

const HomePage = () => {
  const [auth, setAuth] = useAuth()

  useEffect(() => {
    const data = localStorage.getItem('auth');
    try{
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token
      })
    }catch(err){
      console.log(`Error in login ${err}`);
    }
  }, [auth])

  return (
      <Layout title={"Shop Now"} >
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
  )
}

export default HomePage
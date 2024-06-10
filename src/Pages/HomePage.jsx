import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../Components/auth'

const HomePage = () => {
  const [auth] = useAuth()

  return (
      <Layout title={"Shop Now"} >
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
  )
}

export default HomePage
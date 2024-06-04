import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'

const PagenotFound = () => {
  return (
    <Layout title={"Page not found"}>
      <div className="pnf">
        <div className="pnf-title">404</div>
        <div className="pnf-heading">Oops! Page Not Found</div>
        <Link to="/" className='pnf-btn'>
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PagenotFound
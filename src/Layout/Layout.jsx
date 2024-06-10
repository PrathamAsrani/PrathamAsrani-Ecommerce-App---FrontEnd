import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet"

const Layout = ({ children, title = `Shop Now`, description = `MERN Stack Project`, keywords = `MERN, React, MongoDB, Express.js, Node.js`, author = `Pratham Asrani` }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
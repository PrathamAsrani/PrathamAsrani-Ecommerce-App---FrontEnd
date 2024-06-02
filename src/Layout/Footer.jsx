import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <div className="footer-essentials">
        <h2>Thanks for visiting</h2>
        <p>© 2024 All rights are reserved — <a href="https://www.linkedin.com/in/pratham-asrani-9897b0225/?originalSubdomain=in" id="name">Pratham Asrani</a></p>
        <div className="symbols">
          <a href="https://www.linkedin.com/in/pratham-asrani-9897b0225/?originalSubdomain=in"><ion-icon className="logos" name="logo-linkedin" /></a>
          <a href="https://github.com/PrathamAsrani"><ion-icon className="logos" name="logo-github" /></a>
          <a href="https://twitter.com/PrathamAsrani"><ion-icon className="logos" name="logo-twitter" /></a>
          <a href="https://www.instagram.com/prathamasrani/"><ion-icon className="logos" name="logo-instagram" /></a>
        </div>
      </div>
      <div className="footer-links text-center mt-3">
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>
        |
        <Link to="/policies">Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer
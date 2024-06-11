import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <span className="logo-text">Shop<span className="logo-highlight"> Now</span></span>
        </div>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/policies">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/pratham-asrani-9897b0225/?originalSubdomain=in"><ion-icon className="logos" name="logo-linkedin" /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/PrathamAsrani"><ion-icon className="logos" name="logo-github" /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/pratham_asrani"><ion-icon className="logos" name="logo-twitter" /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/prathamasrani/"><ion-icon className="logos" name="logo-instagram" /></a>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <p>© Copyright 2024, All Rights Reserved</p>
        <div className="footer-privacy">
          <a href="/policies">Privacy Policy</a>
          <a href="/policies">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
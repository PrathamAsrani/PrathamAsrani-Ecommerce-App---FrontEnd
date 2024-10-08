import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../Components/auth';
import { toast } from 'react-toastify';
import SearchInput from '../Components/Forms/SearchInput';

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success(`Logged out Successfully`);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand" >🛍️ Shop Now</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link">Category</NavLink>
            </li>
            {
              !auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>)
                :
                (
                  <>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</a></li>
                        <li><a className="dropdown-item" onClick={handleLogout} href="/login">Logout</a></li>
                      </ul>
                    </li>


                  </>)
            }
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">Cart(0)</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

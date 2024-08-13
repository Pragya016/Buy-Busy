import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useAuthContext } from '../context/auth.context';
import { deleteUserAccount, signOutUser } from '../database/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Navbar() {
    const { isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

  async function handleLogoutUser() {
    try {
        await signOutUser();
    } catch (error) {
      alert("Couldn't logout user. Please try again after some time.")
    }
  }

  async function handleDeleteUser() {
    try {
      const res = await deleteUserAccount();
      if (res?.status === 'success') {
        console.log('account deleted')
      } else {
        console.log('error occured');
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
   <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a style={{cursor : 'pointer'}} className="nav-link" onClick={() => navigate('/')}>Home</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor:'pointer'}}>
            <i className="bi bi-person-circle"></i>
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">My Orders</a></li>
            {isLoggedIn && <li><a className="dropdown-item" onClick={handleLogoutUser}>Sign out</a></li>}
            {!isLoggedIn && <li><a className="dropdown-item" style={{cursor : 'pointer'}} onClick={() => navigate('/sign-in')}>Sign in</a></li>}
            <li><a className="dropdown-item" style={{cursor:'pointer'}} onClick={handleDeleteUser}>Delete My Account</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}
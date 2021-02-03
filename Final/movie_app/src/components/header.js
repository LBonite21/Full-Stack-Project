import React from "react";
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  let moviePage;
  let accountPage;
  let adminPage;

  if (sessionStorage.getItem("user")) {
    moviePage = <NavLink to="/movies">Movies</NavLink>;
    accountPage = <NavLink to="/account">Account Settings</NavLink>   // Checks if the user is an admin
    let isAdmin = JSON.parse(sessionStorage.getItem("user")).isAdmin;
    if (isAdmin) {
      adminPage = <NavLink to="/admin">Admin Settings</NavLink>;
    }
  }

  return (
    <>
      <div id="myNavBar" className="nav-bar">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        {moviePage}
        {accountPage}
        {adminPage}
        <a
          href="/"
          onClick={() => {
            sessionStorage.removeItem("user");
          }}
        >
          Log Out
        </a>
      </div>
    </>
  );
};

export default Header;

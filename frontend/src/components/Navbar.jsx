import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/">
            <a className="btn btn-light mx-1" href="/">
              Home
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/AddStudent">
                  <a
                    href="/"
                    className="btn btn-light mx-1"
                    aria-current="page"
                  >
                    Add Student
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Attendance">
                  <button className="btn btn-light mx-1" aria-current="page">
                    Create Attendance
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/check">
                  <button className="btn btn-light" aria-current="page">
                    Check Attendance
                  </button>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login">
                  {!user && (
                    <a
                      href="/"
                      className="btn btn-light mx-2"
                      aria-current="page"
                    >
                      Login
                    </a>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup">
                  {!user && (
                    <a href="/" className="btn btn-light" aria-current="page">
                      SignUp
                    </a>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                {user && (
                  <div className="d-flex align-items-center">
                    <span className="">{user.email}</span>
                    <button className="btn" onClick={handleClick}>
                      Log out
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

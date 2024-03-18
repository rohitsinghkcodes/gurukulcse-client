import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/authContext.js";
import SearchComponent from "../Form/SearchComponent.js";
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  //clear storage and set auth details after logging out => handled by this funtion
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    //clearing the local storage
    localStorage.removeItem("gurukulcse-auth");
    toast.success("Signed Out Successfully!");
  };

  // Handle th ereload if already on homepage and clicked on the navbar brand
  const handleReload = () => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" onClick={handleReload}>
              <div
                className="m-0"
                style={{
                  color: "blueviolet",
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "8px",
                }}
              >
                {"</> gurukulcse.com"}
              </div>
            </Link>

            <div className="searchBox">
              <SearchComponent />
            </div>

            <ul className="navbar-nav  mb-2 mb-lg-0">
              <div className="">
                <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to={`/all-courses`} className="nav-link">
                      Courses
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/papers" className="nav-link">
                      Research Papers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/all-notes`} className="nav-link">
                      Notes
                    </Link>
                  </li>
                </ul>
              </div>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown mx-2">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* Making fisrt letter of name capital */}
                      {auth.user.name[0].toUpperCase() +
                        auth.user.name.slice(1)}
                    </Link>
                    {/* Dropdown menu*/}
                    {auth?.user?.role === 0 ? (
                      // if user is non admin
                      <ul className="dropdown-menu dropdown-menu-lg-end">
                        <li>
                          <Link to="/profile" className="dropdown-item">
                            <FaRegUserCircle /> &nbsp; My Profile
                          </Link>

                          <Link
                            to="/login"
                            onClick={handleLogOut}
                            className="dropdown-item"
                          >
                            <IoLogOut /> &nbsp; Sign Out
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      // if user is admin
                      <ul className="dropdown-menu dropdown-menu-lg-end">
                        <li>
                          {/* <Link to="/profile" className="dropdown-item">
                            <FaUserCircle /> &nbsp; Profile
                          </Link> */}
                          <Link
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="dropdown-item"
                          >
                            <MdSpaceDashboard /> &nbsp; Dashboard
                          </Link>

                          <Link
                            to="/login"
                            onClick={handleLogOut}
                            className="dropdown-item"
                          >
                            <IoLogOut /> &nbsp; Sign Out
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
const Header = () => {
  const navigate = useNavigate();
  const [Admin, setAdmin] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  let API_URL = "http://localhost:3000/";

  async function checkauth() {
    try {
      const res = await axios.get(`${API_URL}check`, {
        withCredentials: true,
      });
      setIsLoggedIn(res.data.loggedIn);
      // console.log(IsLoggedIn);
      setAdmin(res.data.role === "admin");
      // console.log(res.data.role);
    } catch (err) {
      console.error("Auth check failed:", err.message);
    }
  }

  useEffect(() => {
    checkauth();
  });

  const logout = async () => {
    try {
      const log = await axios.get(`${API_URL}auth/logout`, {
        withCredentials: true,
      });
      if (log.status === 200) {
        if (window.location.pathname === "/") {
          window.location.reload();
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <header className="main-header">
      <div className="header-sticky">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="images/logo.svg" alt="Logo" />
            </Link>
            <div className="collapse navbar-collapse main-menu">
              <div className="nav-menu-wrapper">
                <ul className="navbar-nav mr-auto" id="menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/services">
                      Services
                    </Link>
                  </li>

                  {/* User Pages */}
                  {!Admin ? (
                    <li className="nav-item submenu">
                      <Link className="nav-link" to="#">
                        More
                      </Link>
                      <ul>
                        <li>
                          <Link className="nav-link" to="/profile">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/dashboard">
                            User Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/workouts">
                            Workouts
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/nutrition">
                            Nutrition Logs
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/progress">
                            Progress / Analytics
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    /* Admin Pages */
                    <li className="nav-item submenu">
                      <Link className="nav-link" to="#">
                        Admin
                      </Link>
                      <ul>
                        <li>
                          <Link className="nav-link" to="/admin/dashboard">
                            Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/admin/workouts">
                            Manage Workouts
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/admin/logs">
                            View Logs
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/admin/analytics">
                            Analytics View
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/admin/users">
                            User Directory
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/admin/moderation">
                            Moderation Panel
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="/admin/inbox">
                            Inbox
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              {!IsLoggedIn ? (
                <>
                  <div className="btn">
                    <Link to="/login" className="btn-default btn-highlighted">
                      Sign In
                    </Link>
                  </div>
                  <div className="header-btn">
                    <Link to="/signup" className="btn-default">
                      Sign Up
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <ul className="navbar-nav mr-auto" id="menu">
                    <li className="nav-item">
                      <Link className="nav-link" to="/notifications">
                        <IoMdNotificationsOutline
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </Link>
                    </li>
                  </ul>
                  <div className="header-btn">
                    <button
                      onClick={() => logout()}
                      className="btn-default btn-highlighted"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="navbar-toggle"></div>
          </div>
        </nav>
        <div className="responsive-menu"></div>
      </div>
    </header>
  );
};

export default Header;

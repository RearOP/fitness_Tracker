import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.svg'
import {
  Bell,
  X,
  Trophy,
  Calendar,
  Target,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Trash,
  Trash2,
} from "lucide-react";
import "../../assets/css/notification.css";
const Header = () => {
  const navigate = useNavigate();
  const [Admin, setAdmin] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  // const [hasUnreadNotifications, sethasUnreadNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const unread = notifications.some((n) => !n.read);
  const iconMap = {
    achievement: Trophy,
    class: Calendar,
    goal: Target,
    social: Users,
    workout: Target,
    alert: AlertTriangle,
    support: HelpCircle,
  };

  /* ── helper: nice “time ago” string ────*/
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} h ago`;
    return new Date(date).toLocaleDateString();
  };

  let API_URL = "http://localhost:3000";

  useEffect(() => {
    (async () => {
      try {
        const auth = await axios.get(`${API_URL}/check`, {
          withCredentials: true,
        });
        // if (auth.status === 200 && window.location.pathname !== "/") {
        //   navigate("/");
        // }
        setIsLoggedIn(auth.data.loggedIn);
        setAdmin(auth.data.role === "admin");
        const userId = auth.data.user.id;

        if (auth.data.loggedIn) {
          const { data } = await axios.get(
            `${API_URL}/notifications/fetch/${userId}`,
            {
              withCredentials: true,
            }
          );
          setNotifications(data);
        }
      } catch (err) {
        console.error("Auth/notification fetch failed:", err.message);
      }
    })();
  });

  const markAllRead = async () => {
    try {
      await axios.put(
        `${API_URL}/notifications/read-all`,
        {},
        { withCredentials: true }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Cannot mark notifications read", err.message);
    }
  };

  const logout = async () => {
    try {
      const log = await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      if (log.status === 200) {
        if (window.location.pathname) {
          window.location.reload();
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };
  async function delete_noti(id) {
    // e.stopPropagation();
    try {
      await axios.delete(`${API_URL}/notifications/delete/${id}`, {
        withCredentials: true,
      });
      setNotifications((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Cannot delete notification", err.message);
    }
  }

  async function mark_noti(id) {
    // e.stopPropagation();
    try {
      await axios.put(
        `${API_URL}/notifications/read/${id}`,
        {},
        { withCredentials: true }
      );
      setNotifications((prev) =>
        prev.map((item) => (item._id === id ? { ...item, read: true } : item))
      );
    } catch (err) {
      console.error("Cannot mark as read", err.message);
    }
  }
  return (
    <header className="main-header">
      <div className="header-sticky">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Logo" />
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
                        {/* <li>
                          <Link className="nav-link" to="/admin/workouts">
                            Manage Workouts
                          </Link>
                        </li> */}
                        {/* <li>
                          <Link className="nav-link" to="/admin/logs">
                            View Logs
                          </Link>
                        </li> */}
                        <li>
                          <Link className="nav-link" to="/admin/analytics">
                            Analytics View
                          </Link>
                        </li>
                        {/* <li>
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
                        </li> */}
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
                  <ul className="navbar-nav mx-auto" id="menu">
                    <li className="nav-item" style={{ marginRight: 10 }}>
                      <button
                        onClick={() => setSidebar(true)}
                        className="notification-btn"
                      >
                        <Bell size={14} />
                        {unread && <span className="notification-badge" />}
                      </button>
                    </li>
                  </ul>

                  {/* Overlay */}
                  {sidebar && (
                    <div
                      className="sidebar-overlay active"
                      onClick={() => setSidebar(false)}
                    />
                  )}

                  {/* Sidebar */}
                  <div className={`fitness-sidebar ${sidebar ? "active" : ""}`}>
                    <div className="sidebar-header row align-items-center">
                      <div className="col-md-10">
                        <h2 className="sidebar-title">Notifications</h2>
                      </div>
                      <div className="col-md-2">
                        <button
                          className="close-btn"
                          onClick={() => setSidebar(false)}
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="sidebar-body">
                      {notifications.length === 0 ? (
                        <p className="p-3">No notifications yet.</p>
                      ) : (
                        <div className="notifications-list">
                          {notifications.map((n) => {
                            const Icon = iconMap[n.type] || Bell;
                            if (n.read) return null;
                            return (
                              <div
                                key={n._id}
                                className={`notification-item unread`}
                              >
                                <div className="notification-icon">
                                  <Icon size={20} />
                                </div>
                                <div className="notification-text">
                                  <p className="notification-message">
                                    {n.message}
                                  </p>
                                  <div className="notification-meta">
                                    <Clock size={12} />
                                    <span>{timeAgo(n.createdAt)}</span>
                                    <span className="notification-new-badge">
                                      NEW
                                    </span>
                                  </div>
                                </div>
                                <div className="notification-actions d-flex justify-content-end"></div>
                                <button
                                  className="notification-action-btn"
                                  title="Mark as read"
                                  onClick={() => mark_noti(n._id)}
                                  style={{
                                    background: "#84cc1633",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "4px",
                                    marginRight: "6px",
                                    color: "#22c55e",
                                    transition: "background 0.2s",
                                  }}
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button
                                  className="notification-action-btn"
                                  title="Delete notification"
                                  onClick={() => delete_noti(n._id)}
                                  style={{
                                    background: "#ef444433",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "4px",
                                    color: "#ef4444",
                                    transition: "background 0.2s",
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="sidebar-footer">
                      <button
                        className="mark-read-btn"
                        onClick={markAllRead}
                        disabled={!unread}
                      >
                        <CheckCircle size={16} /> Mark All as Read
                      </button>
                    </div>
                  </div>

                  <div className="header-btn">
                    <button
                      onClick={logout}
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

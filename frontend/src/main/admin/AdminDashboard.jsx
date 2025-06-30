import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Scrollingsticker from "../components/Scrollingsticker";

dayjs.extend(relativeTime);

/**
 * Admin dashboard pulled from live API data instead of hard‑coded mock objects.
 *
 * End‑points assumed (adjust as needed):
 *   GET /api/users?limit=20                       → latest users
 *   GET /api/workouts?date=today                 → today’s classes / workouts
 *   GET /api/notifications?recent=true           → recent notifications
 *   GET /api/payments/today                      → today’s revenue (optional)
 */

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // all (recent) users
  const [workouts, setWorkouts] = useState([]); // today’s classes
  const [notifications, setNotifications] = useState([]);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let API_URL = "http://localhost:3000";

  /** Fetch dashboard data once on mount */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await axios.get(`${API_URL}/check`, {
          withCredentials: true,
        });
        const userId = auth.data.user.id;
        // recent users (limit 20)
        const usersRes = await axios.get(`${API_URL}/auth/fetch`, {
          withCredentials: true,
        });
        // today’s workouts/classes
        const todayISO = new Date().toISOString().split("T")[0]; // yyyy‑mm‑dd
        const workoutsRes = await axios.get(`${API_URL}/workouts/viewWorkout`, {
          params: { date: todayISO },
          withCredentials: true,
        });
        const nutritionRes = await axios.get(`${API_URL}/nutritions/fetchAdmin`, {
          withCredentials: true,
        });
        // notifications (optional)
        const notiRes = await axios.get(
          `${API_URL}/notifications/fetch/${userId}`,
          { params: { recent: true }, withCredentials: true }
        );

        setUsers(usersRes.data || []);
        setWorkouts(workoutsRes.data || []);
        setNotifications(notiRes.data || []);
        setNutritionLogs(nutritionRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ────────────────────────── Derived helpers ────────────────────────── */
  const totalMembers = users.length;
  const activeTrainers = users.filter((u) => u.role === "user").length;
  const todaysClasses = workouts.length;
  const totalNutritionLogs = nutritionLogs.length;



  // show the 4 most‑recent members
  const recentMembers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4)
      .map((u) => ({
        id: u._id,
        name: u.fullname,
        role: u.role,
        joined: dayjs(u.createdAt).fromNow(),
        avatar: u.fullname
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        status: "Active", // You can derive real status if you store it in User model
        plan: u.plan || "—", // fallback; add a `plan` field in schema if needed
      }));
  }, [users]);

  // map workouts → class items (today only)
  const upcomingClasses = useMemo(() => {
    return workouts.map((w) => ({
      id: w._id,
      name: w.title,
      time: dayjs(w.date).format("hh:mm A"),
      trainer: w.trainerName || "—", // attach trainerName on backend join if needed
      spots: w.spots ? `${w.spots.filled}/${w.spots.total}` : "—",
      status: w.spots && w.spots.filled >= w.spots.total ? "Full" : "Available",
    }));
  }, [workouts]);

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.05)",
      padding: "30px",
      borderRadius: "20px",
      marginBottom: "30px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(195, 245, 60, 0.2)",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      color: "#d7fb00",
    },
    welcomeText: {
      fontSize: "1.1rem",
      color: "#cccccc",
      marginTop: "5px",
    },
    headerActions: {
      display: "flex",
      gap: "15px",
    },
    headerButton: {
      padding: "12px 20px",
      background: "#d7fb00",
      border: "none",
      borderRadius: "25px",
      color: "#1a1a2e",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px",
      marginBottom: "30px",
    },
    leftColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    rightColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.08)",
      padding: "25px",
      borderRadius: "15px",
      border: "1px solid rgba(195, 245, 60, 0.2)",
      backdropFilter: "blur(10px)",
    },
    cardTitle: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#c3f53c",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    memberItem: {
      display: "flex",
      alignItems: "center",
      padding: "15px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      marginBottom: "10px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    avatar: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      background: "linear-gradient(45deg, #c3f53c, #39ff14)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#1a1a2e",
      fontWeight: "700",
      marginRight: "15px",
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "3px",
    },
    memberDetails: {
      fontSize: "0.8rem",
      color: "#cccccc",
    },
    statusBadge: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.7rem",
      fontWeight: "600",
      textTransform: "uppercase",
    },
    activeStatus: {
      background: "rgba(57, 255, 20, 0.2)",
      color: "#39ff14",
    },
    pendingStatus: {
      background: "rgba(255, 193, 7, 0.2)",
      color: "#ffc107",
    },
    classItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      marginBottom: "10px",
    },
    classInfo: {
      flex: 1,
    },
    className: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: "5px",
    },
    classDetails: {
      fontSize: "0.8rem",
      color: "#cccccc",
    },
    classStatus: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "0.7rem",
      fontWeight: "600",
    },
    availableClass: {
      background: "rgba(57, 255, 20, 0.2)",
      color: "#39ff14",
    },
    fullClass: {
      background: "rgba(255, 107, 107, 0.2)",
      color: "#ff6b6b",
    },
    notification: {
      display: "flex",
      alignItems: "flex-start",
      padding: "12px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "8px",
      marginBottom: "10px",
      borderLeft: "3px solid #c3f53c",
    },
    notificationIcon: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#c3f53c",
      marginRight: "12px",
      marginTop: "6px",
    },
    notificationContent: {
      flex: 1,
    },
    notificationMessage: {
      fontSize: "0.9rem",
      marginBottom: "3px",
    },
    notificationTime: {
      fontSize: "0.7rem",
      color: "#999",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginBottom: "30px",
    },
  };


  return (
    <>
      {/* Hero header (parallax) */}
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Admin <span>Dashboard</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Admin <span>Dashboard</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />

      <div className="container my-5">
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>ADMIN DASHBOARD</h1>
            <p style={styles.welcomeText}>
              Welcome back, Admin. Ready to transform lives today?
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div  style={styles.statsRow }>
          <div className="stat-card" style={{ animationDelay: `0.1s`}}>
            <div className="stat-number h6">{totalMembers}</div>
            <div className="stat-label">Total Members</div>
          </div>
          <div className="stat-card" style={{ animationDelay: `0.1s`}}>
            <div className="stat-number h6">{todaysClasses}</div>
            <div className="stat-label">Today's Classes</div>
          </div>
         <div className="stat-card" style={{ animationDelay: `0.1s`}}>
            <div className="stat-number h6">
              {totalNutritionLogs}
            </div>
            <div className="stat-label">Total Meals</div>
          </div>
          <div className="stat-card" style={{ animationDelay: `0.1s`}}>
            <div className="stat-number h6">{activeTrainers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>

        {/* Main content grid */}
        <div style={styles.mainGrid}>
          {/* ─────────── Left column ─────────── */}
          <div style={styles.leftColumn}>
            {/* Recent Members */}
            <div className="workout-history">
              <h3 className="chart-title">👥 Recent Members</h3>
              {recentMembers.map((member) => (
                <div
                  key={member.id}
                  className="workout-item"
                  onClick={() => setSelectedMember(member)}
                >
                  <div style={styles.avatar}>{member.avatar}</div>
                  <div className="workout-stats flex-grow-1">
                    <div style={styles.memberName}>{member.name}</div>
                    <div style={styles.memberDetails}>
                      Joined {member.joined}
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      ...(member.status === "Active"
                        ? styles.activeStatus
                        : styles.pendingStatus),
                    }}
                  >
                    {member.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Classes */}
            <div className="workout-history">
              <h3 className="chart-title">🏃 Today's Classes</h3>
              {upcomingClasses.map((c) => (
                <div key={c.id} className="workout-item">
                  <div className="workout-stats flex-grow-1">
                    <div style={styles.className}>{c.name}</div>
                    <div style={styles.classDetails}>
                      {c.time} • {c.trainer} • {c.spots}
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.classStatus,
                      ...(c.status === "Available"
                        ? styles.availableClass
                        : styles.fullClass),
                    }}
                  >
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────── Right column ─────────── */}
          <div style={styles.rightColumn}>
            {/* Notifications */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🔔 Recent Notifications</h3>
              {notifications.length === 0 && <p>No recent notifications</p>}
              {notifications.map((n) => (
                <div key={n.id} style={styles.notification}>
                  <div style={styles.notificationIcon}></div>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationMessage}>{n.message}</div>
                    <div style={styles.notificationTime}>
                      {dayjs(n.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Overview */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📈 Today's Overview</h3>
              <OverviewRow
                label="Check‑ins"
                value={todaysClasses * 10 /* example */}
              />
              <OverviewRow label="New Signups" value={recentMembers.length} />
              <OverviewRow label="Classes Completed" value={todaysClasses} />
              <OverviewRow
                label="Nutrition Logs"
                value={totalNutritionLogs}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ────────────────────────────────────────────────────────────────── */
const SystemStatus = ({ label, value, percent }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#d7fb00" }}>{value}</span>
      </div>
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "3px",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#d7fb00",
            borderRadius: "3px",
          }}
        ></div>
      </div>
    </div>
  );
};

const OverviewRow = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
    }}
  >
    <span>{label}</span>
    <span style={{ color: "#c3f53c", fontWeight: "600" }}>{value}</span>
  </div>
);

export default AdminDashboard;

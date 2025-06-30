import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Scrollingsticker from "../components/Scrollingsticker";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

let API_URL = "http://localhost:3000";

const AdminAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ────────────────────────── Fetch data once ────────────────────────── */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await axios.get(`${API_URL}/check`, {
          withCredentials: true,
        });
        const userId = auth?.data?.user?.id;

        // fetch all users (no limit)
        const usersRes = await axios.get(`${API_URL}/auth/fetch`, {
          withCredentials: true,
        });

        // fetch workouts for the past 6 months
        const sixMonthsAgoISO = dayjs()
          .subtract(6, "month")
          .startOf("month")
          .toISOString();
        const workoutsRes = await axios.get(`${API_URL}/workouts/viewWorkout`, {
          params: { from: sixMonthsAgoISO },
          withCredentials: true,
        });

        // fetch nutrition logs (optional analytics)
        const nutritionRes = await axios.get(
          `${API_URL}/nutritions/fetchAdmin`,
          { withCredentials: true }
        );

        // notifications not strictly needed for analytics page, skipped here
        setUsers(usersRes.data || []);
        setWorkouts(workoutsRes.data || []);
        setNutritionLogs(nutritionRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ────────────────────────── Derived datasets ────────────────────────── */
  const membershipData = useMemo(() => {
    // last 6 complete months including current month
    const months = Array.from({ length: 6 }, (_, i) =>
      dayjs()
        .subtract(5 - i, "month")
        .startOf("month")
    );

    return months.map((month) => {
      const monthLabel = month.format("MMM");

      // new members that joined in this calendar month
      const members = users.filter((u) =>
        dayjs(u.createdAt).isSame(month, "month")
      ).length;

      return { month: monthLabel, members };
    });
  }, [users, workouts]);

  const trainingData = useMemo(() => {
    const counts = workouts.reduce(
      (acc, w) => {
        acc[w.type] = (acc[w.type] || 0) + 1;
        return acc;
      },
      { strength: 0, cardio: 0, flexibility: 0, other: 0 }
    );
    const palette = {
      strength: "#c3f53c",
      cardio: "#39ff14",
      flexibility: "#adff2f",
      other: "#7fff00",
    };
    return Object.entries(counts).map(([name, value]) => ({
      name: name[0].toUpperCase() + name.slice(1),
      value,
      color: palette[name],
    }));
  }, [workouts]);

  /* ────────────────────────── Top‑level stats ────────────────────────── */
  const totalMembers = users.length;
  const activeTrainers = users.filter((u) => u.role === "user").length;
  const todaysClasses = workouts.length;
  const totalNutritionLogs = nutritionLogs.length;
  /* ────────────────────────── Styles (same as original) ────────────────────────── */
  const styles = {
    header: {
      textAlign: "center",
      marginBottom: "40px",
      background: "rgba(255, 255, 255, 0.05)",
      padding: "40px 20px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "800",
      marginBottom: "15px",
      background: "linear-gradient(45deg, #c3f53c, #39ff14)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 4px 20px rgba(195, 245, 60, 0.3)",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#cccccc",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
      marginTop: "40px",
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.08)",
      padding: "30px",
      borderRadius: "15px",
      border: "1px solid rgba(195, 245, 60, 0.2)",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    statNumber: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#c3f53c",
      marginBottom: "10px",
    },
    statLabel: {
      fontSize: "1rem",
      color: "#cccccc",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    chartSection: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "30px",
      borderRadius: "20px",
      marginBottom: "30px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    chartTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#c3f53c",
    },
    tabContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
      gap: "10px",
    },
    tab: {
      padding: "12px 24px",
      background: "transparent",
      border: "2px solid rgba(195, 245, 60, 0.3)",
      borderRadius: "25px",
      color: "#cccccc",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      fontWeight: "600",
      letterSpacing: "1px",
    },
    activeTab: {
      background: "#c3f53c",
      color: "#1a1a2e",
      border: "2px solid #c3f53c",
    },
    performanceGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
    },
    performanceCard: {
      background: "rgba(57, 255, 20, 0.1)",
      padding: "25px",
      borderRadius: "15px",
      border: "1px solid rgba(57, 255, 20, 0.2)",
      textAlign: "center",
    },
    performanceValue: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#39ff14",
      marginBottom: "8px",
    },
    performanceLabel: {
      fontSize: "0.9rem",
      color: "#cccccc",
      marginBottom: "5px",
    },
    performanceTrend: {
      fontSize: "0.8rem",
      color: "#c3f53c",
      fontWeight: "600",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginBottom: "30px",
    },
  };

  /* ────────────────────────── Render ────────────────────────── */
  if (loading) return <div className="container my-5">Loading analytics…</div>;
  if (error) return <div className="container my-5 text-danger">{error}</div>;

  return (
    <>
      {/* Hero header */}
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Admin <span>Analytics</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Admin <span>Analytics</span>
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
        {/* Key Stats */}
        <div style={styles.statsRow}>
          <div className="stat-card" style={{ animationDelay: `0.1s` }}>
            <div className="stat-number h6">{totalMembers}</div>
            <div className="stat-label">Total Members</div>
          </div>
          <div className="stat-card" style={{ animationDelay: `0.1s` }}>
            <div className="stat-number h6">{todaysClasses}</div>
            <div className="stat-label">Today's Classes</div>
          </div>
          <div className="stat-card" style={{ animationDelay: `0.1s` }}>
            <div className="stat-number h6">{totalNutritionLogs}</div>
            <div className="stat-label">Total Meals</div>
          </div>
          <div className="stat-card" style={{ animationDelay: `0.1s` }}>
            <div className="stat-number h6">{activeTrainers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          {[
            { id: "overview", label: "Overview" },
            { id: "members", label: "Members" },
            { id: "training", label: "Training" }
          ].map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ───────────────── Overview Tab ───────────────── */}
        {activeTab === "overview" && (
          <>
            {/* Members  */}
            <div style={styles.chartSection}>
              <h3 style={styles.chartTitle}>Membership Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={membershipData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="month" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(26, 26, 46, 0.9)",
                      border: "1px solid #c3f53c",
                      borderRadius: "10px",
                      color: "#ffffff",
                    }}
                  />
                  <Bar
                    dataKey="members"
                    fill="#c3f53c"
                    radius={[4, 4, 0, 0]}
                    name="New Members"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* total Workouts (line) */}
                  <div style={styles.chartSection}>
                    <h3 style={styles.chartTitle}>Total Workouts</h3>
                    <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={membershipData.map((item) => ({
                      ...item,
                      totalWorkouts: workouts.filter((w) =>
                        dayjs(w.date).format("MMM") === item.month
                      ).length,
                      }))}
                    >
                      <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis dataKey="month" stroke="#cccccc" />
                      <YAxis stroke="#cccccc" />
                      <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(26, 26, 46, 0.9)",
                        border: "1px solid #39ff14",
                        borderRadius: "10px",
                        color: "#ffffff",
                      }}
                      />
                      <Line
                      type="monotone"
                      dataKey="totalWorkouts"
                      stroke="#39ff14"
                      strokeWidth={3}
                      dot={{ fill: "#39ff14", strokeWidth: 2, r: 6 }}
                      name="Total Workouts"
                      />
                    </LineChart>
                    </ResponsiveContainer>
                  </div>
                  </>
                )}
        {activeTab === "training" && (
          <div style={styles.chartSection}>
            <h3 style={styles.chartTitle}>Training Program Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={trainingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trainingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    border: "1px solid #c3f53c",
                    borderRadius: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ───────────────── Members Tab ───────────────── */}
        {activeTab === "members" && (
          <div style={styles.chartSection}>
            <h3 style={styles.chartTitle}>Member Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={membershipData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="month" stroke="#cccccc" />
                <YAxis stroke="#cccccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(26, 26, 46, 0.9)",
                    border: "1px solid #c3f53c",
                    borderRadius: "10px",
                    color: "#ffffff",
                  }}
                />
                <Bar
                  dataKey="members"
                  fill="url(#memberGradient)"
                  radius={[4, 4, 0, 0]}
                  name="New Members"
                />
                <defs>
                  <linearGradient
                    id="memberGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#c3f53c" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#39ff14" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAnalytics;

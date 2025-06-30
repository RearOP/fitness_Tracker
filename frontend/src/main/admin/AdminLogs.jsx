import React, { useState, useEffect } from "react";
import Scrollingsticker from "../components/Scrollingsticker";
import axios from "axios";

const AdminLogs = () => {
  let API_URL = "http://localhost:3000";

  const [activeTab, setActiveTab] = useState("nutrition");
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [progressLogs, setProgressLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNutrition, setTotalNutrition] = useState(0);
  const [totalWorkout, setTotalWorkout] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    // Pagination controls
    const totalPages = {
      nutrition: Math.ceil(totalNutrition / pageSize),
      workout: Math.ceil(totalWorkout / pageSize),
      progress: Math.ceil(totalProgress / pageSize),
    };

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    const handlePageSizeChange = (e) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    };

    const fetchData = async () => {
      try {
        const auth = await axios.get(`${API_URL}/check`, {
          withCredentials: true,
        });

        const usersRes = await axios.get(`${API_URL}/auth/fetch`, {
          withCredentials: true,
        });

        const nutritionRes = await axios.get(
          `${API_URL}/nutritions/fetchAdmin?page=${page}&limit=${pageSize}`,
          { withCredentials: true }
        );

        const workoutsRes = await axios.get(
          `${API_URL}/workouts/viewWorkout?page=${page}&limit=${pageSize}`,
          { withCredentials: true }
        );

        const progressRes = await axios.get(
          `${API_URL}/progress/fetchAdmin?page=${page}&limit=${pageSize}`,
          { withCredentials: true }
        );

        setUsers(usersRes.data || []);
        setNutritionLogs(nutritionRes.data?.logs || []);
        setTotalNutrition(nutritionRes.data?.total || 0);
        setWorkoutLogs(workoutsRes.data?.logs || []);
        setTotalWorkout(workoutsRes.data?.total || 0);
        setProgressLogs(progressRes.data?.logs || []);
        setTotalProgress(progressRes.data?.total || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotalNutrition = (items) => {
    return items.reduce(
      (total, item) => ({
        calories: (total.calories || 0) + (item.calories || 0),
        protein: (total.protein || 0) + (item.protein || 0),
        carbs: (total.carbs || 0) + (item.carbs || 0),
        fat: (total.fat || 0) + (item.fat || 0),
      }),
      {}
    );
  };

  const filteredNutritionLogs = nutritionLogs.filter((log) => {
    const userMatch = selectedUser === "all" || log.user._id === selectedUser;
    const dateMatch = !dateFilter || log.date.startsWith(dateFilter);
    return userMatch && dateMatch;
  });

  const filteredWorkoutLogs = workoutLogs.filter((log) => {
    const userMatch = selectedUser === "all" || log.user._id === selectedUser;
    const dateMatch = !dateFilter || log.date.startsWith(dateFilter);
    return userMatch && dateMatch;
  });

  const filteredProgressLogs = progressLogs.filter((log) => {
    const userMatch = selectedUser === "all" || log.userId === selectedUser;
    const dateMatch = !dateFilter || log.date.startsWith(dateFilter);
    return userMatch && dateMatch;
  });

   const styles = {
    hero: {
      backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cdefs%3E%3Cpattern id='gym' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23a8d400' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23gym)'/%3E%3C/svg%3E\")",
      padding: "60px 20px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
    },
    breadcrumb: {
      color: "#bdc3c7",
      fontSize: "14px",
      marginBottom: "20px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    mainTitle: {
      fontSize: "48px",
      fontWeight: "900",
      margin: "0 0 30px 0",
      color: "white",
      textTransform: "uppercase",
      letterSpacing: "3px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    titleHighlight: {
      color: "#a8d400",
      textShadow: "0 0 20px rgba(168, 212, 0, 0.5)",
    },
    statsRow: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      marginBottom: "30px",
      flexWrap: "wrap",
    },
    statItemCentered: {
      textAlign: "center",
      color: "white",
    },
    statNumber: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#a8d400",
      display: "block",
      textShadow: "0 0 10px rgba(168, 212, 0, 0.3)",
    },
    statLabel: {
      fontSize: "14px",
      opacity: 0.8,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    buttonGroup: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    primaryButton: {
      backgroundImage: "linear-gradient(45deg, #a8d400, #8bc34a)",
      color: "#1a1a2e",
      padding: "15px 30px",
      border: "none",
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(168, 212, 0, 0.3)",
      transition: "all 0.3s ease",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      color: "#a8d400",
      padding: "15px 30px",
      border: "2px solid #a8d400",
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    navBanner: {
      backgroundImage: "linear-gradient(90deg, #a8d400, #8bc34a)",
      padding: "15px 0",
      textAlign: "center",
      overflow: "hidden",
    },
    navContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      color: "#1a1a2e",
      fontSize: "18px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "2px",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    navIcon: {
      fontSize: "20px",
    },
    mainContent: {
      padding: "40px 20px",
    },
    filtersSection: {
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(168, 212, 0, 0.2)",
      borderRight: "1px solid rgba(168, 212, 0, 0.2)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.2)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.2)",
      borderRadius: "15px",
      padding: "25px",
      marginBottom: "30px",
      textAlign: "center",
    },
    filtersTitle: {
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    filters: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "center",
    },
    select: {
      padding: "12px 20px",
      borderTop: "2px solid #a8d400",
      borderRight: "2px solid #a8d400",
      borderBottom: "2px solid #a8d400",
      borderLeft: "2px solid #a8d400",
      borderRadius: "25px",
      fontSize: "14px",
      backgroundColor: "rgba(26, 26, 46, 0.8)",
      color: "white",
      outline: "none",
      minWidth: "150px",
      transition: "all 0.3s ease",
    },
    input: {
      padding: "12px 20px",
      borderTop: "2px solid #a8d400",
      borderRight: "2px solid #a8d400",
      borderBottom: "2px solid #a8d400",
      borderLeft: "2px solid #a8d400",
      borderRadius: "25px",
      fontSize: "14px",
      backgroundColor: "rgba(26, 26, 46, 0.8)",
      color: "white",
      outline: "none",
      minWidth: "150px",
      transition: "all 0.3s ease",
    },
    tabs: {
      display: "flex",
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "15px",
      marginBottom: "30px",
      overflow: "hidden",
      borderTop: "1px solid rgba(168, 212, 0, 0.2)",
      borderRight: "1px solid rgba(168, 212, 0, 0.2)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.2)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.2)",
    },
    tab: {
      flex: 1,
      padding: "20px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
      position: "relative",
    },
    activeTab: {
      backgroundImage: "linear-gradient(45deg, #a8d400, #8bc34a)",
      color: "#1a1a2e",
      fontWeight: "bold",
      boxShadow: "0 4px 15px rgba(168, 212, 0, 0.3)",
    },
    inactiveTab: {
      color: "#bdc3c7",
      borderTop: "none",
      borderRight: "1px solid rgba(168, 212, 0, 0.1)",
      borderBottom: "none",
      borderLeft: "none",
    },
    logCard: {
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(168, 212, 0, 0.2)",
      borderRight: "1px solid rgba(168, 212, 0, 0.2)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.2)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.2)",
      padding: "25px",
      marginBottom: "20px",
      borderRadius: "15px",
      transition: "all 0.3s ease",
      position: "relative",
    },
    logHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "15px",
      borderTop: "none",
      borderRight: "none",
      borderBottom: "1px solid rgba(168, 212, 0, 0.2)",
      borderLeft: "none",
    },
    userName: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "white",
    },
    date: {
      fontSize: "14px",
      color: "#bdc3c7",
      opacity: 0.8,
    },
    badge: {
      display: "inline-block",
      padding: "6px 12px",
      backgroundImage: "linear-gradient(45deg, #a8d400, #8bc34a)",
      color: "#1a1a2e",
      borderRadius: "20px",
      fontSize: "12px",
      textTransform: "capitalize",
      marginLeft: "15px",
      fontWeight: "bold",
      boxShadow: "0 2px 8px rgba(168, 212, 0, 0.3)",
    },
    itemsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "20px",
    },
    nutritionItem: {
      padding: "15px",
      backgroundColor: "rgba(26, 26, 46, 0.6)",
      borderRadius: "10px",
      borderTop: "1px solid rgba(168, 212, 0, 0.3)",
      borderRight: "1px solid rgba(168, 212, 0, 0.3)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.3)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.3)",
      transition: "all 0.3s ease",
    },
    itemName: {
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#a8d400",
      fontSize: "16px",
    },
    quantity: {
      color: "#bdc3c7",
      marginBottom: "10px",
      fontSize: "14px",
    },
    nutritionStats: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      fontSize: "13px",
      color: "#bdc3c7",
    },
    statItem: {
      display: "flex",
      justifyContent: "space-between",
    },
    totalNutrition: {
      backgroundImage: "linear-gradient(135deg, rgba(168, 212, 0, 0.2), rgba(139, 195, 74, 0.2))",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px",
      borderTop: "2px solid rgba(168, 212, 0, 0.4)",
      borderRight: "2px solid rgba(168, 212, 0, 0.4)",
      borderBottom: "2px solid rgba(168, 212, 0, 0.4)",
      borderLeft: "2px solid rgba(168, 212, 0, 0.4)",
    },
    totalTitle: {
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#a8d400",
      fontSize: "18px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    totalStats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "15px",
    },
    totalStatItem: {
      textAlign: "center",
      padding: "10px",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: "10px",
    },
    totalStatValue: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#a8d400",
      display: "block",
    },
    totalStatLabel: {
      fontSize: "12px",
      color: "white",
      textTransform: "uppercase",
      marginTop: "5px",
    },
    exerciseItem: {
      padding: "15px",
      backgroundColor: "rgba(26, 26, 46, 0.6)",
      borderRadius: "10px",
      borderTop: "1px solid rgba(168, 212, 0, 0.3)",
      borderRight: "1px solid rgba(168, 212, 0, 0.3)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.3)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.3)",
      marginBottom: "15px",
      transition: "all 0.3s ease",
    },
    exerciseName: {
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#a8d400",
      fontSize: "16px",
    },
    exerciseDetails: {
      display: "flex",
      gap: "20px",
      fontSize: "14px",
      color: "#bdc3c7",
      flexWrap: "wrap",
    },
    exerciseDetail: {
      backgroundColor: "rgba(168, 212, 0, 0.1)",
      padding: "4px 8px",
      borderRadius: "5px",
      borderTop: "1px solid rgba(168, 212, 0, 0.3)",
      borderRight: "1px solid rgba(168, 212, 0, 0.3)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.3)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.3)",
    },
    tags: {
      display: "flex",
      gap: "8px",
      marginTop: "15px",
      flexWrap: "wrap",
    },
    tag: {
      padding: "4px 10px",
      backgroundImage: "linear-gradient(45deg, #a8d400, #8bc34a)",
      borderRadius: "15px",
      fontSize: "12px",
      color: "#1a1a2e",
      fontWeight: "bold",
    },
    progressStats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "20px",
    },
    progressCard: {
      padding: "20px",
      backgroundColor: "rgba(26, 26, 46, 0.6)",
      borderRadius: "15px",
      textAlign: "center",
      borderTop: "2px solid rgba(168, 212, 0, 0.3)",
      borderRight: "2px solid rgba(168, 212, 0, 0.3)",
      borderBottom: "2px solid rgba(168, 212, 0, 0.3)",
      borderLeft: "2px solid rgba(168, 212, 0, 0.3)",
      transition: "all 0.3s ease",
    },
    progressValue: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#a8d400",
      display: "block",
      textShadow: "0 0 10px rgba(168, 212, 0, 0.3)",
    },
    progressLabel: {
      fontSize: "12px",
      color: "#bdc3c7",
      marginTop: "8px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    notes: {
      marginTop: "20px",
      padding: "15px",
      backgroundImage: "linear-gradient(135deg, rgba(243, 156, 18, 0.2), rgba(230, 126, 34, 0.2))",
      borderRadius: "10px",
      fontSize: "14px",
      fontStyle: "italic",
      color: "#f39c12",
      borderTop: "1px solid rgba(243, 156, 18, 0.3)",
      borderRight: "1px solid rgba(243, 156, 18, 0.3)",
      borderBottom: "1px solid rgba(243, 156, 18, 0.3)",
      borderLeft: "1px solid rgba(243, 156, 18, 0.3)",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#bdc3c7",
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "15px",
      borderTop: "1px solid rgba(168, 212, 0, 0.2)",
      borderRight: "1px solid rgba(168, 212, 0, 0.2)",
      borderBottom: "1px solid rgba(168, 212, 0, 0.2)",
      borderLeft: "1px solid rgba(168, 212, 0, 0.2)",
    },
    emptyIcon: {
      fontSize: "48px",
      color: "#a8d400",
      marginBottom: "20px",
      opacity: 0.5,
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "white",
    },
  };

  return (
    <>
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
        <div style={styles.header}>
          <div style={styles.filters}>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullname}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={styles.input}
              placeholder="Filter by date"
            />
          </div>
        </div>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "nutrition"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition Logs ({filteredNutritionLogs.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "workout"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("workout")}
          >
            Workout Logs ({filteredWorkoutLogs.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "progress"
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setActiveTab("progress")}
          >
            Progress Logs ({filteredProgressLogs.length})
          </button>
        </div>

        {activeTab === "nutrition" && (
          <div>
            {filteredNutritionLogs.length === 0 ? (
              <div style={styles.emptyState}>
                <h3>No nutrition logs found</h3>
                <p>No nutrition logs match your current filters.</p>
              </div>
            ) : (
              filteredNutritionLogs.map((log) => {
                const totalNutrition = calculateTotalNutrition(log.items);
                return (
                  <div key={log._id} style={styles.logCard}>
                    <div style={styles.logHeader}>
                      <div>
                        <span style={styles.userName}>{log.user.fullname}</span>
                        <span className="mx-2">{log.mealType}</span>
                      </div>
                      <span style={styles.date}>{formatDate(log.date)}</span>
                    </div>

                    <div style={styles.itemsGrid}>
                      {log.items.map((item, index) => (
                        <div key={index} style={styles.nutritionItem}>
                          <div style={styles.itemName}>{item.name}</div>
                          <div>Quantity: {item.quantity}</div>
                          <div style={styles.nutritionStats}>
                            <div>Calories: {item.calories || 0}</div>
                            <div>Protein: {item.protein || 0}g</div>
                            <div>Carbs: {item.carbs || 0}g</div>
                            <div>Fat: {item.fat || 0}g</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={styles.totalNutrition}>
                      <div style={styles.totalTitle}>Total Nutrition</div>
                      <div style={styles.totalStats}>
                        <div>
                          <strong>Calories:</strong>{" "}
                          {totalNutrition.calories || 0}
                        </div>
                        <div>
                          <strong>Protein:</strong>{" "}
                          {totalNutrition.protein || 0}g
                        </div>
                        <div>
                          <strong>Carbs:</strong> {totalNutrition.carbs || 0}g
                        </div>
                        <div>
                          <strong>Fat:</strong> {totalNutrition.fat || 0}g
                        </div>
                      </div>
                    </div>

                    {log.notes && (
                      <div style={styles.notes}>
                        <strong>Notes:</strong> {log.notes}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "workout" && (
          <div>
            {filteredWorkoutLogs.length === 0 ? (
              <div style={styles.emptyState}>
                <h3>No workout logs found</h3>
                <p>No workout logs match your current filters.</p>
              </div>
            ) : (
              filteredWorkoutLogs.map((log) => (
                <div key={log._id} style={styles.logCard}>
                  <div style={styles.logHeader}>
                    <div>
                      <span style={styles.userName}>{log.user.fullname}</span>
                      <span
                        style={{
                          ...styles.mealType,
                          backgroundColor: "#28a745",
                        }}
                      >
                        {log.type}
                      </span>
                    </div>
                    <span style={styles.date}>{formatDate(log.date)}</span>
                  </div>

                  <h3>{log.title}</h3>

                  {log.exercises.map((exercise, index) => (
                    <div key={index} style={styles.exerciseItem}>
                      <div style={styles.exerciseName}>{exercise.name}</div>
                      <div style={styles.exerciseDetails}>
                        {exercise.sets && <span>Sets: {exercise.sets}</span>}
                        {exercise.reps && <span>Reps: {exercise.reps}</span>}
                        {exercise.weight && (
                          <span>Weight: {exercise.weight}lbs</span>
                        )}
                        {exercise.duration && (
                          <span>Duration: {exercise.duration} min</span>
                        )}
                      </div>
                      {exercise.notes && (
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "5px",
                          }}
                        >
                          {exercise.notes}
                        </div>
                      )}
                    </div>
                  ))}

                  {log.tags && log.tags.length > 0 && (
                    <div style={styles.tags}>
                      {log.tags.map((tag, index) => (
                        <span key={index} style={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "progress" && (
          <div>
            {filteredProgressLogs.length === 0 ? (
              <div style={styles.emptyState}>
                <h3>No progress logs found</h3>
                <p>No progress logs match your current filters.</p>
              </div>
            ) : (
              filteredProgressLogs.map((log) => (
                <div key={log._id} style={styles.logCard}>
                  <div style={styles.logHeader}>
                    <span style={styles.userName}>{log.user.fullname}</span>
                    <span style={styles.date}>{formatDate(log.date)}</span>
                  </div>

                  <div style={styles.progressStats}>
                    <div style={styles.statCard}>
                      <div style={styles.statValue}>{log.weight}</div>
                      <div style={styles.statLabel}>Weight (lbs)</div>
                    </div>

                    {log.measurements.chest && (
                      <div style={styles.statCard}>
                        <div style={styles.statValue}>
                          {log.measurements.chest}
                        </div>
                        <div style={styles.statLabel}>Chest (in)</div>
                      </div>
                    )}

                    {log.measurements.waist && (
                      <div style={styles.statCard}>
                        <div style={styles.statValue}>
                          {log.measurements.waist}
                        </div>
                        <div style={styles.statLabel}>Waist (in)</div>
                      </div>
                    )}

                    {log.measurements.biceps && (
                      <div style={styles.statCard}>
                        <div style={styles.statValue}>
                          {log.measurements.biceps}
                        </div>
                        <div style={styles.statLabel}>Biceps (in)</div>
                      </div>
                    )}

                    {log.performance.runTime && (
                      <div style={styles.statCard}>
                        <div style={styles.statValue}>
                          {log.performance.runTime}
                        </div>
                        <div style={styles.statLabel}>Run Time (min)</div>
                      </div>
                    )}

                    {log.performance.maxLift && (
                      <div style={styles.statCard}>
                        <div style={styles.statValue}>
                          {log.performance.maxLift}
                        </div>
                        <div style={styles.statLabel}>Max Lift (lbs)</div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminLogs;
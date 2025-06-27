import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import axios from "axios";
import { FaCalendarAlt, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:3000";

const ProgressComp = () => {
  const [animateRings, setAnimateRings] = useState(false);
  const [progressLogs, setProgressLogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [goalProgress, setGoalProgress] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchUserAndProgress();
    setAnimateRings(true);
    // eslint-disable-next-line
  }, []);

  // Filtered data based on selectedDate
  const filteredLogs = selectedDate
    ? progressLogs.filter(
        (entry) =>
          new Date(entry.date).toISOString().split("T")[0] === selectedDate
      )
    : progressLogs;

  // Fixed filtering for weekly data
  const filteredWeeklyData = selectedDate
    ? (() => {
        // If a date is selected, show only that specific day's data
        const selectedDateObj = new Date(selectedDate);
        const dayName = selectedDateObj.toLocaleDateString("en-US", { weekday: "short" });
        
        // Find the entry for the selected date
        const entry = progressLogs.find(
          (e) => new Date(e.date).toISOString().split("T")[0] === selectedDate
        );
        
        return [{
          day: dayName,
          weight: entry ? entry.weight : 0,
          runTime: entry ? entry.performance?.runTime || 0 : 0,
          maxLift: entry ? entry.performance?.maxLift || 0 : 0,
        }];
      })()
    : weeklyData;

  const filteredRecentWorkouts = selectedDate
    ? recentWorkouts.filter(
        (entry) =>
          new Date(entry.date).toISOString().split("T")[0] === selectedDate
      )
    : recentWorkouts;

  const filteredStats = selectedDate
    ? [
        { number: filteredLogs.length, label: "Progress Entries" },
        {
          number: (
            filteredLogs.reduce((acc, e) => acc + (e.weight || 0), 0) /
            (filteredLogs.length || 1)
          ).toFixed(1),
          label: "Avg Weight (kg)",
        },
        {
          number: new Set(
            filteredLogs.map((e) => new Date(e.date).toDateString())
          ).size,
          label: "Days Tracked",
        },
        {
          number: (
            filteredLogs.reduce(
              (acc, e) => acc + (e.performance?.maxLift || 0),
              0
            ) / (filteredLogs.length || 1)
          ).toFixed(1),
          label: "Avg Max Lift (kg)",
        },
      ]
    : stats;

  async function fetchUserAndProgress() {
    try {
      const userRes = await axios.get(`${API_URL}/check`, {
        withCredentials: true,
      });
      const userId = userRes.data.user.id;
      setUserId(userId);

      const res = await axios.get(`${API_URL}/progress/fetch/${userId}`, {
        withCredentials: true,
      });

      setProgressLogs(res.data);

      // Ensure correct weekday mapping for each entry (always 7 days, fill missing with nulls)
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        return d;
      });
      
      const weekly = last7Days.map((dateObj) => {
        const entry = res.data.find(
          (e) => new Date(e.date).toDateString() === dateObj.toDateString()
        );
        return {
          day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
          weight: entry ? entry.weight : 0,
          runTime: entry ? entry.performance?.runTime || 0 : 0,
          maxLift: entry ? entry.performance?.maxLift || 0 : 0,
        };
      });
      setWeeklyData(weekly);

      const goals = [
        {
          label: "Weight Goal",
          percentage: Math.min(entryPercentage(res.data, "weight"), 100),
          color: "#d7fb00",
        },
        {
          label: "Cardio Goal",
          percentage: Math.min(entryPercentage(res.data, "runTime"), 100),
          color: "#d7fb00",
        },
        {
          label: "Strength Goal",
          percentage: Math.min(entryPercentage(res.data, "maxLift"), 100),
          color: "#d7fb00",
        },
      ];
      setGoalProgress(goals);

      const recent = res.data.slice(-4).map((item) => ({
        _id: item._id,
        date: new Date(item.date).toDateString(),
        weight: item.weight,
        runTime: item.performance?.runTime,
        maxLift: item.performance?.maxLift,
      }));
      setRecentWorkouts(recent.reverse());

      const stats = [
        { number: res.data.length, label: "Progress Entries" },
        {
          number: (
            res.data.reduce((acc, e) => acc + (e.weight || 0), 0) /
            res.data.length
          ).toFixed(1),
          label: "Avg Weight (kg)",
        },
        {
          number: new Set(res.data.map((e) => new Date(e.date).toDateString()))
            .size,
          label: "Days Tracked",
        },
        {
          number: (
            res.data.reduce(
              (acc, e) => acc + (e.performance?.maxLift || 0),
              0
            ) / res.data.length || 0
          ).toFixed(1),
          label: "Avg Max Lift (kg)",
        },
      ];
      setStats(stats);
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  }

  function entryPercentage(data, key) {
    const values = data
      .map((d) => d[key] || (d.performance && d.performance[key]) || 0)
      .filter((v) => v > 0);
    if (!values.length) return 0;
    const max = Math.max(...values);
    const latest = values[values.length - 1];
    return (latest / max) * 100;
  }

  async function deleteData(delid) {
    try {
      await axios.delete(`${API_URL}/progress/deleteProgress/${delid}`, {
        withCredentials: true,
      });
      fetchUserAndProgress(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting progress:", error);
    }
  }

  const ProgressRing = ({ percentage, label, index }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const formattedPercentage = Number(percentage).toFixed(1);
    const strokeDashoffset =
      circumference - (formattedPercentage / 100) * circumference;

    return (
      <div className="ring-container">
        <div className="progress-ring">
          <svg width="120" height="120">
            <circle
              className="ring-background"
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
            />
            <circle
              className="ring-progress"
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#d7fb00"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animateRings ? strokeDashoffset : circumference}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                transition: `stroke-dashoffset 1s ease ${index * 0.3}s`,
              }}
            />
          </svg>
          <div className="ring-text">{formattedPercentage}%</div>
        </div>
        <div className="ring-label">{label}</div>
      </div>
    );
  };

  const StatCard = ({ stat, index }) => (
    <div className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="stat-number h6">{stat.number}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );

  const WorkoutItem = ({ workout, index }) => (
    <div className="workout-item" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="workout-date">{workout.date}</div>
      <div className="workout-stats d-flex align-items-center justify-content-between">
        <div>Weight: {workout.weight} kg</div>
        <span>
          Run: {workout.runTime} min | Lift: {workout.maxLift} kg
        </span>
        <Link
          to={`/edit-progress/${workout._id}`}
          className="btn btn-edit me-2 p-2"
        >
          <FaEdit />
        </Link>
        <button
          className="btn btn-delete p-2"
          onClick={() => deleteData(workout._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          {payload.map((entry, idx) => (
            <p key={idx} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container my-5">
      <div className="header-section row my-5 align-items-center">
        <div className="col-md-9">
          <div className="control-card p-3 d-flex align-items-center">
            <FaCalendarAlt className="text-success me-2" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="custom-input flex-grow-1"
            />
          </div>
        </div>
        <div className="col-md-3 text-md-end py-4">
          <Link to="/add-progress" className="btn-default">
            <FaPlus className="me-2" />
            Add Progress
          </Link>
        </div>
      </div>

      <div className="stats-overview">
        {filteredStats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3 className="chart-title">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredWeeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="day" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="weight" fill="#d7fb00" name="Weight (kg)" />
              <Bar dataKey="runTime" fill="#ffffff" name="Run Time (min)" />
              <Bar dataKey="maxLift" fill="#2196F3" name="Max Lift (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Goal Progress</h3>
          <div className="progress-rings">
            {goalProgress.map((goal, index) => (
              <ProgressRing
                key={index}
                percentage={goal.percentage}
                label={goal.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="workout-history">
        <h3 className="chart-title">Recent Entries</h3>
        {filteredRecentWorkouts.map((workout, index) => (
          <WorkoutItem key={index} workout={workout} index={index} />
        ))}
      </div>

      <div className="action-buttons">
        <Link to={"/workouts"} className="btn-default btn-highlighted">
          Start New Workout
        </Link>
      </div>
    </div>
  );
};

export default ProgressComp;
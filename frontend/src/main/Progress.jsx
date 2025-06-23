import React, { useState, useEffect } from "react";
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
import "../assets/css/Progress.css";
import Scrollingsticker from "./components/Scrollingsticker";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Progress = () => {
  const API_URL = "http://localhost:3000";
  const [animateRings, setAnimateRings] = useState(false);
  const [progressLogs, setProgressLogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [goalProgress, setGoalProgress] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
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

        const weekly = res.data.slice(-7).map((entry) => ({
          day: new Date(entry.date).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          weight: entry.weight,
          runTime: entry.performance?.runTime || 0,
          maxLift: entry.performance?.maxLift || 0,
        }));
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
            number: new Set(
              res.data.map((e) => new Date(e.date).toDateString())
            ).size,
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

    fetchUserAndProgress();
    setAnimateRings(true);
  }, []);

  const ProgressRing = ({ percentage, label, index }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
          <div className="ring-text">{percentage}%</div>
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
      <div className="workout-info">
        <div className="workout-name">Progress Entry</div>
        <div className="workout-date">{workout.date}</div>
      </div>
      <div className="workout-stats d-flex align-items-center justify-content-between">
        <div>Weight: {workout.weight} kg</div>
        <div>
          Run: {workout.runTime} min | Lift: {workout.maxLift} kg
        </div>
        <Link to={`/edit-progress/${userId}`} className="btn btn-edit me-2 p-2">
          <FaEdit />
        </Link>
        <Link to={`/delete-progress/${userId}`} className="btn btn-delete p-2">
          <FaTrash />
        </Link>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Progress/<span>Analytics</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Progress
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <div className="fitness-analytics">
        <div className="container">
          <div className="header">
            <p className="subtitle mt-lg-2">Track Your Fitness Journey</p>
          </div>

          <div className="stats-overview">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          <div className="charts-section">
            <div className="chart-container">
              <h3 className="chart-title">Weekly Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
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
            {recentWorkouts.map((workout, index) => (
              <WorkoutItem key={index} workout={workout} index={index} />
            ))}
          </div>

          <div className="action-buttons">
            <Link to={"/workouts"} className="btn-default btn-highlighted">
              Start New Workout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;

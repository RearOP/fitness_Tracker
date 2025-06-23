import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
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
const Progress = () => {
  const [animateRings, setAnimateRings] = useState(false);

  const weeklyData = [
    { day: "Mon", calories: 280, duration: 35 },
    { day: "Tue", calories: 320, duration: 45 },
    { day: "Wed", calories: 180, duration: 25 },
    { day: "Thu", calories: 390, duration: 50 },
    { day: "Fri", calories: 450, duration: 60 },
    { day: "Sat", calories: 310, duration: 40 },
    { day: "Sun", calories: 280, duration: 35 },
  ];

  const goalProgress = [
    { label: "Weight Goal", percentage: 80, color: "#d7fb00" },
    { label: "Cardio Goal", percentage: 70, color: "#d7fb00" },
    { label: "Strength Goal", percentage: 90, color: "#d7fb00" },
  ];

  const recentWorkouts = [
    {
      name: "Upper Body Strength",
      date: "June 19, 2025",
      duration: "45 min",
      calories: "320 cal",
    },
    {
      name: "HIIT Cardio",
      date: "June 18, 2025",
      duration: "30 min",
      calories: "280 cal",
    },
    {
      name: "Full Body Circuit",
      date: "June 16, 2025",
      duration: "50 min",
      calories: "380 cal",
    },
    {
      name: "Yoga & Flexibility",
      date: "June 15, 2025",
      duration: "35 min",
      calories: "150 cal",
    },
  ];

  const stats = [
    { number: "156", label: "Workouts Completed" },
    { number: "2,840", label: "Calories Burned" },
    { number: "45", label: "Days Active" },
    { number: "18.5", label: "Avg Session (min)" },
  ];

  useEffect(() => {
    setAnimateRings(true);

    // Create floating particles
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 6,
          duration: Math.random() * 4 + 4,
        });
      }
      return particles;
    };

    const particles = createParticles();
    // You could set particles to state if needed for rendering
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
                transition: `stroke-dashoffset 1s ease ${index * 0.3}s`
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
      <div className="stat-number">{stat.number}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );

  const WorkoutItem = ({ workout, index }) => (
    <div className="workout-item" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="workout-info">
        <div className="workout-name">{workout.name}</div>
        <div className="workout-date">{workout.date}</div>
      </div>
      <div className="workout-stats">
        <div className="workout-duration">{workout.duration}</div>
        <div className="workout-calories">{workout.calories}</div>
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
              {`${entry.dataKey}: ${entry.value}${
                entry.dataKey === "calories" ? " cal" : " min"
              }`}
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
                <LineChart data={weeklyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  <XAxis dataKey="day" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#d7fb00"
                    strokeWidth={3}
                    dot={{ fill: "#d7fb00", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#ffffff", strokeWidth: 2 }}
                    name="Calories Burned"
                  />
                  <Line
                    type="monotone"
                    dataKey="duration"
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={{ fill: "#ffffff", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#d7fb00", strokeWidth: 2 }}
                    name="Duration (min)"
                  />
                </LineChart>
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
            <h3 className="chart-title">Recent Workouts</h3>
            {recentWorkouts.map((workout, index) => (
              <WorkoutItem key={index} workout={workout} index={index} />
            ))}
          </div>

          <div className="action-buttons">
            <Link to={"/workouts"}
              className="btn-default btn-highlighted"
            >
              Start New Workout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;

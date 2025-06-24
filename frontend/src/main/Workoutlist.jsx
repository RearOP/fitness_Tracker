import { useState, React, useEffect } from "react";
import Scrollingsticker from "./components/Scrollingsticker";
import "../assets/css/Workoutcard.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Workoutlist() {
  const [workouts, setWorkouts] = useState([]);
  let API_URL = "http://localhost:3000";

  async function getworkout() {
    const res = await axios.get(`${API_URL}/workouts/viewWorkout`, {
      withCredentials: true,
    });
    // console.log(res.data);
    setWorkouts(res.data);
  }

  useEffect(() => {
    getworkout();
  }, []);

  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Workout <span>List</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Workouts
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
        <div className="row">
          <div className="d-flex" style={{justifyContent:"flex-end"}}>
            <Link to="/add-workout" className="btn-default">
              Add Workout
            </Link>
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          {workouts.map((item, index) => {
            const dateObj = new Date(item.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("default", { month: "short" });
            const year = dateObj.getFullYear();

            // Calculate total duration or total sets from exercises
            const totalDuration = item.exercises.reduce(
              (sum, ex) => sum + (ex.duration || 0),
              0
            );
            const totalSets = item.exercises.reduce(
              (sum, ex) => sum + (ex.sets || 0),
              0
            );

            return (
              <div key={index} className="card">
                <div className="wrapper war">
                  <div className="header">
                    <div className="date">
                      <span className="day" style={{ marginRight: "0.5rem" }}>
                        {day}
                      </span>
                      <span className="month" style={{ marginRight: "0.5rem" }}>
                        {month}
                      </span>
                      <span className="year">{year}</span>
                    </div>
                    <div
                      className="difficulty-badge"
                      style={{ borderColor: "#4CAF50" }}
                    >
                      {item.type}
                    </div>
                  </div>

                  <div className="data">
                    <div className="content">
                      <span className="author">Your Workout Plan</span>
                      <h1 className="title">
                        <Link to={`/workout-details/${item._id}`}>
                          {item.title}
                        </Link>
                      </h1>

                      <div className="workout-stats">
                        <div className="stat-item">
                          <span className="stat-label">Total Duration</span>
                          <span className="stat-value">
                            {totalDuration} min
                          </span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Total Sets</span>
                          <span className="stat-value">{totalSets}</span>
                        </div>
                      </div>

                      <p className="text">
                        {item.exercises[0]?.notes || "No notes available."}
                      </p>

                      <Link
                        to={`/workout-details/${item._id}`}
                        className="button"
                      >
                        View Workout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

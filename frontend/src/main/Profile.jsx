import React, { useState, useEffect } from "react";
import "../assets/css/Profile.css";
import Scrollingsticker from "./components/Scrollingsticker";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 
import ProgressComp from "./components/ProgressComp";
import NutritionComp from "./components/NutritionComp";

const Profile = () => {
  const API_URL = "http://localhost:3000";
  // State management
  const [activeTab, setActiveTab] = useState("Workouts");
  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [coverImage, setCoverImage] = useState();
  const [profilePic, setProfilePic] = useState();
  const [showModal, setShowModal] = useState({ show: false, image: "" });

  const [workouts, setWorkouts] = useState([]);

  const tabs = ["Workouts", "Nutritions", "Progress"];

  // Handlers
  const handleNameSubmit = async () => {
    try {
      if (!nameError) {
        setShowName(false);
      }

      const payload = {
        fullname: name,
        // email: email,
      };

      await axios.post(`${API_URL}/profile/updateName`, payload, {
        withCredentials: true,
      });

      console.log("data submitted name");
    } catch (err) {
      console.error("Error saving Input data to backend:", err.message);
    }
  };

  const handleEmailSubmit = async () => {
    try {
      if (!emailError) {
        setShowEmail(false);
      }

      const payload = {
        // fullname: name,
        email: email,
      };

      await axios.post(`${API_URL}/profile/updateEmail`, payload, {
        withCredentials: true,
      });

      console.log("data submitted email");
    } catch (err) {
      console.error("Error saving Input data to backend:", err.message);
    }
  };

  const handleImageUpload = async (e, type = "profile") => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result;

        // Update UI
        if (type === "cover") {
          setCoverImage(base64Image);
          setUser((prevUser) => ({
            ...prevUser,
            backgroundImage: base64Image,
          }));
        } else {
          setProfilePic(base64Image);
          setUser((prevUser) => ({
            ...prevUser,
            profileImage: base64Image,
          }));
        }

        // Build fresh FormData for each request
        const formData = new FormData();
        formData.append("image", file);
        formData.append("type", type);
        // formData.append("fullname", user.fullname || name);
        // formData.append("email", user.email || email);

        try {
          await axios.post(`${API_URL}/profile/updateProfile`, formData, {
            withCredentials: true,
          });
          // console.log("Image uploaded and saved successfully");
        } catch (err) {
          console.error("Error saving image to backend:", err.message);
        }
      };
      reader.readAsDataURL(file); // Just for preview
    }
  };

  // Debounced Name Change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (name && name.length > 0 && name.length < 3) {
        setNameError("Name must be at least 3 characters");
      } else {
        setNameError("");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [name]);
  // Debounced Email Change
  useEffect(() => {
    const timer = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email");
      } else {
        setEmailError("");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [email]);

  // show dynamic data of logged in user
  const fetchUserDataAndgetworkout = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile/users`, {
        withCredentials: true,
      });
      setUser(res.data);
      setName(res.data.fullname);
      setEmail(res.data.email);
      let userId = res.data._id;

      const workRes = await axios.get(
        `${API_URL}/workouts/userWorkout/${userId}`,
        {
          withCredentials: true,
        }
      );
      // Ensure workRes.data is an array
      setWorkouts(Array.isArray(workRes.data) ? workRes.data : []);
    } catch (err) {
      console.error("user not logged in", err);
      setWorkouts([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    fetchUserDataAndgetworkout();
  }, []);

  async function deleteData(delid) {
    const del = await axios.delete(
      `${API_URL}/workouts/deleteworkouts/${delid}`,
      {
        withCredentials: true,
      }
    );
    fetchUserDataAndgetworkout();
  }

  const CameraIcon = () => (
    <svg
      style={{ width: "20px", height: "20px", color: "#6b7280" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0017.07 7H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9z"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  );

  const EditIcon = () => (
    <svg
      style={{
        width: "16px",
        height: "16px",
        cursor: "pointer",
        color: "#6b7280",
      }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      ></path>
    </svg>
  );
  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  profile
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      profile
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <div className="profile-container">
        <div className="max-width">
          {/* Cover Image */}
          <div className="cover-section">
            <img
              src={coverImage || user.backgroundImage}
              alt="Cover"
              className="cover-image"
              onClick={() =>
                setShowModal({
                  show: true,
                  image: coverImage || user.backgroundImage,
                })
              }
            />
            <label className="camera-btn">
              <CameraIcon />
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, "cover")}
                className="hidden"
              />
            </label>

            {/* Profile Picture */}
            <div className="profile-section">
              <div className="profile-pic-container">
                <img
                  src={profilePic || user.profilePic}
                  alt="Profile"
                  className="profile-pic"
                  onClick={() =>
                    setShowModal({
                      show: true,
                      image: profilePic || user.profilePic,
                    })
                  }
                />
                <label className="camera-btn">
                  <CameraIcon />
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "profile")}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="profile-info">
                {/* Name Field */}
                <div className="input-section">
                  <div className="input-section">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleNameSubmit(); // No need to pass `e` or `values`
                      }}
                    >
                      <input
                        className={
                          showName ? "name-input-editing" : "name-input"
                        }
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!showName}
                      />
                      {showName && <button className="save-btn">Save</button>}
                    </form>
                  </div>
                  {!showName && (
                    <div onClick={() => setShowName(true)}>
                      <EditIcon />
                    </div>
                  )}
                </div>
                {nameError && <div className="error-message">{nameError}</div>}

                {/* Email Field */}
                <div className="input-section">
                  <div className="input-section">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEmailSubmit(); // No need to pass `e` or `values`
                      }}
                    >
                      <input
                        type="email"
                        className={
                          showEmail ? "email-input-editing" : "email-input"
                        }
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!showEmail}
                        aria-label="Email"
                        aria-invalid={!!emailError}
                      />
                      {showEmail && <button className="save-btn">Save</button>}
                    </form>
                  </div>
                  {!showEmail && (
                    <div onClick={() => setShowEmail(true)}>
                      <EditIcon />
                    </div>
                  )}
                </div>
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>
            </div>
          </div>

          {/* Modal */}
          {showModal.show && (
            <div
              className="modal"
              onClick={() => setShowModal({ show: false, image: "" })}
            >
              <div style={{ position: "relative" }}>
                <button
                  className="modal-close"
                  onClick={() => setShowModal({ show: false, image: "" })}
                >
                  ×
                </button>
                <img
                  src={showModal.image}
                  alt="Modal"
                  className="modal-image"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab ? "tab-button-active" : "tab-button"
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

          {/* Tab Content */}
          {activeTab === "Workouts" ? (
            <>
              {/* workouts Grid */}
              <div className="container my-5">
                <div className="row">
                  <div
                    className="d-flex"
                    style={{ justifyContent: "flex-end" }}
                  >
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
                  {workouts && workouts.length > 0 ? (
                    workouts.map((item, index) => {
                      const dateObj = new Date(item.date);
                      const day = dateObj.getDate();
                      const month = dateObj.toLocaleString("default", {
                        month: "short",
                      });
                      const year = dateObj.getFullYear();

                      // Calculate total duration or total sets from exercises
                      const totalDuration =
                        item.exercises?.reduce(
                          (sum, ex) => sum + (ex.duration || 0),
                          0
                        ) || 0;
                      const totalSets =
                        item.exercises?.reduce(
                          (sum, ex) => sum + (ex.sets || 0),
                          0
                        ) || 0;

                      return (
                        <div key={index} className="card">
                          <div className="wrapper war">
                            <div className="header">
                              <div className="date">
                                <span
                                  className="day"
                                  style={{ marginRight: "0.5rem" }}
                                >
                                  {day}
                                </span>
                                <span
                                  className="month"
                                  style={{ marginRight: "0.5rem" }}
                                >
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
                                <span className="author">
                                  Your Workout Plan
                                </span>
                                <h1 className="title">
                                  <Link to={`/workout-details/${item._id}`}>
                                    {item.title}
                                  </Link>
                                </h1>

                                <div className="workout-stats">
                                  <div className="stat-item">
                                    <span className="stat-label">
                                      Total Duration
                                    </span>
                                    <span className="stat-value">
                                      {totalDuration} min
                                    </span>
                                  </div>
                                  <div className="stat-item">
                                    <span className="stat-label">
                                      Total Sets
                                    </span>
                                    <span className="stat-value">
                                      {totalSets}
                                    </span>
                                  </div>
                                </div>

                                <p className="text">
                                  {item.exercises?.[0]?.notes ||
                                    "No notes available."}
                                </p>
                                <div className="d-flex gap-3">
                                  <Link
                                    to={`/workout-details/${item._id}`}
                                    className="button"
                                  >
                                    View Workout
                                  </Link>
                                  <Link
                                    to={`/edit-workout/${item._id}`}
                                    className="button"
                                  >
                                    Edit Workout
                                  </Link>
                                  <button
                                    onClick={() => deleteData(item._id)}
                                    className="btn btn-delete p-2"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-workouts">
                      <p>
                        No workouts found. Start by adding your first workout!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : activeTab === "Nutritions" ? (
            <div className="tab-content my-5">
              <NutritionComp/>
            </div>
          ) : activeTab === "Progress" ? (
            <div className="tab-content my-5">
              <ProgressComp/>
            </div>
          ) : null}
      </div>
    </>
  );
};

export default Profile;

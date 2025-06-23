import React, { useState, useEffect } from "react";
import "../assets/css/Profile.css";
import Scrollingsticker from "./components/Scrollingsticker";
import axios from "axios";
const Profile = () => {
  const API_URL = "http://localhost:3000";
  // State management
  const [activeTab, setActiveTab] = useState("Recipes");
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

  const tabs = ["Recipes", "Favorites", "Collections", "Following"];

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      title: "Delicious Pasta",
      description:
        "A mouth-watering pasta dish with fresh ingredients and aromatic herbs.",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Gourmet Pizza",
      description:
        "Crispy crust topped with premium ingredients and melted cheese.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Fresh Salad",
      description:
        "A healthy mix of greens, vegetables, and a light vinaigrette dressing.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Spicy Burger",
      description:
        "Juicy beef patty with spicy sauce and fresh toppings on a toasted bun.",
      image:
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=200&fit=crop",
    },
  ];
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
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile/users`, {
        withCredentials: true,
      });
      setUser(res.data);
      setName(res.data.fullname);
      setEmail(res.data.email);
    } catch (err) {
      console.error("user not logged in", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
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

          {/* Recipes Grid */}
          {/* <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaClock,
  FaBullseye,
  FaBolt,
  FaFire,
  FaDumbbell,
} from "react-icons/fa";
import { GiMuscleUp, GiWheat, GiDroplets } from "react-icons/gi";
import { MdFitnessCenter, MdRestaurant } from "react-icons/md";
import { Link } from "react-router-dom";

import "../assets/css/Shownutritions.css";
import Scrollingsticker from "./components/Scrollingsticker";
import axios from "axios";

const ShowNutritionLog = () => {
  const API_URL = "http://localhost:3000";
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [userId, setUserId] = useState();
  async function fetch_User() {
    const newRes = await axios.get(`${API_URL}/check`, {
      withCredentials: true,
    });
    setUserId(newRes.data.user.id);
    // console.log(newRes.data.user.id);
  }

  async function fetch_nutritions() {
    if (!userId) return;
    const res = await axios.get(`${API_URL}/nutritions/fetch/${userId}`, {
      withCredentials: true,
    });
    setNutritionLogs(res.data);
    // console.log(res.data);
  }
  useEffect(() => {
    fetch_User();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch_nutritions();
    }
  }, [userId]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMealType, setSelectedMealType] = useState("all");

  // Filter logs based on selected date and meal type
  const filteredLogs = nutritionLogs.filter((log) => {
    const logDate = new Date(log.date).toISOString().split("T")[0];
    const dateMatch = logDate === selectedDate;
    const mealMatch =
      selectedMealType === "all" || log.mealType === selectedMealType;
    return dateMatch && mealMatch;
  });

  // Calculate daily totals
  const dailyTotals = filteredLogs.reduce(
    (totals, log) => {
      const logTotals = log.items.reduce(
        (itemTotals, item) => ({
          calories: itemTotals.calories + (item.calories || 0),
          protein: itemTotals.protein + (item.protein || 0),
          carbs: itemTotals.carbs + (item.carbs || 0),
          fat: itemTotals.fat + (item.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );

      return {
        calories: totals.calories + logTotals.calories,
        protein: totals.protein + logTotals.protein,
        carbs: totals.carbs + logTotals.carbs,
        fat: totals.fat + logTotals.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return "🌅";
      case "lunch":
        return "☀️";
      case "dinner":
        return "🌙";
      case "snack":
        return "🍎";
      default:
        return "🍽️";
    }
  };

  const formatMealType = (mealType) => {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  };

  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Nutrition <span>Log</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Nutrition <span>Log</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <div className="nutrition-body">
        <div className="container py-4">
          {/* Controls */}
          <div className="row mb-4">
            <div className="col-md-12 text-md-end py-4">
              <Link to="/add-nutrition" className="btn-default">
                <FaPlus className="me-2" />
                Add Meal
              </Link>
            </div>
            <div className="col-md-6 mb-3 mb-md-0">
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
            <div className="col-md-6">
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="form-select custom-select"
              >
                <option value="all">All Meals</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>

          {/* Daily Summary */}
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="summary-card calories-card p-4">
                <div className="d-flex align-items-center">
                  <div className="icon-bg me-3">
                    <FaFire size={24} style={{ color: "#84cc16" }} />
                  </div>
                  <div>
                    <p className=" small mb-1">Total Calories</p>
                    <h3 className="fw-bold mb-0" style={{ color: "#84cc16" }}>
                      {dailyTotals.calories}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div className="summary-card protein-card p-4">
                <div className="d-flex align-items-center">
                  <div className="icon-bg me-3">
                    <GiMuscleUp size={24} style={{ color: "#3b82f6" }} />
                  </div>
                  <div>
                    <p className="  small mb-1">Protein</p>
                    <h3 className="fw-bold mb-0" style={{ color: "#3b82f6" }}>
                      {dailyTotals.protein}g
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div className="summary-card carbs-card p-4">
                <div className="d-flex align-items-center">
                  <div className="icon-bg me-3">
                    <GiWheat size={24} style={{ color: "#fb923c" }} />
                  </div>
                  <div>
                    <p className="  small mb-1">Carbs</p>
                    <h3 className="fw-bold mb-0" style={{ color: "#fb923c" }}>
                      {dailyTotals.carbs}g
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div className="summary-card fat-card p-4">
                <div className="d-flex align-items-center">
                  <div className="icon-bg me-3">
                    <GiDroplets size={24} style={{ color: "#a855f7" }} />
                  </div>
                  <div>
                    <p className="  small mb-1">Fat</p>
                    <h3 className="fw-bold mb-0" style={{ color: "#a855f7" }}>
                      {dailyTotals.fat}g
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Logs */}
          <div className="row">
            <div className="col-12">
              {filteredLogs.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <MdRestaurant />
                  </div>
                  <h3 className="  mb-2">No meals logged</h3>
                  <p className=" ">
                    Start tracking your nutrition by adding your first meal!
                  </p>
                </div>
              ) : (
                filteredLogs.map((log) => {
                  const mealTotals = log.items.reduce(
                    (totals, item) => ({
                      calories: totals.calories + (item.calories || 0),
                      protein: totals.protein + (item.protein || 0),
                      carbs: totals.carbs + (item.carbs || 0),
                      fat: totals.fat + (item.fat || 0),
                    }),
                    { calories: 0, protein: 0, carbs: 0, fat: 0 }
                  );

                  return (
                    <div key={log._id} className="meal-card mb-4">
                      {/* Meal Header */}
                      <div className="meal-header p-4">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center">
                              <div
                                className="me-3"
                                style={{ fontSize: "2rem" }}
                              >
                                {getMealIcon(log.mealType)}
                              </div>
                              <div>
                                <h4
                                  className="fw-bold mb-1"
                                  style={{ color: "#84cc16" }}
                                >
                                  {formatMealType(log.mealType)}
                                </h4>
                                <div className="d-flex align-items-center   small">
                                  <FaClock className="me-2" />
                                  {new Date(log.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-md-end mt-3 mt-md-0">
                            <button className="btn btn-edit me-2 p-2">
                              <FaEdit />
                            </button>
                            <button className="btn btn-delete p-2">
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        {/* Meal Totals */}
                        <div className="row mt-4 meal-totals">
                          <div className="col-3 text-center">
                            <h4
                              className="fw-bold mb-0"
                              style={{ color: "#84cc16" }}
                            >
                              {mealTotals.calories}
                            </h4>
                            <small className=" ">Calories</small>
                          </div>
                          <div className="col-3 text-center">
                            <h4
                              className="fw-bold mb-0"
                              style={{ color: "#3b82f6" }}
                            >
                              {mealTotals.protein}g
                            </h4>
                            <small className=" ">Protein</small>
                          </div>
                          <div className="col-3 text-center">
                            <h4
                              className="fw-bold mb-0"
                              style={{ color: "#fb923c" }}
                            >
                              {mealTotals.carbs}g
                            </h4>
                            <small className=" ">Carbs</small>
                          </div>
                          <div className="col-3 text-center">
                            <h4
                              className="fw-bold mb-0"
                              style={{ color: "#a855f7" }}
                            >
                              {mealTotals.fat}g
                            </h4>
                            <small className=" ">Fat</small>
                          </div>
                        </div>
                      </div>

                      {/* Food Items */}
                      <div className="p-4">
                        {log.items.map((item, index) => (
                          <div key={index} className="food-item p-3 mb-3">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <h6 className="fw-semibold mb-1">
                                  {item.name}
                                </h6>
                                <small className=" ">{item.quantity}</small>
                              </div>
                              <div className="col-md-8">
                                <div className="row text-center">
                                  <div className="col-3">
                                    <div
                                      className="fw-semibold"
                                      style={{ color: "#84cc16" }}
                                    >
                                      {item.calories || 0}
                                    </div>
                                    <small className=" ">cal</small>
                                  </div>
                                  <div className="col-3">
                                    <div
                                      className="fw-semibold"
                                      style={{ color: "#3b82f6" }}
                                    >
                                      {item.protein || 0}g
                                    </div>
                                    <small className=" ">pro</small>
                                  </div>
                                  <div className="col-3">
                                    <div
                                      className="fw-semibold"
                                      style={{ color: "#fb923c" }}
                                    >
                                      {item.carbs || 0}g
                                    </div>
                                    <small className=" ">car</small>
                                  </div>
                                  <div className="col-3">
                                    <div
                                      className="fw-semibold"
                                      style={{ color: "#a855f7" }}
                                    >
                                      {item.fat || 0}g
                                    </div>
                                    <small className=" ">fat</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Notes */}
                        {log.notes && (
                          <div className="notes-section p-3 mt-3">
                            <p className="mb-0 small">
                              <span
                                className="fw-semibold"
                                style={{ color: "#84cc16" }}
                              >
                                Note:
                              </span>
                              <span className="text-light">{log.notes}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowNutritionLog;

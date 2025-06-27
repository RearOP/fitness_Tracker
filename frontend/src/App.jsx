import { useState } from "react";
import Header from "./main/components/Header";
import Footer from "./main/components/Footer";
import IndexPage from "./main/IndexPage";
import Loader from "./main/components/Loader";
import { Route, Routes } from "react-router-dom";
import Aboutus from "./main/Aboutus";
import Services from "./main/Services";
import Contactus from "./main/Contactus";
import Profile from "./main/Profile";
import Error from "./main/Error";
import SignIn from "./main/SignIn";
import Signup from "./main/Signup";
import Workoutlist from "./main/Workoutlist";
import WorkoutDetails from "./main/WorkoutDetails";
import AddWorkout from "./main/AddWorkout";
import EditWorkout from "./main/EditWorkout";
import PrivateRoutes from "./main/Private";
import Nutrition from "./main/ShowNutritionLog";
import AddNutrition from "./main/NutritionLog";
import Progress from "./main/Progress";
import EditProgress from "./main/EditProgress";

import AdminDashboard from "./main/admin/AdminDashboard";
import AdminWorkouts from "./main/admin/AdminWorkouts";
import AdminLogs from "./main/admin/AdminLogs";
import AdminAnalytics from "./main/admin/AdminAnalytics";
import AdminUsers from "./main/admin/AdminUsers";
import AdminModeration from "./main/admin/AdminModeration";
import AdminInbox from "./main/admin/AdminInbox";
import InsertProgress from "./main/InsertProgress";

function App() {
  return (
    <>
      {/* <Loader /> */}
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<IndexPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contactus />} />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/workouts"
          element={
            <PrivateRoutes>
              <Workoutlist />
            </PrivateRoutes>
          }
        />
        <Route
          path="/workout-details/:id"
          element={
            <PrivateRoutes>
              <WorkoutDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add-workout"
          element={
            <PrivateRoutes>
              <AddWorkout />
            </PrivateRoutes>
          }
        />
        <Route
          path="/edit-workout/:id"
          element={
            <PrivateRoutes>
              <EditWorkout />
            </PrivateRoutes>
          }
        />
        <Route
          path="/nutrition"
          element={
            <PrivateRoutes>
              <Nutrition />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add-nutrition"
          element={
            <PrivateRoutes>
              <AddNutrition />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add-progress"
          element={
            <PrivateRoutes>
              <InsertProgress />
            </PrivateRoutes>
          }
        />
        <Route
          path="/edit-progress/:id"
          element={
            <PrivateRoutes>
              <EditProgress />
            </PrivateRoutes>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoutes>
              <Progress />
            </PrivateRoutes>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoutes>
              <AdminDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/workouts"
          element={
            <PrivateRoutes>
              <AdminWorkouts />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/logs"
          element={
            <PrivateRoutes>
              <AdminLogs />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <PrivateRoutes>
              <AdminAnalytics />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoutes>
              <AdminUsers />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <PrivateRoutes>
              <AdminModeration />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/inbox"
          element={
            <PrivateRoutes>
              <AdminInbox />
            </PrivateRoutes>
          }
        />

        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

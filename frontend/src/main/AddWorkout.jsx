import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Scrollingsticker from "./components/Scrollingsticker";
import { ToastContainer, toast, Bounce } from "react-toastify";

const initialValues = {
  title: "",
  type: "",
  exercises: [
    {
      name: "",
      sets: "",
      reps: "",
      weight: "",
      duration: "",
      notes: "",
    },
  ],
  tags: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  type: Yup.string()
    .oneOf(["strength", "cardio", "flexibility", "other"])
    .required("Type is required"),
  exercises: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Exercise name is required"),
      sets: Yup.number().nullable(),
      reps: Yup.number().nullable(),
      weight: Yup.number().nullable(),
      duration: Yup.number().nullable(),
      notes: Yup.string().nullable(),
    })
  ),
  tags: Yup.array().of(Yup.string()),
});

const AddWorkout = () => {
  let API_URL = "http://localhost:3000/";
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(`${API_URL}workouts/add-workout`, values, {
        withCredentials: true,
      });
      if (res) {
        toast.success("Workout created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        resetForm();
      }
    } catch (err) {
      console.error("Failed to save workout", err.response.data);
      toast.error("Failed to save workout something is wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Add <span>Workout</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Add Workout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <div className="page-contact-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="contact-us-content">
                <div className="section-title">
                  <div className="section-bg-title">
                    <span>Add / Edit Workout</span>
                  </div>
                  <h2 className="text-anime-style-2">
                    Manage your <span>Workout</span>
                  </h2>
                </div>
                <div className="contact-form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <div className="form-group mb-4">
                          <Field
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Workout Title"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-4">
                          <Field
                            as="select"
                            name="type"
                            className="form-control"
                          >
                            <option value="" className="bg-dark">
                              Select Workout Type
                            </option>
                            <option value="strength" className="bg-dark">
                              Strength
                            </option>
                            <option value="cardio" className="bg-dark">
                              Cardio
                            </option>
                            <option value="flexibility" className="bg-dark">
                              Flexibility
                            </option>
                            <option value="other" className="bg-dark">
                              Other
                            </option>
                          </Field>
                          <ErrorMessage
                            name="type"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        {values.exercises.map((exercise, index) => (
                          <div key={index} className="mb-4 border p-3">
                            <Field
                              name={`exercises[${index}].name`}
                              className="form-control mb-2"
                              placeholder="Exercise Name"
                            />
                            <Field
                              name={`exercises[${index}].sets`}
                              type="number"
                              className="form-control mb-2"
                              placeholder="Sets"
                            />
                            <Field
                              name={`exercises[${index}].reps`}
                              type="number"
                              className="form-control mb-2"
                              placeholder="Reps"
                            />
                            <Field
                              name={`exercises[${index}].weight`}
                              type="number"
                              className="form-control mb-2"
                              placeholder="Weight (kg)"
                            />
                            <Field
                              name={`exercises[${index}].duration`}
                              type="number"
                              className="form-control mb-2"
                              placeholder="Duration (min)"
                            />
                            <Field
                              name={`exercises[${index}].notes`}
                              className="form-control mb-2"
                              placeholder="Notes"
                            />
                          </div>
                        ))}

                        <div className="mb-4">
                          <button
                            type="button"
                            className="btn-default"
                            onClick={() =>
                              setFieldValue("exercises", [
                                ...values.exercises,
                                {
                                  name: "",
                                  sets: "",
                                  reps: "",
                                  weight: "",
                                  duration: "",
                                  notes: "",
                                },
                              ])
                            }
                          >
                            + Add Exercise
                          </button>
                        </div>

                        <div className="form-group mb-4">
                          <Field
                            type="text"
                            name="tags"
                            className="form-control"
                            placeholder="Tags (comma-separated)"
                            onChange={(e) => {
                              const tagArray = e.target.value
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter((tag) => tag.length > 0);
                              setFieldValue("tags", tagArray);
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn-default btn-highlighted"
                          >
                            Submit Workout
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkout;

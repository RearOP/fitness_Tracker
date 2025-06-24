import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string().required("Workout name is required"),
  type: Yup.string().required("type is required"),
  exercises: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Exercise name is required"),
      sets: Yup.number().required("Sets are required"),
      reps: Yup.number().required("Reps are required"),
      weight: Yup.number().nullable(),
      notes: Yup.string().nullable(),
    })
  ),
  tags: Yup.array().of(Yup.string()),
});

const EditWorkout = ({ onSubmit }) => {
  const { id } = useParams();
  let API_URL = "http://localhost:3000";
  const [initialValues, setInitialValues] = useState({
    title: "",
    type: "",
    exercises: [
      {
        name: "",
        sets: "",
        reps: "",
        weight: "",
        notes: "",
      },
      ],
    tags: [],
  });
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${API_URL}/workouts/fetchupdate/${id}`, {
          withCredentials: true,
        });

        const data = res.data;
        // console.log(data);

        // Set initial values with the fetched data
        setInitialValues({
          title: data.title || "",
          type: data.type || "",
          exercises:
            data.exercises && data.exercises.length > 0
              ? data.exercises.map((ex) => ({
                  name: ex.name || "",
                  sets: ex.sets || "",
                  reps: ex.reps || "",
                  weight: ex.weight || "",
                  notes: ex.notes || "",
                }))
              : [
                  {
                    name: "",
                    sets: "",
                    reps: "",
                    weight: "",
                    notes: "",
                  },
                ],
          tags: data.tags || [],
        });
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoading(false);
      }
    }
    getData();
  }, [id]);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Clean up empty string values to null for optional fields
      const cleanedValues = {
        ...values,
        exercises: values.exercises.map((ex) => ({
          ...ex,
          weight: ex.weight === "" ? null : ex.weight,
          notes: ex.notes === "" ? null : ex.notes,
        })),
      };

      const res = await axios.put(
        `${API_URL}/workouts/update-workout/${id}`,
        cleanedValues,
        {
          withCredentials: true,
        }
      );

      if (res) {
        toast.success("Workout updated successfully", {
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
    } catch (err) {
      console.error(
        "Failed to update progress",
        err.response?.data || err.message
      );
      toast.error("Failed to update workout - something went wrong", {
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
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="page-contact-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="contact-us-content">
                <div className="section-title">
                  <div className="section-bg-title">
                    <span>Add Workout</span>
                  </div>
                  <h2 className="text-anime-style-2">
                    Add your <span>Workout</span>
                  </h2>
                </div>
                <div className="contact-form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
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
                            name="tagsInput"
                            className="form-control"
                            placeholder="Tags (comma-separated)"
                            value={values.tags.join(", ")}
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

export default EditWorkout;

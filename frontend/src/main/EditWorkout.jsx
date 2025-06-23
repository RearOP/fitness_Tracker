import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  workoutName: "",
  category: "",
  exercises: [
    {
      name: "",
      sets: "",
      reps: "",
      weight: "",
      notes: ""
    }
  ]
};

const validationSchema = Yup.object({
  workoutName: Yup.string().required("Workout name is required"),
  category: Yup.string().required("Category is required"),
  exercises: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Exercise name is required"),
      sets: Yup.number().required("Sets are required"),
      reps: Yup.number().required("Reps are required"),
      weight: Yup.number().nullable(),
      notes: Yup.string().nullable()
    })
  )
});

const EditWorkout = ({ onSubmit }) => {
  return (
    <div className="page-contact-us">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="contact-us-content">
              <div className="section-title">
                <div className="section-bg-title">
                  <span>Add Workout</span>
                </div>
                <h2 className="text-anime-style-2">Add your <span>Workout</span></h2>
              </div>
              <div className="contact-form">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="form-group mb-4">
                          <Field
                            type="text"
                            name="workoutName"
                            className="form-control"
                            placeholder="Workout Name"
                          />
                          <ErrorMessage name="workoutName" component="div" className="text-danger" />
                        </div>

                        <div className="form-group mb-4">
                          <Field
                            type="text"
                            name="category"
                            className="form-control"
                            placeholder="Category (e.g., Cardio, Strength)"
                          />
                          <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>

                        {values.exercises.map((_, index) => (
                          <div className="col-md-12 mb-4" key={index}>
                            <div className="row">
                              <div className="form-group mb-4">
                                <Field
                                  name={`exercises[${index}].name`}
                                  className="form-control"
                                  placeholder="Exercise Name"
                                />
                                <ErrorMessage name={`exercises[${index}].name`} component="div" className="text-danger" />
                              </div>
                              <div className="form-group mb-4">
                                <Field
                                  name={`exercises[${index}].sets`}
                                  type="number"
                                  className="form-control"
                                  placeholder="Sets"
                                />
                                <ErrorMessage name={`exercises[${index}].sets`} component="div" className="text-danger" />
                              </div>
                              <div className="form-group mb-4">
                                <Field
                                  name={`exercises[${index}].reps`}
                                  type="number"
                                  className="form-control"
                                  placeholder="Reps"
                                />
                                <ErrorMessage name={`exercises[${index}].reps`} component="div" className="text-danger" />
                              </div>
                              <div className="form-group mb-4">
                                <Field
                                  name={`exercises[${index}].weight`}
                                  type="number"
                                  className="form-control"
                                  placeholder="Weight (kg)"
                                />
                              </div>
                              <div className="form-group">
                                <Field
                                  name={`exercises[${index}].notes`}
                                  className="form-control"
                                  placeholder="Notes"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="col-md-12 mb-4">
                          <button
                            type="button"
                            className="btn-default"
                            onClick={() => {
                              setFieldValue("exercises", [...values.exercises, {
                                name: "",
                                sets: "",
                                reps: "",
                                weight: "",
                                notes: ""
                              }]);
                            }}
                          >
                            Add Exercise
                          </button>
                        </div>

                        {/* <div className="col-md-12">
                          <button type="submit" className="btn-default">
                            Save Workout
                          </button>
                        </div> */}
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
  );
};

export default EditWorkout;

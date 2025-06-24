import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Scrollingsticker from "./components/Scrollingsticker";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({
  date: Yup.date().required("Date is required"),
  weight: Yup.number()
    .positive("Weight must be positive")
    .required("Weight is required"),
  measurements: Yup.object({
    chest: Yup.number()
      .positive("Chest measurement must be positive")
      .nullable(),
    waist: Yup.number()
      .positive("Waist measurement must be positive")
      .nullable(),
    biceps: Yup.number()
      .positive("Biceps measurement must be positive")
      .nullable(),
  }),
  performance: Yup.object({
    runTime: Yup.number().positive("Run time must be positive").nullable(),
    maxLift: Yup.number().positive("Max lift must be positive").nullable(),
  }),
});

const EditProgress = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    measurements: {
      chest: "",
      waist: "",
      biceps: "",
    },
    performance: {
      runTime: "",
      maxLift: "",
    },
  });
  // const [loading, setLoading] = useState(true);

  let API_URL = "http://localhost:3000";

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${API_URL}/progress/fetchupdate/${id}`, {
          withCredentials: true,
        });
        
        const data = res.data;
        // console.log(data);
        
        // Set initial values with the fetched data
        setInitialValues({
          date: data.date ? data.date.split("T")[0] : new Date().toISOString().split("T")[0],
          weight: data.weight || "",
          measurements: {
            chest: data.measurements?.chest || "",
            waist: data.measurements?.waist || "",
            biceps: data.measurements?.biceps || "",
          },
          performance: {
            runTime: data.performance?.runTime || "",
            maxLift: data.performance?.maxLift || "",
          },
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
        measurements: {
          chest: values.measurements.chest || null,
          waist: values.measurements.waist || null,
          biceps: values.measurements.biceps || null,
        },
        performance: {
          runTime: values.performance.runTime || null,
          maxLift: values.performance.maxLift || null,
        },
      };

      const res = await axios.put(
        `${API_URL}/progress/edit-progress/${id}`,
        cleanedValues,
        {
          withCredentials: true,
        }
      );

      if (res) {
        toast.success("Progress updated successfully", {
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
      toast.error("Failed to update progress - something went wrong", {
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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

      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Track <span>Progress</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Track Progress
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
                    <span>Track Progress</span>
                  </div>
                  <h2 className="text-anime-style-2">
                    Update your <span>Progress</span>
                  </h2>
                </div>

                <div className="contact-form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                  >
                    <Form>
                      {/* Date Field */}
                      <div className="form-group mb-4">
                        <label htmlFor="date" className="form-label">
                          Date
                        </label>
                        <Field
                          type="date"
                          name="date"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="date"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="weight" className="form-label">
                          Weight (kg)
                        </label>
                        <Field
                          type="number"
                          name="weight"
                          className="form-control"
                          placeholder="Enter your weight"
                          step="0.1"
                        />
                        <ErrorMessage
                          name="weight"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Measurements Section */}
                      <div className="mb-4 border p-3">
                        <h4 className="mb-3">Body Measurements (cm)</h4>

                        <div className="form-group mb-3">
                          <label
                            htmlFor="measurements.chest"
                            className="form-label"
                          >
                            Chest
                          </label>
                          <Field
                            type="number"
                            name="measurements.chest"
                            className="form-control"
                            placeholder="Chest measurement"
                            step="0.1"
                          />
                          <ErrorMessage
                            name="measurements.chest"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label
                            htmlFor="measurements.waist"
                            className="form-label"
                          >
                            Waist
                          </label>
                          <Field
                            type="number"
                            name="measurements.waist"
                            className="form-control"
                            placeholder="Waist measurement"
                            step="0.1"
                          />
                          <ErrorMessage
                            name="measurements.waist"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label
                            htmlFor="measurements.biceps"
                            className="form-label"
                          >
                            Biceps
                          </label>
                          <Field
                            type="number"
                            name="measurements.biceps"
                            className="form-control"
                            placeholder="Biceps measurement"
                            step="0.1"
                          />
                          <ErrorMessage
                            name="measurements.biceps"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      {/* Performance Section */}
                      <div className="mb-4 border p-3">
                        <h4 className="mb-3">Performance Metrics</h4>

                        <div className="form-group mb-3">
                          <label
                            htmlFor="performance.runTime"
                            className="form-label"
                          >
                            Run Time (minutes)
                          </label>
                          <Field
                            type="number"
                            name="performance.runTime"
                            className="form-control"
                            placeholder="Running time in minutes"
                            step="0.1"
                          />
                          <ErrorMessage
                            name="performance.runTime"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label
                            htmlFor="performance.maxLift"
                            className="form-label"
                          >
                            Max Lift (kg)
                          </label>
                          <Field
                            type="number"
                            name="performance.maxLift"
                            className="form-control"
                            placeholder="Maximum lift weight"
                            step="0.5"
                          />
                          <ErrorMessage
                            name="performance.maxLift"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn-default btn-highlighted"
                        >
                          Update Progress
                        </button>
                      </div>
                    </Form>
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

export default EditProgress;
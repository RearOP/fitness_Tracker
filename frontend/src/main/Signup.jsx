import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
const apiurl = "http://localhost:3000/auth";

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    fullname: "",
    password: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and contain at least one letter and one number"
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        "Please enter a valid international phone number"
      )
      .required("Phone is required"),
  });

  const handleSubmit = async (values) => {
    console.log("Form submitted:", values);
    try {
      const res = await axios.post(`${apiurl}/register`, values, {
        withCredentials: true, //this is critical for setting cookies!
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error); 
    }
  };

  return (
    <>
      <div className="page-contact-us">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="contact-us-content">
                <div className="section-title">
                  <div className="section-bg-title wow fadeInUp">
                    <span>sign up</span>
                  </div>
                  <h3 className="wow fadeInUp" data-wow-delay="0.2s">
                    sign up
                  </h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Join our
                    <span> community today</span>
                  </h2>
                </div>
                <div className="contact-form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {() => (
                      <Form className="wow fadeInUp" data-wow-delay="0.4s" method="POST">
                        <div className="row">
                          <div className="form-group col-md-12 mb-4">
                            <Field
                              type="text"
                              name="fullname"
                              className="form-control"
                              placeholder="Full name"
                            />
                            <ErrorMessage
                              name="fullname"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            />
                          </div>

                          <div className="form-group col-md-12 mb-4">
                            <Field
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            />
                          </div>

                          <div className="form-group col-md-12 mb-4">
                            <Field
                              type="text"
                              name="phone"
                              className="form-control"
                              placeholder="Phone No."
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            />
                          </div>
                          <div className="form-group col-md-12 mb-4">
                            <Field
                              autoComplete="current-password"
                              name="password"
                              id="password"
                              type="password"
                              className="form-control"
                              placeholder="Password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            />
                          </div>
                          <div className="col-md-12">
                            <button type="submit" className="btn-default">
                              Submit
                            </button>
                          </div>
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

export default Signup;

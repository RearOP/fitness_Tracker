import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Scrollingsticker from "./components/Scrollingsticker";

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10,}$/, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

const Contactus = () => {
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    alert("Form submitted successfully!");
    resetForm();
  };

  return (
    <>
      <div className="page-header parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Contact <span>us</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      contact us
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
            <div className="col-lg-6">
              <div className="contact-us-content">
                <div className="section-title">
                  <div className="section-bg-title wow fadeInUp">
                    <span>contact us</span>
                  </div>
                  <h3 className="wow fadeInUp" data-wow-delay="0.2s">
                    contact us
                  </h3>
                  <h2 className="text-anime-style-2" data-cursor="-opaque">
                    Reach out and connect with our
                    <span>dedicated team today</span>
                  </h2>
                </div>

                <div className="contact-form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {() => (
                      <Form className="wow fadeInUp" data-wow-delay="0.4s">
                        <div className="row">
                          <div className="form-group col-md-6 mb-4">
                            <Field
                              type="text"
                              name="fname"
                              className="form-control"
                              placeholder="First name"
                            />
                            <ErrorMessage
                              name="fname"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: '15px' , fontWeight:'bold' }}
                            />
                          </div>

                          <div className="form-group col-md-6 mb-4">
                            <Field
                              type="text"
                              name="lname"
                              className="form-control"
                              placeholder="Last name"
                            />
                            <ErrorMessage
                              name="lname"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: '15px' , fontWeight:'bold' }}
                            />
                          </div>

                          <div className="form-group col-md-6 mb-4">
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
                              style={{ fontSize: '15px' , fontWeight:'bold' }}
                            />
                          </div>

                          <div className="form-group col-md-6 mb-4">
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
                              style={{ fontSize: '15px' , fontWeight:'bold' }}
                            />
                          </div>

                          <div className="form-group col-md-12 mb-5">
                            <Field
                              as="textarea"
                              name="message"
                              className="form-control"
                              rows="4"
                              placeholder="Message"
                            />
                            <ErrorMessage
                              name="message"
                              component="div"
                              className="text-danger"
                              style={{ fontSize: '15px' , fontWeight:'bold' }}
                            />
                          </div>

                          <div className="col-md-12">
                            <button type="submit" className="btn-default">
                              send request
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-us-image">
                <div className="contact-us-img">
                  <figure className="image-anime">
                    <img src="images/contact-us-image.jpg" alt="" />
                  </figure>
                </div>
                <div className="contact-image-content">
                  <div className="section-title">
                    <h2 className="text-anime-style-2" data-cursor="-opaque">
                      Have you any query feel please free contact
                    </h2>
                  </div>
                  <ul className="wow fadeInUp">
                    <li>
                      <img src="images/icon-phone-white.svg" alt="" />
                      <a href="tel:+91123456789">+91 123 456 789</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="contact-info-box">
                <div className="contact-info-item wow fadeInUp">
                  <div className="icon-box">
                    <img src="images/icon-phone.svg" alt="" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Contact Us</h3>
                    <p>
                      <a href="tel:+91123456789">+91 123 456 789</a>
                    </p>
                  </div>
                </div>
                <div
                  className="contact-info-item wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div className="icon-box">
                    <img src="images/icon-mail.svg" alt="" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Email Us</h3>
                    <p>
                      <a href="mailto:info@domainname.com">
                        info@domainname.com
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  className="contact-info-item wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="icon-box">
                    <img src="images/icon-clock.svg" alt="" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Working Hours</h3>
                    <p>Mon - Fri : 08:00 AM-10:00 PM</p>
                  </div>
                </div>
                <div
                  className="contact-info-item wow fadeInUp"
                  data-wow-delay="0.6s"
                >
                  <div className="icon-box">
                    <img src="images/icon-location.svg" alt="" />
                  </div>
                  <div className="contact-info-content">
                    <h3>Location</h3>
                    <p>2715 Ash San Jose, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;

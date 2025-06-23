import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Scrollingsticker from "./components/Scrollingsticker";
import { ToastContainer, toast, Bounce } from "react-toastify";

const NutritionLog = () => {
  const initialValues = {
    mealType: "",
    items: [
      {
        name: "",
        quantity: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      },
    ],
    notes: "",
  };

  const validationSchema = Yup.object({
    mealType: Yup.string()
      .oneOf(["breakfast", "lunch", "dinner", "snack"])
      .required("Meal type is required"),
    items: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.string(),
        calories: Yup.number().nullable(),
        protein: Yup.number().nullable(),
        carbs: Yup.number().nullable(),
        fat: Yup.number().nullable(),
      })
    ),
    notes: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    let API_URL = "http://localhost:3000/";
    try {
      const res = await axios.post(
        `${API_URL}nutritions/add-nutrition`,
        values,
        {
          withCredentials: true,
        }
      );
      // console.log("Nutrition log saved:", res.data);
      if (res) {
        toast.success("Nutrition log created successfully", {
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
      console.error("Failed to save nutrition log", err.response.data);
      toast.error("Failed to save nutrition log something is wrong", {
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
                  Nutrition <span>Log</span>
                </h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Nutrition
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scrollingsticker />
      <div className="container mt-5">
        <h2>Add Nutrition Log</h2>
        <div className="contact-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="wow fadeInUp" data-wow-delay="0.4s">
                {/* Meal Type Select */}
                <div className="form-group mb-3">
                  <Field as="select" name="mealType" className="form-control">
                    <option value="" className="bg-dark">Select Meal Type</option>
                    <option value="breakfast" className="bg-dark">Breakfast</option>
                    <option value="lunch" className="bg-dark">Lunch</option>
                    <option value="dinner" className="bg-dark">Dinner</option>
                    <option value="snack" className="bg-dark">Snack</option>
                  </Field>
                  <ErrorMessage
                    name="mealType"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Meal Items */}
                {values.items.map((item, index) => (
                  <div key={index} className="mb-4 border p-3 rounded">
                    <div className="form-group mb-2">
                      <Field
                        name={`items[${index}].name`}
                        className="form-control"
                        placeholder="Item Name"
                      />
                      <ErrorMessage
                        name={`items[${index}].name`}
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <Field
                        name={`items[${index}].quantity`}
                        className="form-control"
                        placeholder="Quantity (e.g., 1 cup, 100g)"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <Field
                        name={`items[${index}].calories`}
                        type="number"
                        className="form-control"
                        placeholder="Calories"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <Field
                        name={`items[${index}].protein`}
                        type="number"
                        className="form-control"
                        placeholder="Protein (g)"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <Field
                        name={`items[${index}].carbs`}
                        type="number"
                        className="form-control"
                        placeholder="Carbs (g)"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <Field
                        name={`items[${index}].fat`}
                        type="number"
                        className="form-control"
                        placeholder="Fat (g)"
                      />
                    </div>

                    {/* Remove Button */}
                    {values.items.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          const newItems = values.items.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue("items", newItems);
                        }}
                      >
                        Remove Item
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Item Button */}
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() =>
                      setFieldValue("items", [
                        ...values.items,
                        {
                          name: "",
                          quantity: "",
                          calories: "",
                          protein: "",
                          carbs: "",
                          fat: "",
                        },
                      ])
                    }
                  >
                    + Add Item
                  </button>
                </div>

                {/* Notes */}
                <div className="form-group mb-3">
                  <Field
                    as="textarea"
                    name="notes"
                    className="form-control"
                    placeholder="Additional notes (optional)"
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn-default">
                  Save Log
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default NutritionLog;

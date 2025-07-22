import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContacts = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/{contacts}",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to save contact");

      const result = await response.json();
      console.log("Success:", result);

      // Optionally update global store if needed
      // dispatch({ type: "ADD_CONTACT", payload: result });

      navigate("/"); // Go back to home
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="border border-dark p-4 rounded shadow">
        <h2 className="text-center mb-4">Add a new contact</h2>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Full Name</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Email</h6>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Phone</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Address</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>

        <div className="mb-3">
          <p>
            <Link to="/"> or get back to contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

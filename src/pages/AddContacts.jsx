import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const slug = "JET365"; // your agenda identifier

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // only send the contact fields
    const payload = { ...formData };

    try {
      const response = await fetch(`${store.baseUrl}agendas/${slug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        // log validation errors from the server
        console.error("Validation errors:", result.detail);
        throw new Error(`Failed to save contact: ${response.status}`);
      }

      // all good—update store and go home
      dispatch({ type: "ADD_CONTACT", payload: result });
      navigate("/");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <form
        onSubmit={handleSubmit}
        className="border border-dark p-4 rounded shadow"
      >
        <h2 className="text-center mb-4">Add a new contact</h2>

        {/** --- Form Fields --- **/}
        <div className="mb-3">
          <h6 className="mb-1 text-start">Full Name</h6>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Full Name"
            required
          />
        </div>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Phone</h6>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter phone"
            required
          />
        </div>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Email</h6>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <h6 className="mb-1 text-start">Address</h6>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>

        <p>
          <Link to="/">or get back to contacts</Link>
        </p>
      </form>
    </div>
  );
};

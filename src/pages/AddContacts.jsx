import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

  const AddContacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const location = useLocation();
  const slug = "JET365";

  // Determine if we're editing an existing contact
  const contactToEdit = location.state?.contact;
  const isEditing = Boolean(contactToEdit && contactToEdit.id);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // When I'm editing, fetch the latest contact data from API and populate form
  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        address: contact.address || "",
      });
    }
  }, [isEditing, contactToEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `${store.baseUrl}agendas/${slug}/contacts/${contactToEdit.id}`
        : `${store.baseUrl}agendas/${slug}/contacts`;
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        console.error("Validation errors:", result.detail || result);
        throw new Error(`Failed to save contact: ${response.status}`);
      }

      // Update global store
      dispatch({
        type: isEditing ? "EDIT_CONTACT" : "ADD_CONTACT",
        payload: result,
      });
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
        <h2 className="text-center mb-4">
          {isEditing ? "Edit Contact" : "Add a new contact"}
        </h2>

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
            {isEditing ? "Save Changes" : "Save"}
          </button>
        </div>

        <p>
          <Link to="/">or get back to contacts</Link>
        </p>
      </form>
    </div>
  );
};

export default AddContacts;

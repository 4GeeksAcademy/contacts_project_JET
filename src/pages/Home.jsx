import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactsCard from "../components/ContactsCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const slug = "JET365";

  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Fetching agenda and contacts
  useEffect(() => {
    const createAgenda = async () => {
      try {
        const res = await fetch(`${store.baseUrl}agendas/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 201) console.log("Agenda created.");
        else if (res.status === 400) console.log("Agenda already exists.");
      } catch (err) {
        console.error("Error creating agenda:", err);
      }
    };

    const fetchContacts = async () => {
      try {
        const res = await fetch(`${store.baseUrl}agendas/${slug}/contacts`);
        if (!res.ok) {
          console.error("Failed to fetch contacts:", res.status);
          return;
        }
        const { contacts } = await res.json();
        dispatch({ type: "SET_CONTACTS", payload: contacts });
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    (async () => {
      await createAgenda();
      await fetchContacts();
    })();
  }, []);

  // the prompt to confirm deletion
  const handleDeletePrompt = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  // Confirming delete from modal
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `${store.baseUrl}agendas/${slug}/contacts/${contactToDelete.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      dispatch({ type: "DELETE_CONTACT", payload: contactToDelete.id });
      setShowModal(false);
      setContactToDelete(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleEdit = (contact) => {
    navigate(`/addcontacts`, { state: { contact } });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4"></h1>

      <div className="d-flex justify-content-end mb-4">
        <Link to="/addcontacts">
          <button className="btn btn-success">Add New Contact</button>
        </Link>
      </div>

      {store.contacts?.length > 0 ? (
        store.contacts.map((contact) => (
          <ContactsCard
            key={contact.id}
            contact={contact}
            onDelete={() => handleDeletePrompt(contact)}
            onEdit={() => handleEdit(contact)}
          />
        ))
      ) : (
        <p className="text-center">No contacts yet? Add 'em!</p>
      )}

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{contactToDelete?.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactsCard from "../components/ContactsCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const slug = "JET365";

  // 1. Only run once on mount
  useEffect(() => {
    const createAgenda = async () => {
      try {
        const res = await fetch(`${store.baseUrl}agendas/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        // 201 = created, 400 = already exists
        if (res.status === 201) console.log("Agenda created.");
        else if (res.status === 400) console.log("Agenda already exists.");
      } catch (err) {
        console.error("Error creating agenda:", err);
      }
    };

    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${store.baseUrl}agendas/${slug}/contacts`
        );
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
  }, []); // ← no store or dispatch here

  // 2. Delete via the nested URL
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${store.baseUrl}agendas/${slug}/contacts/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  // 3. Edit—push the whole contact into route state
  const handleEdit = (contact) => {
    navigate(`/single/${contact.id}`, { state: { contact } });
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
            onDelete={() => handleDelete(contact.id)}
            onEdit={() => handleEdit(contact)}
          />
        ))
      ) : (
        <p className="text-center">No contacts yet. Add one!</p>
      )}
    </div>
  );
};
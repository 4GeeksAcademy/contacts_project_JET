import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactsCard from "../components/ContactsCard.jsx";
import { Link } from "react-router-dom";


export const Home = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Contacts</h1>

      <div className="text-center mb-4">
        <Link to="/addcontacts">
          <button className="btn btn-primary">Add New Contact</button>
        </Link>
      </div>

      {store.contacts && store.contacts.length > 0 ? (
        store.contacts.map((contact, index) => (
          <ContactsCard key={index} contact={contact} />
        ))
      ) : (
        <p className="text-center">No contacts yet. Add one!</p>
      )}
    </div>
  );
};
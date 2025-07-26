import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactsCard from "../components/ContactsCard.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  // THIS IS WHERE THE APP STARTS
  // INITIAL 'GET' STARTS HERE AND GETS ALL DATA FROM SERVER
  // THEN SEND TO STORE TO UPDATE ALL PAGES

  useEffect(() => {
    const slug = "JET365";
    const createAgenda = async () => {
      try {
        const response = await fetch(`${store.baseUrl}agendas/${slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          console.log("Agenda is mad good my dude");
        } else if (response.status === 400) {
          console.log("Aww Man, my bad but this Agenda is already here");
        } else {
          console.log(
            "Whao, that was not the response I expected!",
            response.status
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

const fetchContacts =async () => {
  try {
    const response = await fetch(`${store.baseUrl}agendas/${slug}/contacts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
  },
});
if(response.ok) {
  const data = await response.json();
  dispatch ({type:"SET_CONTACTS", payload: data.contacts})
} else {
  console.log("Bro, I couldn't get your contacts son", response.status)
}
  }
  catch (error) {
        console.log(error);
      }
}


    const initializeAgenda = async () => {
      await createAgenda();
      await fetchContacts();
    };

    initializeAgenda();
  }, [store.baseUrl, dispatch])

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

import React from "react";

const ContactsCard = ({ contact }) => {
  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <img
            src={contact.imageURL || "https://via.placeholder.com/100"}
            className="img-fluid rounded-circle"
            alt={contact.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text">{contact.address}</p>
            <p className="card-text">
              <small className="text-muted">{contact.phone}</small>
            </p>
            <p className="card-text">{contact.email}</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsCard;
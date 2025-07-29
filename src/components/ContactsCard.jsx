import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const ContactsCard = ({ contact, onDelete }) => {
  const navigate = useNavigate();
  const displayName = contact.name || contact.name || "Unnamed Contact";
  const avatarUrl = contact.imageURL || `https://i.pravatar.cc/80?u=${contact.id}`;

  // Navigate to AddContacts for editing, passing the contact in state
  const handleEdit = () => {
    navigate("/addcontacts", { state: { contact } });
  };

  return (
    <div className="border border-secondary rounded p-3 d-flex align-items-center justify-content-between mb-3">

      <div className="d-flex align-items-center">
        <img
          src={avatarUrl}
          alt={displayName}
          className="rounded-circle me-3"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
        <div>
          <h5 className="mb-2">{displayName}</h5>
          <p className="mb-1">
            <FontAwesomeIcon icon={faPhone} />{' '}
            {contact.phone}
          </p>
          <p className="mb-1">
            <FontAwesomeIcon icon={faEnvelope} />{' '}
            {contact.email}
          </p>
          <p className="mb-0">
            <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
            {contact.address}
          </p>
        </div>
      </div>


      <div className="d-flex">
        <FontAwesomeIcon
          icon={faPencilAlt}
          className="me-3"
          style={{ cursor: 'pointer' }}
          onClick={handleEdit}
        />
        <FontAwesomeIcon icon={faTrash} onClick={onDelete} />
      </div>
    </div>
  );
};

export default ContactsCard;
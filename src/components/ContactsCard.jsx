import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const ContactsCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="border border-secondary rounded p-3 d-flex align-items-center justify-content-between mb-3">
      {/* Left side: Image and details */}
      <div className="d-flex align-items-center">
        <img
          src={contact.imageURL || 'https://images.mubicdn.net/images/cast_member/98281/cache-192296-1484282960/image-w856.jpg?size=300x'}
          alt={contact.name}
          className="rounded-circle me-3"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
        <div>
          <h5 className="mb-2">{contact.name}</h5>
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

      {/* Right side: Edit/Delete icons */}
      <div className="d-flex">
        <FontAwesomeIcon
          icon={faPencilAlt}
          className="me-3"
          style={{ cursor: 'pointer' }}
          onClick={onEdit}
        />
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: 'pointer' }}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default ContactsCard;
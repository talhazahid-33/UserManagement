import React from "react";

const ContactInput = ({
  id,
  contact,
  updateContact,
  deleteContact,
  addContact,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateContact(id, { ...contact, [name]: value });
  };

  return (
    <div>
      <div className="form">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Address Type"
            name="addressType"
            required
            value={contact.addressType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            name="address"
            value={contact.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        {id !== -1 ? (
          <button className="closeButton" onClick={() => deleteContact(id)}>
            ❌
          </button>
        ) : 
          <button onClick={addContact}>
            ➕
          </button>
          

        }
        <br></br><br></br>
      </div>
    </div>
  );
};

export default ContactInput;

import React from "react";

const AddressDisplay = ({ id, contact }) => {
  return (
    <div>
      <div className="form">
        <div>
          <input
            className="form-control"
            placeholder="Address Type"
            name="addressType"
            readOnly
            value={contact.addressType}
          />
        </div>
        <div>
          <input
            className="form-control"
            placeholder="Address"
            name="address"
            readOnly
            value={contact.address}
          />
        </div>
        <div>
          <input
            className="form-control"
            placeholder="Phone Number"
            name="phone"
            readOnly    
            value={contact.phone}
          />
        </div>
        
      </div><br></br>
    </div>
  );
};

export default AddressDisplay;

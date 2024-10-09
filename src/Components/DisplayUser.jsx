import React, { useState } from "react";
import AddressDisplay from "./AddressDisplay";
import axios from "axios";
import EnhancedTable from "./CustomizedTable";
//import EnhancedTable from "./AddressTable";

const DisplayUser = () => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");

  const [contacts, setContacts] = useState([]);

  function setArrayData(addresses) {
    let userAddress = null;
    for (let i = 0; i < addresses.length; i++) {
      userAddress = {
        id: addresses[i]._id,
        addressType: addresses[i].addressType,
        address: addresses[i].address,
        phone: addresses[i].phone,
      };

      setContacts([...contacts, userAddress]);
    }
  }

  const searchUser = async () => {
    if (cnic === "") {
      alert("Enter CNIC first");
      return;
    }
    const result = await axios.get(
      `http://localhost:8000/getSingleUserdata?cnic=${cnic}`
    );
    console.log(result.data);

    if (result.data.status === "ok") {
      alert("User Found");
      const user = result.data.data[0];
      setName(user.name);
      console.log(user.contacts);
      setArrayData(user.contacts);
    } else if (result.data.status === "nouser") {
      alert("No such user Exists\n");
    } else alert("Something went Wrong");
  };

  return (
    <div className="inputForm">
      <h1>User Details</h1>
      <br></br>
      <div className="addressDisplay">
        <input
          type="text"
          className="form-control"
          placeholder="Enter CNIC"
          value={cnic}
          required
          onChange={(e) => setCnic(e.target.value)}
        />
        <button
          style={{ "marginLeft": "30%", marginRight: "10%" }}
          onClick={searchUser}
        >
          Search
        </button>
      </div>
      <br></br>

      <div style={{ border: "1px solid black", padding: "10px" }}>
        <div className="form">
          <div className="contactInput">
            <input
              type="text"
              className={["form-control"].join(" ")}
              placeholder="Name"
              value={name}
              readOnly
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="contactInput">
            <input
              type="text"
              className="form-control"
              placeholder="CNIC"
              value={cnic}
              readOnly
              onChange={(e) => setCnic(e.target.value)}
            />
          </div>
        </div>
        <br></br>

        <div className="contacts">
          {contacts.map((contact) => (
            <AddressDisplay
              key={contact.id}
              id={contact.id}
              contact={contact}
            />
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <EnhancedTable></EnhancedTable>
      
    </div>
  );
};

export default DisplayUser;

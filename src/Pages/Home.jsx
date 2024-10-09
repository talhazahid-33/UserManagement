import React, { useState } from "react";
import ContactInput from "../Components/userContact";
import axios from "axios";
import UserData from "../Components/userData";

const Home = () => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [contacts, setContacts] = useState([
    {
      id:-1,
      addressType: "",
      address: "",
      phone: "",
    },
  ]);

  const addContact = () => {
    setContacts([
      ...contacts,
      { id: Date.now(), addressType: "", address: "", phone: "" },
    ]);
  };

  const updateContact = (id, updatedContact) => {
    setContacts(
      contacts.map((contact) => (contact.id === id ? updatedContact : contact))
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  function missingAddress(singleAddress){
    return (singleAddress.addressType=="" || singleAddress.address==""|| singleAddress.phone =="");
  }

  function missingData(){
    for(let i=0; i<contacts.length; i++){
      if(name==""||cnic==""||missingAddress(contacts[i]))
        return true;
    }
    return false;
  }

  const handleSubmit = async() => {
    console.log("Name:", name);
    console.log("CNIC:", cnic);
    console.log("Contacts:", contacts);
    if(missingData()){
      alert("Complete all fields\n");
      return;
    }
    const result = await axios.post("http://localhost:8000/insert", {
      name: name,
      cnic: cnic,
      contacts: contacts,
    });
    console.log("res ;",result);
    if (result.data.status === "ok") {
      console.log("Data Inserted Successfully");
      alert("Data Inserted Successfully");
    } else {
      console.log("Not Inserted");
    }
  };

  return (
    <div>
      <div className="form">
        <div className="contactInput">
          <input
            type="text"
            className={["form-control"].join(" ")}
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="contactInput">
          <input
            type="text"
            className="form-control"
            placeholder="CNIC"
            value={cnic}
            required
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>
        
      
      </div>
      <br></br>
      <br></br>
      

      <div className="contacts">
        {contacts.map((contact) => (
          <ContactInput
            key={contact.id}
            id={contact.id}
            contact={contact}
            updateContact={updateContact}
            deleteContact={deleteContact}
            addContact={addContact}
          />
        ))}
      </div>

      <button type="submit" className="btn btn-success" onClick={handleSubmit}>
        Submit
      </button>

      <div>
        <UserData></UserData>
      </div>
    </div>
  );
};

export default Home;

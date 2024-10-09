import React, { useState } from "react";
import AddressInput from "../Components/AddressInputs";
import axios from "axios";
import DisplayUser from "../Components/DisplayUser";

const InputForm = () => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [addType, setAddType] = useState("");
  const [addValue, setAddValue] = useState("");
  const [phoneNo, setPhone] = useState("");
  
  const [contacts, setContacts] = useState([]);

  const addContact = () => {
    console.log("Contact : ", contacts,"Length : ",contacts.length);
    if(addType === "" || addValue ==="" || phoneNo === "")
    {
        alert("Fill All Data");
        return;
    }
    const newContact = {
        id: Date.now(),
        addressType: addType,
        address: addValue,
        phone: phoneNo,
      };
   
    setContacts([...contacts, newContact]);

    console.log(contacts);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  function missingAddress(singleAddress) {
    return (
      singleAddress.addressType == "" ||
      singleAddress.address == "" ||
      singleAddress.phone == ""
    );
  }

  function missingData() {
    for (let i = 0; i < contacts.length; i++) {
      if (name == "" || cnic == "" || missingAddress(contacts[i])) return true;
    }
    return false;
  }

  const handleSubmit = async () => {
    if (missingData()) {
      alert("Complete all fields\n");
      return;
    }
    const result = await axios.post("http://localhost:8000/insert", {
      name: name,
      cnic: cnic,
      contacts: contacts,
    });
    console.log("res ;", result);
    if (result.data.status === "ok") {
      console.log("Data Inserted Successfully");
      alert("Data Inserted Successfully");
    } else {
      console.log("Not Inserted");
    }
  };




  const handleNewSubmit = async () => {
    if (missingData()) {
      alert("Complete all fields\n");
      return;
    }
    const result = await axios.post("http://localhost:8000/insertConditional", {
      name: name,
      cnic: cnic,
      contacts: contacts,
    });
    if(result.data.status === "existed")
      alert("Addresses added to Existing User\n");
    else if(result.data.status === "new")
      alert("New User Added\n");
    else
      alert("Some Error occured")
    console.log("New Result", result);
  };

  const updateName = async ()=>{
    if(cnic === "")
    {
      alert ("Enter CNIC first");
      return;
    }
    const result =await axios.post("http://localhost:8000/updateUser",{
      cnic,name,
    });
    if(result.data.status === "nouser")
      alert("No such user Exists\n");
    else if(result.data.status === "ok")
      alert("Name Updtaed");
    else
      alert("Something went Wrong");
  }



  return (
    <div>
    <div className="inputForm">
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
        <button onClick={updateName}>Update Name</button>
      </div>
      <br></br>

      <div>
        <div className="form">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Address Type"
              name="addressType"
              required
              value={addType}
              onChange={(e) => setAddType(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              name="phone"
              value={phoneNo}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button onClick={addContact}>➕</button>
          <br></br>
          <br></br>
          
        </div>
        
      <br></br>
      </div>
      

      <div className="contacts">
        {contacts.map((contact) => (
          <AddressInput
            key={contact.id}
            id={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))}
      </div>
      
      <br></br>

     {/* <button type="submit" className="btn btn-success" onClick={handleSubmit}>
        Submit
      </button> */}
      <button type="submit" className="btn btn-success" onClick={handleNewSubmit}>
        Submit By CNIC
      </button>


      
    </div>
      <br></br>
      <DisplayUser></DisplayUser>
    </div>
  );
};

export default InputForm;

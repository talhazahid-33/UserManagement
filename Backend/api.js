const express = require("express");
const { default: mongoose } = require("mongoose");
const usersCollection = require("./mongo");
const cors = require("cors");
const { data } = require("autoprefixer");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/insert", async (req, res) => {
  const { name, cnic, contacts } = req.body;

  try {
    await usersCollection.create({
      name: name,
      cnic: cnic,
      contacts: contacts,
    });
    console.log("Inserted");
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).send("Failed to insert document");
  }
});

app.get("/getdata", async (req, res) => {
  console.log("getdata");
  try {
    const data = await usersCollection.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getSingleUserdata", async (req, res) => {
  const { cnic } = req.query;
  console.log("Get Single data",cnic);
  try {
    const data = await usersCollection.find({ cnic: cnic },{_id:0,__v:0});
    
    if (data.length > 0) {
        res.send({ status: "ok", data: data });
      } else {
        res.send({ status: "nouser" });
      }
  } catch (error) {
    res.send({status:"error", error: error });
    console.log(error);
  }
});

app.get("/getcustomdata", async (req, res) => {
  console.log("get Custom data");
  try {
    const data = await usersCollection.find(
      {},
      { _id: 0, __v: 0, contacts: { addressType: 0 } }
    );
    res.send({ status: "ok", data: data });
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateUser", async (req, res) => {
  const { cnic, name } = req.body;
  try {
    const data = await usersCollection.updateOne(
      { cnic: cnic },
      { $set: { name: name } }
    );
    if (data.modifiedCount > 0) res.send({ status: "ok", data: data });
    else res.send({ status: "nouser" });
  } catch (error) {
    res.send({ error: error });
  }
});

app.post("/insertConditional", async (req, res) => {
  const { name, cnic, contacts } = req.body;
  try {
    console.log("Name : ", name);
    const found = await usersCollection.findOne({ cnic: cnic });
    console.log("Found  : ", found);
    if (found) {
      console.log("User Exists");
      await usersCollection.updateOne(
        { cnic: cnic },
        { $push: { contacts: { $each: contacts } } }
      );
      res.send({ status: "existed" });
    } else {
      console.log("New User");
      await usersCollection.create({
        name: name,
        cnic: cnic,
        contacts: contacts,
      });
      console.log("Inserted");
      res.send({ status: "new" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error });
  }
});

app.listen(8000, () => {
  console.log("Server listening on PORT 8000");
});

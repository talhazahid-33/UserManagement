const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/user-management")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("Failed");
  });

const newSchema = new mongoose.Schema({
  name: String,
  cnic: String,
  contacts: [
    {
      addressType: String,
      address: String,
      phone: String,
    },
  ],
});

const collection = mongoose.model("users", newSchema);

module.exports = collection;

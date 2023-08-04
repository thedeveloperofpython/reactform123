const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Connect to MongoDB (replace 'your_db_uri' with your actual MongoDB connection URI)
mongoose
  .connect("your_db_uri", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a Mongoose schema for contacts
const contactSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  dob: String
});

// Create a Mongoose model for contacts
const Contact = mongoose.model("Contact", contactSchema);

// Define a route to handle saving a new contact
app.post("/api/contacts", (req, res) => {
  const { fName, lName, email, dob } = req.body;

  // Create a new contact instance using the Mongoose model
  const newContact = new Contact({
    fName,
    lName,
    email,
    dob
  });

  // Save the new contact to the database
  newContact.save((err) => {
    if (err) {
      console.error("Error saving contact:", err);
      return res.status(500).json({ error: "Failed to save contact" });
    }

    console.log("Contact saved successfully:", newContact);
    res.status(201).json(newContact);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

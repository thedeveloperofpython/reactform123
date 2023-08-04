// contact.js (backend)
const express = require("express");
const router = express.Router();
const Contact = require("./models/Contact"); // Assuming you have a Contact model

// Define a route to save a new contact to the database
router.post("/", (req, res) => {
  const { fName, lName, email, dob } = req.body;

  // Create a new Contact document using the Contact model
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
      res.status(500).send("Error saving contact");
    } else {
      console.log("Contact saved successfully");
      res.status(201).send("Contact saved successfully");
    }
  });
});

module.exports = router;

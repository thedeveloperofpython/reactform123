import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
    dob: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Make a POST request to your backend server using axios
    axios
      .post("http://localhost:5000/api/contacts", _.omit(contact, "_id")) // Replace with your actual backend API endpoint
      .then((response) => {
        console.log("Contact saved successfully:", response.data);
        // Optionally, you can do something after the contact is saved successfully
      })
      .catch((error) => {
        console.error("Error saving contact:", error);
        // Handle the error, e.g., show an error message to the user
      });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <p>{contact.dob}</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={contact.fName}
          name="fName"
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          value={contact.lName}
          name="lName"
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          value={contact.email}
          name="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="date"
          value={contact.dob}
          name="dob"
          placeholder="Date Of Birth"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

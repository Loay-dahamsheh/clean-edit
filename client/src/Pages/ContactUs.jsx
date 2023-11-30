import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      // Send the data to the server using Axios or another method
      const response = await axios.post("http://127.0.0.1:3001/contactus", {
        name: name,
        email: email,
        message: message,
      });
      console.log(email);

      // Handle the response as per your application's needs
      alert("successfully", response.data);
      window.location.href = "/";

      // You can also redirect the user to another page after registration
    } catch (error) {
      alert("An error occurred during registration:", error);
    }
  };


  return (
    <div>
      <div  
        id="contact"  
        className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12"
      >
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div id="CCo" className="text-black relative px-4 bg-white	 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="text-center pb-6">
              <h1 className="text-3xl">Contact <span className="text-blue-500">Us</span>!</h1>
              <p className="text-black text-center">
                Fill up the form below to send us a message.
              </p>
            </div>
            <form>
              <input   onChange={(e) => setName(e.target.value)}
                          value={name}
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                name="name"
              />
              <input onChange={(e) => setEmail(e.target.value)}
                          value={email}
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                name="email"
              />
              {/* <input onChange={(e) => setSubject(e.target.value)}
                          value={subject}
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Subject"
                name="_subject"
              /> */}
              <textarea onChange={(e) => setMessage(e.target.value)}
                          value={message}
                className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Type your message here..."
                name="message"
                style={{ height: 121 }}
                defaultValue={""}
              />
              <button 
                onClick={handleContact} class="bn632-hover bn28" id="button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

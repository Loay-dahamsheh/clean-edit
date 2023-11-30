import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookNow = () => {
  const [authToken, setAuthToken] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
  });

  useEffect(() => {

    const Token = getCookie("accessToken");
    setAuthToken(Token);
    console.log(Token);

    axios.get('http://127.0.0.1:3001/shoppingcart',{
      headers: {
        Authorization: ` ${Token}`
        // Add other headers if needed
      }
    })
    // console.log(response.data)
      .then(response => {
        setBookingData(response.data.shoppingcart);
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });
  }, []);


  const getCookie = (name) => {
    let cookieArray = document.cookie.split('; ');
    for (let cookie of cookieArray) {
      let [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };


  const Token = getCookie("accessToken");
console.log(authToken);


  const handleDelete = (bookingId, index) => {
    axios.put(`http://localhost:3001/product/delete/${bookingId}`,bookingData,{
      headers: {
        Authorization: ` ${Token}`
        // Add other headers if needed
      }
    })
      .then(response => {
        const updatedBookingData = [...bookingData];
        updatedBookingData.splice(index, 1);
        setBookingData(updatedBookingData);
      })
      .catch(error => {
        console.error('Error deleting booking data:', error);
      });
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios.post('http://127.0.0.1:3001/booking', formData, {
      headers: {
        Authorization: ` ${Token}`
        // Add other headers if needed
      }
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully logged in',
          text: `Welcome ${response.data}`, // Fix: use backticks (`) for template literals
          showConfirmButton: true,
          timer: 5000, // Set a timer for 5 seconds (adjust as needed)
          confirmButtonText: 'OK',
        });
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };
  
  return (
    <div>
      <h2>Booking Information</h2>
      {authToken &&( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookingData.map((booking, index) => (
  <div key={index} className="bg-white p-6 rounded-md shadow-md" id='add'>
            <img src={booking.image_url} alt={`Image ${index}`} className="mb-4 rounded-md" />
            <p className="text-xl font-semibold mb-2">Name: {booking.name}</p>
            <p className="text-base">Price: {booking.price}</p>
            <button onClick={() => handleDelete(booking.id, index)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>)}

      <div id='koko' className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3">
                <div className="mb-5">
                  <label htmlFor="location" className="mb-3 block text-base font-medium text-[#07074D]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <button type="submit" id='dffd' className="bn632-hover bn28">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookNow;
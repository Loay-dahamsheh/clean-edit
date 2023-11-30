import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";



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

const Profile = () => {
  const [authToken, setAuthToken] = useState(null);

  const [userData, setUserData] = useState({
    id: "", // Replace with the actual user ID
    username: "",
    email: "",
    phone_number: "",
    password: "",
    avatar: "",
    wishlist: [], // Add wishlist property to the initial state
  });

  const [photoPreview, setPhotoPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const handleSelectPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleAvatarChange;
    input.click();
  };

  useEffect(() => {
    const Token = getCookie("accessToken");
    setAuthToken(Token);
    
    const id = Cookies.get("id"); // Replace with the actual user ID
    axios
      .get('http://127.0.0.1:3001/userInfo',{
        headers: {
          Authorization: ` ${authToken}`,
          // Add other headers if needed
        },
      })
      .then((response) => {
        console.log("User Data:", response.data);
        setUserData(response.data);
        setPhotoPreview(response.data.avatar);
      })
      .catch((error) => {
        console.error("Error fetching user data from the server:", error);
      });


      

    // Fetch wishlist data from JSON file
    axios
      .get(`http://localhost:4000/wishlist/${id}`) // Replace with the actual path to your JSON file
      .then((response) => {
        console.log("Wishlist Data:", response.data);
        setUserData((prevUserData) => ({
          ...prevUserData,
          wishlist: response.data.wishlist,
        }));
      })
      .catch((error) => {
        console.error("Error fetching wishlist data from the server:", error);
      });
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
     let formData = new FormData()
     formData.append("image", file)

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = async () => {
    //   const base64Image = reader.result;

      try {
        // Update the user data on the JSON server
        const response = await axios.put(
          'http://127.0.0.1:3001/updateuserimage',
          formData,
          {
            headers: {
              Authorization: ` ${authToken}`
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
          let photoUrl = URL.createObjectURL(file)
          setPhotoPreview(photoUrl);
        } else {
          console.error("Failed to update avatar.");
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    // };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = Cookies.get("id"); // Replace with the actual user ID
console.log(userData.password);
      const response = await axios.put(
        'http://127.0.0.1:3001/edituser',userData,{
          headers: {
            Authorization: ` ${authToken}`
            // Add other headers if needed
          },
        },);

      if (response.status === 200) {
        alert("User data updated successfully!");
      } else {
        alert("Failed to update user data.");
      }
    } catch (error) {
      alert("Error updating user data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <div className="mt-2">
            <div
              className="block w-40 h-40 rounded-full m-auto shadow"
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundImage: `url('${
                  photoPreview !== null ? photoPreview : userData.avatar
                }')`,
              }}
            />
          </div>
          <button
            onClick={handleSelectPhoto}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Change Photo
          </button>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="mt-4 text-center p-4 md:mt-0"
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="nameInput"
                className="block text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nameInput"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  className="mt-1 p-2 border rounded-md w-full max-w-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="emailInput"
                className="block mt-2 text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="emailInput"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="mt-1 p-2 border rounded-md w-full max-w-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneInput"
                className="block mt-2 text-sm font-medium text-gray-500"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phoneInput"
                  value={userData.phone_number}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      phone_number: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border rounded-md w-full max-w-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="passwordInput"
                className="block mt-2 text-sm font-medium text-gray-500"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="passwordInput"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="mt-1 p-2 border rounded-md w-full max-w-md"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      </div>
      {/* Wishlist Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
        {userData.wishlist && userData.wishlist.length > 0 ? (
          <ul className="list-disc list-inside">
            {userData.wishlist.map((item, index) => (
              <li key={index}>{item.item} - ${item.price}</li>
            ))}
          </ul>
        ) : (
          <p>No items in the wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import Cookies from "js-cookie";

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");
  const [isNavVisible, setNavVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in using persistent storage (e.g., cookies)
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      // User is logged in
      setLoggedIn(true);
      setUserProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    } else {
      // User is not logged in
      setLoggedIn(false);
      setUserProfileImage("");
    }
  }, []);

  const handleLogin = () => {
    // Perform authentication logic

    // Set persistent storage (e.g., cookies) to indicate the user is logged in
    // Cookies.set("accessToken");

    // Update local state
    setLoggedIn(false);
    setUserProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");

    // Redirect to the login page
    navigate("/Login");
  };

  const handleLogout = () => {
    // Clear persistent storage (e.g., cookies) to indicate the user is logged out
    Cookies.remove("accessToken");

    // Update local state
    setLoggedIn(false);
    setUserProfileImage("");

    // Redirect to the home page or any other desired location
    navigate("/");
  };

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  const NavLogin = isLoggedIn ? (
    <div className="flex items-center">
      <Link to="/Profile">
        <img
          src={userProfileImage}
          alt="User Profile"
          className="h-8 w-auto rounded-full mr-2"
        />
      </Link>
      <Link
        to="/"
        onClick={handleLogout}
        className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
      >
        Logout
      </Link>
    </div>
  ) : (
    <div className="flex ">
      <Link
        to="/Login"
        // onClick={handleLogin}
        className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
      >
        Sign in
      </Link>
      <Link
        to="/Registration"
        className="block text-md px-4 ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <div className="sticky top-0 w-full z-50">
      <nav
        id="navv"
        className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700 bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100"
      >
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <img
              id="imageee"
              src="https://s3.envato.com/files/262194812/thumbnail.png"
              alt="Your Logo"
              className="h-8 w-auto"
            />
            <div>
              <span
                id="Cleaning"
                className="text-blue-700 font-semibold text-xl tracking-tight"
              >
                CleanWave
              </span>
            </div>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={toggleNav}
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
        {isNavVisible && (
          <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div className="text-md font-bold text-blue-700 lg:flex-grow">
              <Link
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Home
              </Link>

              <Link
                to="/Categores"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Services
              </Link>

              <Link
                to="/AboutUs"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                About
              </Link>
              <Link
                to="/ContactUs"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Contact
              </Link>
            </div>
            <Search />
            <div className="flex ">{NavLogin}</div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;

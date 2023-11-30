import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Admim/Dashboard";
import Users from "../Admim/Users";
import Card2 from "../Admim/Card2";
import Categores from "../Admim/Categores";
import Card1 from "./Card1";
import Contact from "./Contact";

const Admin = () => {
  const [User, setUser] = useState([]);
  const [page, setPage] = useState("profile");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const history = useNavigate();

  console.log(page); // fetch products
  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUser(response.data);
        setPhotoPreview(response.data.profile_image_name);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  function logout() {
    removeCookie("token");
    history("/");
  }

  // to open and close sidebar
  const [isSideOpen, setIsSideOpen] = useState(true);

  return (
    <div className="flex h-full z-50">
      {/* sidebar */}
      <div
  className={`fixed w-64 h-full bg-white border-r overflow-y-auto ${
    isSideOpen ? "left-0" : "-left-64"
  }`}
//   style={{ zIndex: 1000 }} // Set a higher z-index value
>
        <button
          aria-label="toggle sidebar"
          className={`${
            isSideOpen ? "hidden" : "flex"
          } lg:hidden h-10 w-10 bg-gray-600 absolute right-0 mt-16 -mr-10 items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800`}
          onClick={() => setIsSideOpen(!isSideOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-adjustments"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#FFFFFF"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></svg>
        </button>
        <button
          aria-label="Close sidebar"
          className={`${
            isSideOpen ? "block" : "hidden"
          } lg:hidden h-10 w-10 bg-grey-600 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white`}
          onClick={() => setIsSideOpen(!isSideOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></svg>
        </button>
        <aside className="flex flex-col w-64 h-auto px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                <label className="px-3 text-xs text-grey-700 uppercase dark:text-gray-400">
                  Manage Account
                </label>
                <button
                  className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={() => setPage("Dashboard")}
                >
                  <span className="mx-2 text-sm font-medium">Dashboard</span>
                </button>

                <button
                  className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={() => setPage("Users")}
                >
                  <span className="mx-2 text-sm font-medium">Users</span>
                </button>

                <button
                  className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={() => setPage("Categores")}
                >
                  <span className="mx-2 text-sm font-medium">Categores</span>
                </button>
                <button
                  className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={() => setPage("Card1")}
                >
                  <span className="mx-2 text-sm font-medium">Card1</span>
                </button>

                <button
                  className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={() => setPage("Card2")}
                >
                  <span className="mx-2 text-sm font-medium">Card2</span>
                </button>
                <button
                  className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={() => setPage("Contact")}
                >
                  <span className="mx-2 text-sm font-medium">Contact</span>
                </button>
              </div>

              <div className="space-y-3 ">
                <button
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  onClick={logout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="mx-2 text-sm font-medium">Log Out</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>
      </div>

      {/* content */}
      <div className="flex-1">
        <div className={`${page === "Dashboard" ? "block" : "hidden"} w-full`}>
          <Dashboard />
        </div>

        <div className={`${page === "Users" ? "block" : "hidden"} w-full`}>
          <Users />
        </div>

        <div className={`${page === "Card2" ? "block" : "hidden"} w-full`}>
          <Card2 />
        </div>

        <div className={`${page === "Categores" ? "block" : "hidden"} w-full`}>
          <Categores />
        </div>

        <div className={`${page === "Card1" ? "block" : "hidden"} w-full`}>
          <Card1 />
        </div>
        <div className={`${page === "Contact" ? "block" : "hidden"} w-full`}>
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Card2 = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    AOS.init();

    axios
      .get("http://127.0.0.1:3001/dashboard/allemployees")
      .then((response) => {
        setData(response.data.employees);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 data-aos="fade-up"> Clean Wave Team</h1>
      <br />
      <br />
      <br />
      <div id="lk" className="flex justify-evenly flex-wrap">
        {currentItems.map((key, index) => (
          <div key={index} data-aos="fade-up">
            <div
              id="lalala"
              className="grid-rows-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              
                <img  className="rounded-t-lg" src={key.image_url} alt=""/>
            
              <div className="p-5">
                
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {key.name}
                  </h5>
                
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {key.position}
                </p>
                <br />
              </div>
            </div>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="flex justify-center mt-8">
        {data.length > itemsPerPage && (
          <ul className="flex space-x-2">
            {Array(Math.ceil(data.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`cursor-pointer px-3 py-1 rounded ${
                    index + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Card2;

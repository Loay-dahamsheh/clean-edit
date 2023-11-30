import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from "./Button";
import { Link } from 'react-router-dom';

const Categories = () => {
  const [cardsData, setCardsData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/secondpage/category/17')
      .then(response => {
        setCardsData(response.data.product);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filter cards with IDs 4, 5, and 6
  // const filteredCards = cardsData.filter(card => [5, 6, 7].includes(card.id));
  const toggleWishlist = (cardId) => {
    if (wishlist.includes(cardId)) {
      setWishlist(wishlist.filter((id) => id !== cardId));
      // Remove the card from the user's favorites
      setUserFavorites(userFavorites.filter((card) => card.id !== cardId));
    } else {
      setWishlist([...wishlist, cardId]);
      // Add the card to the user's favorites
      setUserFavorites([...userFavorites, cardsData.find((card) => card.id === cardId)]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <br />
      <br />
      {Array.from({ length: 1 }).map((_, groupIndex) => (
        <div key={groupIndex}>
          <h1 className="text-3xl font-bold my-4">One Visit</h1>
          <h3 className="text-sm text-center text-gray-600 my-6">
            Awesome site. On the top advertising a business online includes<br />assembling Having the most keep.
          </h3>
          <br />
          <br />
          <div className="flex flex-wrap justify-center gap-20">
            {cardsData.map((card, index) => (
              <div key={index} id='lala' className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg" src={card.image_url} alt="" />
                <div className="p-4 text-center">
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.name}
                  </h5>
                  {/* <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                    {card.description}
                  </p> */}
                  <p className="text-bold text-gray-700 dark:text-gray-400 mb-4">
                    {card.price}
                  </p>
                  <button
                  onClick={() => toggleWishlist(card.id)}
                  className={`${
                    wishlist.includes(card.id) ? 'text-red-500' : 'text-blue-500'
                  } text-2xl focus:outline-none`}
                >
                  &#x2764;
                </button>
                  <Link
                    to={`/Detelis/${card.id}`}
                    id='Read' className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                  >
                  Datiles
                    <svg
                      className="w-3 h-3 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
            <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
        <div className="flex flex-wrap justify-center gap-20">
          {userFavorites.map((favorite, index) => (
            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg" src={favorite.image} alt="" />
              <div className="p-4 text-center">
                <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {favorite.title}
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                  {favorite.description}
                </p>
                <p className="text-bold text-gray-700 dark:text-gray-400 mb-4">
                  {favorite.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

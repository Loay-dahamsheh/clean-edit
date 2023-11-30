import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Card2 = () => {
  const [data, setData] = useState([]);
  const [newCard, setNewCard] = useState({ name: "", position: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);

  useEffect(() => {
    AOS.init();
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/Person")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const handleAddCard = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:4000/Person/${editingCardId}`, newCard)
        .then(() => {
          setIsEditing(false);
          setEditingCardId(null);
          setNewCard({ name: "", position: "", image: "" });
          fetchData();
        })
        .catch((error) => console.error("Error editing card: ", error));
    } else {
      axios
        .post("http://localhost:4000/Person", newCard)
        .then(() => {
          setNewCard({ name: "", position: "", image: "" });
          fetchData();
        })
        .catch((error) => console.error("Error adding card: ", error));
    }
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setEditingCardId(card.id);
    setNewCard({ name: card.name, position: card.position, image: card.image });
  };

  const handleDeleteCard = (cardId) => {
    axios
      .delete(`http://localhost:4000/Person/${cardId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error("Error deleting card: ", error));
  };

  return (
    <div>
      <h1 data-aos="fade-up">Meet Our Team</h1>
      <br />
      <br />
      <br />
      <div id="lk" style={{ marginLeft: '280px' }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((key, index) => (
          <div key={index} data-aos="fade-up" className="mr-4 ml-4">
            <div
              id="lalala"
              className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="w-full rounded-t-lg" src={key.image} alt="" />
              </a>
              <div className="p-3">
                <a href="#">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {key.name}
                  </h5>
                </a>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  {key.position}
                </p>
                <div className="flex justify-between">
                  <button className="text-blue-500 hover:underline" onClick={() => handleEditCard(key)}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeleteCard(key.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mr-4 ml-4">
          <div
            id="lalala"
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-3">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {isEditing ? 'Edit Card' : 'Add New Card'}
              </h5>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={newCard.position}
                  onChange={(e) => setNewCard({ ...newCard, position: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newCard.image}
                  onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
                />
                <button type="button" onClick={handleAddCard}>
                  {isEditing ? 'Edit Card' : 'Add Card'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;

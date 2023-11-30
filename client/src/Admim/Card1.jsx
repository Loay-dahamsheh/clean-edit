import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Card1 = () => {
  const [data, setData] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', description: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    AOS.init();
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:4000/MyData')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('حدث خطأ أثناء جلب البيانات: ', error));
  };

  const handleAddCard = () => {
    if (isEditing) {
      axios.put(`http://localhost:4000/MyData/${newCard.id}`, newCard)
        .then(() => {
          setIsEditing(false);
          setNewCard({ title: '', description: '', image: '' });
          fetchData();
        })
        .catch(error => console.error('حدث خطأ أثناء تعديل البيانات: ', error));
    } else {
      axios.post('http://localhost:4000/MyData', newCard)
        .then(() => {
          setNewCard({ title: '', description: '', image: '' });
          fetchData();
        })
        .catch(error => console.error('حدث خطأ أثناء إضافة البيانات: ', error));
    }
  };

  const handleEditCard = (card) => {
    setNewCard({ id: card.id, title: card.title, description: card.description, image: card.image });
    setIsEditing(true);
  };

  const handleDeleteCard = (id) => {
    axios.delete(`http://localhost:4000/MyData/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => console.error('حدث خطأ أثناء حذف البيانات: ', error));
  };

  return (
    <div>
      <div>
        <h1 className='keep'>
          Keep Your Home Clean Now..
        </h1>
      </div>
      <br></br>
      wonderful site. At the top is an advertisement for your online cleaning business..

      <div id='card'style={{ marginLeft: '280px' }} className="flex flex-wrap gap-4">
        {data && data.map(key => (
          <div key={key.id} data-aos="fade-up" className="max-w-xs">
            <div id='l' className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img id='image' className="w-full h-32 object-cover rounded-t-lg" src={key.image} alt="" />
              <div className="p-4">
                <h5 id='text' className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{key.title}</h5>

                <p id='text' className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">{key.description}</p>
                <div className="flex justify-between">
                  <button className="text-blue-500 hover:underline" onClick={() => handleEditCard(key)}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeleteCard(key.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br></br><br></br>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
  <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="p-4">
      <h2>{isEditing ? 'Edit Card' : 'Add Card'}</h2>
      <label>Title:</label>
      <input className="border rounded w-full py-2 px-3" type="text" value={newCard.title} onChange={(e) => setNewCard({ ...newCard, title: e.target.value })} />
      <label>Description:</label>
      <input className="border rounded w-full py-2 px-3" type="text" value={newCard.description} onChange={(e) => setNewCard({ ...newCard, description: e.target.value })} />
      <label>Image URL:</label>
      <input className="border rounded w-full py-2 px-3" type="text" value={newCard.image} onChange={(e) => setNewCard({ ...newCard, image: e.target.value })} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleAddCard}>{isEditing ? 'Edit Card' : 'Add Card'}</button>
    </div>
  </div>
</div>

    </div>
  );
};

export default Card1;

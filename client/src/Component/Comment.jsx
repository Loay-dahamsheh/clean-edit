import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


const Comment = () => {
  const [authToken, setAuthToken] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [rating, setRating] = useState(0);
  const { id } = useParams();


  useEffect(() => {
    const Token = getCookie("accessToken");
    setAuthToken(Token);
    axios
      .get(`http://127.0.0.1:3001/reaction/getcomment/${id}`)
      //http://127.0.0.1:3001/reaction/getcomment/21
      .then((response) => {
        console.log(id)
        console.log(response.data)

        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        author: "Your Name",
        date: new Date().toLocaleDateString(),
        comment: newComment,
        rating: rating,
      };

      axios
        .post(`http://127.0.0.1:3001/reaction/addcomment/${id}`, newCommentObj,{
          headers: {
            Authorization: ` ${authToken}`,
            // Add other headers if needed
          },
        })
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
          setRating(0);
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  };

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

  const handleEditComment = (comment) => {
    if (editComment.trim() !== "") {
      const updatedComment = {
        ...comment,
        newComment: editComment,
        rating: rating,
      };

      axios
        .put(`http://127.0.0.1:3001/reaction/updatecomment/${comment.id}`, updatedComment,{
          headers: {
            Authorization: ` ${authToken}`,
            // Add other headers if needed
          },
        })
        //http://127.0.0.1:3001/reaction/updatecomment/6
        .then(() => {
          const updatedComments = comments.map((c) =>
            c.id === comment.id ? updatedComment : c
          );
          setComments(updatedComments);
          setSelectedComment(null);
          setEditComment("");
          setRating(0);
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
        });
    }
  };

  //      .put(`http://127.0.0.1:3001/reaction/deletecomment/${comment.id}?token=${authToken}`)

  const handleDeleteComment = (comment) => {
    console.log(authToken)
    axios
      .put(`http://127.0.0.1:3001/reaction/deletecomment/${comment.id}`,newComment ,{
        headers: {
          Authorization: ` ${authToken}`,
          // Add other headers if needed
        },
      })
      //http://127.0.0.1:3001/reaction/deletecomment/6
      .then(() => {
        const updatedComments = comments.filter((c) => c.id !== comment.id);
        setComments(updatedComments);
        setSelectedComment(null);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handleDropdownToggle = (comment) => {
    setSelectedComment(selectedComment === comment ? null : comment);
  };

  const renderDropdownMenu = (comment) => {
    return (
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <button
          type="button"
          onClick={() => handleEditComment(comment)}
          className="bn632-hover bn28"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDeleteComment(comment)}
          className="bn632-hover bn28"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({comments.length})
            </h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required=""
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <span>Rate:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-yellow-500 hover:text-yellow-600 focus:outline-none ${
                    star <= rating ? "fill-star" : ""
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddComment}
              className="bn632-hover bn28"
              id="button"
            >
              Post comment
            </button>
          </form>

          {comments.map((comment) => (
            <article
              key={comment.id}
              className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900 relative"
            >
              <>
              {authToken &&( <div className="relative">
                <button
                  onClick={() => handleDropdownToggle(comment)}
                  className="absolute top-1 right-1 text-gray-500 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {selectedComment === comment && renderDropdownMenu(comment)}
              </div>)}
              </>
             
              <p className="text-gray-500 dark:text-gray-400">
                {selectedComment === comment ? (
                  <div>
                    <textarea
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <span>Rate:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-yellow-500 hover:text-yellow-600 focus:outline-none ${
                            star <= rating ? "fill-star" : ""
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEditComment(comment)}
                      className="bn632-hover bn28"
                      id="button"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-700 font-bold">
                      Author: {comment.username}
                    </div>
                    {/* <div className="text-gray-700">Date: {comment.date}</div> */}
                    <div className="flex items-center space-x-2 mt-2">
                      <span>Rating:</span>
                      {[...Array(comment.rating)].map((_, index) => (
                        <span
                          key={index}
                          className="text-yellow-500 fill-star"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {comment.comment}
                  </div>
                )}
              </p>
              <div className="flex items-center mt-4 space-x-4">
                {/* ... (your existing delete button) */}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Comment;

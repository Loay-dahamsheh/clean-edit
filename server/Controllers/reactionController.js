const Reaction = require('../Models/reactionModel');

const addrate = async (req, res) => {
    const { rate } = req.body;
    const productId = req.params.id;
    const userID = req.user.id

    try {
        await Reaction.addrate(productId, userID, rate);
        res.status(200).json({ success: true, message: 'your rate added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getRates = async (req, res) => {
  const productId = req.params.id;

  try {
      const rates = await Reaction.getRates(productId);
      res.status(200).json({ success: true, rates });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



const addcomment = async (req, res) => {
    const {comment} = req.body;
    const userID = req.user.id
    const productId = req.params.id;
    // const userID = 38;
    try{
        await Reaction.addcomment(productId,userID,comment);
        res.status(200).json({ success: true, message: 'your comment added successfully' });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//.............................................Dashboard comment.........................................................................


const getcomments = async (req, res) => {
    const productId = req.params.id;
    //const userID = req.user.id
    // const commentId = req.params.id;

    try {
      const comments = await Reaction.getcomments(productId);
      res.status(200).json(comments);
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting comments' });
    }
  };




  const updatecomment = async (req, res) => {
    const commentId = req.params.id;
        // const userID = 38;
    const { newComment } = req.body; // Assuming you'll send the updated comment in the request body
    const userID = req.user.id
    //const productId = req.params.id;
    try {
      const updatedComment = await Reaction.updatecomment(newComment,commentId,userID);
      res.status(200).json(updatedComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error updating comment' });
    }
  };



  const deletecomment = async (req, res) => {
    const commentId = req.params.id;
    const userID = req.user.id

    try {
      const result = await Reaction.deletecomment(commentId, userID);
      res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error deleting comment' });
    }
  };



module.exports = {
    addrate,
    getRates,
    addcomment,
    getcomments,
    updatecomment,
    deletecomment
    
    
};
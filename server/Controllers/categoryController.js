const { func } = require('joi');
const categoryModel = require('../Models/categoryModel');


//filter by id


async function getcategory(req, res) {
  try {
    const category = await categoryModel.categories(req.params.id);

    if (!category) {
      // Handle the case where the category is not found
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const modifiedResponse = {
      id: category.id,
      name: category.category,
      images: JSON.parse(category.cat_image), // Assuming cat_image is a JSON string containing image filenames
      // Add other category details here if needed
    };

    res.status(200).json(modifiedResponse);
  } catch (error) {
    // Respond with an error message if there's an error
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




  module.exports ={
    getcategory
};
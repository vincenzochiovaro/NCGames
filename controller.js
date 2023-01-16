const { displayCategories } = require("./model");

const getCategories = (request, response) => {
  displayCategories()
    .then((categoriesObject) => {
      const categories = categoriesObject.rows;
      response.status(200).send(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getCategories };

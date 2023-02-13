const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async() => {
    // Run your code here, after you have insured that the connection was made
    let newRecipe = {title: 'newRecipeTitle', level: 'Easy Peasy', ingredients: ['ing1', 'ing2', 'ing3'], cuisine: 'cuisine', dishType: 'soup', creator: 'new creator'}
    await Recipe.create(newRecipe)
    console.log(newRecipe.title)
  })
  .then(async() => {
    await Recipe.insertMany(data)
    data.forEach(element => {
      console.log(element.title)
    })
  })
  .then(async() => {
    await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(async() => {
    await Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .finally(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

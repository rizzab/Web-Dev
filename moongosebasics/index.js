const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieapp,{ useNewUrlParser: true, useUnifiedTopology: true }')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});
const Movie = mongoose.model('Movie', MovieSchema);
const amadeus = new Movie({
    title: 'Amadeus',
    year: 1984,
    score: 9.2,
    rating: 'R',
});
Movie.insertMany([
    {title: 'The Godfather', year: 1972, score: 9.2, rating: 'R'},
    {title: 'The Dark Knight', year: 2008, score: 9.0, rating: 'PG-13'},
    {title: 'Schindler\'s List', year: 1993, score: 8.9, rating: 'R'},
    {title: 'Pulp Fiction', year: 1994, score: 8.9, rating: 'R'},
])
    .then(data=>{
        console.log("IT WORKED!!!");
        console.log(data);
    })

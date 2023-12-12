const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3003;
const TMDB_API_KEY = '58c8396f69621d5ed64f07f766fa7994';

mongoose.connect('mongodb://mongo:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true, });

const movieSchema = new mongoose.Schema({
  title: String,
  
  // Agrega otros campos que desees almacenar
});

const Movie = mongoose.model('Movie', movieSchema);

app.get('/', async (req, res) => {
  try {
    // Hacer una solicitud a la API de TMDB para obtener películas populares
    const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
    const movies = tmdbResponse.data.results;

    // Almacena las películas en la base de datos
    await Movie.insertMany(movies);

    // Enviar la lista de películas como JSON
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener información de TMDB:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Info Microservice escuchando en el puerto ${PORT}`);
});

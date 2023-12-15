const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3003;
const TMDB_API_KEY = '58c8396f69621d5ed64f07f766fa7994';

async function getMovies() {
  try {
    // Hacer una solicitud a la API de TMDB para obtener películas populares
    const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
    const movies = tmdbResponse.data.results;
    return movies;
  } catch (error) {
    console.error('Error al obtener información de TMDB:', error.message);
    throw new Error('Error al obtener películas desde TMDB');
  }
}

app.get('/', async (req, res) => {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener películas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/moviesInfo/:id', async (req, res) => {
  try {
    // Hacer una solicitud a la API de TMDB para obtener películas populares
    const movieId = req.params.id;
    // Realiza una solicitud a la API de TMDB para obtener la información de una película específica por su ID
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es'
      }
    });
    const movieInfo = response.data;
    res.json({movies:movieInfo});
  } catch (error) {
    console.error('Error al obtener información de TMDB:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Info Microservice escuchando en el puerto ${PORT}`);
});


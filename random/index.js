const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3002;

app.get('/random', async (req, res) => {
  try {
    // Realizar una solicitud al servicio MyMovies para obtener la lista de películas
    const myMoviesResponse = await axios.get('http://mymovies:3001/mymovies');
    const myMovies = myMoviesResponse.data;

    // Obtener cinco películas al azar
    const randomMovies = myMovies.sort(() => Math.random() - 0.5).slice(0, 5);

    res.json(randomMovies);
  } catch (error) {
    console.error('Error al obtener películas al azar:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Random Microservice escuchando en el puerto ${PORT}`);
});

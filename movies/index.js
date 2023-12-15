const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/movies', async (req, res) => {
  try {
    // Realizar una solicitud al servicio Random para obtener la lista de películas
    const randomMoviesResponse = await axios.get('http://random:3002/randommovies');
    const randomMovies = randomMoviesResponse.data;

    res.json(randomMovies);
  } catch (error) {
    console.error('Error al obtener películas desde Random:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Movies Microservice escuchando en el puerto ${PORT}`);
});

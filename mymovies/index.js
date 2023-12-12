const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Conectar con MongoDB
mongoose.connect('mongodb://mongodb:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir un modelo de película
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener mis películas:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`MyMovies Microservice escuchando en el puerto ${PORT}`);
});

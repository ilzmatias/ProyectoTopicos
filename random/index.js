const express = require('express');
const axios = require('axios');
const app = express();

app.set('port', 3002);

app.get('/', (req, res) => {
  res.send('Hello, this is your Express web application!');
});

app.get('/randommovies', async (req, res) => {
  console.log("LLego solicitud");
  try {
    // Realizar una solicitud al microservicio MyMovies para obtener todas las películas
    const myMoviesResponse = await axios.get('http://mymovies:3001/favmovies');
    const allMovies = myMoviesResponse.data;
    // GET FROM allMovies RANDOMLY 5
    const randomMovieIds = getRandomMovies(allMovies, 5);
    // Obtener información detallada para cada película
    const detailedMoviesInfo = await Promise.all(randomMovieIds.map(async (movieId) => {
      try {
        const infoServiceResponse = await axios.get(`http://info:3003/moviesInfo/${movieId}`);
        return infoServiceResponse.data.movies;
      } catch (error) {
        console.error(`Error al obtener información detallada para la película ${movieId}:`, error.message);
        return null;
      }
    }));
    // Devolver el resultado como
    res.json({ movies: detailedMoviesInfo });
  } catch (error) {
    res.status(500).json({ error: `Error retrieving random movie IDs from MyMovies: ${error.message}` });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
// Función para obtener n elementos aleatorios de una matriz
function getRandomMovies(allMovies, n) {
  try {
    // Obtén el array de IDs
    const idsArray = allMovies.ids;

    if (!idsArray || !Array.isArray(idsArray) || idsArray.length < n) {
      throw new Error('Formato de datos incorrecto o no hay suficientes IDs');
    }

    // Baraja aleatoriamente los IDs
    const shuffledIds = idsArray.sort(() => 0.5 - Math.random());

    // Selecciona los primeros 'n' elementos
    const selectedIds = shuffledIds.slice(0, n);

    return selectedIds;
  } catch (error) {
    console.error('Error en la función getRandomMovies:', error.message);
    return []; // Retorna una lista vacía en caso de error
  }
}
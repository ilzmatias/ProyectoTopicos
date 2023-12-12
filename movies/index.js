const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenido al servicio de películas.');
});

app.listen(PORT, () => {
  console.log(`Movies Microservice escuchando en el puerto ${PORT}`);
});

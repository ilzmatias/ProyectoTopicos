const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const mongoUrl = 'mongodb://mongo_db:27017';
const dbName = 'my_movies';

app.set('port', 3001);


app.get('/favmovies', async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('my_movies');
    // Obtener 7 IDs de películas favoritas de la colección de MongoDB
    const allMovies = await collection.find({}).toArray();

    // Extraer los IDs de películas y convertirlos a enteros
    const ids = allMovies.map(doc => parseInt(doc.id));

    // Devolver el resultado como
    res.json({ ids });
  } catch (error) {
    res.status(500).json({ error: `Error retrieving random movie IDs: ${error.message}` });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      
      const movieList = document.getElementById('movie-list');
  
      data.movies.forEach(movie => {
        const listItem = document.createElement('li');
  
        const overviewParagraphs = movie.overview.split('\n').map(paragraph => {
          return `<p>${paragraph}</p>`;
        }).join('');
  
        listItem.innerHTML = `<strong>${movie.title}</strong> - ${movie.release_date}${overviewParagraphs}`;
        movieList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error al obtener datos de películas:', error.message);
    }
  });
  
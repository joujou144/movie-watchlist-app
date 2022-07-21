function renderMovieContent(contents, sign = 'add') {
  const movieContentArr = []

  try {
    contents.map((id) => {
      fetch(`http://www.omdbapi.com/?i=${id}&plot=full&type=movie&apikey=163a71e5`)
      .then(res => res.json())
      .then((movieContent) => {
        movieContentArr.push(movieContent)
        return movieContentArr
      })
      .then((arr) => {
        let contentHtml = ''
        contentHtml = arr.map((content) => {
          const { Poster, Title, Year, imdbRating, Runtime, Actors, Language, Genre, imdbID, Plot } = content
          return `
            <div class="movie-content">
            <div class="poster">
              <img src="${Poster}">
              <p class="rating">${imdbRating}</p>
            </div>
          
            <div class="movie-details">
              <h2 class="title">${Title}</h2>
              <button class="add-btn" id="${imdbID}"><i class="ri-${sign}-line"></i>Watchlist</button>
              <ul class="misc-info">
                <li class="year"><b>Year: </b>${Year}</li>
                <li class="runtime"><b>Runtime: </b>${Runtime}</li>
                
              </ul>
              <p class="genre"><b>Genre: </b>${Genre}</p>
              <p class="actors"><b>Starring:</b> ${Actors}</p>
              <p class="language"><b>Language:</b> ${Language}</p>
              <p class="plot">${Plot}</p>
            
            </div>
          </div>`
        }).join('')
        document.getElementById("result-container").innerHTML = contentHtml
      })
    })
  } catch (err) {
    console.log(err)
  }
}

export { renderMovieContent }
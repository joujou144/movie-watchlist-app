import { renderMovieContent } from "./render.js"

const myWatchlist = JSON.parse(localStorage.getItem("watchlist")) || []
const resultEl = document.getElementById("result-container")
resultEl.addEventListener("click", addToWatchlist)

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault()
  const searchInput = document.getElementById("search-input")
  if (searchInput.value) {
    getMovieIds(searchInput.value)    
  } else {
    resultEl.textContent =
     'Please type in the name of the movie you would like to search for.'
  }  
})

async function getMovieIds(value) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=163a71e5`)
    const data = await res.json()
    const movieIds = data.Search.map((item) => {
      return item.imdbID
    })
    renderMovieContent(movieIds)
  } catch (err) {
    console.log(err)
    resultEl.textContent =
      "Oopss..Unable to find what you're looking for"
  }
}

function addToWatchlist(e) {  
  const target = e.target
  if (target.tagName === "BUTTON") {
    if (!myWatchlist.includes(target.id)) {
      myWatchlist.push(target.id)
    }
  }
  localStorage.setItem("watchlist", JSON.stringify(myWatchlist))
}
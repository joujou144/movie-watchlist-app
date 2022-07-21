import { renderMovieContent } from "./render.js";

let myWatchlist = JSON.parse(localStorage.getItem("watchlist"))

document.getElementById("result-container").addEventListener("click", removeFromWatchlist)

if (myWatchlist) {
  renderMovieContent(myWatchlist, 'subtract')
}

function removeFromWatchlist(e) {
  const target = e.target
  if(target.tagName === "BUTTON") {
    myWatchlist = myWatchlist.filter((item) => item != target.id)

    if (myWatchlist.length != 0) {
      localStorage.setItem("watchlist", JSON.stringify(myWatchlist))
      renderMovieContent(myWatchlist, 'subtract')
    } else {
      localStorage.clear()
      document.getElementById("result-container").innerHTML = `
        <div class="no-content">
            
          <p class="watchlist-msg">Your watchlist is looking a little empty..</p>
          <p class="add-movie-msg"><i class="ri-add-line"></i>Let's add some movies to your list</p>
        
        </div>
      `
    }
  }
}

// Haetaan tarvittavat osan index.html-tiedostosta
const link = "https://omdbapi.com";
const apiKey = "c2fce884";
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// lataa elokuvat apin avulla
async function loadMovies(searchTerm) {
    const URL = `${link}/?s=${searchTerm}&page=1&apikey=${apiKey}`;
    const res = await fetch(`${URL}`);
    // Muutetaan hakutulos json-muotoon
    const data = await res.json();
    // Näytetään tulos vain jos response on True
    if (data.Response == "True") displayMovieList(data.Search);
}

// Hakukenttä millä haetaan elokuvan nimellä
function findMovies() {
    // Otetaan movieSearchBoxin teksti vastaan ja trimmataan kaikki välilyönnit alusta ja lopusta pois
    let searchTerm = (movieSearchBox.value).trim();
    // Jos teksti on pitempi kuin 0, piilotetaan "hakutulokset", muussa tapauksessa jätetään hakutulos auki
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    // Loopataan kaikkien löydettyjen elokuvion läpi
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('search-list-item');
        // Katsotaan löytyykö kuva katsomalla "Poster"-kohdan sisältöä, ja jos sisältö ei ole "N/A", otetaan kuva sivulta
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            // Mikäli kuvaa ei löydy, käytetään placeholder-kuvaa
            moviePoster = "/assets/placeholder.png";
        // Lisätään hakutuloksiin myös elokuvan nimi ja julkaisuvuosi
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    // Loopataan kaikkien löydettyjen elokuvien läpi
    searchListMovies.forEach(movie => {
        // Luodaan click-eventti eli kun painetaan haluttua elokuvaa, haetaan sen elokuvan tiedot
        movie.addEventListener('click', async () => {
            // Piilotetaan hakutulokset lisäämällä "hide-search-list"-css elementtiin
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`${link}/?i=${movie.dataset.id}&apikey=${apiKey}`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

// Näytetään halutun elokuvan tiedot
function displayMovieDetails(details) {
    // Kuten aikasemminkin, katsotaan löytyykö kuvaa, ja jos ei niin käytetään placeholderia kuvan sijasta
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "/assets/placeholder.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Vuosi: ${details.Year}</li>
            <li class = "rated">Ikäraja: ${details.Rated}</li>
            <li class = "released">Julkaistu: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre: </b>${details.Genre}</p>
        <p class = "writer"><b>Kirjoittajat: </b>${details.Writer}</p>
        <p class = "actors"><b>Päänäyttelijät: </b>${details.Actors}</p>
        <p class = "plot"><b>Juoni: </b>${details.Plot}</p>
    </div>
    `;
}

// Luodaan click-eventti joka piilottaa hakutulokset jos painetaan hakutulosten ulkopuolelle
window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});
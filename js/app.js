const APIKEY = 'k_5zh0b0pw'
const DEFAULTAPIURL = 'https://imdb-api.com/en/API/MostPopularMovies/'+APIKEY
const SEARCHAPIURL = 'https://imdb-api.com/en/API/SearchMovie/'+APIKEY
var cache

const form = document.querySelector('form')
const images = document.querySelector('images')
const search = document.querySelector('#search')
const main = document.querySelector('main')

async function getPopularMovies() {
    var data = await callApi(DEFAULTAPIURL)
    showMovies(data.items)
    cache = data.items
    return data 
}

async function searchMovies(searchTerm) {    
    var data = await callApi(SEARCHAPIURL+"/"+searchTerm)
    showMovies(data.results)
    cache = data.results
    return data
}

async function showMovies(movies){
    main.innerHTML = ''
    movies.forEach((movie)=>{
        const card = document.createElement("div")
        card.classList.add("card")
        const image = document.createElement("img")
        image.src = movie.image
        image.loading = "lazy"
        const title = document.createElement("p")
        title.innerText = `${movie.title} (${movie.year})`
        main.appendChild(card)        
        card.appendChild(image)
        card.appendChild(title)
    })
}

async function callApi(endpoint) {
    const resp = await fetch(endpoint)
    const data = await resp.json()    
    return data
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value

    if(searchTerm){
        searchMovies(searchTerm)
    }
})



//check for saved movies

//If no saved movies, get most popular
getPopularMovies();

//on movie selection, expand movie data

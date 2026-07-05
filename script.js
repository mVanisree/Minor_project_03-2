const buttons = document.querySelectorAll("button");
const movieContainer = document.getElementById("movie-container");
buttons.forEach(btn => {
    btn.addEventListener('click', ()=>{
        const mood = btn.dataset.mood
        fetchMovie(mood)
    });
});

async function fetchMovie(movieName){
    movieContainer.innerHTML= '<h2>Loading.....</h2>'
    let url = ` https://www.omdbapi.com/?s=${movieName}&apikey=4bf3e28a`
    const response = await fetch(url)
    const data = await response.json();
    displayMovie(data.Search)
}

function displayMovie(movies){
    movieContainer.innerHTML="";
    movies.forEach(movie =>{
        const card = document.createElement("div")
        card.classList.add("movie-card")
        card.innerHTML= `
        <img src ="${movie.Poster}">
        <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        </div>
        ` 
        movieContainer.appendChild(card)  
    })    
}

async function getMovie(movieName){
    let url = ` https://www.omdbapi.com/?t=${movieName}&apikey=4bf3e28a`;
    try{
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    if(data.Response == 'True'){
    const movieContainer = document.getElementById("movie-search")
    movieContainer.innerHTML = `<div class="searchMovie">
                    <img src="${data.Poster}">
                    <div class="movieDetails">
                        <h3>${data.Title}</h3>
                        <p><strong>Year:</strong> ${data.Year}</p>
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                    </div>
                </div>`
}
else{
    alert("Movie Not Found")
}
    }
    catch(error){
        console.log("error fetching Movie" , error)
    }
}
function HandleSearch(){
    const movieName = document.getElementById("search").value;
    if(movieName){
        getMovie(movieName)
    }
}


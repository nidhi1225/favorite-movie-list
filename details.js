const mainContainer =document.getElementById('main-container')


let favArray= [];

if(localStorage.favArray){
    localStorage.getItem("favArray", JSON.stringify(favArray));
    let parsedJson = JSON.parse(localStorage.favArray);
    // console.log((parsedJson));
    for(let i = 0; i <parsedJson.length;i++){
        favArray.push(parsedJson[i]);
    }
    console.log(favArray);

    
}




function showDetails(){
const url = window.location.href;

console.log(url)
const strs = url.split('?');
const id = strs.at(-1)
console.log(id)
fetchMovieDetails(id)


}



async function fetchMovieDetails(id) {
     
    
    // console.log(query)
    const API_KEY = "291bdbfa";
    const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
    const response = await request.json();
    // const movies = response.Search;
    console.log(response)

    getMovieDetails(response)
    

}
// {Title: 'Sita Ramam', Year: '2022', Rated: 'N/A', Released: '05 Aug 2022', Runtime: '2 min', …}
// Actors
// : 
// "Dulquer Salmaan, Mrunal Thakur, Rashmika Mandanna"
// Awards
// : 
// "N/A"
// BoxOffice
// : 
// "N/A"
// Country
// : 
// "India"
// DVD
// : 
// "N/A"
// Director
// : 
// "Hanu Raghavapudi"
// Genre
// : 
// "Action, Drama, Mystery"
// Language
// : 
// "Telugu"
// Metascore
// : 
// "N/A"
// Plot
// : 
// "An orphan soldier, Lieutenant Ram's life changes, after he gets a letter from a girl named Sita. He meets her and love blossoms between them. When he comes back to his camp in Kashmir, he sends a letter to Sita which won't reach her."
// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BN2RjZDJhYzUtOTQ5Yy00OWM3LWE5OTctM2Y0YWVmNzAzODllXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg"
// Production
// : 
// "N/A"
// Rated
// : 
// "N/A"
// Ratings
// : 
// [{…}]
// Released
// : 
// "05 Aug 2022"
// Response
// : 
// "True"
// Runtime
// : 
// "2 min"
// Title
// : 
// "Sita Ramam"
// Type
// : 
// "movie"
// Website
// : 
// "N/A"
// Writer
// : 
// "Hanu Raghavapudi, Jay Krishna, Raj Kumar Kandamudi"
// Year
// : 
// "2022"
// imdbID
// : 
// "tt20850406"
// imdbRating
// : 
// "8.1"
// imdbVotes
// : 
// "13,652"

function getMovieDetails(details){
    // movies.forEach(element => {
    // console.log(main)
    let detailsContainer = document.createElement('div')
    detailsContainer.classList.add('details-page-container');
    
    detailsContainer.innerHTML = `<div class="movie-poster">
                                <img src=${details.Poster} class="poster-image" alt="">
                            </div>
                            <div class="movie-details-container">
                                <div class="movie-details">
                                    <h1>${details.Title}</h1>
                                    <p class="movie-mini-details">
                                        <span class="material-symbols-outlined">calendar_month</span>
                                        <span>${details.Year}</span>
                                        <span class="material-symbols-outlined">timer</span>
                                        <span>${details.Runtime}</span>
                                        <span class="material-symbols-outlined fill">grade</span>
                                        <span>${details.imdbRating}</span>
                                        <span class="material-symbols-outlined">public</span>
                                        <span>${details.Country}</span>
                                        
                                    </p>
                                        
                                    <p class="movie-details-description">${details.Plot}</p>
                                    <p><span class="movie-mini-details">Genre: </span> ${details.Genre}</p>
                                    <p><span class="movie-mini-details">language: </span> ${details.Language}</p>
                                    <p><span class="movie-mini-details">Director: </span> ${details.Director}</p>
                                    <p><span class="movie-mini-details">Writers: </span> ${details.Writer}</p>
                                    <p><span class="movie-mini-details pb-20">Actors: </span> ${details.Actors}</p>
                                </div>
                                
                            </div>`

                            if(favArray.includes(details.imdbID)){
                                detailsContainer.innerHTML += `<div class="details-favIcon" id="${details.imdbID}"  onclick='favCheck("${details.imdbID}")'><span class="material-symbols-outlined fill">favorite</span></div>`
                            }else{
                                detailsContainer.innerHTML += `<div class="details-favIcon" id="${details.imdbID}"  onclick='favCheck("${details.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                            }
    mainContainer.appendChild(detailsContainer);
    // let carddocument.getElementsByClassName('card').addEventListener('click', showDetails(element.imdbID))
    

}



function favCheck(id){
    // const foo = document.querySelector('#foo')  
    // foo.addEventListener('click', (event) => {  
    // id.preventDefault();  
// });
    const favBtn = document.getElementById(id)
    // console.log(favBtn.childNodes[0])
    if(favArray.includes(id)){
        favArray = favArray.filter(e => e !== id)
        favBtn.childNodes[0].classList.remove('fill');
        console.log('fav removed ', favArray);
    }else{

    // console.log(this)
    // console.log(id);
    favArray.push(id);
    favBtn.childNodes[0].classList.add('fill');

    console.log('fav added ',favArray)
    
    }
    localStorage.setItem("favArray", JSON.stringify(favArray));
}

// http://www.omdbapi.com/?i=tt1349853
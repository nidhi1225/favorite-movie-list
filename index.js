const searchBar = document.getElementById('search-bar');
const main = document.getElementById('main')
// let html;
let cards = document.getElementsByClassName('card');

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

async function fetchMovie() {
     
    const query = searchBar.value
    if(query.length <= 2){
        console.log('less tan 2',query)
        return;
    }else{
    // console.log(query)
    const API_KEY = "291bdbfa";
    const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    // console.log(request)
    const response = await request.json();
    const movies = response.Search;
    
    main.innerHTML =``
    if(!movies){
        console.log('no result found');
        let display = document.createElement('h1');
        display.innerText = `no result found!`
        main.appendChild(display)
        return;
    }
    // console.log(movies)
   await getMovie(movies);
  
//    for(let i=0 ; i< cards.length ; i++){
//     cards[i].addEventListener('click', function(){
//         let idElement = document.getElementsByClassName('hide')[i]
//         // console.log(idElement.innerText)
//     })
//    
// 
// }
   
    }
}

function getMovie(movies){
    movies.forEach(element => {
    // console.log(main)
    let card = document.createElement('div')
    card.classList.add('card');
    
    card.innerHTML = `<a href="./details.html?${element.imdbID}">
                            <div class="cardImageContainer">
                                
                                <img src="${element.Poster}" class="cardImage" alt="poster Image not available right now!">            
                            </div>
                                 <div class="cardDetails">
                                    <div class="hide">${element.imdbID}</div>
                                    <div class="movieName"><h3>${element.Title}</h3></div>    
                                </div>
                     </a>`
                           

                            // <div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                            if(favArray.includes(element.imdbID)){
                                card.innerHTML += `<div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined fill">favorite</span></div>`
                            }else{
                                card.innerHTML += `<div class="favIcon" id="${element.imdbID}"  onclick='favCheck("${element.imdbID}")'><span class="material-symbols-outlined">favorite</span></div>`
                            }
                            main.appendChild(card);
    // let carddocument.getElementsByClassName('card').addEventListener('click', showDetails(element.imdbID))
    
});
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
// console.log(cards

// for(let i=0 ; i< cards.length ; i++){
//     cards[i].addEventListener('click', function(){
//         console.log(cards[i])
//     })
   

// }
    

// function showDetails(){
//     const url = window.location.href
// }



   

// const url = "http://www.site.com/234234234"
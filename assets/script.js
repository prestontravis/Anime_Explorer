//var quoteBox = document.getElementById("quoteBox");
//var quoteButton = document.getElementById("quotebutton")
// Not sure why, but the code doesn't like using the global variables above??  Works fine as temp var inside function blocks

var getQuote = function(title, num) {
    var animeName = title     //var for anime title/name
    //var tempTitle = "attack on titan"     //temp var for title testing
    //var for the api link + adding the title of selected anime to the 
    var searchQ = "https://animechan.vercel.app/api/random/anime?title=" + animeName
    //console.log(searchQ) //checking if searchQ working 
    var quoteBoxNum = "quoteBox" + num
    var quoteBox = document.getElementById(quoteBoxNum)  //get div where the quote is going
    //beginning of fetch for data from api
    fetch(searchQ)
          .then((response) => {
            if (!response.ok) {
                quoteBox.innerHTML = `No quotes available`
                return null;
            }
            return response.json()
          })
          .then((quote) => {
            if (!quote) {
                return
            }            
            //set html to the quote
            quoteBox.innerHTML = ` 
                <p>Anime: ${quote.anime}</p>
                <p>Character: ${quote.character}</p>
                <p>Quote: ${quote.quote}</p>
                `
          });       
}

var getAnime = function() {
    fetch('https://api.jikan.moe/v4/top/anime?limit=10&order_by=title')
        .then(response => response.json())
        .then(data => {
            for (i=0; i < data.data.length; i++) {
              // Test section //
              //console.log(data);
              //console.log("=============================================================");
              //console.log(data.data[i].title);
              //console.log(data.data[i].url);
              //console.log(data.data[i].images.jpg.image_url);
              //console.log(data.data[i].trailer.images.image_url);
              //console.log(data.data[i].trailer.embed_url);
              //console.log(data.data[i].mal_id)
              //console.log("=============================================================");
              
              var idName = "animeInfo" + i //var to iterate through all animeInfo e.g. 1st loop = "animeInfo0", 2nd loop = "animeInfo1", etc...
              //console.log(idName)
              var animeInfo = document.getElementById(idName) //var to add anime info
              animeInfo.innerHTML = `
              <ul> 
              <li>Title: ${data.data[i].title}</li>
              <li>URL: <a href="${data.data[i].url}" target="_blank">${data.data[i].url}</a></li>
              <li>Rating: ${data.data[i].score}</li>
              <li>Type: ${data.data[i].type}</li>
              <li>Ep: ${data.data[i].episodes}</li>
              <li>Rating: ${data.data[i].rating}</li>
              </ul>
              `
              var quoteName = "quoteButton" + i //var to iterate through all quoteButtons e.g. 1st loop = "quoteButton0", 2nd loop = "quoteButton1", etc...
              var quoteButton = document.getElementById(quoteName)
              animeImage = data.data[i].images.jpg.image_url
              quoteButton.src = animeImage;
              
              //getQuote(data.data[i].title, i)  //This needs to be put back in AFTER testing is finished. This is the call to get the quote.
            }
        })
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


//Function for when button is click'd
function favClick(event) {
  //console.log("clicked")
  var button = event.target
  //console.log(button)
  var hasFavor = button.classList.contains('favorited')  //this checks to see if the button is favorited already
  
  //if else statement to add/remove the 'favorited' class in html
  if (hasFavor) {
    button.classList.remove('favorited')
  } else {
    button.classList.add('favorited')
  }

  //assign local storage values to favAnime
  var localStorageAnime = localStorage.getItem('favAnime')
  var favAnime;
  
  if (localStorageAnime == null) {
    favAnime = []
  } else {
    favAnime = JSON.parse((localStorageAnime))
  }
  //console.log(favAnime)

  var curIndex = favAnime.indexOf(button.id); //grab the index of whichever button we're on
  //this if statement is for when a favButton is clicked it will add/remove it from local storage
  if (hasFavor) { 
    if (curIndex != -1) {
      favAnime.splice(curIndex, 1)
    }
  } else { //need else statement here to add to local storage
    favAnime.push(button.id)
  }

  //send to local storage
  localStorage.setItem('favAnime', JSON.stringify(favAnime));
}


//add event listener for favButtons
//let html load through first
window.addEventListener('load', function() {

  //the below code is used to change the button color
  var favs = document.querySelectorAll('.favButton') //Get all fav buttons
  //console.log(favs)
  for (i=0; i < favs.length; i++) {
    //console.log(favs[i])
    buttonID = favs[i].getAttribute('id')  //assign buttonID from localstorage
    console.log(buttonID)
    favAnime = JSON.parse(localStorage.getItem('favAnime'))

    if (favAnime == null){
      favAnime = []
    } 
    else if (favAnime.includes(buttonID)) {
      favs[i].classList.add('favorited')
    }
    //call to favClick function to add/remove local storage
    favs[i].addEventListener('click', favClick);
  }



///////////Start Here for flip button  NOT FINISHED


  //var flip = document.querySelectorAll('.flipButton')
  //console.log(flip)
  //flipButtonID = flip.getAttribute('id')
  //console.log(flipButtonID)
  getAnime()
});




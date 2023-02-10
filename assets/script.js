//var quoteBox = document.getElementById("quoteBox");
//var quoteButton = document.getElementById("quotebutton")

// Not sure why, but the code doesn't like using the global variables above??  Works fine as temp var inside function blocks


var getQuote = function(title) {
    var animeName = title     //var for anime title/name
    //var tempTitle = "attack on titan"     //temp var for title testing

    //var for the api link + adding the title of selected anime to the 
    var searchQ = "https://animechan.vercel.app/api/random/anime?title=" + animeName
    console.log(searchQ) //checking if searchQ working 

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
            var quoteBox = document.getElementById("quoteBox") //get div where the quote is going
            //set html to the quote
            quoteBox.innerHTML = ` 
                <p>Anime: ${quote.anime}</p>
                <p>Character: ${quote.character}</p>
                <p>Quote: ${quote.quote}</p>
                `
          });       
}


//add other api function here? I think it goes here or after what is below

var getAnime = function() {
    fetch('https://api.jikan.moe/v4/top/anime?limit=3&order_by=title')
        .then(response => response.json())
        .then(data => {
            for (i=0; i < data.data.length; i++) {
                console.log(data);
                console.log("=============================================================");
                console.log(data.data[i].title);
                console.log(data.data[i].url);
                console.log(data.data[i].images.jpg.image_url);
                console.log(data.data[i].trailer.images.image_url);
                console.log(data.data[i].trailer.embed_url);
                console.log(data.data[i].mal_id)
                console.log("=============================================================");

                var quoteButton = document.getElementById("quoteButton")
                animeImage = data.data[i].images.jpg.image_url
                console.log(typeof animeImage)
                quoteButton.src = animeImage;
                
                getQuote(data.data[i].title)
            }
        })
}





/*   //Might not be used, will instead be hidden until card flip
window.onload = function() {
    var quoteButton = document.getElementById("quoteButton");
  
    quoteButton.addEventListener("click", function() {
      //getQuote("attack on titan");
    });
  };
  */ 

//travis-preston
//getQuote(" ") //needs input term. This should come from the other api function (as a return? maybe idk? need more work to be done in other areas to be able to determine how to proceed)
getAnime()


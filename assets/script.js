let quoteBox = document.getElementById("quoteBox");

var getQuote = function(title) {
    //var for title?
    //var title
    //temp var for title
    var tempTitle = "attack on titan"
    var info; //var for data gathered from the api (anime, character, quote)
    //var for the api link + adding the title of selected anime to the 
    var searchQ = "https://animechan.vercel.app/api/random/anime?title=" + tempTitle
    console.log(searchQ) //checking if searchQ working 

    //beginning of fetch for data from api
    fetch(searchQ)
          .then((response) => response.json())
          .then((quote) => {
            info = quote
            //console.log(quote)
            console.log(info)

            //get div where the quote is going
            var quoteBox = document.getElementById("quoteBox")
            //set html to the quote
            quoteBox.innerHTML = ` 
                <p>Anime: ${info.anime}</p>
                <p>Character: ${info.character}</p>
                <p>Quote: ${info.quote}</p>
                `
          });       
}


//add other api function here? I think it goes here or after what is below

var getAnime = function() {
    fetch('https://api.jikan.moe/v4/top/anime?limit=1&order_by=title')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("=============================================================");
            console.log(data.data[0].title);
            console.log(data.data[0].url);
            console.log(data.data[0].images.jpg.image_url);
            console.log(data.data[0].trailer.images.image_url);
            console.log(data.data[0].trailer.embed_url);
            console.log(data.data[0].mal_id)
        })
}






window.onload = function() {
    var quoteButton = document.getElementById("quoteButton");
  
    quoteButton.addEventListener("click", function() {
      getQuote("attack on titan");
    });
  };

//travis-preston
//getQuote(" ") //needs input term. This should come from the other api function (as a return? maybe idk? need more work to be done in other areas to be able to determine how to proceed)
getAnime()
=======


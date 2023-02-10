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
    fetch('https://api.jikan.moe/v4/top/anime?limit=2&order_by=title')
        .then(response => response.json())
        .then(data => {
            for (i=0; i < data.data.length; i++) {
                // Test section //
                //console.log(data);
                console.log("=============================================================");
                console.log(data.data[i].title);
                //console.log(data.data[i].url);
                //console.log(data.data[i].images.jpg.image_url);
                //console.log(data.data[i].trailer.images.image_url);
                //console.log(data.data[i].trailer.embed_url);
                //console.log(data.data[i].mal_id)
                console.log("=============================================================");
                
                var idName = "animeInfo" + i //var to iterate through all animeInfo e.g. 1st loop = "animeInfo0", 2nd loop = "animeInfo1", etc...
                console.log(idName)
                var animeInfo = document.getElementById(idName) //var to add anime info
                animeInfo.innerHTML = ` 
                <p>Title: ${data.data[i].title}</p>
                <p>URL: <a href="${data.data[i].url}" target="_blank">${data.data[i].url}</a></p>
                <p>Trailer: ${data.data[i].trailer.embed_url}</p>
                `
                //!DANGER! DO NOT IMPLEMENT YET　！危ない！　けっしてください
                //NOTE: the below code needs to go above where the Trailer section is, HOWEVER while it DOES WORK, it brings back HUNDREDS of errors
                //<iframe src="${data.data[i].trailer.embed_url}" frameborder="0"</iframe>
                
                var quoteName = "quoteButton" + i //var to iterate through all quoteButtons e.g. 1st loop = "quoteButton0", 2nd loop = "quoteButton1", etc...
                var quoteButton = document.getElementById(quoteName)
                animeImage = data.data[i].images.jpg.image_url
                quoteButton.src = animeImage;
                
                //getQuote(data.data[i].title)  //This needs to be put back in AFTER testing is finished. This is the call to get the quote.
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


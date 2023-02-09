let quoteBox = document.getElementById("quoteBox");

//quoteBox.addEventListener("input", function() {
  //console.log(quoteBox.value);
//});


fetch("https://animechan.vercel.app/api/random/anime?title=naruto")
          .then((response) => response.json())
          .then((quote) => console.log(quote));
// Declared Variable

var anime = 
{
	title : [	"ATTACK ON TITAN", "COWBOY BEBOP", "DEATH NOTE", "DORAEMON", "FAIRYTAIL", "HUNTER X HUNTER", "INUYASHA", "GUNDAM", "NARUTO",
				"EVANGELION", "ONE PUNCH MAN", "KENSHIN", "TOKYO GHOUL", "YUGIOH"],


animeTitle: function() 
	{

    	$("#anime-view").empty();

	    	for (var i = 0; i < anime.title.length; i++) {
	         var a = $("<button>");

	         a.addClass("animeText");
	         // a.attr("value", anime.title[i]);
	         a.text(anime.title[i]);
	         $("#anime-view").append(a);
        }
        

  	},
animeInfoDisplay: function()
	{
		var selectedAnime = $(event.target).html().replace(/\s+/g, '');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedAnime + "&apikey=KjKXWFVXBYvqqeCxEGa0MgQqsVlxMcJS&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	for (var i in response.data)
        	{
				var animeDiv = $("<div class='anime'>");
				var rating = response.data[i].rating;
				var pRating = $("<p>").text("Rating: " + rating);
				animeDiv.append(pRating);

				// Retrieving the URL for the image
				var imgURL = response.data[i].images.fixed_width_still.url;
				var animatedURL = response.data[i].images.fixed_width.url;
				var image = $("<img>");
					image.attr("src", imgURL);
					image.attr("data-state", "still");
					image.attr("data-still", imgURL);
					image.attr("data-animate", animatedURL);
					image.attr("data-id", i);

				animeDiv.append(image);
				$("#anime-gif").prepend(animeDiv);
          	};

          console.log(image);
        });	
	},

};

$(document).ready(function() 
{
	anime.animeTitle();

	$("#anime-view").on("click", function(chooseAnime) 
	{

		$("#anime-gif").empty();
		anime.animeInfoDisplay();
		console.log(chooseAnime);
        
    });

    $("#anime-gif").on("click", function(play) 
    {

      var state = $(event.target).attr("data-state");

      if(state === "still") {
        $(event.target).attr("src", $(event.target).attr("data-animate"));
        $(event.target).attr("data-state", "animate");
      }

      if(state === "animate") {
        $(event.target).attr("src", $(event.target).attr("data-still"));
        $(event.target).attr("data-state", "still");
      }

      console.log(play);
    });

    $("#add-anime").on("click", function(event) {
        event.preventDefault();
        var newAnime = $("#anime-input").val().trim();
        anime.title.push(newAnime);

        anime.animeTitle();
      });



});



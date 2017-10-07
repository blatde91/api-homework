var topics = ["Sonic Youth", "Black Sabbath", "Chelsea Wolfe", "Black Flag", "Fugazi", "pageninetynine", "Yo La Tengo", "Dinosaur Jr.", "The Velvet Underground"];

function makeButtons() {

	$("#buttonBar").empty();
	for (var i=0; i < topics.length; i++) {
		var butt = $("<button class='btn btn-primary btn-md butt'>");


		butt.html(topics[i]);
		butt.addClass("buttons");
		butt.attr("data-name", topics[i]);
		$("#buttonBar").append(butt);
	}
}


makeButtons();

$("#input").on("click", function (event) {
	event.preventDefault();
	var newButt = $("#addButt").val().trim();
	topics.push(newButt);
	console.log(topics);
	makeButtons();
})


$(document).on("click", ".buttons" , function (event) {
	event.preventDefault();
	var buttValue = ($(this).attr("data-name"))


	function ajaxCall(passThis) {
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
			+ passThis + "&api_key=koJ99V4FAcMqlEMPI88DQg8tXHRCrr8A&limit=10&rating=PG";

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(res) {

			console.log(res)
			var dump = $("#gifDump");
			dump.empty();

			var gifs = res.data

			for (var i=0; i < gifs.length; i++) {
				console.log 
				var gifImg = $("<img>");
				var gifRating = $("<h1>");
				var gifDiv = $("<div class='gifDiv'>")
				var imageUrl = res.data[i].images.fixed_height_still.url;
				var rating = res.data[i].rating;

				gifImg.attr("src", imageUrl);
				gifImg.attr("data-still", res.data[i].images.fixed_height_still.url);
            	gifImg.attr("data-animate", res.data[i].images.fixed_height.url);
            	gifImg.attr("data-state", "still");
            	gifImg.addClass("image");
				gifRating.html("<p>Rating: " + rating + "</p>");
				

				dump.append(gifDiv);
				gifDiv.append(gifImg);
				gifDiv.append(gifRating);
			}
		});


	}

	ajaxCall(buttValue);

});

$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
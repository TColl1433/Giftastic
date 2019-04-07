// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];



// Function for displaying movie data
function renderButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        //("movie");
        a.addClass("movie")
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-movie", movies[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}



// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var movie = $("#movie-input").val().trim();
    // The movie from the textbox is then added to our array
    movies.push(movie);
    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});
// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();



// Connecting with the API
// Event listener for all button elements
$("button").on("click", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var movie = $(this).attr("data-movie");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=DeWMkxieaVPfT3flnBnjdTAVOMG6AfpJ&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var movieImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    movieImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(movieImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);

                    //attributes include data states for animation
                    // var animalGif = $("<img>");
                    // animalGif.attr("src", results[i].images.fixed_height_still.url);
                    // animalGif.attr("data-still", results[i].images.fixed_height_still.url);
                    // animalGif.attr("data-animate", results[i].images.fixed_height.url);
                    // animalGif.attr("data-state", "still");

                    // gifDiv.prepend(animalGif);
                    // gifDiv.prepend(gif);


                    // $("#gif-view").prepend(gifDiv);

                    //adds clickable animation
                    // $(animalGif).on("click", function () {
                    //     var state = $(this).attr("data-state")

                    //     if (state === "still") {
                    //         $(this).attr("src", $(this).attr("data-animate"));
                    //         $(this).attr("data-state", "animate");
                    //     } else {
                    //         $(this).attr("src", $(this).attr("data-still"));
                    //         $(this).attr("data-state", "still");
                    //     }
                    // });
                }
            }
        });
});
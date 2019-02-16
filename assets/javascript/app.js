$(document).ready(function() {

	// for tmdb
  $("#gotMovie, #book, #yourBook, #myBook, #movieButton, #myMovie, #poll").hide();

  var config = {
    apiKey: "AIzaSyA6K1EB3z6KS0KuIUaJ_na2IOthkFfq6yw",
    authDomain: "juliagoolia-764e1.firebaseapp.com",
    databaseURL: "https://juliagoolia-764e1.firebaseio.com",
    projectId: "juliagoolia-764e1",
    storageBucket: "juliagoolia-764e1.appspot.com",
    messagingSenderId: "45376190688"
  }; //end config

  firebase.initializeApp(config);

  // create variable dataRef to refer to database
  var dataRef = firebase.database();

  // create refrence to count child
  var countRef  = dataRef.ref().child('Count');

  // set count to 0 on page load
  var count = 0;

  // set child count to 0 in firebase
  countRef.set({
    count: count
  })

  // set url to empty string
	var yotubeURL = '';

  var prevSearch = '';

  function searchAgain(){
    $("#bookTitle").empty();
    $("#searchBox").show();
    $("#searchAgain").hide();
    // $("#infoBody").hide();
    // $("#book").hide();
    // $("#myBook").hide();
    // $("#myMovie").hide();
  }

  var input = document.getElementById("bookSearch");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    console.log('called');
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("search").click();
    }
  });

  $(document).on('click','#searchAgain', function(event){
    searchAgain();
  });

  $(document).on('click', '#infoBody', function(event){
    // $("#search").hide();
    $("#searchBox").hide();
    $("#searchAgain").show();
  });

  $(document).on('click', '#myBook', function(event){
    // $("#search").hide();
    $("#searchBox").hide();
    $("#searchAgain").show();
  });

  $(document).on('click', '#myMovie', function(event){
    // $("#search").hide();
    $("#searchBox").hide();
    $("#searchAgain").show();
  });
  // when user clicks search for book
	$(document).on('click','#search', function(event){

    event.preventDefault();

    $("#infoBody").show();
    $("#searchBox").hide();
    // grab book value
		var book = $("#bookSearch").val().trim();

    prevSearch = book;

    //  empty out search values
		$("#bookSearch, #authorSearch").val('');

    // hide show for each new search
    $("#myBook, #myMovie").hide();
  
    $("#bookTitle").show();

    // empty out all divs individually for next search
    $("#bookPoster, #myTitle, #myPoster, #find, #author, #category, #publish, #pages, #description, #movieTitle, #moviePoster, #director, #release, #rating, #runtime, #actors, #awards, #descriptionMovie").empty();

    if(book === ''){
      console.log('no entry');
      $("#bookTitle").text("Please enter a book or author to search.");
      $("#book").show();
    }else{
 
      // call bookSearch with book and author
      bookSearch(book);
    }
    
    var searchAgain = $("<button class='btn btn-default' id='searchAgain'>");
    var tag = $("<i class='fa fa-search'>");
    searchAgain.append(tag);
    // var prevSearch = $("<button class='btn animate btn-default' id='prevSearch'>");
    // $("#bookTitle").text('Results');
		$("#searchAgainDiv").prepend(searchAgain);
    // $("#searchAgainDiv").prepend(prevSearch);
    // .hide().fadeIn(3000)
    // $("#searchAgain").fadeIn(3000);
	})
	
  var runs = 0;

  // =========================================================================================================
  // previous search 

  $(document).on('click','#prevSearch', function(event){

    event.preventDefault();

    $("#infoBody").show();
    $("#searchBox").hide();

    // hide show for each new search
    $("#myBook, #myMovie").hide();
  
    $("#bookTitle").show();

    // empty out all divs individually for next search
    $("#bookPoster, #myTitle, #myPoster, #find, #author, #category, #publish, #pages, #description, #movieTitle, #moviePoster, #director, #release, #rating, #runtime, #actors, #awards, #descriptionMovie, #film").empty();

    bookSearch(prevSearch);

  })
  
// =========================================================================================================

  // function to search for book by title and author
	function bookSearch(book){

    $("#prevSearch").hide();

		var authKey = "AIzaSyD3t9FZQ_rFOQdwV_b3PVvH6FEWSNJjRck";

  	var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + authKey;

    // query google books
  	$.ajax({

    	url: queryURL,
    	method: "GET"

  	}).then(function(googleBook) {
  		// console.log(googleBook);

      runs++;

  		// spell check
      if(googleBook.totalItems == 0){

        // create text and show results
        $("#bookTitle").text("Your search didn't return any results. Check your spelling and try again.");
        var searchAgain = $("<button class='btn animate btn-default' id='searchAgain'>");
        var tag = $("<i class='fa fa-search'>");
        searchAgain.append(tag);
      
        var prevSearch = $("<button class='btn btn-default' id='prevSearch'>");

        $("#book").show();

      }else{

        // for each book in return array
  		  for(var i = 0; i < googleBook.items.length; i++){

          // if result has no image
  				if(googleBook.items[i].volumeInfo.imageLinks == null){

            // get title
            var title = googleBook.items[i].volumeInfo.title;
            var titleText = title;

            // create card
            var card = $("<div class='card' style='width: 18rem'>");

            // append no image to card
            card.append($("<img id='0' class='card-img-top bookImage' src='assets/images/noImage.jpg'>"));

            var cardBody = $("<div class='card-body'>");

            var cardText = $("<p class='card-text'>");

            // append title text to body
            cardText.append(titleText);
            cardBody.append(cardText);
            card.append(cardBody);

            // append card to screen
            $("#bookPoster").append(card);

            // unpdate each card with seperate id
            $("#0" ).attr('id', i);

            console.log($("#" + i).attr('id'));
          }else{

            // grab image
            var image = googleBook.items[i].volumeInfo.imageLinks.thumbnail;

            // grab title
            var title = googleBook.items[i].volumeInfo.title;
            var titleText = title;

            // create card
            var card = $("<div class='card' style='width: 18rem'>");

            // append new image
            card.append($("<img id='0' class='card-img-top bookImage' src='" + image + "'>"));

            var cardBody = $("<div class='card-body'>");

            var cardText = $("<p class='card-text'>");

            // append title text to body
            cardText.append(titleText);
            cardBody.append(cardText);
            card.append(cardBody);

            // append card to screen
            $("#bookPoster").append(card);

            // update each card with seperate id
            $("#0" ).attr('id', i);

          }

          // show results
            $("#book").show();

  			}
      }

      // when user clicks result image
  		$("img").on('click', function(event){
  			event.preventDefault();

        var prevSearch = $("<button class='btn animate btn-default' id='prevSearch'>");
        // $("#bookTitle").text('Results');
        // $("#searchAgainDiv").prepend(searchAgain);
        var tag = $("<i class='fa fa-arrow-left'>");
        prevSearch.append(tag);

        $("#searchAgainDiv").prepend(prevSearch);

        // update count
        count++;

        // show poll
        $("#poll").show();  					

        // find id
  			var id = $(this).attr('id');

        // catch last array element id
        if(id == 0){
          id = 9;
        }else{
          id = id -1;
        }

        // select image
        var myImg = googleBook.items[id].volumeInfo.imageLinks.thumbnail;

        // show selected image and search info
  			$("#bookPoster, #iframe").empty();
  			$("#bookTitle, #gotMovie, #book").hide();

        $("#myBook").show();

        // append clicked image
				$("#myPoster").append("<img id=myImg src='" + myImg +"'>");

        // for each search I added an if statement to catch a no return
        if(googleBook.items[id].volumeInfo.title == null){
          var titleText = "Title: Unavailable";
        }else{
          var title = googleBook.items[id].volumeInfo.title;
          var titleText = title;
        }

        if(googleBook.items[id].volumeInfo.description == null){
          var descriptionText = "  Description: Unavailable";
        }else{
          var description = googleBook.items[id].volumeInfo.description;
          var descriptionText = "  Description: " + description;
        }

        if(googleBook.items[id].volumeInfo.pageCount == null){
          var pagesText = "  Pages: Unavailable";
        }else{
          var pages = googleBook.items[id].volumeInfo.pageCount;
          var pagesText = "  Pages: " + pages;
        }

        if(googleBook.items[id].volumeInfo.categories == null){
          var categoryText = "  Category: Unavailable";
        }else{
          var category = googleBook.items[id].volumeInfo.categories[0];
          var categoryText = "  Category: " + category;
        }
  				
        if(googleBook.items[id].volumeInfo.authors == null){
          var authorText = "  Author: Unavailable";
        }else{
          var author = googleBook.items[id].volumeInfo.authors[0];
          var authorText = "  Author: " + author;
        }

  			if(googleBook.items[id].volumeInfo.publishedDate == null){
          var publishText = "  Publishing Date: Unavailable";
        }else{
          var date = googleBook.items[id].volumeInfo.publishedDate;
          var publishText = "  Publishing Date: " + date;
        }

  				
        // show info
        $("#bookInfo").show();

        // var searchAgain = $("<button class='book btn btn-default' id='searchAgain'>");
        // var tag = $("<i class='fa fa-search'>")
        // searchAgain.append(tag);
        // $("#searchAgain").stop(true,true);

        // append all info
        $("#myTitle").prepend(titleText);
        // $("#myTitle").append(searchAgain);
        $("#author").append("<span class='fa fa-pencil'></span>" + authorText);
        $("#description").append("<span class='fa fa-bars'></span>" + descriptionText);
        $("#category").append("<span class='fa fa-folder-o'></span>" + categoryText);
        $("#publish").append("<span class='fa fa-calendar'></span>" + publishText);
        $("#pages").append("<span class='fa fa-file-text-o'></span>" + pagesText);

        // $("#bookInfo").append($("#title"));
        // call movie search
  			tmbdSearch(title);

        // update count variable
        countRef.update({
          count: count
        })

        // create variable for poll
        var yesCount = 0;
        var noCount = 0;
        var maybeCount = 0;

        // create a refrence for title
        var title_ref;

        dataRef.ref().on("value", function(snapshot) {

          // if book already in database
          if(snapshot.child(title).exists()){

            // store child name
            title_ref = dataRef.ref(title);

            // update poll value
            yesCount = snapshot.child(title).val().yes;
            noCount = snapshot.child(title).val().no;
            maybeCount = snapshot.child(title).val().maybe;

            $("#yes").text(yesCount);
            $("#no").text(noCount);
            $("#maybe").text(maybeCount);

            
          // else book not in database
          }else{

            // create new refrence
            title_ref = title;

            // create new child
            title_ref = dataRef.ref().child(title);

            // set child 
            title_ref.set({
              yes: 0,
              no: 0,
              maybe: 0
            })
          }
  			});

        // when user clicks yes to poll
        $(document).on('click', '.yes', function(){

          $("input:radio").attr('checked', false);

          // increment titleCount
          yesCount++;

          // update child yes value
          title_ref.update({
            yes: yesCount
          })
        })

        // when user clicks no to poll
        $(document).on('click', '.no', function(){

          $("input:radio").attr('checked', false);

          // increment titleCount
          noCount++;

          // update child yes value
          title_ref.update({
            no: noCount
          })
        })

        $(document).on('click', '.maybe', function(){

          $("input:radio").attr('checked', false);

          // increment titleCount
          maybeCount++;

          // update child yes value
          title_ref.update({
            maybe: maybeCount
          })
        })
   		});	
  	});
  }

  // function for movie info search
  function ombdSearch(title){

    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=e062280";

    // call to imbd
    $.ajax({

      url: queryURL,
      method: "GET"

    }).then(function(response) {
      
      // search and store desired info
      var release = response.Released;
      var releaseText = "Release: " + release;

      if(response.Title == null){
        var titleText = 'Title Unavailable'
      }else{
        var title = response.Title;
        var titleText = title;
      }

      var description = response.Plot;
      var descriptionText = "Description: " + description;

      var director = response.Director;
      var directorText = "Director: " + director;

      var rating = response.Rated;
      var ratingText = "Rating: " + rating;

      var runtime = response.Runtime;
      var runtimeText = "Runtime: " + runtime;

      var actors = response.Actors;
      var actorsText = "Actors: " + actors;

      var awards = response.Awards;
      var awardsText = "Awards: " + awards;

      if(response.Poster == null){
        var image = 'assets/images/noImage.jpg';
      }else{
        var image = response.Poster;
      }

      // append movie poster
      $("#moviePoster").append("<img id=myImg src='" + image +"'>");

      // var searchAgain = $("<button class='btn btn-default movie' id='searchAgain'>");
      // var tag = $("<i class='fa fa-search'>");
      // searchAgain.append(tag);

      // append all new info
      $("#movieTitle").append(titleText);
      // $("#movieTitle").prepend(searchAgain);
      $("#director").append("<span class='fa fa-bullhorn movieIcon'></span>" +directorText);
      $("#release").append("<span class='fa fa-calendar movieIcon'></span>" +releaseText);
      $("#runtime").append("<span class='fa fa-clock-o movieIcon'></span>" +runtimeText);
      $("#rating").append("<span class='fa fa-star movieIcon'></span>" +ratingText);
      $("#actors").append("<span class='fa fa-users movieIcon'></span>" +actorsText);
      $("#awards").append("<span class='fa fa-trophy movieIcon'></span>" +awardsText);
      $("#descriptionMovie").append("<span class='fa fa-file-text-o movieIcon'></span>" +descriptionText);

    });   
  }

  // function to call for movie existence
  function tmbdSearch(title){

  	queryURL = "https://api.themoviedb.org/3/search/movie?api_key=1ebfe01505e78aebefb2f6d3e54a2dd0&query=" + title;

    // call to tmbd
	  $.ajax({

      url: queryURL,
   		method: 'GET'

	  }).then(function(response) {

      //  if movie found
   		if(response.results.length != 0){

        // grab id of trailer
   		  var key = response.results[0].id;

        // create when movie found
        var movieButton = $("<button class='btn btn-default' id='movieButton'>");

        // append button
        movieButton.append('See your movie!');

        // append button to screen
        $("#myPoster").append(movieButton);
        $("#iframe").hide();

        // call imbd for movie info
        ombdSearch(title);

        // call tmbd 2nd time for trailer
 			  findTrailer(key);
        $("#film").append("<span class='fa fa-video-camera'></span> Film: <span class='fa fa-check'></span>")

      // if movie doesnt exist 
		  }else{
        
        $("#film").append("<span class='fa fa-video-camera'></span> Film: We couldn't find a film")
   		}		
	  });
  }

  // function to find movie trailer
	function findTrailer(key) {

		var queryURL2 = "https://api.themoviedb.org/3/movie/" + key + "/videos?api_key=1ebfe01505e78aebefb2f6d3e54a2dd0"

    // 2nd call to tmbd
		$.ajax({

    	url: queryURL2,
   		method: 'GET'

		}).then(function(response) {

      // create id holder
   		var youtubeId = '';

      // loop through return results
   		for(var i = 0; i < response.results.length; i++){
   			var name = response.results[i].type;

        // if type is trailer
   			if (name == 'Trailer'){

          // grab key
   				youtubeId = response.results[i].key;
   			}
   		}

      // call to youtube
   		$.ajax({

        // use key to key embed trailer from youtube
    		url: 'https://www.googleapis.com/youtube/v3/videos?part=player&id=' + youtubeId + '&key=AIzaSyD3t9FZQ_rFOQdwV_b3PVvH6FEWSNJjRck',
   			method: 'GET'

			}).then(function(response) {

        // if no trailer
        if(response.items.length == 0){

          // hide div
          $("#trailer").hide();

        }else{

          // else show div
          $("#trailer").show();
          $("#iframe").show();
            
          // grab link
          var link = response.items[0].player.embedHtml;

          // add https
          link = link.replace(/\/\//g, "https://");

          // append link
          $("#iframe").append(link);

        }

        // when user clicks movie found button
        $(document).on('click', '#movieButton', function() {
          // body...

          // show movie info hide book info
          $("#myBook").hide();
          $("#myMovie").show();
          
        })
			});
		});
	}


});

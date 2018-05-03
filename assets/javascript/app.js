$(document).ready(function() {


  $("body").addClass('animated bounce');

  // $("#search").click(function(){
  //       // $("#search").animate({height: "50px", width:"330px"});
  //       // $("#search").text("Thank you for Using TRONTR");
  //   });
    
	// for tmdb
  // $("#searchAgain").hide();
	$("#gotMovie").hide();
	$("#book").hide();
	$("#yourBook").hide();
  $("#myBook").hide();
  $("#movieButton").hide();
  $("#myMovie").hide();
  $("#poll").hide();

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

  // array of memes
  // var memes = ["./assets/images/baby.jpg", "./assets/images/charlotte.jpg", "./assets/images/shakespeare1.jpg", 
  //             "./assets/images/mockingbird.jpg", "./assets/images/mobydick.jpg", "./assets/images/sideways.jpg", 
  //             "./assets/images/snowwhite.jpg", "./assets/images/twain.jpg", "./assets/images/bookclub.jpg", 
  //             "./assets/images/cat.jpg", "./assets/images/lisa.jpg", 
  //             "./assets/images/man.jpg", "./assets/images/red.jpg"];

  // var count = 0;

  // nextImage();

  // // function to dispaly images
  // function displayImage(){
  //   $("#memes").attr('src', memes[count]);

  //   //insert a random generator for count
  //   count = Math.floor(Math.random() * memes.length);
  // }

  // // function to update image every 6 seconds 
  // function nextImage() {

  //   // call displayImage every 6 seconds
  //   setInterval(displayImage, 6000);

  //   if (count >= memes.length) {
  //     count = 0;
           
  //   }
  // }

  // set url to empty string
	var yotubeURL = '';

  // fill random search
  // bookSearch('','dr.seuss')
  function searchAgain(){
    $("#searchBox").show();
    $("#searchAgain").hide();
    $("#infoBody").hide();
    $("#book").hide();
    $("#myBook").hide();
    $("#myMovie").hide();

  }

  $(document).on('click','#searchAgain', function(event){
    searchAgain();
  });
  // when user clicks search for book
	$(document).on('click','#search', function(event){

		event.preventDefault();

    $("#infoBody").show();
    $("#searchBox").hide();
    // grab book value
		var book = $("#bookSearch").val().trim();

    // grab autor vlaue
		// var author = $("#authorSearch").val().trim();

    // replaces first letter of each word in book to uppercase
		// book = book.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

    //  empty out search values
		$("#bookSearch").val('');
		$("#authorSearch").val('');

    // hide show for each new search
    $("#myBook").hide();
    $("#myMovie").hide();
    $("#bookTitle").show();

    // empty out all divs individually for next search
    $("#bookPoster").empty();
    $("#myTitle").empty();
    $("#myPoster").empty();

    $("#find").empty();
    $("#author").empty();
    $("#category").empty();
    $("#publish").empty();
    $("#pages").empty();
    $("#description").empty();

    $("#movieTitle").empty();
    $("#moviePoster").empty();
    
    $("#director").empty();
    $("#release").empty();
    $("#rating").empty();
    $("#runtime").empty();
    $("#actors").empty();
    $("#awards").empty();
    $("#descriptionMovie").empty();

		// console.log(book);

    // call bookSearch with book and author
		bookSearch(book, author);
    var searchAgain = $("<button class='btn btn-default' id='searchAgain'>");
    var tag = $("<i class='fa fa-search'>");
    searchAgain.append(tag);
    // $("#bookTitle").text('Results');
		$("#bookTitle").prepend(searchAgain);
    
	})
	
  var runs = 0;

  // function to search for book by title and author
	function bookSearch(book, author){

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
        $("#bookTitle").text("Your search didn't return any results. Check your spelling and try again.")
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

            // console.log($("#" + i).attr('id'));

          }

          // show results
          // if(runs > 1){
            // $("#bookTitle").text('We Found Some Books! Click On The One Your Looking For.');
            $("#book").show();
          // }else{
            // $("#bookTitle").text('Check out this random search!');
          // }
  				

  			}

      }

      // when user clicks result image
  		$("img").on('click', function(event){
  			event.preventDefault();

        // $("#radioPoll")[0].reset();


        // update count
        count++;

        // show poll
        $("#poll").show();  					

  			// console.log($(this).attr('id'));

        // find id
  			var id = $(this).attr('id');

        // catch last array element id
        if(id == 0){
          id = 9;
        }else{
          id = id -1;
        }

        // console.log(id);

        // select image
        var myImg = googleBook.items[id].volumeInfo.imageLinks.thumbnail;

  			// console.log(myImg);

        // show selected image and search info
  			$("#bookPoster").empty();
  			$("#bookTitle").hide();

				// $("#bookInfo").empty();
  			$("#iframe").empty();
				$("#gotMovie").hide(); 

        $("#book").hide();
        $("#myBook").show();

        // append clicked image
				$("#myPoster").append("<img id=myImg src='" + myImg +"'>");

        // for each search I added an if statement to catch a no return
        if(googleBook.items[id].volumeInfo.title == null){
          var titleText = "TITLE: Unavailable";
        }else{
          var title = googleBook.items[id].volumeInfo.title;
          var titleText = title;
        }

        if(googleBook.items[id].volumeInfo.description == null){
          var descriptionText = "DESCRIPTION: Unavailable";
        }else{
          var description = googleBook.items[id].volumeInfo.description;
          var descriptionText = "DESCRIPTION: " + description;
        }

        if(googleBook.items[id].volumeInfo.pageCount == null){
          var pagesText = "PAGES: Unavailable";
        }else{
          var pages = googleBook.items[id].volumeInfo.pageCount;
          var pagesText = "PAGES: " + pages;
        }

        if(googleBook.items[id].volumeInfo.categories == null){
          var categoryText = "CATEGORY: Unavailable";
        }else{
          var category = googleBook.items[id].volumeInfo.categories[0];
          var categoryText = "CATEGORY: " + category;
        }
  				
        if(googleBook.items[id].volumeInfo.authors == null){
          var authorText = "AUTHOR: Unavailable";
        }else{
          var author = googleBook.items[id].volumeInfo.authors[0];
          var authorText = "AUTHOR: " + author;
        }

  			if(googleBook.items[id].volumeInfo.publishedDate == null){
          var publishText = "PUBLISHING DATE: Unavailable";
        }else{
          var date = googleBook.items[id].volumeInfo.publishedDate;
          var publishText = "PUBLISHING DATE: " + date;
        }

  				
        // show info
        $("#bookInfo").show();

        var searchAgain = $("<button class='btn btn-default' id='searchAgain'>");
        var tag = $("<i class='fa fa-search'>")
        searchAgain.append(tag);

        // append all info
        $("#myTitle").append(titleText);
        $("#myTitle").append(searchAgain);
        $("#author").append(authorText);
        $("#description").append(descriptionText);
        $("#category").append(categoryText);
        $("#publish").append(publishText);
        $("#pages").append(pagesText);

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
                
            // console.log(titleCount);

            // store child name
            title_ref = dataRef.ref(title);

            // console.log(title_ref);

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
      // $("#movie-view").text(JSON.stringify(response));
      // console.log('imbdSearch');
      // console.log(response);

      // search and store desired info
      var release = response.Released;
      var releaseText = "RELEASE: " + release;

      if(response.Title == null){
        var titleText = 'TITLE UNAVAILABLE'
      }else{
        var title = response.Title;
        var titleText = title;
      }

      var description = response.Plot;
      var descriptionText = "DESCRIPTION: " + description;

      var director = response.Director;
      var directorText = "DIRECTOR: " + director;

      var rating = response.Rated;
      var ratingText = "RATING: " + rating;

      var runtime = response.Runtime;
      var runtimeText = "RUNTIME: " + runtime;

      var actors = response.Actors;
      var actorsText = "ACTORS: " + actors;

      var awards = response.Awards;
      var awardsText = "AWARDS: " + awards;

      if(response.Poster == null){
        var image = 'assets/images/noImage.jpg';
      }else{
        var image = response.Poster;
      }

      // append movie poster
      $("#moviePoster").append("<img id=myImg src='" + image +"'>");

      var searchAgain = $("<button class='btn btn-default' id='searchAgain'>");
      var tag = $("<i class='fa fa-search'>");
      searchAgain.append(tag);

      // append all new info
      $("#movieTitle").append(titleText);
      $("#movieTitle").append(searchAgain);
      $("#director").append(directorText);
      $("#release").append(releaseText);
      $("#runtime").append(runtimeText);
      $("#rating").append(ratingText);
      $("#actors").append(actorsText);
      $("#awards").append(awardsText);
      $("#descriptionMovie").append(descriptionText);

    });
      
  }

  // function to call for movie existence
  function tmbdSearch(title){

  	// console.log('called');
  	// console.log(title);
  	queryURL = "https://api.themoviedb.org/3/search/movie?api_key=1ebfe01505e78aebefb2f6d3e54a2dd0&query=" + title;

    // call to tmbd
	  $.ajax({

      url: queryURL,
   		method: 'GET'

	  }).then(function(response) {
   	  // console.log(response);

      //  if movie found
   		if(response.results.length != 0){

        // grab id of trailer
   		  var key = response.results[0].id;

   		  // console.log(key);

        // create when movie found
        var movieButton = $("<button class='btn btn-default' id='movieButton'>");

        // append button
        movieButton.append('We found a movie!');
        // $("#movieButton").show();

        // append button to screen
        $("#myPoster").append(movieButton);
        $("#iframe").hide();

        // call imbd for movie info
        ombdSearch(title);

        // call tmbd 2nd time for trailer
 			  findTrailer(key);

      // if movie doesnt exist 
		  }else{
        
        $("#find").append("<img id='noMovie' src ='assets/images/noVideo.jpg' height = 40px width = 40px>")
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
   		// console.log(response);

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

				// console.log(response);

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

          // console.log(link);

          // $("#iframe").show();
            

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

$(document).ready(function(){

//first static array of animals /dogs
var animals= ["English Bulldog", "Pug","Boston Terrier","Corgi", "French Bulldog", "Shar Pei", "Mastiff", "Dachshund", "Boo", "Bull Terrier" ];

//creates an indivial button for each animal/ element in the array
function makeButton()
{
	//first clear out the buttons to be able 
	//to update new dynamic buttons in the array
	$("#buttons").empty();
	for( var x=0; x<animals.length; x++)
	{

		
		//create button
		var btn= $("<button>");
		//add an attribute to the button
		btn.attr("data-name", animals[x]);
		//add a class to the button for css styling
		btn.addClass("animalBtn");
		//display text on the button
		btn.text(animals[x]);
		//display the button via html div
		$("#buttons").append(btn);
	}

	$("button").on("click", function() 
{
	$("#giphys").empty();
	console.log("clicked");
	//grabbing the button keyword the user clicks
	//and gets the data-name
	var gifVar= $(this).attr("data-name");
	console.log(gifVar);
	//console.log(gifVar);

	//creating url based on the gifVar and giphy api 
	//with the limi of 10 images.

	var myURL="https://api.giphy.com/v1/gifs/search?q=" +
        gifVar + "&api_key=dc6zaTOxFJmzC&limit=10"

        
        //calling the ajax class to pass the url, and the
        //GET method to return the myObj object
        $.ajax({
        	url:myURL,
        	method:"GET"
        //once myObj object returns, pass in myObj to the next function
        }).then(function(myObj)
        {

        	for(var x=0; x<myObj.data.length;x++)
        	{
        		if(myObj.data[x].rating!="r")
        		{
        			//create a div to hold the gif
        			var divgif=$("<div class='giphys'>");



        			//store the value of the rating
        			var rating =myObj.data[x].rating;
        			//display the rating
        			var p = $("<p>").text("Rating: "+rating);
        			//create the image
        			var gifimg= $("<img>");
        			//add the image address
        			gifimg.attr("src",myObj.data[x].images.fixed_height_still.url);
        			//appendding to the div that holds the gif "divgif"
        			gifimg.attr("data-still", myObj.data[x].images.fixed_height_still.url);
        			gifimg.attr("data-animate", myObj.data[x].images.fixed_height.url);
        			gifimg.attr("data-state", "still");
        			gifimg.addClass("mygif");
        			divgif.prepend(p);
        			divgif.append(gifimg);
        			
        			//displaying via html on "giphys"
        			$("#giphys").append(divgif);
        		}
        	}

        	//on click function for gif to turn from still to active state
        	$(".mygif").on("click", function()
        	{
        		console.log("clicked!");
        		var state=$(this).attr("data-state");
        		console.log(state);

        		if(state=="still")
        		{
        			$(this).attr("src", $(this).attr("data-animate"));
        			$(this).attr("data-state", "animate");
        		}
        		else
        		{
        			$(this).attr("src", $(this).attr("data-still"));
        			$(this).attr("data-state", "still");
        		}

        	});
        	
        	//console.log(myObj.data[0].images.fixed_height_still.url);
        	
        });

	
});

}




//dynamically adds a new element into the array
//on click function when the user inputs a string into the
//text box area and adds the string to the animal array
//and then calls the make button to make a button for 
//each element in the animal array
$("#add-gif").on("click", function()
{
	event.preventDefault();
	//creates new variables to add to the array
	//by user input when user clicks the submit button
	var myArr = $("#gif-input").val().trim();
	animals.push(myArr);
	//calls makeButton() to make buttons out of each element
	//in the animal array

	makeButton();
	//after creating a button, clear out the text value
	//or set the new vale to "empty"
	$('#gif-input').val('');


});
makeButton();
});



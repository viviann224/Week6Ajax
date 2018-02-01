///////////////////////////
//Vivian Nguyen
//Assignment 6
///////////////////////////

//page cannot be manipulated until the doc is ready
$(document).ready(function()
{
//first static array of animals /dogs
var animals= ["English Bulldog", "Pug","Boston Terrier","Corgi", "French Bulldog", "Shar Pei", "Mastiff", "Dachshund", "Boo the Pomeranian", "Bull Terrier" ];

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
		//empties out the old contents to show current button
		$("#giphys").empty();
		//grabbing the button keyword the user clicks
		//and gets the data-name
		var gifVar= $(this).attr("data-name");

		//creating url based on the gifVar and giphy api 
		//with the limit of 10 images.
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
        	//for loop to generate imgs based on button click
        	for(var x=0; x<myObj.data.length;x++)
        	{
        		//if the rating is not R then print
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
        			//add the image address (this is the still state first)
        			gifimg.attr("src",myObj.data[x].images.fixed_height_still.url);
        			//appending img addressed based on states
        			//when the image is still state
        			gifimg.attr("data-still", myObj.data[x].images.fixed_height_still.url);
        			//when the image is in animate state
        			gifimg.attr("data-animate", myObj.data[x].images.fixed_height.url);
        			//start the state as still
        			gifimg.attr("data-state", "still");
        			//give a class mygif for css styling
        			gifimg.addClass("mygif");
        			//add the div to before the p variable
        			divgif.prepend(p);
        			//add the img to the div
        			divgif.append(gifimg);
        			//displaying via html on "giphys"
        			$("#giphys").append(divgif);
        		}
        	}

        	//on click function for gif to turn from still to active state
        	$(".mygif").on("click", function()
        	{
        		//first determine what state the img is in
        		var state=$(this).attr("data-state");
        		//checks what to do for each state
        		if(state=="still")
        		{
        			//if still, change the img address to animate state
        			$(this).attr("src", $(this).attr("data-animate"));
        			//update my state to animate
        			$(this).attr("data-state", "animate");
        		}
        		else
        		{
        			//if animate, change the img address to still state
        			$(this).attr("src", $(this).attr("data-still"));
        			//update my state to still
        			$(this).attr("data-state", "still");
        		}
       		 });
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
	//stops the default action of an element from occuring
	event.preventDefault();
	//creates new variables to add to the array
	//by user input when user clicks the submit button
	var myArr = $("#gif-input").val().trim();
	//prevents the user from creating an empty button
	if(myArr!="")
	{
		//add new user input into the animals array
		animals.push(myArr);
		
		//calls makeButton() to make buttons out of each element
		//in the animal array
		makeButton();
		//after creating a button, clear out the text value
		//or set the new vale to "empty"
		$('#gif-input').val('');
	}
});
makeButton();
});



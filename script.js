/**
 * Project:      Nenya Web Form
 * Author:       www.adriannowak.net
 * Copyright:    N/A Opensource
 * Script Ver.: 
 * Last Update:  20 Oct 2022
 * Project URL:  
 */

//Because I hate myself...
"use strict";

//Session timeout time, change this to give user more or less time
var timeoutTime = 900000;

//If user hit refresh
/*window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};*/

//On DOM Ready
document.addEventListener("DOMContentLoaded", function() {
console.log('DOM Ready');

//Form Timeout
var t = setTimeout(endSession, timeoutTime);

//End session function
function endSession(){
	var timeoutHTML = '<div class="alert alert-danger" role="alert">Session timeout, please refresh this page and try again.</div>';
	document.getElementById("pageBox").innerHTML = timeoutHTML;
	clearInterval(x);
};

//Get session reset btn
var timeResetBtn = document.getElementById("timeReset");


//Create the visible timer
//https://stackoverflow.com/questions/49079315/15-minute-countdown-timer

	// Set the date we're counting down to
	var countDownDate = new Date().getTime() + timeoutTime;

	// Update the count down every 1 second
	var x = setInterval(function() {

		// Get today's date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for hours, minutes and seconds
		//var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		// Display the result in the element with id="demo"
		document.getElementById("timerCount").innerHTML = minutes + ":" + seconds;

		// Adda bit of red when under a min
		if (distance < 60000) {
			document.getElementById("timer").classList.add("text-danger");
		}

		//On session reset button click, reset visible timer and remove red text;
		timeResetBtn.onclick = function(){

			//Reset visible counter
			countDownDate = new Date().getTime() + timeoutTime;

			//Remove red text
			document.getElementById("timer").classList.remove("text-danger");

			//Reset timeout counter
			clearTimeout(t);
			t = setTimeout(endSession, timeoutTime);
		};

	}, 1000);

//Pages
var pageOne = document.getElementById("pageOne");
var pageTwo = document.getElementById("pageTwo");
var pageThree = document.getElementById("pageThree");
var pageFour = document.getElementById("pageFour");
var pageFive = document.getElementById("pageFive");

//Lets start with page one
var page = 0;

//Reset form on page refresh
document.getElementById("nenyaForm").reset();

//Buttons
var btnNext = document.getElementById("nenyaFormNextOne");
var btnBack = document.getElementById("nenyaFormBack");

//Disable buttons
btnNext.disabled = true;
btnBack.disabled = true;

//Form Data
	//First Name
	var nenyaFirstName = document.getElementById("nenyaFormFirstName");

	//Surname
	var nenyaSurname = document.getElementById("nenyaFormLastName");

	//Address Line 1
	var nenyaLineOne = document.getElementById("nenyaFormLineOne");

	//Address Line 2
	var nenyaLineTwo = document.getElementById("nenyaFormLineTwo");
	
	//City
	var nenyaCity = document.getElementById("nenyaFormCity");

	//Postcode
	var nenyaPostcode = document.getElementById("nenyaFormPostcode");

	//Tel Number
	var nenyaPhone = document.getElementById("nenyaFormTel");

	//Email
	var nenyaEmail = document.getElementById("nenyaFormEmail");

//Focus on first name
nenyaFirstName.focus();

//PAGE ONE - Check inputs and disable or enable button
function enablebtnNext(){
	if (nenyaFirstName.value !== "" && nenyaSurname.value !== ""){
		//Enable first button
		btnNext.disabled = false;

	}else{
		//Disable first button
		btnNext.disabled = true;
	}
}

//Validate UK Postcode
//https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
var postcodeValid = 0;
var nenyaFormPostcodeHelpText = document.getElementById("nenyaFormPostcodeHelpText");
nenyaPostcode.addEventListener("input", function(){
	var postcodeRegEx = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/gm; 
    if (postcodeRegEx.test(nenyaPostcode.value)){
    	console.log("postcode valid!");
    	postcodeValid = 1;
    	nenyaFormPostcodeHelpText.classList.remove("text-danger");
    }else{
    	console.log("postcode not valid");
    	postcodeValid = 0;
    	nenyaFormPostcodeHelpText.classList.add("text-danger");
    }
});

//Validate telephone number
var phoneValid = 0;
var nenyaFormPhoneHelpText = document.getElementById("nenyaFormPhoneHelpText");
nenyaPhone.addEventListener("input", function(){
	var phoneRegEx = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/; 
    if (phoneRegEx.test(nenyaPhone.value)){
    	console.log("phone valid!");
    	phoneValid = 1;
    	nenyaFormPhoneHelpText.classList.remove("text-danger");
    }else{
    	console.log("phone not valid");
    	phoneValid = 0;
    	nenyaFormPhoneHelpText.classList.add("text-danger");
    }
});

//Validate email
var emailValid = 0;
var nenyaFormEmailHelpText = document.getElementById("nenyaFormEmailHelpText");
nenyaEmail.addEventListener("input", function(){
	var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    if (emailRegEx.test(nenyaEmail.value)){
    	console.log("email valid!");
    	emailValid = 1;
    	nenyaFormEmailHelpText.classList.remove("text-danger");
    }else{
    	console.log("email not valid");
    	emailValid = 0;
    	nenyaFormEmailHelpText.classList.add("text-danger");
    }
});

//PAGE TWO - Check inputs and disable or enable button
function enablebtnNextPageTwo(){
	if (nenyaLineOne.value !== "" && nenyaCity.value !== "" && postcodeValid === 1){
		//Enable next button
		btnNext.disabled = false;

	}else{
		//Disable next button
		btnNext.disabled = true;

	}
}

//PAGE Three - Check inputs and disable or enable button
function enablebtnNextPageThree(){
	if (phoneValid === 1 && emailValid === 1){
		//Enable next button
		btnNext.disabled = false;

	}else{
		//Disable next button
		btnNext.disabled = true;

	}
}

//PAGE FOUR - Gather all user input for final check
function finalCheck(){
	console.log("generate final check");
	var output = "<small class='text-muted'>First Name</small><h5>";
	output += nenyaFirstName.value;
    output += "</h5><small class='text-muted'>Last Name</small><h5>";
	output += nenyaSurname.value;
	output +="</h5><small class='text-muted'>Address Line 1</small><h5>";
	output += nenyaLineOne.value;
	output += "</h5><small class='text-muted'>Address Line 2</small><h5>";
	output += nenyaLineTwo.value;
	output += "</h5><small class='text-muted'>City</small><h5>";
	output += nenyaCity.value;
	output += "</h5><small class='text-muted'>Postcode</small><h5>";
	output += nenyaPostcode.value;
	output += "</h5><small class='text-muted'>Telephone Number</small><h5>";
	output += nenyaPhone.value;
	output += "</h5><small class='text-muted'>Email</small><h5>";
	output += nenyaEmail.value;
	output += "</h5><br />";
	document.getElementById("userData").innerHTML = output;
}

//On First Name Input
nenyaFirstName.addEventListener("input", enablebtnNext);

//On Surname Input
nenyaSurname.addEventListener("input", enablebtnNext);

//On Address Line One Inputq
nenyaLineOne.addEventListener("input", enablebtnNextPageTwo);

//On City Input
nenyaCity.addEventListener("input", enablebtnNextPageTwo);

//On Postcode Input
nenyaPostcode.addEventListener("input", enablebtnNextPageTwo);

//On Tel Input
nenyaPhone.addEventListener("input", enablebtnNextPageThree);

//On Email Input
nenyaEmail.addEventListener("input", enablebtnNextPageThree);

//Generate timestamp
//https://stackoverflow.com/questions/5416920/timestamp-to-human-readable-format
function getTimestamp () {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();
  
  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

//On Form Submitted EDIT FUNCTION BELOW TO MAKE IT WORK WITH BACK END
function formSubmitted(){

	//Grab form data using constructor formData()
	//https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
	var form = document.getElementById('nenyaForm');
	var formData = new FormData(form);
	//console.log(formData);

	//Add time
	formData.append('timestamp', getTimestamp ());

	//Add time in unix epoch
	//https://en.wikipedia.org/wiki/Unix_time
	formData.append('timestampUnix', Date.now());

	//Convert data to JSON
	//https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
	var object = {};
	formData.forEach(function(value, key){
    	object[key] = value;
	});
	var json = JSON.stringify(object, null, 2);
	console.log(json);

	//1 if succesfull, 0 if not
	var submissionSuccessful = 1;

	//Create page HTML depending if successful or not.
	var pageData = document.getElementById("pageFive");
	var HTMLoutput;
	if (submissionSuccessful === 0) {
		HTMLoutput = '<div class="alert alert-danger" role="alert">'
		HTMLoutput += "Something went wrong, please refresh this page and try again.";
		HTMLoutput += '</div>';
	}else if(submissionSuccessful === 1){
		HTMLoutput = "<h1 class='display-4'>All done.</h1>";
		HTMLoutput += '<div class="alert alert-success" role="alert">';
		HTMLoutput += "<h4 class='alert-heading'>Submission Successful</h4>";
		HTMLoutput += "<p>Now the data would be send to server for processing. See below for form data in JSON format.</p>";
		HTMLoutput += "<hr />";
		HTMLoutput += '<pre><code>';
		HTMLoutput +=  json;
		HTMLoutput += '</code></pre>';
		HTMLoutput += '</div>';
	}
	pageData.innerHTML = HTMLoutput;

	//Stop session timeout
	clearTimeout(t);
	document.getElementById("timer").style.display = 'none';
}

//On Next button click
btnNext.onclick = function(event){

	//Stop default action
	event.preventDefault();

	//Detect page and run appropriate action
	if(page === 0){

		//PAGE TWO
		page++;
		console.log("page 1 to 2");

		//Enable back button
		btnBack.disabled = false;

		//Disable Next Button
		if (nenyaLineOne.value !== "" && nenyaCity.value !== "" && nenyaPostcode.value !== ""){
			btnNext.disabled = false;
		}else{
			btnNext.disabled = true;
		}

		//Move to next page
		pageOne.classList.remove("show");
		pageTwo.classList.remove("hide");

		setTimeout(function(){ pageOne.style.display = 'none'; },700);
		pageOne.classList.add("hide");

		pageTwo.classList.add("show");
		setTimeout(function(){ pageTwo.style.display = 'block'; },700);
	

		//Chamge focus
		setTimeout(function() {
			document.getElementById("nenyaFormLineOne").focus()
		}, 800);

		//Enable Next btn?
		enablebtnNextPageTwo();

	}else if(page === 1){

		//PAGE THREE
		page++;
		console.log("page 2 to 3");

		//Move to next page
		pageTwo.classList.remove("show");
		pageThree.classList.remove("hide");

		setTimeout(function(){ pageTwo.style.display = 'none'; },700);
		pageTwo.classList.add("hide");

		pageThree.classList.add("show");
		setTimeout(function(){ pageThree.style.display = 'block'; },700);
	

		//Chamge focus
		setTimeout(function() {
			document.getElementById("nenyaFormTel").focus()
		}, 800);

		//Enable Next btn?
		enablebtnNextPageThree();

	}else if(page === 2){

		//PAGE FOUR
		page++;
		console.log("page 3 to 4");

		//Move to next page
		pageThree.classList.remove("show");
		pageFour.classList.remove("hide");

		setTimeout(function(){ pageThree.style.display = 'none'; },700);
		pageThree.classList.add("hide");

		pageFour.classList.add("show");
		setTimeout(function(){ pageFour.style.display = 'block'; },700);
	
		//Submit button
		btnNext.innerText = "Submit";

		//
		finalCheck();

	}else if(page === 3){

		//PAGE FIVE
		page++;
		console.log("page 4 to 5");

		//Move to next page
		pageFour.classList.remove("show");
		pageFive.classList.remove("hide");

		setTimeout(function(){ pageFour.style.display = 'none'; },700);
		pageFour.classList.add("hide");

		pageFive.classList.add("show");
		setTimeout(function(){ pageFive.style.display = 'block'; },700);

		//Remove buttons
		btnNext.style.display = "none";
		btnBack.style.display = "none";

		//Form Submitted
		formSubmitted();
	}else{
		console.log("error");

	}
}

//On Back button click
btnBack.onclick = function(){

	//Detect page and run appropriate action
	if(page === 0){
		console.log("How did you...?");
	}else if(page === 1){

		//PAGE TWO to ONE
		page--;
		btnBack.disabled = true;
		console.log("page 2 to 1");

		//Move back a page
		pageOne.classList.remove("hide");
		pageTwo.classList.remove("show");

		pageTwo.classList.add("hide");
		setTimeout(function(){ pageTwo.style.display = 'none'; },700);

		setTimeout(function(){ pageOne.style.display = 'block'; },700);
		pageOne.classList.add("show");

		//enable Next
		enablebtnNext();

	}else if(page === 2){

		//PAGE THREE to TWO
		page--;
		console.log("page 3 to 2");

		//Move back a page
		pageTwo.classList.remove("hide");
		pageThree.classList.remove("show");

		pageThree.classList.add("hide");
		setTimeout(function(){ pageThree.style.display = 'none'; },700);

		setTimeout(function(){ pageTwo.style.display = 'block'; },700);
		pageTwo.classList.add("show");

		//Enable Next
		enablebtnNextPageTwo();

	}else if(page === 3){
		page--;
		console.log("page 4 to 3");

		//Move back a page
		pageThree.classList.remove("hide");
		pageFour.classList.remove("show");

		pageFour.classList.add("hide");
		setTimeout(function(){ pageFour.style.display = 'none'; },700);

		setTimeout(function(){ pageThree.style.display = 'block'; },700);
		pageThree.classList.add("show");

		btnNext.innerText = "Next";

	}else{
		page--;
		console.log("error");
	}
}
});//DOM Ready
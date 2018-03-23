
// These two variables can be adjusted for longer pauses/faster speeds
var speed = 1;
var pause = 5;


var moveSlide;
var pauseSlide;
var currentSlide = 0;
var currentWidth;
var position;
var stopPosition;
var sliderImages;
var curDirection;




// Check for user clicking next or previous buttons
window.onload = function() {
	document.getElementById("next").addEventListener("click", nextButton);
	document.getElementById("previous").addEventListener("click", prevButton);
}


// Check width of browser window on load. 
window.addEventListener("load", function() {
	if(window.innerWidth < 900)
	{
		let u = (window.innerWidth-200);
		slider(u,0,1);
	}
	else 
	{
		slider(700,0,1);
	}
});


// Resize based on width of browser window
window.addEventListener("resize", function() {
	currentSlide = 0;
	clearInterval(moveSlide);
	clearTimeout(pauseSlide);
	if(window.innerWidth < 900)
	{
		let v = (window.innerWidth-200);
		slider(v,0,1);
	}
	else 
	{
		slider(700,0,1);
	}
});




// Move to previous slide
function prevButton() {
	clearInterval(moveSlide);
	clearTimeout(pauseSlide);
	if(window.innerWidth < 900)
	{
		let w = (window.innerWidth-200);
		slider(w,position,0);
	}
	else 
	{
		slider(700,position,0);
	}
}


// Move to next slide
function nextButton() {
	clearInterval(moveSlide);
	clearTimeout(pauseSlide);
	if(window.innerWidth < 900)
	{
		let x = (window.innerWidth-200);
		slider(x,position,1);
	}
	else 
	{
		slider(700,position,1);
	}
}






/* 
	function slider() takes three arguments. CurWidth is the current width of the browser, curpostion is the current 
	position of the slider, and direction dictates, based on a value of 1 or 0, whether the slider
	should move right or left, respectively
*/

function slider(curWidth,curposition,direction)
{

/* 
	Get current image width based on size of browser window
    Get total width of all images in an array
*/

let getDivInner = document.getElementById("slider_inner");
let getDivOuter = document.getElementById("slider_outer");
let getDivContainer = document.getElementById("slider_container");
sliderImages = getDivInner.getElementsByTagName("img");
totalWidth = (sliderImages.length * curWidth + curWidth);
currentWidth = curWidth + "px";
stopPosition = 0;
position = curposition;
curDirection = direction;

for (let j = 0; j < sliderImages.length; j++)
{
	sliderImages[j].style.maxWidth = currentWidth;
}	
getDivContainer.style.width = currentWidth;
getDivInner.style.width = totalWidth + "px"; 
getDivOuter.style.width = currentWidth;

moveSlide = setInterval(function(){moveSlider(curWidth,curposition)},speed); 
}




// Move slider left or right, based on values passed from slider() function
function moveSlider(curWidth,curposition)
{
	clearTimeout(pauseSlider);
	if(stopPosition < curWidth)
	{
		if (curDirection === 1)
		{
			position--;
			stopPosition++;
			(0 - ((sliderImages.length * curWidth) - curWidth)) === (position) ? position = 0 : document.getElementById("slider_inner").style.left = position + "px"; 
			document.getElementById("next").removeEventListener("click", nextButton);
			document.getElementById("previous").removeEventListener("click", prevButton);
		}
		else if (curDirection === 0)
		{
			position++;
			stopPosition++;
			if (currentSlide === 0) 
			{
			position = (0 - ((sliderImages.length * curWidth) - curWidth));  
			}
			else 
			{
			document.getElementById("slider_inner").style.left = position + "px";
			}
			document.getElementById("next").removeEventListener("click", nextButton);
			document.getElementById("previous").removeEventListener("click", prevButton);
		}
	}
	else if(stopPosition === curWidth)
	{
		stopPosition = 0;
		pauseSlider(curWidth);
	}


}


// Pause slider
function pauseSlider(curWidth)
{
	if(curDirection === 0)
	{
		currentSlide--;
	}
	else if(curDirection === 1)
	{
		currentSlide++;
	}
	if (currentSlide > sliderImages.length-1)
	{
		currentSlide = 0;
	}
	else if(currentSlide < 0)
	{
		currentSlide = sliderImages.length-1;
	}	
	clearInterval(moveSlide);
	stopPosition = 0;
	pauseSlide = setTimeout(function(){moveSlide = setInterval(function(){
		moveSlider(curWidth)},pause); 
}, 5000);
	document.getElementById("previous").addEventListener("click", prevButton);
	document.getElementById("next").addEventListener("click", nextButton);
}








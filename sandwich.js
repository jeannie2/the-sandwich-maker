var tds = document.querySelectorAll("td");
var table = document.querySelector("table"); 
var img = document.querySelector("img");
var pendingDisplay = document.getElementById("pendingDisplay");
var resultDisplay = document.getElementById("resultDisplay");
var sound = document.getElementById("sound"); 
var banner = document.getElementById("banner");
var timeout = setTimeout(checkout, 800); //setTimeout returns sth like timer id
var maker = document.getElementById("maker");

var result = false;
var done = false;
var choice = [];  
var sandwich = ""

initialise();

function initialise () {
    tdEvents();
    pendingDisplay.style.display = "none";
    resultDisplay.style.display = "none";
    //main.classList.toggle("newColor");
    main.classList.remove("newBackground")
    main.classList.add("originalBackground");
    banner.classList.add("originalBanner");
    maker.classList.add("maker");
}

function tdEvents() {
for (var i=0; i<tds.length; i++) {
    tds[i].addEventListener("click", function() { 
    if (this.classList.contains("selected")) { //if selected and click
            this.classList.remove("selected");
            this.style.backgroundImage="url(imgs/" + this.textContent + ".png)";  //td image
            //
            var index = choice.indexOf(this.textContent); //splice using index. need to refer to this value.
            console.log(index);  
            if (index !== -1) { //if selection in array, remove it 
                choice.splice(index, 1); 
                console.log("spliced out " + this.textContent); 
                console.log(choice);
                checkChoice();
    } //
    } else { //if not selected 
         if (choice.length<2 && choice.includes(this.textContent) === false) { //cant select more than 2 
            choice.push(this.textContent); //only if there are less than 2 choices in array
            console.log(choice);
           // this.classList.add("arrayed");
            this.classList.add("selected");
            this.style.backgroundImage="url(imgs/" + this.textContent + "_SELECTED.png)"; //selected td image
            checkChoice();
            }
        };
    });
};
};

function checkChoice() {
    if(choice.length === 2) {  
        done = true; //or else checkout when less than 2 choices
         setTimeout(checkout, 800); //call checkout function after 1.7 seconds
    } else if (choice.length === 0) {  //sandwich = "" if no ingredients or if 1 ingredient 
        sandwich = "";
        done = false;
        clearInterval(timeout);
    } else if (choice.length === 1) {
        console.log("1 choice only");
        done = false;
        clearInterval(timeout);
    }; 
    return done; //works without, but just left
};
 
function checkout() {
    if(done) { //works without
        console.log("2 fillings, show checkout");
        pendingDisplay.style.display = "block";
        table.style.display = "none";
        //visual.src = "imgs/bag.jpg";
        pickSandwich();
    }
}

//when brownbag clicked, show sandwich
pendingDisplay.addEventListener("click", function() {
    sound.currentTime=0; //play from start 
    sound.play();
    //main.classList.toggle("newColor");
    main.classList.remove("originalBackground");  
    main.classList.add("newBackground"); 
    pendingDisplay.style.display="none";
    resultDisplay.src = "imgs/" + sandwich + ".png";
    resultDisplay.style.display="block";
    banner.classList.remove("originalBanner");
    banner.classList.add("newBanner");
    banner.addEventListener("click", restart);
    maker.classList.remove("maker");
    maker.classList.add("newMaker");
    result = true;
});

function pickSandwich() { //order no matter
    if(choice.includes("TOMATOES") && choice.includes("HUMMUS")) {
        sandwich = "A"; //vs img.src=imgs/1.jpg;
    } else if (choice.includes("TOMATOES") && choice.includes("HAM")) {
        sandwich = "B";
    } else if (choice.includes("TOMATOES") && choice.includes("PICKLES")) {
        sandwich = "C";
    } else if (choice.includes("TOMATOES") && choice.includes("CHEESE")) {
        sandwich = "D";
    } else if (choice.includes("TOMATOES") && choice.includes("EGG")) { //select tom and lam wil also give image E
        sandwich = "E";
    }  else if (choice.includes("HUMMUS") && choice.includes("HAM")) {
        sandwich = "F"; 
    } else if (choice.includes("HUMMUS") && choice.includes("PICKLES")) {
        sandwich = "G";
    } else if (choice.includes("HUMMUS") && choice.includes("CHEESE")) {
        sandwich = "H";
    } else if (choice.includes("HUMMUS") && choice.includes("EGG")) {
        sandwich = "I";
    } else if (choice.includes("HAM") && choice.includes("PICKLES")) {
        sandwich = "J";
    } else if (choice.includes("HAM") && choice.includes("CHEESE")) {
        sandwich = "K";
    } else if (choice.includes("HAM") && choice.includes("EGG")) {
        sandwich = "L";
    } else if (choice.includes("PICKLES") && choice.includes("CHEESE")) {
        sandwich = "M";
    } else if (choice.includes("PICKLES") && choice.includes("EGG")) {
        sandwich = "N";
    } else if (choice.includes("CHEESE") && choice.includes("EGG")) {
        sandwich = "O";
    }
}

function restart() {
    choice = [];
    console.log(choice);
    sandwich="";
    console.log(sandwich);
    table.style.display = "table"; //not block, or reformatted. executes anyway even if table already displayed
    pendingDisplay.style.display="none"; // even if not there, removes
    resultDisplay.style.display="none"; // even if not there, removes
    maker.classList.remove("newMaker");
    maker.classList.add("maker");
    sound.pause();
    if (result) {
        main.classList.remove("newBackground")
        main.classList.add("originalBackground");
        banner.classList.remove("newBanner");
        banner.classList.add("originalBanner");      
    }
    //main.classList.toggle("newColor")f
    //rather than redefining tds here and referring to using this.
    for(i=0; i<tds.length; i++) { // remove any selected 
    tds[i].classList.remove("selected"); //green
    tds[i].style.backgroundImage="url(imgs/" + tds[i].textContent + ".png)"; 
    }
    result = false;
};

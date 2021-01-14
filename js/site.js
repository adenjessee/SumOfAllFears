
// SLIDER 1
//=======================================================
// the value we need to get from the quant slider
var quantSlider = document.getElementById("quantSlider");

// the value we output based on the slider position
var sliderOutput1 = document.getElementById("sliderText1");

// the text that shows must be the slider value
sliderOutput1.innerText = quantSlider.value;

// Update the current slider value (each time you drag the slider handle)
quantSlider.oninput = function() {
    // change slider 3 values 
    kSlider.setAttribute("max", 2 * quantSlider.value);
    kSlider.setAttribute("value", kSlider.value);
    sliderOutput3.innerText = kSlider.value;

    // slider 1
    sliderOutput1.innerText = this.value;
}
//=======================================================

// SLIDER 2
//=======================================================
// the value we need to get from the range slider
var rangeSlider = document.getElementById("rangeSlider");

// the value we output based on the slider position
var sliderOutput2 = document.getElementById("sliderText2");

// the text that shows must be the slider value
sliderOutput2.innerText = rangeSlider.value;

// Update the current slider value (each time you drag the slider handle)
rangeSlider.oninput = function() {
    sliderOutput2.innerText = this.value;
}
//=======================================================

// SLIDER 3
//=======================================================
// the value we need to get from the quant slider
var kSlider = document.getElementById("kSlider");

// get the range of the k slider
kSlider.setAttribute("max", 2 * quantSlider.value);

// the value we output based on the slider position
var sliderOutput3 = document.getElementById("sliderText3");

// the text that shows must be the slider value
sliderOutput3.innerText = kSlider.value;

// Update the current slider value (each time you drag the slider handle)
kSlider.oninput = function() {
    // get the range of the k slider
    kSlider.setAttribute("max", 2 * quantSlider.value);
    kSlider.setAttribute("value", kSlider.value);
    sliderOutput3.innerText = this.value;
}
//=======================================================


// CALCULATIONS FOR OUTPUT
//=======================================================
// Use the generate random numnber function when the button is clicked
document.getElementById("btnSubmit").addEventListener("click", generateRandom);

// the value we output based on the slider position
var randomTableOutput = document.getElementById("randomTableOutput");

// the value we output based on the slider position
var matchesTableOutput = document.getElementById("matchesTableOutput");

// function to generate random numbers for the output text
function generateRandom(){

    // set a string we can append to
    let largeString = "";
    let range = rangeSlider.value; // the value of the range slider
    let styleStrings = []; // to store all the color styles for the cells of the table
    let numberArray = []; // to store all the random numbers

    // make the elements in each array
    for(let i = 0; i <= quantSlider.value; i++){
        if(i%2 == 0){
            styleStrings.push("background-color: ;");
        }else{
            styleStrings.push("background-color: #AAGG88;");
        }
        numberArray.push(Math.ceil(range * Math.random()));
    }

    // loop through the number of values the user wants
    for(let i = 0; i < quantSlider.value/10; i++){
        largeString += `<tr>`;
        for(let j = 0; j < 10; j++){
            if(j+i*10 < quantSlider.value){
                largeString += `<td style="${styleStrings[i*10+j]}">${numberArray[i*10+j]}</td>`;
            }
        }
        largeString += `</tr>`;
    }

    // set the large random number text to the screen with title
    randomTableOutput.innerHTML =  `<td colspan="10">
                                        <h5> Randomly Generated Series of Numbers </h5> 
                                    </td>` + largeString;

    // make an array to hold the values that match
    let matchesString = "";
    let counter = 0;

    // loop through all combos 
    for(let i = 0; i < quantSlider.value; i++){
        for(let j = i+1; j < quantSlider.value; j++){
            if(numberArray[i] + numberArray[j] == kSlider.value){
                //matchesString += `<tr> <td> ${numberArray[i]} </td> <td> ${numberArray[j]} </td> </tr>`;
                matchesString += `<tr> <td colspan = "2"> ${numberArray[i]} + ${numberArray[j]} </td> </tr>`;
                counter++;
            }
        }
    }

    // add some text to explain what the table is
    if(matchesString != null){
        matchesString =`<td colspan="2">
                            <h5> There are ${counter} sums that add to ${kSlider.value}</h5> 
                        </td>` + matchesString;
    }else{
        matchesString = `<h5> Combining 2 numbers, there are no sums in this list of numbers that add to ${kSlider.value}</h5>` + matchesString;
    }

    // set the matches to the screen 
    matchesTableOutput.innerHTML = matchesString;
}


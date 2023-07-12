// TODO: Make a utility class for math functions
// TODO: Show throbber to give user feedback on large nums
// TODO: Use BigInt to support larger values
// TODO: Provide a message when an input number is too big.
  // currently supports up to quadrillion (1e16)
// TODO: show square and cube values
// TODO: show highest step squad value
// TODO: Error screen showing zero (nowhere...)
// TODO: Show a number by default???

// TODO: Get badge info from JSON file
// const badgeInfo = require("badgeInfo.json");
// console.log(badgeInfo);

// Possible helpful example...
// const fs = require("fs");
// const school_data = JSON.parse(fs.readFileSync("badgeInfo.json"))
// console.log(school_data)

// import { FactorsUtil } from './factors-util';

// TODO: Move these arrays/maps to util file
const denominations = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion"];

const translationArray = [
  [0, "zero"], [1, "one"], [2, "two"], [3, "three"], [4, "four"], [5, "five"],
  [6, "six"], [7, "seven"], [8, "eight"], [9, "nine"], [10, "ten"], [11, "eleven"],
  [12, "twelve"], [13, "thirteen"], [14, "fourteen"], [15, "fifteen"],
  [16, "sixteen"], [17, "seventeen"], [18, "eighteen"], [19, "nineteen"],
  [20, "twenty"], [30, "thirty"], [40, "fourty"], [50, "fifty"], [60, "sixty"],
  [70, "seventy"], [80, "eighty"], [90, "ninety"]
];
const translationMap = new Map(translationArray);

window.onload = function() {
  var factorButton = document.getElementById("factor-button");
  factorButton.onclick = showResults;

  // trigger click on enter
  var input = document.getElementById("number-input");
  input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      factorButton.click();
    }
  });

  // Updates dialogue
  const openUpdatesDialog = document.getElementById("updates-button");
  openUpdatesDialog.addEventListener("click", showUpdatesDialog);

  const dialogArea = document.getElementById("updates-dialog");
  dialogArea.addEventListener("click", closeUpdatesDialog);

  const closeDialogButton = document.getElementById("close-updates-dialog");
  closeDialogButton.addEventListener("click", closeUpdatesDialog);

  var numberInput = document.getElementById("number-input");
  numberInput.value = 2;
  showResults();
}

function showResults() {
  // get factors
  var numberInput = document.getElementById("number-input");
  var number = numberInput.valueAsNumber;

  // display number
  var numberOutput = document.getElementById("number-output");
  clearElement(numberOutput);
  const numberSpan = document.createElement('span');
  numberSpan.setAttribute('id', 'the-number');
  numberSpan.innerHTML = number;
  numberOutput.appendChild(numberSpan);

  // TODO: display English name of number
  var name = getName(number);

  // award badges: prime, square(x), cube(x), step squad(x)
  var badgesOutput = document.getElementById("badges-output");
  clearElement(badgesOutput);

  // check for even and odd
  if (number % 2 == 0) {
    appendBadge(badgesOutput, 'evenBadgePixel.png', 'even');
  } else {
    appendBadge(badgesOutput, 'oddBadgePixel.png', 'odd');
  }

  // check for prime, super rect, super duper rect
  const factors = getFactors(number);
  if (factors.length == 2) {
    appendBadge(badgesOutput, 'primeBadgePixel.png', 'prime');
  } else if (factors.length >= 8) {
    appendBadge(badgesOutput, 'superDuperRectBadgePixel.png',
      'super duper<br>rectangle');
  } else if (factors.length >= 6) {
    appendBadge(badgesOutput, 'superRectBadgePixel.png',
      'super<br>rectangle');
  }

  if (isSquare(number)) {
    appendBadge(badgesOutput, 'squareBadgePixel.png', 'square');
  }

  if (isCube(number)) {
    appendBadge(badgesOutput, 'cubeBadgePixel.png', 'cube');
  }

  if (isStepSquad(number)) {
    appendBadge(badgesOutput, 'stepSquadBadgePixel.png', 'step squad');
    // TODO: Display modal with step squads explanation and partial list
  }

  if (isPowerOfTwo(number)) {
    appendBadge(badgesOutput, 'doublerBadgePixel.png', 'doubler');
  }

  // list factors
  // var factorOutput = "Factors (" + factors.length + " total)<br>";
  var factorTotal = document.getElementById("factor-total");
  factorTotal.innerHTML = factors.length;
  var factorOutput = "";
  if (factors.length == 0) {
    factorOutput += "None";
  } else { 
    first = true;
    for (const factor of factors) {
      if (first) {
        factorOutput += factor;
        first = false;
      } else {
        factorOutput += ", " + factor;
      }
    }
  }

  var results = document.getElementById("factor-list");
  numberInput.value = "";
  results.innerHTML = factorOutput;
}

// TODO: Make this work for negatives better.
function getFactors(number) {
  const factors = new Set();
  // find factors here
  for (let i = 1; i * i <= number; i++) {
    if (number % i == 0) {
      factors.add(i);
      factors.add(number / i);
    }
  }

  return Array.from(factors).sort(function (a, b) { return a - b; });
}

// TODO: Add modal that displays basic info
function appendBadge(badgesOutput, filename, captionText) {
  const figure = document.createElement('figure');

  const newImg = document.createElement('img');
  newImg.setAttribute('src', 'images/' + filename);
  newImg.className = 'badge';

  const caption = document.createElement('figcaption');
  caption.innerHTML = captionText;

  figure.appendChild(newImg);
  figure.appendChild(caption);
  badgesOutput.appendChild(figure);
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// TODO: This should probably change from a dialog to something that is
// compatible with all browsers (Safari, Firefox, etc.)
function showUpdatesDialog(ev) {
  // display the modal
  const updatesDialog = document.getElementById("updates-dialog");
  if (typeof updatesDialog.showModal === "function") {
    updatesDialog.showModal();
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
}

// close the "about" dialog when you click outside of the dialog,
// on its backdrop
function closeUpdatesDialog(ev) {
  const clickTarget = ev.target;

  // add check to make sure it is an HTMLElement??
  // or is null an ok answer here????
  if (clickTarget.tagName === 'BUTTON') {
    const dialog = document.getElementById("updates-dialog");
    dialog.close();
  } else if (clickTarget.tagName === 'DIALOG') {
    const dialog = ev.target;
    const rect = dialog.getBoundingClientRect();
    if (ev.clientY < rect.top || ev.clientY > rect.bottom ||
            ev.clientX < rect.left || ev.clientX > rect.right) {
        dialog.close();
    }
  }
}

/** UTILITY FUNCTIONS **/

// Returns whether or not a number is a square
// NOTE: This could have precision issues at very high values
function isSquare(n) {
  if (n < 0) {
    return false;
  }

  return Number.isInteger(Math.sqrt(n));
}

// Returns whether or not a number is a cube
// NOTE: This could have precision issues at very high values
function isCube(n) {
  if (n < 0) {
    return false;
  }

  return Number.isInteger(Math.cbrt(n));
}

// Returns whether or not a number is a power of two
function isPowerOfTwo(n) {
  if (n == 0) {
    return false;
  }

  // Bit twiddling
  // e.g.) 4
  // 0100 & 0011 == 0
  return (n & (n - 1)) == 0;
}

// Returns whether or not a number is a step squad
// i.e.) Sum of all positive integers from 1...k
// Formula by ChatGPT soooooo... 2/23/2023
function isStepSquad(n) {
  let height = (Math.sqrt(8 * n + 1) - 1) / 2;

  return Number.isInteger(height) &&
    (height * (height + 1) / 2 === n);
}

// BUG: relies on sets of three only (1,204 works terribly)
// Returns a String representation of the given
// integer in English
// e.g. 1,438 returns "one thousand four hundred thirty eight"
function getName(n) {
  let result = "";
  let denomIndex = -1;
  while (n >= 100) { // TODO: should this be 1000?
    let chunk = "";
    
    // grab 3 digits
    let three = Math.floor(n % 1000); // get last three digits

    // translate to # hundred #tens # (ignore zeroes)
    let hundreds = Math.floor(three / 100);
    chunk += " " + translationMap.get(hundreds) + " hundred";
    
    let tensOnes = Math.floor(three % 100);
    if (tensOnes >= 20) {
      // process each digit separately
      let tens = Math.floor(tensOnes / 10) * 10;
      chunk += " " + translationMap.get(tens);
      
      let ones = Math.floor(tensOnes % 10);
      if (ones > 0) {
        chunk += " " + translationMap.get(ones);
      }
    } else { // TODO: handle single digits?????
      // look it up (silly teens)
      chunk += translationMap.get(tensOnes);
    }

    // add correct denomination (million, billion, etc.)
    if (denomIndex >= 0) {
      chunk += " " + denominations[denomIndex];
    }
    denomIndex++;

    result = chunk + result;
    
    n = Math.floor(n / 1000); // remove last three digits
  }

  console.log(result);
  return result;
}
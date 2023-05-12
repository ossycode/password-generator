import * as domElem from "./dom-elements";

const sliderColors = {
  fill: "#a4ffaf",
  backgroundC: "#18171f",
};

const passwordHelperFunc = {
  lower: getRandomLowercase,
  upper: getRandomUppercase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

init();

//////////////////
//LISTENERS
//

// Update the Character Length when there is changes in the slider input
// Apply the slider track color
domElem.slider.addEventListener("input", (event) => {
  domElem.sliderValue.textContent = event.target.value;
  applyTrackColor(event.target);
  showPasswordStrength(event.target.value);
});

// When the copy Icon is clicked
// Copy the password to clipboard
// Notify the user when the password is copied to the clipboard.
domElem.copyBtn.addEventListener("click", (e) => {
  const generatedPassword = domElem.passwordContainer.textContent.trim();
  navigator.clipboard.writeText(generatedPassword);
  domElem.copied.style.transform = "translateY(0%)";
  domElem.copied.style.opacity = "1";
  domElem.passwordContainer.style.opacity = 0.25;
});

// Listen for changes and update the password strength bar
document.addEventListener("change", function () {
  console.log(domElem.slider.value);
  showPasswordStrength(domElem.slider.value);
});

// When the generate password btn is clicked,
//if none of the check boxes are checked, display a message to check at least one box
// else, display a new password
domElem.GeneratePasswordBtn.addEventListener("click", function () {
  const { lowerChecked, upperChecked, numberChecked, symbolChecked } =
    checkBoxesIsChecked();

  if (!lowerChecked && !upperChecked && !numberChecked && !symbolChecked) {
    domElem.passwordContainer.textContent =
      "Please check at least one checkbox";

    return;
  }
  const newPassword = generatePassword(
    domElem.slider.value,
    lowerChecked,
    upperChecked,
    numberChecked,
    symbolChecked
  );
  domElem.passwordContainer.textContent = newPassword;
  domElem.passwordContainer.style.opacity = 1;
  domElem.copied.style.transform = "translateY(200%)";
  domElem.copied.style.opacity = "0";
});

///////////////////////////////
// FUNCTIONS
//

// function to apply the track color based on the slider progress
function applyTrackColor(slider) {
  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bgColor = `linear-gradient(90deg, ${
    sliderColors.fill
  } ${percentage}%, ${sliderColors.backgroundC} ${percentage + 0.1}%)`;
  slider.style.background = bgColor;
}

//Show the password strength bar based on the slider value.
function showPasswordStrength(value) {
  const { lowerChecked, upperChecked, numberChecked, symbolChecked } =
    checkBoxesIsChecked();

  const passwordCha = +value;

  if (passwordCha === 0) return;

  if (passwordCha < 5) {
    updatePasswordStrength(2, "#f64a4a", "TOO WEAK!");
  }
  if (passwordCha >= 5 && passwordCha <= 10) {
    updatePasswordStrength(3, "#fb7c58", "WEAK");
  }
  if (
    passwordCha >= 10 &&
    passwordCha < 15 &&
    !numberChecked &&
    !symbolChecked
  ) {
    updatePasswordStrength(3, "#fb7c58", "WEAK");
  }
  if (passwordCha >= 10 && (numberChecked || symbolChecked)) {
    updatePasswordStrength(4, "#f8cd65", "MEDIUM");
  }
  if (passwordCha >= 15 && upperChecked && numberChecked && symbolChecked) {
    updatePasswordStrength(5, "#a4ffaf", "STRONG");
  }
}

// Resetting the style of the password strength bars
function resetPasswordStrengthBars(passwordStrengthBarsArray) {
  passwordStrengthBarsArray.forEach((element) => {
    element.style.border = "2px solid #e6e5ea";
    element.style.backgroundColor = "#18171f";
  });
}
// Update the password strength bars based on the slider progress
function updatePasswordStrength(numb, color, message) {
  resetPasswordStrengthBars(domElem.passwordStrengthBars);
  domElem.passwordStrengthText.textContent = message;
  Array.from(domElem.passwordStrengthBars)
    .filter((element) => element.dataset.id < numb)
    .forEach((element) => {
      element.style.border = "none";
      element.style.backgroundColor = color;
    });
}

function getRandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// a more secure random numbers
function getRandomNumber() {
  const secureNumber =
    window.crypto.getRandomValues(new Uint32Array(1))[0] /
    (Math.pow(2, 32) - 1);
  return String.fromCharCode(Math.floor(secureNumber * 10) + 48);
}

function getRandomSymbol() {
  const specialCharacters = "~@:;#&-_£?/%+*!>";
  return specialCharacters[
    Math.floor(Math.random() * specialCharacters.length)
  ];
}

// Generate a password based on the check boxes checked
function generatePassword(length, lower, upper, number, symbol) {
  let passwordGenerated = "";
  const pwdPropertiesArray = [
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter((item) => Object.values(item)[0]);
  for (let i = 0; i < length; i++) {
    pwdPropertiesArray.forEach((type) => {
      const pwdPropertyName = Object.keys(type)[0];
      passwordGenerated += passwordHelperFunc[pwdPropertyName]();
    });
  }
  return passwordGenerated
    .slice(0, length)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function checkBoxesIsChecked() {
  const upperChecked = domElem.uppercaseCheckEl.checked;
  const lowerChecked = domElem.lowercaseCheckEl.checked;
  const numberChecked = domElem.numberCheckEl.checked;
  const symbolChecked = domElem.symbolCheckEl.checked;

  return { upperChecked, lowerChecked, numberChecked, symbolChecked };
}

// Initialised the app
function init() {
  applyTrackColor(domElem.slider);
}

import { map } from "lodash";
import * as domElem from "./dom-elements";

const sliderColors = {
  fill: "#a4ffaf",
  backgroundC: "#18171f",
};

// Update the Character Length when there is changes in the slider input
// Apply the slider track color
domElem.slider.addEventListener("input", (event) => {
  domElem.sliderValue.textContent = event.target.value;
  applyTrackColor(event.target);
  showPasswordStrength(event.target.value);
});

// // Passing the slider to the applyTrackColor function
applyTrackColor(domElem.slider);

// function to apply the track color based on the slider progress
function applyTrackColor(slider) {
  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bgColor = `linear-gradient(90deg, ${
    sliderColors.fill
  } ${percentage}%, ${sliderColors.backgroundC} ${percentage + 0.1}%)`;
  slider.style.background = bgColor;
}

// When the copy Icon is clicked
// Copy the password to clipboard
// Notify the user when the password is copied to the clipboard.
domElem.copyBtn.addEventListener("click", (e) => {
  const generatedPassword = domElem.passwordContainer.textContent.trim();
  navigator.clipboard.writeText(generatedPassword);
  domElem.copied.style.transform = "translateY(0%)";
  domElem.copied.style.opacity = "1";
});

//Update the password strength bar based on the slider value.
function showPasswordStrength(passwordCha) {
  if (passwordCha < 5) {
    updatePasswordStrength(2, "#f64a4a", "TOO WEAK!");
  }
  if (passwordCha >= 5 && passwordCha < 10) {
    updatePasswordStrength(3, "#fb7c58", "WEAK");
  }
  if (passwordCha >= 10 && passwordCha < 15) {
    updatePasswordStrength(4, "#f8cd65", "MEDIUM");
  }
  if (passwordCha >= 15) {
    updatePasswordStrength(5, "#a4ffaf", "STRONG");
  }
}

function resetPasswordStrengthBars(passwordStrengthBarsArray) {
  passwordStrengthBarsArray.forEach((element) => {
    element.style.border = "1px solid #e6e5ea";
    element.style.backgroundColor = "#18171f";
  });
}

function updatePasswordStrength(numb, color, message) {
  resetPasswordStrengthBars(domElem.passwordStrengthBars);
  domElem.passwordStrengthText.textContent = message;
  Array.from(domElem.passwordStrengthBars)
    .filter((element) => element.dataset.id < numb)
    .forEach((element) => {
      element.style.backgroundColor = color;
    });
}

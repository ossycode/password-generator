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

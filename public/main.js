const detect = document.querySelector("#detect");
const wrapper = document.querySelector(".wrapper");
const overlay = document.createElement("div"); // Create overlay element
overlay.classList.add("overlay"); // Add overlay class to the element
document.body.insertBefore(overlay, detect); // Insert overlay before the detect element

const button = wrapper.querySelector("button");

let adClasses = ["ad", "ads", "adsbox", "doubleclick", "ad-placement", "ad-placeholder", "adbadge", "BannerAd"];
for (let item of adClasses) {
  detect.classList.add(item);
}

let getProperty = window.getComputedStyle(detect).getPropertyValue("display");
if (!wrapper.classList.contains("show")) {
  overlay.style.display = "none"; // Hide the overlay if no adblock is detected
  getProperty == "none" ? wrapper.classList.add("show") : wrapper.classList.remove("show");
}

button.addEventListener("click", () => {
  window.location.reload();
});

const menuBtns = document.querySelectorAll(".menu-btn");
const menuItems = document.querySelectorAll(".menu-items");

const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel-item");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".circle");
let currentIndex = 0;

const form = document.querySelector("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");



menuBtns.forEach((menuBtn, index) => {
  menuBtn.addEventListener("click", () => {
    menuItems[index].classList.toggle("visible");
  });
  console.log("click");
});

// Go to slide function
function goToSlide(index) {
  if (index < 0) {
    index = carouselItems.length - 1;
  } else if (index >= carouselItems.length) {
    index = 0;
  }
  // Change active and previous/next classes for carousel items
  carouselItems.forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      item.classList.add(index > currentIndex ? "previous" : "next");
    } else if (item.classList.contains("previous")) {
      item.classList.remove("previous");
      item.classList.add("next");
    } else if (item.classList.contains("next")) {
      item.classList.remove("next");
      item.classList.add("previous");
    }
  });
  // Update dots
  dots[currentIndex].classList.remove("active");
  dots[index].classList.add("active");
  currentIndex = index;
}

// Previous button
previousBtn.addEventListener("click", () => {
  goToSlide(currentIndex - 1);
});

// Next button
nextBtn.addEventListener("click", () => {
  goToSlide(currentIndex + 1);
});

// Dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});



email.addEventListener("input", (event) => {
    // Each time the user types something, we check if the
    // form fields are valid.
  
    if (email.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      emailError.textContent = ""; // Reset the content of the message
      emailError.className = "error"; // Reset the visual state of the message
    } else {
      // If there is still an error, show the correct error
      showError();
    }
  });
  
  form.addEventListener("submit", (event) => {
    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
      // If it isn't, we display an appropriate error message
      showError();
      // Then we prevent the form from being sent by canceling the event
      event.preventDefault();
    }
  });
  
  function showError() {
    if (email.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      // If the field doesn't contain an email address,
      // display the following error message.
      emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
      // If the data is too short,
      // display the following error message.
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
  
    // Set the styling appropriately
    emailError.className = "error active";
  }

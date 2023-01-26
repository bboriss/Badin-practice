import { buttonFiller } from "./backToTop.js";
import { menuIntersecting } from "./menuBtnObserver.js";
import { moveToLeft, moveToRight, getBackPosition } from "./trustedBy.js";
import { moveToRightGallery, moveToLeftGallery } from "./badinGallery.js";
import { galleryIntersecting } from "./galleryObserver.js";

const logosRef = Array.from(
  document.getElementsByClassName("client_icondesktop")
).splice(0, 13);

const logoContainer = document.querySelector(
  ".trusted_by_second-icons_container_content"
);

let logos = [...logosRef];

const logoChanger = () => {
  logoContainer.innerHTML = "";
  // remove hardcoded visible logos
  logos.forEach((logo) => logo.classList.remove("first_iteration"));
  // move them to the end of array
  let firstFive = logos.splice(0, 5);

  logos = [...logos, ...firstFive];
  // take second 5 to display
  let forDisplay = logos.slice(0, 5);

  for (let i = 0; i < forDisplay.length; i++) {
    setTimeout(() => {
      logoContainer.append(forDisplay[i]);
    }, 150 * i);
  }
};

const test = setInterval(logoChanger, 3000);

// trusted by section arrows
const arrLeft = document.querySelector(".arrow-left");
const arrRight = document.querySelector(".arrow-right");
// badin gallery
const modal = document.querySelector(".modal");
const modalLeftArrow = document.querySelector(".pic_left_btn");
const modalRightArrow = document.querySelector(".pic_right_btn");

modalRightArrow.addEventListener("click", moveToRightGallery);
modalLeftArrow.addEventListener("click", moveToLeftGallery);
modal.addEventListener("click", () => {
  modal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  // back to top btn not visible when page loads
  document.querySelector(".back-to-top-btn").style.display = "none";
  // change color when intersecting
  menuIntersecting();
  // gallery poping up
  galleryIntersecting();
});

// <--- trusted by sections and arrows --->
arrLeft.addEventListener("click", moveToLeft);
arrRight.addEventListener("click", moveToRight);
// when window resized get back picture container to position 0
window.addEventListener("resize", getBackPosition);

// <--- back to top btn --->
window.addEventListener("scroll", buttonFiller);

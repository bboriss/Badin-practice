import { buttonFiller } from "./backToTop.js";
import { menuIntersecting } from "./menuBtnObserver.js";
import { moveToLeft, moveToRight, getBackPosition } from "./trustedBy.js";
import { moveToRightGallery, moveToLeftGallery } from "./badinGallery.js";
import { galleryIntersecting } from "./galleryObserver.js";

const lines = Array.from(document.getElementsByClassName("top_btm_line"));

setInterval(changeDirection, 1000);

// window.setTimeout(changeDirection, 20000);
// setInterval(changeDirection, 1000);

function changeDirection() {
  console.log("menja");
  lines[0].classList.contains("to_right")
    ? lines.forEach((line) => line.classList.remove("to_right"))
    : lines.forEach((line) => line.classList.add("to_right"));
}

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

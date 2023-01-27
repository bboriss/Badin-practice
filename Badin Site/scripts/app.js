import { buttonFiller } from "./backToTop.js";
import { menuIntersecting } from "./menuBtnObserver.js";
import {
  moveToLeft,
  moveToRight,
  onPictureSelect,
  getBackPosition,
} from "./trustedBy.js";
import { moveToRightGallery, moveToLeftGallery } from "./badinGallery.js";
import { galleryIntersecting } from "./galleryObserver.js";
import { logoChanger } from "./logoChanger.js";
import { onMouseEnter, onMouseLeave, onClick, onClose } from "./menu.js";

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".menu_close_btn");

// trusted by section arrows
const pictures = Array.from(document.getElementsByClassName("client_pic"));
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
pictures.forEach((picture) =>
  picture.addEventListener("click", onPictureSelect)
);

// when window resized get back picture container to position 0
window.addEventListener("resize", getBackPosition);

// <--- back to top btn --->
window.addEventListener("scroll", buttonFiller);

// <--- menu --->

menuBtn.addEventListener("mouseenter", onMouseEnter);

menuBtn.addEventListener("mouseleave", onMouseLeave);

menuBtn.addEventListener("click", onClick);

closeBtn.addEventListener("click", onClose);

// logos change
setInterval(logoChanger, 3000);

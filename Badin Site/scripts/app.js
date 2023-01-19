// import { beTouching } from "./../scripts/observer.js";
const menuBtn = document.querySelector(".menu-btn");
const topSection = document.getElementsByClassName("top-section")[0];
const expertise = document.getElementsByClassName("expertise")[0];
const burger = document.getElementsByClassName("menu-btn__burger")[0];

document.addEventListener("DOMContentLoaded", () => {
  console.log(topSection);
  console.log(document);

  let options = {
    root: null,
    rootMargin: "-49% 0px",
    threshold: 0,
  };
  let observer = new IntersectionObserver(beTouching, options);

  observer.observe(topSection);
  observer.observe(expertise);
});

function beTouching(entries) {
  console.log(entries[0].isIntersecting);
  // menu-btn
  if (entries[0].isIntersecting) {
    console.log(burger);
  }
}

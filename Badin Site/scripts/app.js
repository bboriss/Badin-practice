// Referencing elements for menu button color change
const topSection = document.getElementsByClassName("top-section")[0];
const expertise = document.querySelector(".expertise");
const footer = document.getElementsByTagName("footer")[0];
const burgerLines = Array.from(
  document.getElementsByClassName("menu-btn__burger-line")
);
const menuText = document.querySelector(".menu-btn__menu");

// elements for clients pictures and text

// arrows
const arrLeft = document.querySelector(".arrow-left");
const arrRight = document.querySelector(".arrow-right");
// picture container
const picContainer = document.querySelector(
  ".trusted_by_container-pic_container"
);
// pictures
const pictures = Array.from(document.getElementsByClassName("client_pic"));
console.log(picContainer);

arrLeft.addEventListener("click", () => {
  console.log("left clicked");
  if (pictures[0].classList.contains("client_pic_big")) {
    console.log("na prvoj je");
    return;
  } else {
    // addddd
    return;
  }
});
let counter = 0;
arrRight.addEventListener("click", () => {
  console.log("right clicked");

  if (pictures[pictures.length - 1].classList.contains("client_pic_big")) {
    console.log("na zadnjoj je");
  } else {
    pictures[counter].classList.remove("client_pic_big");
    pictures[counter].classList.add("client_pic_normal");
    pictures[counter + 1].classList.remove("client_pic_normal");
    pictures[counter + 1].classList.add("client_pic_big");
    picContainer.style.cssText = `position: relative;
    left: -${(counter + 1) * 100}px;`;
    console.log(counter);
    counter++;
  }
});

//
//
//
//

//    <-------- OBSERVER -------->
document.addEventListener("DOMContentLoaded", () => {
  let options = {
    root: null,
    rootMargin: "-49% 0px",
    threshold: 0,
  };
  let observer = new IntersectionObserver(beTouching, options);

  observer.observe(topSection);
  observer.observe(expertise);
  observer.observe(footer);
});

function beTouching(entries) {
  if (entries[0].isIntersecting) {
    burgerLines.forEach((line) => (line.style.backgroundColor = "white"));
    menuText.style.color = "white";
  } else {
    burgerLines.forEach((line) => (line.style.backgroundColor = "black"));
    menuText.style.color = "black";
  }
}

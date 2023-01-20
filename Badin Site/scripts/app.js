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
// arrow icons
const leftArrIcon = document.querySelector(".fa-left-long");
const rightArrIcon = document.querySelector(".fa-right-long");
// picture container
const picContainer = document.querySelector(
  ".trusted_by_container-pic_container"
);
// pictures
const pictures = Array.from(document.getElementsByClassName("client_pic"));

let counterPic = 0;

arrLeft.addEventListener("click", () => {
  if (counterPic === 0) {
    console.log("na prvoj je");
    return;
  } else {
    pictures[counterPic - 1].classList.remove("client_pic_normal");
    pictures[counterPic - 1].classList.add("client_pic_big");
    pictures[counterPic].classList.remove("client_pic_big");
    pictures[counterPic].classList.add("client_pic_normal");

    let elementBigIndex = pictures.findIndex((element) =>
      element.classList.contains("client_pic_big")
    );
    console.log("big el index: ", elementBigIndex);
    picContainer.style.cssText = `position: relative;
    left: -${elementBigIndex * 96}px;
    transition: 0.7s linear;
    `;
    counterPic--;
    console.log(counterPic);
  }
});

arrRight.addEventListener("click", () => {
  console.log("right clicked");

  if (pictures[pictures.length - 1].classList.contains("client_pic_big")) {
    console.log("na zadnjoj je");
  } else {
    pictures[counterPic].classList.remove("client_pic_big");
    pictures[counterPic].classList.add("client_pic_normal");
    pictures[counterPic + 1].classList.remove("client_pic_normal");
    pictures[counterPic + 1].classList.add("client_pic_big");
    // container translation
    picContainer.style.cssText = `position: relative;
    left: -${(counterPic + 1) * 96}px;
    transition: 0.7s linear;
    `;

    console.log("pre povecanja: ", counterPic);
    counterPic++;
    console.log("posle povecanja: ", counterPic);
    counterPic > 0
      ? (arrLeft.style.cssText = "pointer-events:auto") &&
        (leftArrIcon.style.color = "#1e90ff")
      : (arrLeft.style.cssText = "pointer-events:none");

    counterPic === pictures.length - 1
      ? (rightArrIcon.style.cssText = "color:#909090;") &&
        (arrRight.style.cssText = "pointer-events: none;")
      : (rightArrIcon.style.color = "#1e90ff");
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

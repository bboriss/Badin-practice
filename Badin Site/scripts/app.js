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
const namesAndRoles = [{ name: "Karthik Rao" }];

arrLeft.addEventListener("click", () => {
  pictures[counterPic - 1].classList.remove("client_pic_normal");
  pictures[counterPic - 1].classList.add("client_pic_big");
  pictures[counterPic].classList.remove("client_pic_big");
  pictures[counterPic].classList.add("client_pic_normal");

  let elementBigIndex = pictures.findIndex((element) =>
    element.classList.contains("client_pic_big")
  );
  // container translation
  picContainer.style.cssText = `position: relative;
    left: -${elementBigIndex * 96}px;
    transition: 0.7s linear;
    `;
  counterPic--;

  counterPic > 0
    ? (arrLeft.style.cssText = "pointer-events:auto") &&
      (leftArrIcon.style.color = "#1e90ff")
    : (arrLeft.style.cssText = "pointer-events:none") &&
      (leftArrIcon.style.color = "#909090");

  counterPic === pictures.length - 1
    ? (rightArrIcon.style.cssText = "color:#909090;") &&
      (arrRight.style.cssText = "pointer-events: none;")
    : (rightArrIcon.style.color = "#1e90ff") &&
      (arrRight.style.cssText = "pointer-events: auto;");
});

arrRight.addEventListener("click", () => {
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
    : (arrLeft.style.cssText = "pointer-events:none") &&
      (leftArrIcon.style.color = "#909090");

  counterPic === pictures.length - 1
    ? (rightArrIcon.style.cssText = "color:#909090;") &&
      (arrRight.style.cssText = "pointer-events: none;")
    : (rightArrIcon.style.color = "#1e90ff");
});

// When window resized get back picture container to position 0

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    picContainer.style.cssText = `position: relative;
    left: 0px;
    `;
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

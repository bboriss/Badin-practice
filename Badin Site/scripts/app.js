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
// name, role and text
const clientName = document.querySelector(".name_and_role-name");
const clientRole = document.querySelector(".name_and_role-role");
const clientText = document.querySelector(".client_text");

let counterPic = 0;
const namesAndRoles = [
  {
    name: "Karthik Rao",
    role: "Head of Technology, Eton Institute",
    text: "Badin and team take complete ownership of the given project or tasks. I would like to mention that the team is very honest and sincere. If a mistake is made, there are no excuses but acceptance and continuing to rectify the situation with the best possible solution and making sure we are satisfied. This comes because of a strong technical presence in the team. We at Eton Institute are happy with the service provided and continue the relationship with BadinSoft in the long run.",
  },
  {
    name: "Dragan Andrejic",
    role: "Software Team Leader, Telekom Srbija",
    text: "In our collaboration, we most appreciate your flexibility and ability to quickly adapt to changing customer requirements. We also appreciate the demonstrated competence in all spheres. We would describe the cooperation with you as very motivating and useful for us (hopefully for you too) as we have learned a lot during this project.",
  },
  {
    name: "Nikola Ristovic",
    role: "Head of Satellite Applications Unit, Raiffeisen bank",
    text: "I have been with Badin since 2017 and had a privilege to influence our culture, contribute to the career development of my colleagues, and create good systems. The main advantage, and the main reason why I am here is the freedom to create, influence, contribute, and leave my mark.",
  },
  {
    name: "Geordie Lindsay-Russel",
    role: "Business Analyst Project management",
    text: "Tranxactor has worked with the team behind Badin since the beginning. This highly talented team became the backbone of the software development and support for Tranxactor's product suite as well as the daily technical support for many of our clients around the world. The team works as much a partner as a service provider to Tranxactor, and continues to provide a range of critical services to support Tranxactor and its global clients. We have no hesitation in recommending Badin as a solid and reliable software partner.",
  },
  {
    name: "Fangsim Lim",
    role: "COO Tranxactor",
    text: "My personal impression after a year and a half of working with the Badin team is that the guys, without having previously encountered the TELCO industry, easily understood its processes and accepted to change our in-house solution. The impression is that they work quickly and complement each other perfectly as a team. Their code complies with the requirements. I know that the way requests are received is not the best practice, nor is the frequency and timing of changes of requests, and that it may bother the guys, but they still remain professionals who try to meet the user requirements as much as they can.",
  },
];

arrLeft.addEventListener("click", () => {
  pictures[counterPic - 1].classList.remove("client_pic_normal");
  pictures[counterPic - 1].classList.add("client_pic_big");
  pictures[counterPic].classList.remove("client_pic_big");
  pictures[counterPic].classList.add("client_pic_normal");

  // container translation
  picContainer.style.cssText = `position: relative;
    left: -${(counterPic - 1) * 96}px;
    transition: 0.7s linear;
    `;

  counterPic--;

  clientName.innerText = namesAndRoles[counterPic].name;
  clientRole.innerText = namesAndRoles[counterPic].role;
  clientText.innerText = namesAndRoles[counterPic].text;

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

  counterPic++;

  clientName.innerText = namesAndRoles[counterPic].name;
  clientRole.innerText = namesAndRoles[counterPic].role;
  clientText.innerText = namesAndRoles[counterPic].text;
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
    clientName.innerText = namesAndRoles[0].name;
    clientRole.innerText = namesAndRoles[0].role;
    clientText.innerText = namesAndRoles[0].text;
  } else {
    clientName.innerText = namesAndRoles[counterPic].name;
    clientRole.innerText = namesAndRoles[counterPic].role;
    clientText.innerText = namesAndRoles[counterPic].text;
  }
});

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

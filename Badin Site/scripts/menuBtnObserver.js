const topSection = document.getElementsByClassName("top-section")[0];
const expertise = document.querySelector(".expertise");
const footer = document.getElementsByTagName("footer")[0];
const burgerLines = Array.from(
  document.getElementsByClassName("menu-btn__burger-line")
);
const menuText = document.querySelector(".menu-btn__menu");

export const menuIntersecting = () => {
  let options = {
    root: null,
    rootMargin: "-49% 0px",
    threshold: 0,
  };
  let observer = new IntersectionObserver(menuTouching, options);

  observer.observe(topSection);
  observer.observe(expertise);
  observer.observe(footer);

  function menuTouching(entries) {
    if (entries[0].isIntersecting) {
      burgerLines.forEach((line) => (line.style.backgroundColor = "white"));
      menuText.style.color = "white";
    } else {
      burgerLines.forEach((line) => (line.style.backgroundColor = "black"));
      menuText.style.color = "black";
    }
  }
};

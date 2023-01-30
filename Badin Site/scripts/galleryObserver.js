const gallerySection = document.querySelector(".pictures");
const picOne = document.querySelector(".picture_1");
const picTwo = document.querySelector(".picture_2");
const picSix = document.querySelector(".picture_6");
const picFive = document.querySelector(".picture_5");
const picFour = document.querySelector(".picture_4");

const galleryIntersecting = () => {
  let galleryOptions = {
    root: null,
    rootMargin: "0px 0px",
    threshold: 0,
  };
  let galleryObserver = new IntersectionObserver(
    galleryTouching,
    galleryOptions
  );

  galleryObserver.observe(gallerySection);

  function galleryTouching(entries) {
    const picturesArray = [picOne, picTwo, picSix, picFive, picFour];
    entries[0].isIntersecting && window.innerWidth > 768
      ? picturesArray.forEach((pic) => pic.classList.add("popper"))
      : picturesArray.forEach((pic) => pic.classList.remove("popper"));
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // gallery poping up
  galleryIntersecting();
});

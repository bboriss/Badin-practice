export const buttonFiller = () => {
  let scrollProgress = document.querySelector(".back-to-top-btn");

  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrollValue = Math.round((pos * 100) / calcHeight);

  pos > 100 && window.innerWidth > 768
    ? (scrollProgress.style.display = "flex")
    : (scrollProgress.style.display = "none");

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#f9fafe ${scrollValue}%, #505050 ${scrollValue}%)`;
};

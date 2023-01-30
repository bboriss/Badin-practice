const buttonFiller = () => {
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

document.addEventListener("DOMContentLoaded", () => {
  // back to top btn not visible when page loads
  document.querySelector(".back-to-top-btn").style.display = "none";
});

// <--- back to top btn --->
window.addEventListener("scroll", buttonFiller);

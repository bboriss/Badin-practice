const card = document.getElementsByClassName("card")[0];
console.log(card);

const menuIntersecting = () => {
  let options = {
    root: null,
    rootMargin: "0% 0px",
    threshold: 0,
  };
  let observer = new IntersectionObserver(menuTouching, options);

  observer.observe(card);

  function menuTouching(entries) {
    if (entries[0].isIntersecting) {
      console.log("ulazi");
      card.classList.remove("hidden");
    } else {
      console.log("izlazi");
      card.classList.add("hidden");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  menuIntersecting();
});

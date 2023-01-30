const menuCover = document.querySelector(".menu_cover");
const menuCoverContainer = document.querySelector(".menu_cover_container");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".menu_close_btn");
const menuLogo = document.querySelector(".logo-badin_menu");
const menu = document.querySelector(".menu");
const corners = Array.from(document.getElementsByClassName("corner"));

const onMouseEnter = () => {
  menuCover.classList.remove("border_left_disappear");
  menuCover.classList.remove("notExisting");
  menuCover.classList.add("border-primary");
};

const onMouseLeave = () => {
  if (!menuBtn.classList.contains("notExisting")) {
    menuCover.classList.add("border_left_disappear");
    menuCover.classList.remove("border-primary");
    menuCover.classList.add("notExisting");
  }
};

const onClick = () => {
  menuBtn.classList.add("notExisting");
  menuCover.classList.remove("border_left_disappear");
  menuCover.classList.remove("border-primary");
  menuCover.classList.remove("notExisting");
  menuCover.classList.add("border-secondary");
  menuCover.classList.add("blur");

  corners.forEach((corner) => corner.classList.remove("notExisting"));
  menuLogo.classList.remove("notExisting");
  menuCoverContainer.classList.remove("notExisting");
  menu.classList.remove("notExisting");
  let list = Array.from(menu.children[1].children);
  console.log(list[1]);

  for (let i = 0; i < list.length; i++) {
    setTimeout(() => {
      list[i].classList.remove("notExisting");
    }, i * 120);
  }
};

const onClose = () => {
  menuBtn.classList.remove("notExisting");
  menuCover.classList.add("border_left_disappear");
  menuCover.classList.add("border-primary");
  menuCover.classList.add("notExisting");
  menuCover.classList.remove("border-secondary");
  menuCover.classList.remove("blur");

  corners.forEach((corner) => corner.classList.add("notExisting"));
  menuLogo.classList.add("notExisting");
  menuCoverContainer.classList.add("notExisting");
  menu.classList.add("notExisting");
  let list = Array.from(menu.children[1].children);
  console.log(list[1]);

  for (let i = 0; i < list.length; i++) {
    list[i].classList.add("notExisting");
  }
};

menuBtn.addEventListener("mouseenter", onMouseEnter);

menuBtn.addEventListener("mouseleave", onMouseLeave);

menuBtn.addEventListener("click", onClick);

closeBtn.addEventListener("click", onClose);

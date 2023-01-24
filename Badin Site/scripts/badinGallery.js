const pictureContainers = Array.from(
  document.getElementsByClassName("picture_container")
);
const badinPicturesAdresses = Array.from(
  document.getElementsByClassName("picture_container")
).map((picture) => picture.children[0].currentSrc);

const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal_image");
const modalLeftArrow = document.querySelector(".pic_left_btn");
const modalRightArrow = document.querySelector(".pic_right_btn");

// <--- GALLERY LOGIC --->
// current Img
let currentImg;

pictureContainers.forEach((badinPicture) =>
  badinPicture.addEventListener("click", (e) => {
    modal.style.display = "block";

    currentImg = e.target.src;
    modalImg.src = currentImg;

    currentImg.includes("first")
      ? (modalLeftArrow.style.display = "none")
      : (modalLeftArrow.style.display = "block");

    currentImg.includes("chill")
      ? (modalRightArrow.style.display = "none")
      : (modalRightArrow.style.display = "block");

    console.log(typeof currentImg);
    console.log(currentImg);
  })
);

export const moveToRightGallery = (e) => {
  modalLeftArrow.style.display = "block";
  const nextIndex =
    badinPicturesAdresses.findIndex((address) => address == currentImg) + 1;

  currentImg = badinPicturesAdresses[nextIndex];
  modalImg.src = currentImg;

  currentImg.includes("chill")
    ? (modalRightArrow.style.display = "none")
    : (modalRightArrow.style.display = "block");

  e.stopPropagation();
};

export const moveToLeftGallery = (e) => {
  modalRightArrow.style.display = "block";
  const previousIndex =
    badinPicturesAdresses.findIndex((address) => address == currentImg) - 1;

  currentImg = badinPicturesAdresses[previousIndex];
  modalImg.src = currentImg;

  currentImg.includes("first")
    ? (modalLeftArrow.style.display = "none")
    : (modalLeftArrow.style.display = "block");

  e.stopPropagation();
};

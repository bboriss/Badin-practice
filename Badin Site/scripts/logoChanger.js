const logosRef = Array.from(
  document.getElementsByClassName("client_icon")
).splice(0, 13);

const logoContainer = document.querySelector(
  ".trusted_by_second-icons_container_content-desktop"
);

let logos = [...logosRef];

export const logoChanger = () => {
  logoContainer.innerHTML = "";
  // remove hardcoded visible logos
  logos.forEach((logo) => logo.classList.remove("first_iteration"));
  // move them to the end of array
  const firstFive = logos.splice(0, 5);

  logos = [...logos, ...firstFive];
  // take second 5 to display
  const forDisplay = logos.slice(0, 5);

  for (let i = 0; i < forDisplay.length; i++) {
    setTimeout(() => {
      logoContainer.append(forDisplay[i]);
    }, 150 * i);
  }
};

// input reference
const mealForm = document.getElementById("mealInput");
const mealInput = document.getElementById("meal");
const input = document.getElementById("meal");
let baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
// container
const container = document.querySelector(".mealsContainer");
const mealContainer = document.querySelector(".mealContainer");
const modal = document.querySelector(".modal");
const message = document.querySelector(".nothingFound");

mealForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const termToSearch = mealInput.value;
  termToSearch.length !== 0 ? getData(termToSearch) : mealInput.focus();
  mealForm.reset();
});

const getData = async (term) => {
  try {
    const fetchData = await fetch(`${baseUrl + term}`);
    const meals = await fetchData.json();
    const mealsArray = meals.meals;

    // clear container if previously populated
    container.innerHTML = null;
    if (mealsArray) {
      // remove not found message if exists
      message.classList.add("hide");
      // add new meals
      mealsArray.forEach((meal) => {
        const { strMeal, strMealThumb, idMeal } = meal;

        // create HTML elements
        const item = document.createElement("div");
        const picture = document.createElement("img");
        const title = document.createElement("h5");
        const button = document.createElement("button");
        // set attributes and append children
        item.classList.add("mealsContainer_item");
        item.dataset.id = idMeal;
        picture.setAttribute("src", strMealThumb);
        title.innerText = strMeal;
        button.innerText = "More";
        const elementsToAppend = [picture, title, button];
        elementsToAppend.forEach((element) => item.appendChild(element));
        container.appendChild(item);
        container.classList.remove("hide");
        button.addEventListener("click", (e) => {
          const selectedMealId = e.target.parentNode.dataset.id;
          openModal(selectedMealId);
        });
      });
    } else {
      message.classList.remove("hide");
    }
  } catch (error) {
    console.log(error);
  }
};

const openModal = async (id) => {
  try {
    const fetchMeal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const meal = await fetchMeal.json();
    const mealObject = meal.meals;

    const { strCategory, strInstructions, strYoutube } = mealObject[0];
    // create HTML elements
    const category = document.createElement("h3");
    const instruction = document.createElement("p");
    const anchor = document.createElement("a");
    const closeButton = document.createElement("i");
    // set attributes and append children
    category.innerText = `Category : ${strCategory}`;
    instruction.innerText = strInstructions;
    anchor.innerHTML = 'Watch on <i class="fa fa-youtube"></i>';
    anchor.setAttribute("href", `${strYoutube}`);
    anchor.setAttribute("target", "_blank");
    closeButton.classList.add("fa", "fa-close");
    const elementsToAppend = [category, instruction, anchor, closeButton];
    elementsToAppend.forEach((element) => mealContainer.appendChild(element));
    modal.classList.remove("hide");

    closeButton.addEventListener("click", () => {
      const elementsToRemove = [category, instruction, anchor, closeButton];
      elementsToRemove.forEach((element) => element.remove());
      modal.classList.add("hide");
    });
  } catch (error) {
    console.log(error);
  }
};

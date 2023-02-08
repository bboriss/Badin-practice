// input reference
const mealInput = document.getElementById("mealInput");
let baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

// container
const container = document.querySelector(".mealsContainer");

const mealContainer = document.querySelector(".mealContainer");

// term to search
let termToSearch;

mealInput.addEventListener("submit", (e) => {
  e.preventDefault();

  termToSearch = mealInput.elements[0].value;
  console.log("input : ", termToSearch);
  if (termToSearch) {
    getData();
  }
  mealInput.reset();
});

const getData = async () => {
  try {
    console.log(`${baseUrl + termToSearch}`);
    const fetchData = await fetch(`${baseUrl + termToSearch}`);
    const meals = await fetchData.json();
    const mealsArray = meals.meals;
    console.log(mealsArray);
    if (mealsArray) {
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
        item.appendChild(picture);
        item.appendChild(title);
        item.appendChild(button);
        container.appendChild(item);
        container.classList.remove("hide");
        button.addEventListener("click", (e) => {
          const selectedMealId = e.target.parentNode.dataset.id;
          openModal(selectedMealId);
        });
      });
    }
  } catch (error) {
    return;
  }
};

const openModal = async (id) => {
  try {
    const fetchMeal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const meal = await fetchMeal.json();
    const mealObject = meal.meals;
    if (mealObject) {
      const { strCategory, strInstructions, strYoutube } = mealObject;
      console.log(mealObject);
      // create HTML elements
      //   const mealImage = document.createElement("div");
      const category = document.createElement("h3");
      const instruction = document.createElement("p");
      const anchor = document.createElement("a");
      // set attributes and append children
      category.innerText = `Category : ${strCategory}`;
      instruction.innerText = strInstructions;
      anchor.innerHTML = 'Watch on <i class="fa fa-youtube"></i>';
      anchor.setAttribute(
        "href",
        "https://www.youtube.com/watch?v=bXKWu4GojNI"
      );
      anchor.setAttribute("target", "_blank");

      mealContainer.appendChild(category);
      mealContainer.appendChild(instruction);
      mealContainer.appendChild(anchor);
    }
  } catch (error) {
    console.log(error);
  }
};

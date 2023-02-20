const genre = document.querySelector(".randomGenre");
const bestRatedItemsContainer = document.querySelector(".bestRatedItems");
const mostReviewsItemsContainer = document.querySelector(".mostReviewsItems");
const books = document.querySelector(".books");
const genreOptions = document.getElementsByTagName("select")[0];
// --search--
const titleForm = document.getElementById("titleForm");
const titleInput = document.getElementById("title");
// --navigation--
// nav buttons
const homeButton = document.getElementById("home_button");
const booksButton = document.getElementById("books_button");
// back button
const backButton = document.getElementsByClassName("back_button")[0];
// adult check
const adultCheck = document.getElementById("adult");
// containers
const homePage = document.getElementById("homePage");
const booksPage = document.getElementById("booksPage");
const detailsPage = document.getElementById("details");

let allBooks = [];
let allGenres = [];
const adultGenres = [
  "Adult",
  "Adult Fiction",
  "Abuse",
  "Erotica",
  "Gay",
  "Gay Erotica",
  "Gay For You",
  "Gay Romance",
  "Asexual",
  "Gay",
  "LGBT",
  "GLBT",
];
let randomGenre;
let averageRating;

const getData = async () => {
  try {
    // const fetchData = await fetch(
    //   "https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest",
    //   {
    //     method: "GET",
    //     headers: {
    //       "X-Master-Key":
    //         "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
    //     },
    //   }
    // );
    const fetchData = await fetch("./dataBase.json");
    const jsonData = await fetchData.json();

    // get all data array
    const data = jsonData.results;
    // collect all genres
    data.forEach((book) => {
      const genresArray = book.genre.split(",");

      // filter if adult not selected
      if (
        !adultCheck.checked &&
        genresArray.some((ai) => adultGenres.includes(ai))
      ) {
        return;
      } else {
        allBooks = [...allBooks, book];
      }

      genresArray.forEach((genre) => {
        if (
          !adultCheck.checked &&
          !allGenres.includes(genre) &&
          !adultGenres.includes(genre) &&
          genre.length > 0
        ) {
          allGenres = [...allGenres, genre];
        }
        if (
          adultCheck.checked &&
          !allGenres.includes(genre) &&
          genre.length > 0
        ) {
          allGenres = [...allGenres, genre];
        }
      });
      allGenres.sort();
    });
    // take random genre
    randomGenre = allGenres[Math.floor(Math.random() * allGenres.length)];
    genre.innerText = randomGenre;
    // take average rating from all books
    averageRating =
      allBooks.reduce((total, book) => {
        return total + book.rating;
      }, 0) / allBooks.length;
    // fill the cards
    populateHome();
    populateBooksPage();
  } catch (error) {
    console.log(error);
  }
};

const populateHome = () => {
  const bestRatingToSort = [...allBooks];

  // filter books with random genre
  const filteredBooks = allBooks.filter((book) =>
    book.genre.includes(randomGenre)
  );

  sortingFunction(bestRatingToSort, bestRatedItemsContainer);
  sortingFunction(filteredBooks, mostReviewsItemsContainer);
};

const populateBooksPage = () => {
  allBooks.forEach((book) => bookItemMaker(book, books));
  allGenres.forEach((genre) => {
    const genreOption = document.createElement("option");
    genreOption.text = genre;
    genreOption.value = genre;
    document.getElementById("category").add(genreOption);
  });
};

const searchByTitle = (searchInput) => {
  const filteredBySearchInput = allBooks.filter((book) => {
    return book.title
      .toString()
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
  if (filteredBySearchInput.length === 0) {
    alert("Sorry, we do not have that book, please try again.");
    return;
  }
  booksPageSelected();
  books.innerHTML = null;
  genreOptions.selectedIndex = 0;
  filteredBySearchInput.forEach((b) => {
    bookItemMaker(b, books);
  });
};

const openDetailsPage = (e) => {
  const selectedBook = allBooks.find((b) => b.title == e.target.dataset.id);
  homePage.classList.add("hide");
  booksPage.classList.add("hide");
  detailsPage.classList.remove("hide");

  document.getElementsByClassName("details_img")[0].src = selectedBook.img;
  document.getElementsByClassName("details_title")[0].innerText =
    selectedBook.title;
  document.getElementsByClassName(
    "details_author"
  )[0].innerText = `AUTHOR: ${selectedBook.author}`;
  document.getElementsByClassName(
    "details_genre"
  )[0].innerText = `GENRE: ${selectedBook.genre}`;
  document.getElementsByClassName(
    "details_pages"
  )[0].innerText = `PAGES: ${selectedBook.pages}`;
  document.getElementsByClassName(
    "details_rating"
  )[0].innerText = `RATING: ${selectedBook.rating}`;
  document.getElementsByClassName(
    "details_description"
  )[0].innerText = `${selectedBook.desc}`;

  if (selectedBook.rating > averageRating) {
    document.getElementsByClassName("details_rating")[0].style.backgroundColor =
      "#94C58C";
  } else {
    document.getElementsByClassName("details_rating")[0].style.backgroundColor =
      "#ff7b7b";
  }
};

getData();

// helper functions
const booksPageSelected = () => {
  homeButton.classList.remove("nav_active");
  homePage.classList.add("hide");
  booksButton.classList.add("nav_active");
  booksPage.classList.remove("hide");
  detailsPage.classList.add("hide");
};

const homePageSelected = () => {
  homeButton.classList.add("nav_active");
  homePage.classList.remove("hide");
  booksButton.classList.remove("nav_active");
  booksPage.classList.add("hide");
  detailsPage.classList.add("hide");
};

// function for sorting
const sortingFunction = (arr, container) => {
  const sorted = arr.sort((r1, r2) =>
    r1.rating > r2.rating ? -1 : r1.rating < r2.rating ? 1 : 0
  );

  for (let i = 0; i < 4; i++) {
    if (sorted[i]) {
      bookItemMaker(sorted[i], container);
    }
  }
};

// function to populate book items container
const bookItemMaker = (book, parentContainer) => {
  const bestRatedItemWrapper = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h5");
  const priceAndAdd = document.createElement("div");
  const price = document.createElement("p");
  const addToCard = document.createElement("p");

  bestRatedItemWrapper.classList.add("bestRatedItem");
  title.classList.add("title");
  priceAndAdd.classList.add("price_and_add");
  price.classList.add("price");
  addToCard.classList.add("shopping_card");

  bestRatedItemWrapper.appendChild(image);
  bestRatedItemWrapper.appendChild(title);
  bestRatedItemWrapper.appendChild(priceAndAdd);
  priceAndAdd.appendChild(price);
  priceAndAdd.appendChild(addToCard);

  bestRatedItemWrapper.setAttribute("data-id", book.title);
  image.src = book.img;
  title.innerText = book.title;
  price.innerText = `Rating: ${book.rating}`;
  addToCard.innerText = "🛒";

  parentContainer.appendChild(bestRatedItemWrapper);

  bestRatedItemWrapper.addEventListener("click", openDetailsPage);
};

genreOptions.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filteredByCategory = allBooks.filter((book) => {
    return book.genre.includes(selectedCategory);
  });
  books.innerHTML = null;
  filteredByCategory.forEach((b) => {
    bookItemMaker(b, books);
  });
});

homeButton.addEventListener("click", () => {
  homePageSelected();
});

booksButton.addEventListener("click", () => {
  booksPageSelected();
  books.innerHTML = null;
  genreOptions.selectedIndex = 0;
  populateBooksPage();
});

titleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  if (title.length !== 0) {
    searchByTitle(title);
  } else {
    titleInput.focus();
  }
  e.target.reset();
});

backButton.addEventListener("click", () => {
  detailsPage.classList.add("hide");
  homeButton.classList.contains("nav_active")
    ? homePage.classList.remove("hide")
    : booksPage.classList.remove("hide");
});

adultCheck.addEventListener("click", () => {
  if (adultCheck.checked) {
    allBooks = [];
    allGenres = [];
    mostReviewsItemsContainer.innerHTML = null;
    bestRatedItemsContainer.innerHTML = null;
    books.innerHTML = null;
    genreOptions.innerHTML = `<option value="genre" selected="true" disabled="disabled">
    Genre
  </option>`;

    getData();
  } else {
    allBooks = [];
    allGenres = [];
    mostReviewsItemsContainer.innerHTML = null;
    bestRatedItemsContainer.innerHTML = null;
    books.innerHTML = null;
    genreOptions.innerHTML = `<option value="genre" selected="true" disabled="disabled">
    Genre
  </option>`;
    getData();
  }
});

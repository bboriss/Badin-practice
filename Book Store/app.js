const genre = document.querySelector(".randomGenre");
const bestRatedCard = Array.from(
  document.getElementsByClassName("bestRatedItem")
);

let allBooks = [];
let allGenres = [];
let randomGenre;

const getData = async () => {
  try {
    const fetchData = await fetch(
      "https://api.jsonbin.io/v3/b/63a0e753dfc68e59d56c71ec/latest",
      {
        method: "GET",
        headers: {
          "X-Master-Key":
            "$2b$10$viPOiL/.5Te1ctsEnmquLuBHKGeK09Vp0SxT2m7wkH68/e1537nUK",
        },
      }
    );

    const jsonData = await fetchData.json();
    const data = jsonData.record.results;
    const genresArray = data.forEach((book) => {
      allBooks = [...allBooks, book];
      const genresArray = book.genre.split(",");
      genresArray.forEach((genre) => {
        if (!allGenres.includes(genre)) {
          allGenres = [...allGenres, genre];
        }
      });
    });
    randomGenre = allGenres[Math.floor(Math.random() * allGenres.length)];
    genre.innerText = randomGenre;
    console.log("all books : ", allBooks);
    // fill the cards
    populateCards();
  } catch (error) {
    console.log(error);
  }
};

const populateCards = () => {
  // filter books with random genre
  const filteredBooks = allBooks.filter((book) =>
    book.genre.includes(randomGenre)
  );
  console.log("aaaaa", filteredBooks);
  let bestRatingOrder = filteredBooks.sort((r1, r2) =>
    r1.rating > r2.rating ? -1 : r1.rating < r2.rating ? 1 : 0
  );

  console.log("sorted ", bestRatingOrder);
  for (let i = 0; i < 3; i++) {
    if (bestRatingOrder[i]) {
      console.log(bestRatedCard[i].childNodes);

      bestRatedCard[i].childNodes[1].src = bestRatingOrder[i].img;

      Array.from(document.getElementsByClassName("title"))[i].innerText =
        bestRatingOrder[i].title;

      Array.from(document.getElementsByClassName("price"))[
        i
      ].innerText = `$${bestRatingOrder[i].rating}`;

      Array.from(document.getElementsByClassName("shopping_card"))[
        i
      ].innerText = "🛒";
      //   bestRatedCard[i].childNodes[3].innerText = bestRatingOrder[i].title;
      //   console.log(bestRatedCard[i].childNodes[4].childNodes);
      //   childNodes[4].innerText = `$${bestRatingOrder[i].rating}`;
    }
  }

  //   console.log(bestRatingOrder);
};

getData();

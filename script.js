const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formR = document.querySelector("form");
const searchInputR = document.getElementById("search-input");
const searchResultsR = document.querySelector(".search-results");
const showMoreButtonsR = document.getElementById("show-more-button");


let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputR.value;//what we type in the input section will save to inputData
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data =  await response.json();

  document.body.style.backgroundImage = "none";

  if (page === 1) {
    searchResultsR.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsR.appendChild(imageWrapper);
  })

  page++;

  if (page > 1) {
    showMoreButtonsR.style.display = "block";
  }
}

formR.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
})

showMoreButtonsR.addEventListener("click", () => {
  searchImages();
})
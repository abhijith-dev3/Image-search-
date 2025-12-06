// Unsplash API Access Key
const accessKey = "U5sAvdgPM6eP_9VzX-8AvZS9S8TkJv8LsslgHw8ENAw";


const form = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;


async function searchImages() {
  inputData = searchInput.value; 
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

  
    document.body.style.backgroundImage = "none";

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
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
      searchResults.appendChild(imageWrapper);
    });

    page++;

   
    if (page > 1) {
      showMoreButton.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; 
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});

document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", (event) => {
    const post = event.target.closest(".post");
    if (!post) {
      console.error('The "Read More" button must be inside a .post element');
      return;
    }
    const textElement = post.querySelector(".text");
    if (!textElement) {
      console.error("Each .post element must contain a .text element");
      return;
    }
    if (textElement.classList.contains("expanded")) {
      textElement.classList.remove("expanded");
      event.target.textContent = "Read More";
    } else {
      textElement.classList.add("expanded");
      event.target.textContent = "Read Less";
    }
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const quotes = [
  '"This is the quote for the first slide"',
  '"This is the quote for the second slide"',
  '"This is the quote for the third slide"',
];

function showSlide(index) {
  slides[currentSlide].style.opacity = 0;
  currentSlide = index;
  slides[currentSlide].style.opacity = 1;

  const quoteElement = document.getElementById("quote");
  quoteElement.textContent = quotes[index];
}
showSlide(currentSlide);

document.getElementById("prev").addEventListener("click", () => {
  let index = currentSlide - 1;
  if (index < 0) index = slides.length - 1;
  showSlide(index);
});

document.getElementById("next").addEventListener("click", () => {
  let index = (currentSlide + 1) % slides.length;
  showSlide(index);
});

let currentPage = 1;
const postsPerPage = 4;
const posts = Array.from(document.querySelectorAll(".post"));
const totalPages = Math.ceil(posts.length / postsPerPage);

function showPage(page) {
  posts.forEach((post) => {
    post.style.display = "none";
  });

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  posts.slice(start, end).forEach((post) => {
    post.style.display = "";
  });

  document.querySelector("#pagination span").textContent =
    "Page " + page + " of " + totalPages;
}

document
  .querySelector("#pagination button:first-child")
  .addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

document
  .querySelector("#pagination button:last-child")
  .addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

showPage(currentPage);

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const postContent = post.textContent.toLowerCase();
    return postContent.includes(query);
  });

  posts.forEach((post) => {
    post.style.display = "none";
  });

  filteredPosts.forEach((post) => {
    post.style.display = "";
  });

  if (query === "") {
    showPage(currentPage);
  }
});

document
  .getElementById("burger-menu-button")
  .addEventListener("click", function () {
    document.getElementById("burger-menu").classList.toggle("active");
  });
document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("burger-menu").classList.remove("active");
});

var searchBar = document.getElementById("search");
var searchIconButton = document.getElementById("search-icon-button");

searchIconButton.addEventListener("click", function () {
  if (window.innerWidth <= 768) {
    if (!searchBar.classList.contains("active")) {
      searchBar.classList.add("active");
    } else {
      searchBar.classList.remove("active");
    }
  }
});

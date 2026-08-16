const btn = document.querySelector(".btn");
const facts = document.querySelector(".fact");
const catImg = document.querySelector(".cat-img");
const spinner = document.querySelector(".spinner");
const toggleButton = document.getElementById("darkModeToggle");
const toggleIcon = document.getElementById("toggleIcon");

const getCatFact = () => axios.get("https://catfact.ninja/fact").then((res) => res.data.fact);
const getCatImage = () => axios.get("https://api.thecatapi.com/v1/images/search").then((res) => res.data[0].url);

btn.addEventListener("click", async () => {
  spinner.style.display = "block";
  facts.textContent = "";
  catImg.style.display = "none";

  try {
    const [fact, imgUrl] = await Promise.all([getCatFact(), getCatImage()]);

    facts.textContent = fact;
    facts.style.opacity = 0;

    catImg.src = imgUrl;
    catImg.alt = "A random cute cat";
    catImg.style.display = "block";
    catImg.style.opacity = 0;

    requestAnimationFrame(() => {
      facts.style.opacity = 1;
      catImg.style.opacity = 1;
    });
  } catch (err) {
    console.log("Error:", err);
    facts.textContent =
      "😿 Oops! Something went wrong. Please try again later.";
  } finally {
    spinner.style.display = "none";
  }
});

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  document.body.classList.toggle("dark-mode", isDark);
  toggleIcon.textContent = isDark ? "☀️" : "🌙";
  toggleIcon.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

toggleButton.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme();
});

window.addEventListener("DOMContentLoaded", applyTheme);

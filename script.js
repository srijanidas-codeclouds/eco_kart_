document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  const searchBtn = document.getElementById("search-btn");
  const mobileSearch = document.getElementById("mobile-search");

  // Mobile menu toggle
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menu.classList.contains("scale-y-100");

      if (isOpen) {
        menu.classList.remove("scale-y-100");
        menu.classList.add("scale-y-0");
      } else {
        menu.classList.remove("hidden", "scale-y-0");
        menu.classList.add("scale-y-100");
      }
    });
  }

  // Mobile search toggle
  if (searchBtn && mobileSearch) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      mobileSearch.classList.toggle("hidden");
      mobileSearch.classList.toggle("block");
      console.log("Search toggled");
    });
  }
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
const navHome = document.getElementById("nav-home");
const navProducts = document.getElementById("nav-products");
const navAbout = document.getElementById("nav-about");
const navContact = document.getElementById("nav-contact");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add(
        "bg-white",
        "backdrop-blur-lg",
        "shadow-lg",
        "text-green-900"
      );
      navbar.classList.remove("bg-transparent", "text-white");

      [navHome, navProducts, navAbout, navContact].forEach((nav) => {
        if (nav) {
          nav.classList.remove("text-white");
          nav.classList.add("text-green-600");
        }
      });
    } else {
      navbar.classList.remove(
        "bg-white/90",
        "backdrop-blur-lg",
        "shadow-md",
        "text-green-900"
      );
      navbar.classList.add("bg-transparent", "text-white");
    }
  });
}

// Tabs (product page only)
const tabDescription = document.getElementById("tab-description");
const tabReviews = document.getElementById("tab-reviews");
const contentDescription = document.getElementById("content-description");
const contentReviews = document.getElementById("content-reviews");

if (tabDescription && tabReviews && contentDescription && contentReviews) {
  tabDescription.addEventListener("click", () => {
    contentDescription.classList.remove("hidden");
    contentReviews.classList.add("hidden");
    tabDescription.classList.add("border-b-2", "border-black");
    tabDescription.classList.remove("text-gray-500");
    tabReviews.classList.remove("border-b-2", "border-black");
    tabReviews.classList.add("text-gray-500");
  });

  tabReviews.addEventListener("click", () => {
    contentReviews.classList.remove("hidden");
    contentDescription.classList.add("hidden");
    tabReviews.classList.add("border-b-2", "border-black");
    tabReviews.classList.remove("text-gray-500");
    tabDescription.classList.remove("border-b-2", "border-black");
    tabDescription.classList.add("text-gray-500");
  });
}

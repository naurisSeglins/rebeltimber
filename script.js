// SHOW MENU
// izveidota funkcija "showMenu"
// funkcijai ir divi parametri => "toggleId" un "navId"
// abi šie parametri tiek meklēti html failā pēc id
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);
  // ja abi šie elementi pēc id tiek atrasti, tad
  // "toggle" elementam tiek pievienota klausīšanās funkcija uz "click"
  //teorija - Toggles between a class name for an element.
  // The first parameter removes the specified class from an element, and returns false.
  // If the class does not exist, it is added to the element, and the return value is true.
  // ja tiek izsaukta "toggle" elementa funkcija, tad "nav" elementam tiek pievienota klase "show"
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
//"showMenu" funkcija ar norādītām vērtībām
showMenu("nav-toggle", "nav-menu");

// REMOVE MENU MOBILE
// elementi ar klasi "nav__link" zem viena parametra "navLink"
const navLink = document.querySelectorAll(".nav__link");
//funkcija "linkAction" kurā tiek sameklēts elements pēc ID "nav-menu"
// un noņemta tam klase "show-menu"
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
//katrama navLink elementam tiek piešķirta funkcija "linkAction"
//kura tiek izpildīta ja tiek uzklikšķināts uz šī elementa
navLink.forEach((n) => n.addEventListener("click", linkAction));

// SCROLL SECTIONS ACTIVE LINK
// funkcija kura pārceļ punktu kurš ir navigācijas joslā un ar kuru tiek apzīmēta atrašanāš vieta mājaslapā
// visi section elementi kuriem ir ID tiek palikti zem viena parametra "sections"
const sections = document.querySelectorAll("section[id]");
//funkcija "scrollActive"
function scrollActive() {
  //   The pageYOffset properties returns the pixels the current document has been scrolled from the upper corner of the window vertically.
  // The pageYOffset properties are equal to the scrollY properties.
  // These properties are read-only.
  const scrollY = window.pageYOffset;
  //section ir array, tāpēc tiek izmantota metode "forEach", lai katru section elementu apzīmētu kā "current" mainīgo
  sections.forEach((current) => {
    // mainīgā "sectionHeight" vērtība ir elementa garums pikselos ieskaitot padding un borders
    const sectionHeight = current.offsetHeight;
    // mainīgā "sectionTop" vērtība ir elementa augšējā pozīcijas vērtība pikselos relatīva parent elementa augšējai pozīcijai
    const sectionTop = current.offsetTop - 70;
    //mainīgā "sectionId" vērtība ir mainīgā "current" ID vērtība
    sectionId = current.getAttribute("id");
    // visiem section elementiem ar ID tiek pievienota šī funkcija, taču atkarībā no tā cik tālu lapā ir noscrollots uz leju, kas maina "scrollY" vērtību nosaka kuram elementam piešķir "active-link" klasi. Tiem elementiem kuriem "scrollY" vērtība neatbilst viņu pozīcijas vērtībai klase "active-link" tiek noņemta
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
// ja notiek skrollošana tad tiek aktivizēta "scrollActive" funkcija
window.addEventListener("scroll", scrollActive);
// CHANGE BACKGROUND HEADER
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);
// SHOW SCROLL TOP
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);
// DARK LIGHT THEME
const themeButton = document.getElementById("theme-button");
const darkTheme = "light-theme";
const iconTheme = "bx-toggle-right";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "bx-toggle-left"
    : "bx-toggle-right";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-toggle-left" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  distance: "30px",
  duration: 1800,
  reset: true,
});

sr.reveal(`.home__data, .home__img,.products__content, .footer__content`, {
  origin: "top",
  interval: 200,
});

sr.reveal(`.about__img, .contacts__content`, {
  origin: "left",
});

sr.reveal(`.about__data, .contacts__img`, {
  origin: "right",
});

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 56.931377099998976, lng: 23.707391433091168 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

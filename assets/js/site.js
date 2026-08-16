const foreverSmp = Object.freeze({
  serverName: "Forever SMP",
  logoPath: "assets/logo/Forever%20SMP.png",
  javaIp: "playatforeversmp.mcsh.io",
  bedrockIp: "playatforeversmp.mcsh.io",
  bedrockPort: "19132",
  discordUrl: "https://bit.ly/join-forever-smp",
  gameMode: "Survival",
  pvpArena: "⚔️ PvP Arena\n\nCurrently under construction. Stay tuned for epic battles!",
});

const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const closeMenu = () => {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry?.target.id) {
      setActiveLink(visibleEntry.target.id);
    }
  },
  {
    rootMargin: "-25% 0px -60% 0px",
    threshold: [0.1, 0.3, 0.6],
  },
);

navTargets.forEach((target) => observer.observe(target));

window.foreverSmp = foreverSmp;

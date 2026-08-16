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

const serverFields = document.querySelectorAll("[data-server-field]");
const copyButtons = document.querySelectorAll("[data-copy-field]");

serverFields.forEach((field) => {
  const key = field.dataset.serverField;

  if (key && foreverSmp[key]) {
    field.textContent = foreverSmp[key];
  }
});

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.inset = "0 auto auto 0";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.dataset.copyField;
    const value = key ? foreverSmp[key] : "";
    const label = button.querySelector(".copy-button-text");

    if (!value || !label) {
      return;
    }

    await copyText(value);
    button.classList.add("is-copied");
    label.textContent = "Copied!";

    window.setTimeout(() => {
      button.classList.remove("is-copied");
      label.textContent = "Copy";
    }, 1800);
  });
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

const revealItems = document.querySelectorAll(".reveal-on-scroll");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -18% 0px",
    threshold: 0.18,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

window.foreverSmp = foreverSmp;

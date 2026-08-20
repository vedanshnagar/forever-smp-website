const foreverSmp = Object.freeze({
  serverName: "Forever SMP",
  logoPath: "assets/logo/Forever%20SMP.png",
  javaIp: "playatforeversmp.mcsh.io",
  bedrockIp: "playatforeversmp.mcsh.io",
  bedrockPort: "19132",
  discordUrl: "https://bit.ly/join-forever-smp",
  gameMode: "Survival",
});

const serverFields = document.querySelectorAll("[data-server-field]");
serverFields.forEach((field) => {
  const key = field.dataset.serverField;
  if (key && foreverSmp[key] !== undefined) field.textContent = foreverSmp[key];
});

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  document.execCommand("copy");
  area.remove();
};

document.querySelectorAll("[data-copy-field]").forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.dataset.copyField;
    const value = key ? foreverSmp[key] : "";
    const label = button.querySelector(".copy-button-text");
    if (!value || !label) return;
    try {
      await copyText(value);
      button.classList.add("is-copied");
      label.textContent = "Copied!";
      window.setTimeout(() => {
        button.classList.remove("is-copied");
        label.textContent = button.classList.contains("join-copy") ? "Copy Server IP" : "Copy";
      }, 1800);
    } catch {
      label.textContent = "Copy failed";
      window.setTimeout(() => { label.textContent = "Copy"; }, 1800);
    }
  });
});

const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
const navTargets = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

const closeMenu = () => {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

const setActiveLink = (id) => {
  navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target.id) setActiveLink(visible.target.id);
  }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] });
  navTargets.forEach((target) => observer.observe(target));
}

document.querySelector("#year")?.replaceChildren(String(new Date().getFullYear()));
window.foreverSmp = foreverSmp;

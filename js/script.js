document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("nav-toggle");
const header = document.querySelector(".site-header");

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Gallery lightbox */
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

if (galleryItems.length) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCount = document.getElementById("lightbox-count");
  const total = galleryItems.length;
  let current = 0;

  const fullSrc = (index) => {
    const n = String(index + 1).padStart(2, "0");
    return `assets/gallery/full/gallery-${n}.jpg`;
  };

  const show = (index) => {
    current = (index + total) % total;
    const img = galleryItems[current].querySelector("img");
    lightboxImg.src = fullSrc(current);
    lightboxImg.alt = img.alt;
    lightboxCount.textContent = `${current + 1} / ${total}`;
  };

  const open = (index) => {
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  document.getElementById("lightbox-close").addEventListener("click", close);
  document.getElementById("lightbox-prev").addEventListener("click", () => show(current - 1));
  document.getElementById("lightbox-next").addEventListener("click", () => show(current + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

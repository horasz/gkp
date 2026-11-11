/* ⚙️ Memuat sections/, menu, carousel, animasi scroll, dan form */
async function loadSections() {
  try {
    await Promise.all(
      [...document.querySelectorAll("[data-section]")].map(async (el) => {
        const res = await fetch(`sections/${el.dataset.section}.html`);
        if (!res.ok) throw new Error(res.status);
        el.innerHTML = await res.text();
      }),
    );
  } catch (e) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p style="padding:24px;background:#fee">Buka lewat server (mis. <code>python3 -m http.server 8080</code>), bukan dengan klik dua kali index.html.</p>',
    );
    return false;
  }
  return true;
}

function initMenu() {
  const btn = document.querySelector(".nav-toggle"),
    menu = document.getElementById("menu");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") menu.classList.remove("open");
  });
}

function initCarousel() {
  const slides = document.querySelectorAll(".slide"),
    dots = document.querySelector(".dots");
  if (!slides.length) return;
  let i = 0,
    timer;
  const go = (n) => {
    i = n;
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    dots
      .querySelectorAll("button")
      .forEach((b, k) => b.classList.toggle("active", k === i));
  };
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => go((i + 1) % slides.length), 6000);
  };
  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Slide ${n + 1}`);
    b.addEventListener("click", () => {
      go(n);
      restart();
    });
    dots.appendChild(b);
  });
  go(0);
  restart();
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function initForm() {
  const form = document.getElementById("daftar-form"),
    msg = document.getElementById("form-msg");
  if (form)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(form, msg);
    });
}

function submitForm(form, msg) {
  const memberData = Object.fromEntries(new FormData(form));
  if (!memberData.nama.trim() || !memberData.telepon.trim()) {
    msg.textContent = "Isi nama lengkap dan nomor WhatsApp terlebih dahulu.";
    return;
  }
  /* Aktifkan untuk menyimpan ke MySQL lewat api/daftar.php:
  fetch('/api/daftar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memberData)
  }); */
  console.log("Data pendaftaran:", memberData);
  msg.textContent = "Pendaftaran terkirim. Terima kasih!";
  form.reset();
}

document.addEventListener("DOMContentLoaded", async () => {
  if (await loadSections()) {
    initMenu();
    initCarousel();
    initReveal();
    initForm();
    document.getElementById("year").textContent = new Date().getFullYear();
  }
});

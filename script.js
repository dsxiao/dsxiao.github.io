// ---------- The daisy: each petal is a skill ----------
const skills = [
  { name: "Applied economics",  text: "I applied an integrated assessment model to explore how discount rates affect the social cost of carbon." },
  { name: "Coding (Python, R and SQL)",  text: "I've utilized Python to collect telecom pricing data and build automated tools, such as file metadata processors." },
  { name: "Policy analysis",    text: "I've worked as a Junior Policy Analyst and have conducted comparative policy analysis on right-to-repair laws as part of my undergraduate thesis." },
  { name: "Data visualization", text: "I turned economic modelling outputs into interactive visual dashboards for Canada's official GHG emissions website." },
  { name: "Research and writing", text: "I wrote my senior honours essay on Ontario's Bill 187 and conducted research on the global plastic waste trade." },
  { name: "Communication and presentation",    text: "I successfully presented findings on new AI tools to a network of 50+ members at Health Canada." },
  { name: "Leadership and collaboration",         text: "As Policy Director, I leaded my university club's first ever policy summit featuring Members of Parliament" },
  { name: "Quantitative reasoning",   text: "My background in mathematics has honed my ability to think critically and solve complex problems." }
];

const SVG_NS = "http://www.w3.org/2000/svg";
const petalGroup = document.getElementById("petals");
const panel = document.getElementById("petal-panel");
const daisyCentre = document.querySelector(".daisy-centre");

const clearSelection = () => {
  petalGroup.querySelectorAll(".petal").forEach(petal => petal.setAttribute("aria-pressed", "false"));
  panel.textContent = "Pick a petal to see what I bring.";
};

daisyCentre.addEventListener("click", clearSelection);
daisyCentre.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    clearSelection();
  }
});

skills.forEach((skill, i) => {
  const angle = (360 / skills.length) * i;

  const petal = document.createElementNS(SVG_NS, "g");
  petal.setAttribute("transform", `rotate(${angle})`);
  petal.setAttribute("class", "petal");
  petal.setAttribute("role", "button");
  petal.setAttribute("tabindex", "0");
  petal.setAttribute("aria-pressed", "false");
  petal.setAttribute("aria-label", skill.name);

  const shape = document.createElementNS(SVG_NS, "ellipse");
  shape.setAttribute("class", "petal-shape");
  shape.setAttribute("cx", 0);
  shape.setAttribute("cy", -52);
  shape.setAttribute("rx", 17);
  shape.setAttribute("ry", 36);
  shape.style.animationDelay = `${i * 0.08}s`;
  petal.appendChild(shape);

  const select = () => {
    petalGroup.querySelectorAll(".petal").forEach(p => p.setAttribute("aria-pressed", "false"));
    petal.setAttribute("aria-pressed", "true");
    panel.textContent = `${skill.name}: ${skill.text}`;
  };

  petal.addEventListener("click", select);
  petal.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  });

  petalGroup.appendChild(petal);
});

// ---------- Hobbies slideshow ----------
document.querySelectorAll(".hobby-slideshow").forEach((slideshow) => {
  const slides = [...slideshow.querySelectorAll(".hobby-slide")];
  const prev = slideshow.querySelector(".slide-prev");
  const next = slideshow.querySelector(".slide-next");

  if (!slides.length) return;

  let current = 0;
  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
    });
  };

  prev.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));

  const intervalMs = Number(slideshow.dataset.interval || 3500);
  let timer = setInterval(() => showSlide(current + 1), intervalMs);

  slideshow.addEventListener("mouseenter", () => clearInterval(timer));
  slideshow.addEventListener("mouseleave", () => {
    timer = setInterval(() => showSlide(current + 1), intervalMs);
  });

  showSlide(0);
});

// ---------- Footer year updates itself ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- If photo.jpg isn't there yet, hide the photo frame instead of showing a broken image ----------
const photo = document.querySelector("#about-photo img");
if (photo) {
  photo.addEventListener("error", () => {
    document.getElementById("about-photo").style.display = "none";
    document.querySelector(".about-main").style.gridTemplateColumns = "1fr";
  });
}

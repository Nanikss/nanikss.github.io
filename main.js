// Theme toggle (remembers the choice) and project filters.
(function () {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) { /* storage unavailable: follow the system theme */ }

  document.getElementById("theme").addEventListener("click", () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* ignore */ }
  });

  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#project-grid .card");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.toggle("active", c === chip));
    const f = chip.dataset.filter;
    cards.forEach((card) => { card.hidden = f !== "all" && !card.dataset.tags.split(" ").includes(f); });
  }));

  document.getElementById("year").textContent = new Date().getFullYear();
})();

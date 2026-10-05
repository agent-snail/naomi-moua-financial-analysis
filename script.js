// Naomi Moua Financial Analysis Project
// All calculations are performed locally in the browser.

const $ = (id) => document.getElementById(id);

function showResult(id, html, error = false) {
  const el = $(id);
  el.innerHTML = html;
  el.classList.toggle("error", error);
}

function numberValue(id) {
  return parseFloat($(id).value);
}

// Navigation / page tabs
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = $(pageId) || $("home");
  page.classList.add("active");

  document.querySelectorAll("nav a[data-page]").forEach(a => {
    a.classList.toggle("active", a.dataset.page === page.id);
  });

  document.querySelector("nav")?.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function route() {
  const page = location.hash.replace("#", "") || "home";
  showPage(["home", "about", "analysis", "contact"].includes(page) ? page : "home");
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", () => {
    const page = link.dataset.page;
    if (location.hash !== "#" + page) history.pushState(null, "", "#" + page);
    showPage(page);
  });
});
window.addEventListener("hashchange", route);

document.querySelector(".menu-toggle").addEventListener("click", () => {
  const nav = document.querySelector("nav");
  const button = document.querySelector(".menu-toggle");
  const open = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", open);
});

// 1. Holding-Period Return
$("hpr-btn").addEventListener("click", () => {
  const beginning = numberValue("hpr-begin");
  const ending = numberValue("hpr-end");
  const dividends = numberValue("hpr-div");

  if (!Number.isFinite(beginning) || beginning <= 0 ||
      !Number.isFinite(ending) || !Number.isFinite(dividends)) {
    showResult("hpr-result", "Please enter valid beginning price, ending price, and dividend values.", true);
    return;
  }

  const hpr = (ending - beginning + dividends) / beginning;
  showResult(
    "hpr-result",
    `<span class="big">${(hpr * 100).toFixed(2)}%</span>
     HPR = ($${ending.toFixed(2)} − $${beginning.toFixed(2)} + $${dividends.toFixed(2)}) ÷ $${beginning.toFixed(2)}`
  );
});

// 2. Annualized Return
$("ann-btn").addEventListener("click", () => {
  const hprPercent = numberValue("ann-hpr");
  const years = numberValue("ann-years");

  if (!Number.isFinite(hprPercent) || !Number.isFinite(years) || years <= 0) {
    showResult("ann-result", "Please enter a valid holding-period return and a positive number of years.", true);
    return;
  }

  const hpr = hprPercent / 100;
  if (1 + hpr <= 0) {
    showResult("ann-result", "The holding-period return must be greater than −100%.", true);
    return;
  }

  const annualized = Math.pow(1 + hpr, 1 / years) - 1;
  showResult(
    "ann-result",
    `<span class="big">${(annualized * 100).toFixed(2)}%</span>
     Annualized from ${hprPercent.toFixed(2)}% over ${years.toFixed(2)} year(s).`
  );
});

// 3. Sample Standard Deviation / Volatility
$("vol-btn").addEventListener("click", () => {
  const raw = $("vol-returns").value.trim();
  const values = raw.split(",").map(x => parseFloat(x.trim()));

  if (values.length < 2 || values.some(x => !Number.isFinite(x))) {
    showResult("vol-result", "Enter at least two valid returns separated by commas, such as 5, 2, -3, 4, 1.", true);
    return;
  }

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (values.length - 1);
  let sdPercent = Math.sqrt(variance);

  if ($("vol-annualize").checked) {
    // Assumes the entered returns are monthly observations.
    sdPercent *= Math.sqrt(12);
  }

  const label = $("vol-annualize").checked ? "Annualized volatility (monthly inputs)" : "Sample volatility";
  showResult(
    "vol-result",
    `<span class="big">${sdPercent.toFixed(2)}%</span>
     ${label}. Mean return = ${mean.toFixed(2)}%. Observations = ${values.length}.`
  );
});

// 4. Sharpe Ratio
$("sh-btn").addEventListener("click", () => {
  const portfolioReturn = numberValue("sh-return");
  const rf = numberValue("sh-rf");
  const volatility = numberValue("sh-vol");

  if (!Number.isFinite(portfolioReturn) || !Number.isFinite(rf) ||
      !Number.isFinite(volatility) || volatility <= 0) {
    showResult("sh-result", "Please enter valid return, risk-free rate, and a positive volatility.", true);
    return;
  }

  const sharpe = (portfolioReturn - rf) / volatility;
  showResult(
    "sh-result",
    `<span class="big">${sharpe.toFixed(2)}</span>
     Excess return = ${(portfolioReturn - rf).toFixed(2)}%; volatility = ${volatility.toFixed(2)}%.`
  );
});

// Load correct page on first visit.
route();

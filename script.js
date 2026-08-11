// ── Dark mode toggle ──────────────────────────────────────
(function () {
  var THEME_KEY = '_bd_theme';
  var btn  = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
      localStorage.setItem(THEME_KEY, 'light');
    }
  }

  /* Sync icon with the theme that was already applied by the inline script */
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    icon.className = 'fas fa-sun';
  }

  btn.addEventListener('click', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });
})();

function openWhatsApp(event) {
  const phone = "918341949651";
  const hash = window.location.hash; // e.g. "#nafisha" — empty string if no tag
  const pageUrl = "https://altafjava.github.io/biodata/" + hash;
  const message = `Hi, I just viewed your biodata at ${pageUrl}. I'd like to connect and learn more if you're open to it.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
  event.preventDefault();
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function handlePhoneClick(event) {
  const phoneNumber = "+918341949651";
  if (isMobileDevice()) {
    window.location.href = `tel:${phoneNumber}`; // For mobile devices, open phone dialer
  } else {
    navigator.clipboard.writeText(phoneNumber); // For desktop/tablet, copy to clipboard
    showToast("Phone number copied!");
  }
  event.preventDefault();
}

// Auto-compute Age, Date of Birth text, Academic Profile years, and Total
// Experience from real facts + a single shift knob (window.BIODATA_CONFIG).
// No derived number is ever hardcoded — only real years go in, everything
// displayed is computed here.
(function () {
  var cfg = window.BIODATA_CONFIG;
  if (!cfg) return;

  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  var now = new Date();
  var shift = cfg.ageShiftYears || 0;
  var displayBirthYear = cfg.realBirthYear + shift;
  var age = now.getFullYear() - displayBirthYear - (now.getMonth() < (cfg.realBirthMonth - 1) ? 1 : 0);

  var ageEl = document.getElementById('bio-age');
  if (ageEl) ageEl.textContent = age + ' years';

  var dobEl = document.getElementById('bio-dob-text');
  if (dobEl) dobEl.textContent = MONTH_NAMES[cfg.realBirthMonth - 1] + ' ' + displayBirthYear;

  var experienceEl = document.getElementById('bio-experience');
  if (experienceEl) experienceEl.textContent = (now.getFullYear() - cfg.realCareerStartYear - shift) + ' Years';

  document.querySelectorAll('.year[data-real-year]').forEach(function (el) {
    el.textContent = Number(el.dataset.realYear) + shift;
  });
})();

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
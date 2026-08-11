// ── Biodata Config — single source of truth for date-driven fields ──
// Only store REAL, unarguable facts here (copy straight from real
// documents) — never a pre-computed/derived number. script.js does all
// the arithmetic, so nothing here can go stale or be miscalculated.
window.BIODATA_CONFIG = {
  realBirthYear: 1994,
  realBirthMonth: 10,        // October (1-indexed)
  realCareerStartYear: 2018, // year you actually started working

  // The ONLY knob to turn: how many years younger to appear everywhere
  // (Age, Date of Birth text, Academic Profile years, Total Experience).
  ageShiftYears: 0,
};

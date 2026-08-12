// ==========================
// HEADER SCROLL
// ==========================

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

// header.classList.toggle("scrolled",window.scrollY>80);

});
/* // ==========================
// DARK MODE
// ==========================

const themeBtn=document.getElementById("theme-toggle");

const icon=themeBtn.querySelector("i");

const currentTheme=localStorage.getItem("theme");

if(currentTheme==="light"){

document.body.classList.add("light");

icon.classList.remove("fa-moon");

icon.classList.add("fa-sun");

}

themeBtn.onclick=()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

icon.classList.remove("fa-moon");

icon.classList.add("fa-sun");

localStorage.setItem("theme","light");

}else{

icon.classList.remove("fa-sun");

icon.classList.add("fa-moon");

localStorage.setItem("theme","dark");

}

}; */






// ==========================
// calendar
// ==========================
(function () {
  const picker = document.getElementById("dashboardCalendarPicker");
  if (!picker) return;

  const dateInput = document.getElementById("today");
  const button = document.getElementById("calendarDateButton");
  const selectedDateEl = document.getElementById("calendarSelectedDate");
  const calendarHeading = document.getElementById("calendarHeading");
  const selectedSubEl = document.getElementById("calendarSelectedDateSub");
  const popover = document.getElementById("calendarPopover");
  const monthTitle = document.getElementById("calendarMonthTitle");
  const weekdaysEl = document.getElementById("calendarWeekdays");
  const daysEl = document.getElementById("calendarDays");
  const prevBtn = document.getElementById("calendarPrevMonth");
  const nextBtn = document.getElementById("calendarNextMonth");
  const todayBtn = document.getElementById("calendarTodayBtn");

  const months = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const weekdays = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

  let selected = new Date();
  let view = new Date(selected.getFullYear(), selected.getMonth(), 1);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function key(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function parseKey(value) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function sameDay(a, b) {
    return key(a) === key(b);
  }

  function formatArabic(date) {
    return new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function formatShort(date) {
    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function setSelected(date, notify = true) {
    selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const value = key(selected);
    dateInput.value = value;

    selectedDateEl.textContent = formatArabic(selected);
    selectedSubEl.textContent = "التاريخ المحدد: " + formatShort(selected);

    // Update the H3 automatically whenever the calendar date changes.
    if (calendarHeading) {
      calendarHeading.textContent = formatArabic(selected);
    }

    // Keep the old #today input behavior working.
    if (notify) {
      dateInput.dispatchEvent(new Event("change", { bubbles: true }));
      dateInput.dispatchEvent(new Event("input", { bubbles: true }));
    }

    render();
  }

  function renderWeekdays() {
    weekdaysEl.innerHTML = "";
    weekdays.forEach(day => {
      const el = document.createElement("span");
      el.textContent = day;
      weekdaysEl.appendChild(el);
    });
  }

  function render() {
    monthTitle.textContent = `${months[view.getMonth()]} ${view.getFullYear()}`;
    daysEl.innerHTML = "";

    const firstDay = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(view.getFullYear(), view.getMonth(), 0).getDate();
    const today = new Date();

    const events = (() => {
      try {
        return JSON.parse(localStorage.getItem("calendarEvents") || "[]");
      } catch {
        return [];
      }
    })();

    for (let i = firstDay - 1; i >= 0; i--) {
      addDay(new Date(view.getFullYear(), view.getMonth() - 1, daysInPrevMonth - i), true);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      addDay(new Date(view.getFullYear(), view.getMonth(), d), false);
    }

    const total = firstDay + daysInMonth;
    const remaining = (7 - (total % 7)) % 7;

    for (let d = 1; d <= remaining; d++) {
      addDay(new Date(view.getFullYear(), view.getMonth() + 1, d), true);
    }

    function addDay(date, muted) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "calendar-day";
      btn.textContent = date.getDate();

      if (muted) btn.classList.add("muted");
      if (sameDay(date, today)) btn.classList.add("today");
      if (sameDay(date, selected)) btn.classList.add("selected");

      if (events.some(event => event.date === key(date))) {
        btn.classList.add("has-event");
      }

      btn.addEventListener("click", () => {
        setSelected(date);
        if (date.getMonth() !== view.getMonth() || date.getFullYear() !== view.getFullYear()) {
          view = new Date(date.getFullYear(), date.getMonth(), 1);
          render();
        }
        close();
      });

      daysEl.appendChild(btn);
    }
  }

  function open() {
    picker.classList.add("open");
    popover.setAttribute("aria-hidden", "false");
  }

  function close() {
    picker.classList.remove("open");
    popover.setAttribute("aria-hidden", "true");
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    picker.classList.contains("open") ? close() : open();
  });

  popover.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", close);

  prevBtn.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    render();
  });

  nextBtn.addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    render();
  });

  todayBtn.addEventListener("click", () => {
    const now = new Date();
    view = new Date(now.getFullYear(), now.getMonth(), 1);
    setSelected(now);
    close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  renderWeekdays();
  setSelected(selected, false);
})();


/* // -----------------------------------
// Set to today
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#today").value = today; */

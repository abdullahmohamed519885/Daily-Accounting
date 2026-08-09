const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  theme:
    localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  lang: localStorage.getItem("language") || "en",
  sidebarCollapsed: localStorage.getItem("sidebarCollapsed") === "true",
};

const translations = {
  en: {
    main: "MAIN",
    management: "MANAGEMENT",
    dashboard: "Dashboard",
    users: "Users",
    contacts: "Contacts",
    reports: "Reports",
    analytics: "Analytics",
    settings: "Settings",
    profile: "Profile",
    security: "Security",
    preferences: "Preferences",
    notifications: "Notifications",
    help: "Help & Support",
    logout: "Logout",
    home: "Home",
    welcome: "Welcome back. Here is your overview.",
    quickAction: "Quick action",
    totalUsers: "Total Users",
    growth: "Growth",
    overview: "Overview",
    overviewSub: "Monthly performance summary",
    activity: "Recent Activity",
    activitySub: "Latest system events",
    viewAll: "View all notifications",
    addUser: "Add user",
    newReport: "New report",
  },
  ar: {
    main: "الرئيسية",
    management: "الإدارة",
    dashboard: "لوحة التحكم",
    users: "المستخدمون",
    contacts: "جهات الاتصال",
    reports: "التقارير",
    analytics: "التحليلات",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    security: "الأمان",
    preferences: "التفضيلات",
    notifications: "الإشعارات",
    help: "المساعدة والدعم",
    logout: "تسجيل الخروج",
    home: "الرئيسية",
    welcome: "مرحباً بعودتك. إليك ملخص النظام.",
    quickAction: "إجراء سريع",
    totalUsers: "إجمالي المستخدمين",
    growth: "النمو",
    overview: "نظرة عامة",
    overviewSub: "ملخص الأداء الشهري",
    activity: "آخر الأنشطة",
    activitySub: "أحدث أحداث النظام",
    viewAll: "عرض كل الإشعارات",
    addUser: "إضافة مستخدم",
    newReport: "تقرير جديد",
  },
};

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("#themeIcon").className =
    theme === "light" ? "bi bi-sun" : "bi bi-moon-stars";
  localStorage.setItem("theme", theme);
}
function applyLanguage(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "ltr" : "rtl";
  $("#languageLabel").textContent = lang.toUpperCase();
  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
  $$("[data-i18n-placeholder]").forEach((el) => {
    if (el.dataset.i18nPlaceholder === "search")
      el.placeholder = lang === "ar" ? "Search..." : "بحث...";
  });
  localStorage.setItem("language", lang);
}

function showToast(message, type = "success") {
  const id = `toast-${Date.now()}`;
  const html = `<div id="${id}" class="toast align-items-center border-0" role="alert">
    <div class="d-flex"><div class="toast-body">${message}</div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
  $("#toastContainer").insertAdjacentHTML("beforeend", html);
  const toast = new bootstrap.Toast(document.getElementById(id), {
    delay: 2500,
  });
  toast.show();
  document
    .getElementById(id)
    .addEventListener("hidden.bs.toast", (e) => e.currentTarget.remove());
}

function setSidebarDesktop() {
  if (innerWidth > 991) {
    document.body.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
    document.body.classList.remove("sidebar-mobile-open");
  }
}
function toggleSidebar() {
  if (innerWidth <= 991) {
    document.body.classList.toggle("sidebar-mobile-open");
  } else {
    state.sidebarCollapsed =
      !document.body.classList.contains("sidebar-collapsed");
    document.body.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
    localStorage.setItem("sidebarCollapsed", state.sidebarCollapsed);
  }
}

$("#sidebarToggle").addEventListener("click", toggleSidebar);
$("#sidebarOverlay").addEventListener("click", () =>
  document.body.classList.remove("sidebar-mobile-open"),
);
$("#themeBtn").addEventListener("click", () =>
  applyTheme(
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
  ),
);
$("#fullscreenBtn").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement)
      await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (e) {
    showToast("Fullscreen is not available.");
  }
});

$$(".language-option").forEach((btn) =>
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang)),
);

$$(".nav-item[data-page]").forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    $$(".nav-item[data-page]").forEach((x) => x.classList.remove("active"));
    link.classList.add("active");
  }),
);

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    $("#globalSearch").focus();
  }
  if (e.key === "Escape") document.body.classList.remove("sidebar-mobile-open");
});

$("#globalSearch").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  if (value.length >= 2)
    showToast(`${value}: search is ready for API integration.`);
});

/* const quickModal = new bootstrap.Modal($("#quickActionModal"));
$("#quickActionBtn").addEventListener("click", () => quickModal.show());
$$(".quick-item").forEach((btn) =>
  btn.addEventListener("click", () => {
    showToast(btn.textContent.trim() + " selected.");
    quickModal.hide();
  }),
); */

function logout() {
  if (
    confirm(
      state.lang === "ar"
        ? "هل أنت متأكد من تسجيل الخروج؟"
        : "Are you sure you want to logout?",
    )
  ) {
    localStorage.removeItem("authToken");
    showToast(state.lang === "ar" ? "تم تسجيل الخروج." : "Logged out.");
    // window.location.href = "login.html";
  }
}
$("#sidebarLogout").addEventListener("click", logout);
$("#profileLogout").addEventListener("click", logout);

window.addEventListener("resize", setSidebarDesktop);

applyTheme(state.theme);
applyLanguage(state.lang);
setSidebarDesktop();

/* window.addEventListener("load", () => {
  setTimeout(() => $("#appLoader").classList.add("hidden"), 250);
}); */

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



















// ========================================
// PWA / GITHUB PAGES INSTALL EXPERIENCE
// ========================================
(() => {
  let deferredPrompt = null;
  let lastFocusedElement = null;

  const button = document.getElementById("installApp");
  const wrapper = document.querySelector(".install-app-wrapper");
  const modal = document.getElementById("installAppModal");
  const closeButton = document.getElementById("installModalClose");
  const cancelButton = document.getElementById("installModalCancel");
  const confirmButton = document.getElementById("installModalConfirm");
  const statusBox = document.getElementById("installModalStatus");
  const buttonText = button?.querySelector(".install-text");
  const buttonSubtext = button?.querySelector(".install-subtext");
  const buttonArrow = button?.querySelector(".install-arrow i");

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.navigator.standalone === true;

  function setInstallLauncher(state) {
    if (!button || !wrapper) return;

    button.classList.remove("is-ready", "is-disabled", "is-installed");
    wrapper.classList.remove("is-visible");
    button.disabled = false;

    if (state === "ready") {
      wrapper.classList.add("is-visible");
      button.classList.add("is-ready");
      buttonText.textContent = "ثبّت أذكاري على جهازك";
      buttonSubtext.textContent = "التثبيت متاح الآن — تجربة مثل تطبيق سطح المكتب";
      buttonArrow.className = "fa-solid fa-download";
      button.setAttribute("aria-label", "فتح نافذة تثبيت أذكاري");
    } else if (state === "installed") {
      wrapper.classList.add("is-visible");
      button.classList.add("is-installed");
      button.disabled = true;
      buttonText.textContent = "أذكاري مثبت بالفعل";
      buttonSubtext.textContent = "يمكنك فتح التطبيق من سطح المكتب أو قائمة التطبيقات";
      buttonArrow.className = "fa-solid fa-check";
      button.setAttribute("aria-label", "أذكاري مثبت بالفعل");
    } else if (state === "unsupported") {
      // Keep the launcher visible even when Chromium has not fired beforeinstallprompt yet.
      // This is important for GitHub Pages and for browsers that delay the install event.
      wrapper.classList.add("is-visible");
      button.classList.add("is-disabled");
      buttonText.textContent = "ثبّت أذكاري على جهازك";
      buttonSubtext.textContent = "اضغط لمعرفة طريقة التثبيت المناسبة لمتصفحك";
      buttonArrow.className = "fa-solid fa-download";
      button.setAttribute("aria-label", "عرض خيارات تثبيت أذكاري");
    }
  }

  function setModalStatus(type, message = "") {
    if (!statusBox) return;
    statusBox.className = "install-modal-status";
    if (!message) {
      statusBox.textContent = "";
      return;
    }
    statusBox.classList.add(`is-${type}`);
    statusBox.innerHTML = message;
  }

  function openInstallModal() {
    if (!modal || button?.disabled) return;
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("install-modal-open");
    setModalStatus("", "");
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      closeButton?.focus();
    });
  }

  function closeInstallModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("install-modal-open");
    window.setTimeout(() => {
      modal.hidden = true;
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }, 180);
  }

  function showInstallHelpInModal() {
    if (!modal) return;

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isAndroid = /android/i.test(navigator.userAgent);
    const isFirefox = /firefox/i.test(navigator.userAgent);
    const isHTTPS = window.location.protocol === "https:" || window.location.hostname === "localhost";

    let title = "التثبيت غير متاح من المتصفح الآن";
    let message = isHTTPS
      ? "الموقع يعمل على HTTPS، لكن المتصفح لم يرسل نافذة التثبيت بعد. أعد تحميل الصفحة أو جرّب Chrome أو Edge."
      : "التثبيت يحتاج إلى HTTPS أو localhost. عند رفع المشروع على GitHub Pages استخدم رابط الموقع المنشور عبر HTTPS.";

    if (isIOS) {
      title = "أضف أذكاري إلى الشاشة الرئيسية";
      message = "على iPhone أو iPad: اضغط مشاركة ثم اختر «إضافة إلى الشاشة الرئيسية».";
    } else if (isAndroid && !deferredPrompt) {
      title = "ثبّت أذكاري على جهازك";
      message = "في Chrome اضغط قائمة ⋮ ثم «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية» إذا ظهر الخيار.";
    } else if (isFirefox) {
      title = "التثبيت من Firefox محدود";
      message = "للحصول على تجربة PWA الكاملة افتح أذكاري باستخدام Google Chrome أو Microsoft Edge.";
    }

    setModalStatus(
      "warning",
      `<strong>${title}</strong><span>${message}</span>`
    );
  }

  async function installApp() {
    if (!deferredPrompt) {
      showInstallHelpInModal();
      return;
    }

    confirmButton?.classList.add("is-loading");
    if (confirmButton) confirmButton.disabled = true;
    setModalStatus("loading", "جاري فتح نافذة التثبيت…");

    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setModalStatus("success", "<strong>تم اختيار التثبيت.</strong><span>سيكتمل التثبيت بواسطة المتصفح.</span>");
        deferredPrompt = null;
        setInstallLauncher("installed");
        window.setTimeout(closeInstallModal, 1100);
      } else {
        setModalStatus("neutral", "يمكنك تثبيت التطبيق في أي وقت من زر «ثبّت أذكاري على جهازك».");
      }
    } catch (error) {
      console.error("PWA install error:", error);
      setModalStatus("warning", "تعذر فتح نافذة التثبيت. أعد تحميل الصفحة وحاول مرة أخرى.");
    } finally {
      confirmButton?.classList.remove("is-loading");
      if (confirmButton) confirmButton.disabled = false;
      deferredPrompt = null;
    }
  }

  // On GitHub Pages the install event can be delayed. Do NOT hide the launcher while waiting.
  if (isStandalone) {
    setInstallLauncher("installed");
  } else {
    setInstallLauncher("unsupported");
  }

  // Register the service worker from the project root. This works for GitHub Pages project sites.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js", { scope: "./" })
        .then((registration) => {
          console.log("✅ PWA Service Worker registered:", registration.scope);
          registration.update().catch(() => {});
        })
        .catch((error) => {
          console.error("❌ PWA Service Worker registration failed:", error);
        });
    });
  }

  // Chromium exposes this event when the PWA meets the browser's installability criteria.
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    setInstallLauncher("ready");
    console.log("✅ PWA install prompt is available");
  });

  button?.addEventListener("click", openInstallModal);
  confirmButton?.addEventListener("click", installApp);
  closeButton?.addEventListener("click", closeInstallModal);
  cancelButton?.addEventListener("click", closeInstallModal);

  modal?.addEventListener("click", (event) => {
    if (event.target.matches("[data-install-close]")) closeInstallModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeInstallModal();
    }
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    setInstallLauncher("installed");
    setModalStatus("success", "<strong>تم تثبيت أذكاري.</strong><span>يمكنك الآن فتحه كتطبيق مستقل من جهازك.</span>");
    console.log("✅ أذكاري تم تثبيته بنجاح");
  });
})();

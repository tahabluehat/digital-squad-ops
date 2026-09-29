// Progressive enhancements only: the site works without JavaScript.
(function () {
  "use strict";

  // Mobile menu: labelled toggle, Escape closes, focus returns to the trigger.
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? (toggle.dataset.closeLabel || "Close menu") : (toggle.dataset.openLabel || "Open menu"));
      if (open) { var first = menu.querySelector("a"); if (first) first.focus(); }
    };
    toggle.addEventListener("click", function () { setOpen(menu.hidden); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
  }

  // Service CTAs preselect the visible "Area of interest" field without reloading.
  document.querySelectorAll("[data-interest]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var select = document.getElementById("interest");
      if (!select) return;
      e.preventDefault();
      select.value = link.getAttribute("data-interest");
      document.getElementById("contact").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      history.replaceState(null, "", "#contact");
      setTimeout(function () { document.getElementById("name").focus({ preventScroll: true }); }, 400);
    });
  });

  // Inline video player (replaces the thumbnail in place).
  document.querySelectorAll("[data-video]").forEach(function (box) {
    var id = box.getAttribute("data-video");
    box.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var frame = document.createElement("div");
        frame.className = "video-frame";
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1";
        iframe.title = "DigitalSquad presentation video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        frame.appendChild(iframe);
        box.replaceChildren(frame);
        iframe.focus();
      });
    });
  });

  // Prevent duplicate submissions and show a loading label.
  document.querySelectorAll("form[data-once]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (form.dataset.submitting) { e.preventDefault(); return; }
      form.dataset.submitting = "1";
      var btn = form.querySelector("[type=submit][data-loading-text]") || form.querySelector("[type=submit]");
      if (btn) {
        btn.setAttribute("aria-disabled", "true");
        if (btn.dataset.loadingText) btn.textContent = btn.dataset.loadingText;
      }
    });
  });

  var focusMe = document.querySelector("[data-focus]");
  if (focusMe) focusMe.focus();
})();

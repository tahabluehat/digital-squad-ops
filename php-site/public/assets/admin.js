// Admin enhancements: rich-text editor, slug generation, unsaved-change protection.
// Without JavaScript the editor falls back to a plain HTML textarea (still sanitised on the server).
(function () {
  "use strict";

  document.querySelectorAll("form[data-once]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (form.dataset.submitting) { e.preventDefault(); return; }
      form.dataset.submitting = "1";
      var btn = form.querySelector("[type=submit]");
      if (btn && btn.dataset.loadingText) { btn.textContent = btn.dataset.loadingText; btn.setAttribute("aria-disabled", "true"); }
    });
  });

  var form = document.getElementById("editor-form");
  if (!form) return;

  var source = document.getElementById("content_html");
  var wrap = form.querySelector("[data-editor]");
  var area = document.getElementById("content-editable");
  var title = document.getElementById("title");
  var slug = document.getElementById("slug");
  var note = document.getElementById("dirty-note");
  var key = form.dataset.draftKey;
  var dirty = false;

  // --- Rich-text editor ---
  wrap.hidden = false;
  form.classList.add("js-editor");
  area.innerHTML = source.value;
  document.execCommand("defaultParagraphSeparator", false, "p");
  var sync = function () { source.value = area.innerHTML; };

  wrap.querySelectorAll("[data-cmd]").forEach(function (btn) {
    btn.addEventListener("mousedown", function (e) { e.preventDefault(); });
    btn.addEventListener("click", function () {
      area.focus();
      var cmd = btn.dataset.cmd;
      if (cmd === "link") {
        var url = window.prompt("Link address (https://…, or mailto:…)", "https://");
        if (!url) return;
        url = url.trim();
        if (!/^(https?:\/\/|mailto:)/i.test(url)) { window.alert("Only https://, http:// and mailto: links are allowed."); return; }
        document.execCommand("createLink", false, url);
      } else if (cmd === "formatBlock") {
        document.execCommand("formatBlock", false, "<" + btn.dataset.arg + ">");
      } else {
        document.execCommand(cmd, false, null);
      }
      sync(); markDirty();
    });
  });
  area.addEventListener("input", function () { sync(); markDirty(); });
  // Paste as plain text to avoid bringing in foreign styles.
  area.addEventListener("paste", function (e) {
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });

  // --- Slug from title, until the slug is edited manually ---
  var slugify = function (s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 190);
  };
  title.addEventListener("input", function () { if (slug.dataset.auto === "1") slug.value = slugify(title.value); });
  slug.addEventListener("input", function () { slug.dataset.auto = slug.value === "" ? "1" : "0"; });
  slug.addEventListener("blur", function () { slug.value = slugify(slug.value); });

  // --- Unsaved changes: warning + local backup (survives network errors) ---
  var fields = ["title", "slug", "excerpt", "cover_alt", "seo_title", "seo_description"];
  var snapshot = function () {
    sync();
    var d = { content_html: source.value };
    fields.forEach(function (f) { d[f] = form.elements[f].value; });
    return d;
  };
  var initial = JSON.stringify(snapshot());
  function markDirty() {
    dirty = JSON.stringify(snapshot()) !== initial;
    note.textContent = dirty ? "Unsaved changes" : "";
    try { if (dirty) localStorage.setItem(key, JSON.stringify(snapshot())); } catch (e) {}
  }
  form.addEventListener("input", markDirty);
  form.addEventListener("change", markDirty);
  window.addEventListener("beforeunload", function (e) {
    if (dirty && !form.dataset.submitting) { e.preventDefault(); e.returnValue = ""; }
  });
  form.addEventListener("submit", function (e) {
    sync();
    var submitter = e.submitter;
    if (submitter && submitter.hasAttribute("data-preview")) return; // preview opens a new tab; keep editing
    form.dataset.submitting = "1";
    form.querySelectorAll("button[type=submit]").forEach(function (b) { b.setAttribute("aria-disabled", "true"); });
    if (submitter && submitter.value) {
      // Keep the clicked action in the POST even though we disable buttons visually.
      var hidden = document.createElement("input");
      hidden.type = "hidden"; hidden.name = "action"; hidden.value = submitter.value;
      form.appendChild(hidden);
      submitter.textContent = "Saving…";
    }
  });
  // Browsers restore the page from cache on "back": allow resubmitting.
  window.addEventListener("pageshow", function () {
    delete form.dataset.submitting;
    form.querySelectorAll("button[type=submit]").forEach(function (b) { b.removeAttribute("aria-disabled"); });
  });

  // Saved successfully: clear the backup. Otherwise offer to restore it.
  if (document.querySelector("[data-saved]")) {
    try { localStorage.removeItem(key); localStorage.removeItem("ds-article-new"); } catch (e) {}
  } else {
    var stored = null;
    try { stored = localStorage.getItem(key); } catch (e) {}
    if (stored && stored !== initial) {
      var bar = document.getElementById("restore-bar");
      bar.hidden = false;
      document.getElementById("restore-yes").addEventListener("click", function () {
        var d = JSON.parse(stored);
        fields.forEach(function (f) { if (typeof d[f] === "string") form.elements[f].value = d[f]; });
        area.innerHTML = d.content_html || ""; sync();
        slug.dataset.auto = "0";
        bar.hidden = true; markDirty();
      });
      document.getElementById("restore-no").addEventListener("click", function () {
        try { localStorage.removeItem(key); } catch (e) {}
        bar.hidden = true;
      });
    }
  }
})();

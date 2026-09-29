# Multilingual DigitalSquad website

## Goal
Make the complete public website available in English, French, and Arabic. Use `/en`, `/fr`, and `/ar` URLs, a compact flag-and-language dropdown, and a fully mirrored right-to-left Arabic experience.

## What will change
- Add a shared language system with English, French, and Arabic translations for navigation, footer, homepage, services, about, contact, blog interface, article pages, errors, and the TVA page.
- Add the language dropdown to desktop and mobile navigation using the Bahrain flag for English, France for French, and Morocco for Arabic. The selected language stays visible and switching preserves the equivalent page when possible.
- Add language-prefixed public URLs and redirect old unprefixed public URLs to English so existing bookmarks keep working.
- Apply `lang` and `dir` to the document, mirror directional layout/icons for Arabic, and use Arabic-capable typography without changing the established navy/coral design.
- Translate the three current static React blog articles. On the PHP deployment, translate the blog interface while database-authored article content remains exactly as entered by the administrator.
- Keep `/admin` private and unchanged in English; it is an operational area, not part of the public multilingual site.
- Update page titles, descriptions, canonical URLs, language alternatives, sitemap entries, and robots behavior for all localized public pages.
- Preserve cPanel deployment safety: no deletion or modification of `/backup-accounting` or any unrelated folder.

## Technical details
- React preview: create one typed translation catalogue and locale helpers, add `$locale` route equivalents, and keep route metadata locale-specific.
- PHP deployment: detect and validate the first URL segment, generate localized internal links, pass locale data through public templates, and keep `/admin`, `/media`, `/robots.txt`, and `/sitemap.xml` stable.
- Contact submissions keep the selected language through validation and errors; server-side field validation remains authoritative.
- Verify English, French, and Arabic home, navigation, contact, blog list/detail, mobile menu, RTL alignment, deep links, and the current build.

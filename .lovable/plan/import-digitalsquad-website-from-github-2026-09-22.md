# Import DigitalSquad website from GitHub

Rebuild the public `tahabluehat/digitalsquad` repository as a TanStack Start site with the same branding, content, and a working contact form.

## What will be built

1. **Asset migration**
   - Copy all images and the `squad.png` logo from `assets/images/` into `public/images/` so they are served as static files.

2. **Design system (`src/styles.css`)**
   - Primary brand color: the original orange `#f14836` mapped to semantic tokens.
   - Light, clean background; dark footer; rounded buttons and cards.
   - Load a clean sans-serif font via `<link>` in `__root.tsx`.

3. **Shared chrome (`src/routes/__root.tsx`)**
   - Sticky header with logo + "Digital Squad" wordmark.
   - Navigation: Home, About, Services, Blog, TVA, Contact.
   - Mobile hamburger menu using a Sheet.
   - Footer with services links, about links, contact info, YouTube/LinkedIn icons, and copyright.
   - `<Toaster />` for form feedback.

4. **Routes**
   - `/` — Hero (tagline + email CTA), About summary, Services highlights, References/client logos.
   - `/about` — Full welcome text, about SVG illustration, stat counters (Clients, Satisfaction, Projects).
   - `/services` — Tabbed services: Outsourcing, Auditing, UX/UI & Agility, DevOps & Cloud.
   - `/blog` — Blog listing cards using the existing `news-*.jpg` images.
   - `/blog/$slug` — Single blog post layout mirroring `blog-details.html`.
   - `/contact` — Contact info cards + contact form.
   - `/tva` — Full-page iframe embed of `https://calcul-comptable.vercel.app`.

5. **Contact form backend**
   - Enable Lovable Cloud.
   - Create `contact_submissions` table (name, email, message, created_at).
   - Server function `submitContact` validates with Zod and inserts the row.
   - UI shows success/error toast and clears the form.
   - If a Resend/Mailgun connection is linked, extend the server function to also email `contact@digitalsquad.ma`; otherwise submissions live in the database.

6. **SEO metadata**
   - Every leaf route gets `title`, `description`, `og:title`, `og:description`, `og:type`, `twitter:card`.

7. **Verification**
   - Check the build log for errors.
   - Use Playwright to verify navigation, form submission success toast, and TVA iframe render.

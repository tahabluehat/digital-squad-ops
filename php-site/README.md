# DigitalSquad website — PHP edition

This is the whole public website (home page, blog, contact form) and the private blog admin.
It runs on your own PHP hosting with MySQL/MariaDB and does not require a hosted backend service.

- PHP 8.1 or newer. Composer is **not** needed: the HTML sanitiser (HTML Purifier 4.17, LGPL) is included in `lib/`.
- Required extensions: `pdo_mysql`, `mbstring`, `fileinfo`, `openssl`, `session`, `dom`, `ctype`, `json`. `intl` or `iconv` are recommended for URL slugs with accents.
- Database: the existing `digitsqu_laravel` database. Only new `blog_*` tables are added. No Laravel table is changed.

## Folder layout on the server

```text
/home/<account>/digitalsquad/      <- NOT public
    app/  bin/  config/  lib/  migrations/  storage/  templates/
/home/<account>/public_html/       <- web root = contents of public/
    index.php  .htaccess  assets/  images/  favicon.ico
```

`public/index.php` loads the app from `dirname(__DIR__)`. If `public_html` is not next to the app folder,
change `$appRoot` in `public_html/index.php` to point at it (for example `'/home/<account>/digitalsquad'`).

Uploaded images are saved in `storage/uploads/`. That folder is outside the web root, so scripts there can never run.
Images are served through `/media/<random-name>`, and only after the file type has been checked.

## Deploy

1. Upload the folders as shown above (use SFTP or cPanel File Manager).
2. `cp config/config.example.php config/config.php`, then fill in:
   - `app.base_url` (for example `https://www.digitalsquad.ma`)
   - `app.key`: run `php -r "echo bin2hex(random_bytes(32));"`
   - the `db` credentials. These are the same values as `DB_*` in the Laravel `.env`.
   - the `mail` SMTP settings (the contact@ mailbox; port 465 with `ssl`)
   Then run `chmod 600 config/config.php`.
3. Make `storage/uploads`, `storage/sessions` and `storage/cache/htmlpurifier` writable by PHP (`chmod 750`).
4. In cPanel **MultiPHP INI Editor**, set `upload_max_filesize = 6M` and `post_max_size = 8M`.
5. Open a terminal (cPanel **Terminal** or SSH) inside the app folder and run:
   ```bash
   php bin/check-requirements.php
   php bin/migrate.php          # or import migrations/001_create_blog_tables.sql in phpMyAdmin
   php bin/create-admin.php     # prints the username + 32-char password ONCE
   ```
   Save the credentials in a password manager. They are never shown again.
   If `php` is PHP 7 on the command line, use the full path, for example `/opt/cpanel/ea-php81/root/usr/bin/php`.
6. Turn on HTTPS (AutoSSL / Let's Encrypt). With `env = production`, the site sends every visitor to HTTPS and uses secure cookies.
7. Sign in at `https://<your-domain>/admin/login`.
8. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

On Nginx, replace `.htaccess` with: `location / { try_files $uri /index.php?$query_string; }`.

## Everyday commands

| Task | Command |
| --- | --- |
| Reset the admin password (signs out every session) | `php bin/reset-admin-password.php` |
| Run new migrations | `php bin/migrate.php` |
| Check the server | `php bin/check-requirements.php` |

The site has no public sign-up and no account-creation page. The single admin can only be created from the terminal.

## Security summary

- Every `/admin/*` page and action, plus uploads, previews and draft images, requires a signed-in admin.
- Sessions are server-side. Cookies use `__Host-` + Secure + HttpOnly + SameSite=Strict, with strict mode on. The session ID changes after sign-in. Sessions end after 30 minutes of inactivity or 8 hours in total. Signing out destroys the session. A password reset signs out all existing sessions.
- Sign-in attempts are limited in MySQL: 5 per IP address and 10 per username every 15 minutes. Error messages stay generic.
- Every admin form checks a CSRF token. The contact form uses a signed, time-limited token and a honeypot field.
- All database queries are prepared statements. Every input is validated on the server.
- Article HTML is cleaned by HTML Purifier. Only these are allowed: `p, br, h2–h4, strong, em, u, ul, ol, li, blockquote, pre, code, a[href]`, and links must use `http`, `https` or `mailto`.
- Uploads: JPEG, PNG or WebP only, up to 5 MB. The real file content is checked with finfo and getimagesize. Files get random names and are stored outside the web root.
- Drafts never appear on public pages, in the sitemap or through their images. Unknown or unpublished URLs return a real 404. Admin pages and previews send `noindex`.
- Security headers include CSP, HSTS (in production), nosniff, and a frame-deny header.

## Local testing (optional)

```bash
php -S 127.0.0.1:8090 -t public bin/dev-router.php
```

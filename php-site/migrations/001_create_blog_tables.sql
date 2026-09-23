-- DigitalSquad blog tables. Safe to run inside the existing digitsqu_laravel database:
-- every table uses the blog_ prefix and no Laravel table is touched.
-- Requires MySQL 5.7+ / MariaDB 10.3+.

CREATE TABLE IF NOT EXISTS blog_admins (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username        VARCHAR(64)  NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  session_version INT UNSIGNED NOT NULL DEFAULT 1,
  last_login_at   DATETIME     NULL,
  created_at      DATETIME     NOT NULL,
  updated_at      DATETIME     NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY blog_admins_username_unique (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_articles (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title           VARCHAR(200) NOT NULL,
  slug            VARCHAR(190) NOT NULL,
  excerpt         VARCHAR(320) NOT NULL DEFAULT '',
  content_html    MEDIUMTEXT   NOT NULL,
  cover_image     VARCHAR(64)  NULL,
  cover_alt       VARCHAR(200) NOT NULL DEFAULT '',
  seo_title       VARCHAR(70)  NOT NULL DEFAULT '',
  seo_description VARCHAR(170) NOT NULL DEFAULT '',
  status          ENUM('draft','published') NOT NULL DEFAULT 'draft',
  published_at    DATETIME     NULL,
  created_at      DATETIME     NOT NULL,
  updated_at      DATETIME     NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY blog_articles_slug_unique (slug),
  KEY blog_articles_status_published (status, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_login_attempts (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip_hash       CHAR(64) NOT NULL,
  username_hash CHAR(64) NOT NULL,
  attempted_at  DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY blog_login_attempts_ip (ip_hash, attempted_at),
  KEY blog_login_attempts_user (username_hash, attempted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

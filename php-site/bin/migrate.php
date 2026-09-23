<?php
declare(strict_types=1);
// Usage: php bin/migrate.php   (runs every migrations/*.sql file once)
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/app/bootstrap.php';

db()->exec('CREATE TABLE IF NOT EXISTS blog_migrations (name VARCHAR(190) NOT NULL PRIMARY KEY, ran_at DATETIME NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
$done = db()->query('SELECT name FROM blog_migrations')->fetchAll(PDO::FETCH_COLUMN);
$files = glob(APP_ROOT . '/migrations/*.sql') ?: [];
sort($files);
foreach ($files as $file) {
    $name = basename($file);
    if (in_array($name, $done, true)) {
        echo "skip  $name\n";
        continue;
    }
    foreach (array_filter(array_map('trim', explode(';', (string) preg_replace('/^--.*$/m', '', (string) file_get_contents($file))))) as $sql) {
        db()->exec($sql);
    }
    db()->prepare('INSERT INTO blog_migrations (name, ran_at) VALUES (?, ?)')->execute([$name, db_now()]);
    echo "ran   $name\n";
}
echo "Migrations complete.\n";

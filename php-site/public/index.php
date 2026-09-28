<?php
declare(strict_types=1);

/*
 * Front controller. Every request that is not a real file (CSS, images) lands here.
 * Finds the private application folder automatically:
 *   1) /home/digitsqu/digitalsquad  (cPanel deploy layout)
 *   2) one level above this file    (local / standard layout)
 */
$candidates = [
    dirname(__DIR__) . '/digitalsquad',
    dirname(__DIR__),
];
$appRoot = null;
foreach ($candidates as $dir) {
    if (is_file($dir . '/app/bootstrap.php')) {
        $appRoot = $dir;
        break;
    }
}
if ($appRoot === null) {
    http_response_code(500);
    exit('DigitalSquad: application folder not found. Run the cPanel deployment again.');
}
require $appRoot . '/app/bootstrap.php';
require APP_ROOT . '/app/routes.php';

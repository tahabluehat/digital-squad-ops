<?php
declare(strict_types=1);

/*
 * Front controller. Every request that is not a real file (CSS, images) lands here.
 * The application code lives one level ABOVE the public directory.
 * If your layout differs, change $appRoot below.
 */
$appRoot = dirname(__DIR__);
require $appRoot . '/app/bootstrap.php';
require APP_ROOT . '/app/routes.php';

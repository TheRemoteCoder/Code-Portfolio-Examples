<?php

declare(strict_types=1);

use EXAMPLE\Config;
use EXAMPLE\Core;
use EXAMPLE\Helper;

// Config
new Config\Config();

// Helper
new Helper\ErrorConfig();
new Helper\ErrorLog();
new Helper\LocalisationConfig();

// Application
$controller = new Core\Controller();

$controller->init();

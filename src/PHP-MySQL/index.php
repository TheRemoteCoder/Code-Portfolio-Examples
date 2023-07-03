<?php

declare(strict_types=1);

define('ROOT', __DIR__);

// Secrets
// Todo: Change path as needed
require_once ROOT . '....../app-secrets.php';

// Config
require_once ROOT . '/src/config/settings.php';
require_once ROOT . '/src/config/config.php';

// Helper
require_once ROOT . '/src/helper/ErrorConfig.php';
require_once ROOT . '/src/helper/ErrorLog.php';
require_once ROOT . '/src/helper/LocalisationConfig.php';

// Interfaces
require_once ROOT . '/src/interfaces/Action.php';
require_once ROOT . '/src/interfaces/Sanitization.php';

// Libraries
require_once ROOT . '/src/lib/Csv/Config.php';
require_once ROOT . '/src/lib/Csv/File.php';
require_once ROOT . '/src/lib/Csv/Sanitizer.php';
require_once ROOT . '/src/lib/Database/Connection.php';
require_once ROOT . '/src/lib/Database/Statement.php';
require_once ROOT . '/src/lib/Encoding/Html.php';
require_once ROOT . '/src/lib/Encoding/Json.php';
require_once ROOT . '/src/lib/Encoding/Utf8.php';
require_once ROOT . '/src/lib/Auth.php';
require_once ROOT . '/src/lib/Messaging.php';
require_once ROOT . '/src/lib/Request.php';
require_once ROOT . '/src/lib/Response.php';
require_once ROOT . '/src/lib/Sanitization.php';

// Data models
require_once ROOT . '/src/models/Abstract.php';
require_once ROOT . '/src/models/Csv/Columns.php';
require_once ROOT . '/src/models/Pages.php';

// Core – Actions
require_once ROOT . '/src/core/actions/Abstract.php';
require_once ROOT . '/src/core/actions/Error.php';
require_once ROOT . '/src/core/actions/Page.php';

// Core
require_once ROOT . '/src/core/controller/Abstract.php';
require_once ROOT . '/src/core/controller/Controller.php';

// Init
require_once ROOT . '/src/init.php';

<?php

declare(strict_types=1);

namespace EXAMPLE\Helper;

use EXAMPLE\Config\Config;

use function ini_set;

/**
 * Set custom error log.
 */
final class ErrorLog
{
    /**
     * Constructor sets behaviour.
     */
    public function __construct()
    {
        $path = Config::getConfigByKey('logging');

        @ini_set('error_log', ROOT . $path['error']);
    }
}

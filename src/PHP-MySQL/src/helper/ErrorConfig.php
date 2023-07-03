<?php

declare(strict_types=1);

namespace EXAMPLE\Helper;

use EXAMPLE\Config\Config;

use function error_reporting;
use function ini_set;

use const E_ALL;

/**
 * Set error handling per environment.
 */
final class ErrorConfig
{
    /**
     * Sets if current environment is for development.
     */
    private $isDevEnvironment = false;

    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        $this->isDevEnvironment = Config::isDevEnvironment();

        $this->set();
    }

    /**
     * Set error handling depending on environment.
     */
    private function set()
    {
        if ($this->isDevEnvironment) {
            $this->enable();
        } else {
            $this->disable();
        }
    }

    /**
     * Disable error display and reporting.
     */
    private function disable()
    {
        @ini_set('display_errors', '0');
        @ini_set('display_startup_errors', '0');

        error_reporting(0);
    }

    /**
     * Enable error display and reporting.
     */
    private function enable()
    {
        @ini_set('display_errors', '1');
        @ini_set('display_startup_errors', '1');

        error_reporting(E_ALL);
    }
}

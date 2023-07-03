<?php

declare(strict_types=1);

namespace EXAMPLE\Config;

use EXAMPLE\Lib\Messaging;

use function array_merge;
use function constant;
use function defined;

/**
 * Application environment configuration.
 *
 * Requires environment config to be defined and merged with default config.
 */
// phpcs:ignore
final class Config
{
    /**
     * Global configuration.
     *
     * - auth       : Internal => External (passed via URL)
     * - parameters : Internal => External (passed via URL)
     * - routes     : URL => Controller action
     */
    public static $config = [
        'parameters' => [
            'test'   => 'test',
        ],
        'routes'     => [
            '/'      => 'error',
            '/page'  => 'page',
        ],
        'logging'    => [
            'error'  => '/logs/error-123',
        ],
        /* Environment config - Structural preview * /
        'auth'       => [
            'key'    => '',
            'secret' => '',
        ],
        'database'   => [
            'tablePrefix'  => '',
            'connection'   => [
                'name'     => '',
                'host'     => '',
                'password' => '',
                'user'     => '',
            ],
        ],
        /* */
    ];

    /**
     * Constructor sets config.
     */
    public function __construct()
    {
        $this->validateConfigOrFail('EXAMPLE_APP_SECRETS');
        $this->mergeConfig('EXAMPLE_APP_SECRETS');
    }

    /**
     * Get if environment is DEV.
     *
     * Throw error for CLI calls to disable unintended and potentially unsafe use.
     */
    public static function isDevEnvironment() : bool
    {
        if (! isset($_SERVER['REMOTE_ADDR'])) {
            Messaging::error('CLI environments are not supported');
        }

        return $_SERVER['REMOTE_ADDR'] === '127.0.0.1';
    }

    /**
     * Get configuration parts by key.
     * Optionally get a deeper nested keys data.
     *
     * @return array|string Key data or value
     */
    public static function getConfigByKey(string $key, string $subKey = '')
    {
        return ! ! $subKey
          ? self::$config[$key][$subKey]
          : self::$config[$key];
    }

    /**
     * Merge default with additional configuration.
     */
    private function mergeConfig(string $configConstant)
    {
        $extraConfig = constant($configConstant);

        self::$config = array_merge(self::$config, $extraConfig);
    }

    /**
     * Validate if environment config exists or throw error.
     */
    private static function validateConfigOrFail(string $envConfigConstant)
    {
        $hasEnvConfig = defined($envConfigConstant);

        if (! $hasEnvConfig) {
            Messaging::error('Environment config not found');
        }
    }
}

<?php

declare(strict_types=1);

namespace EXAMPLE\Lib;

use EXAMPLE\Interfaces\ISanitization;

use function parse_url;

use const PHP_URL_PATH;

/**
 * Store and sanitize parameters before use.
 * Handle GET, POST and SERVER data.
 */
final class Request
{
    /**
     * Global $_REQUEST reference.
     * Wrapped by sanitizer. Never use this data directly.
     *
     * @var array
     */
    private $requestParams = [];

    /**
     * Global $_SERVER reference.
     * Requires manual sanitization - Contains various data types.
     *
     * @var array
     */
    private $serverParams = [];

    /**
     * Global $_POST reference.
     * Requires manual sanitization - Contains various data types.
     *
     * @var array
     */
    private $postParams = [];

    /**
     * Sanitization class instance.
     *
     * @var ISanitization|null
     */
    private $sanitization;

    /**
     * Constructor sets dependencies.
     *
     * @param ISanitization $sanitization Sanitization class instance
     */
    public function __construct(ISanitization $sanitization)
    {
        $this->sanitization = $sanitization;

        $this->requestParams = $_REQUEST;
        $this->serverParams  = $_SERVER;
        $this->postParams    = $_POST;
    }

    /**
     * Get if parameter by key exists.
     */
    public function hasParam(string $key) : bool
    {
        return isset($this->requestParams[$key]);
    }

    /**
     * Get all sanitized parameters of given type.
     */
    public function getParams() : array
    {
        $params = $this->requestParams;

        return $this->sanitization->cleanAll($params);
    }

    /**
     * Get single sanitized parameter by key.
     */
    public function getParam(string $key) : string
    {
        $param = $this->requestParams[$key];

        if (empty($param)) {
            Messaging::error("Parameter not found or empty: '{$key}'");
        }

        return $this->sanitization->clean($param);
    }

    /**
     * Get current URI without parameters or fall back to index route.
     */
    public function getUri() : string
    {
        $requestUri = $this->serverParams['REQUEST_URI'] ?? '/';
        $requestUri = $this->sanitization->clean($requestUri);

        $uri = parse_url($requestUri, PHP_URL_PATH);

        if (empty($uri)) {
            Messaging::error("URI has wrong format: '{$uri}'");
        }

        return $this->sanitization->clean($uri);
    }

    /**
     * Get data from $_POST for specific header requests:
     * - application/x-www-form-urlencoded
     * - multipart/form-data
     */
    public function getPostData() : array
    {
        $params = $this->postParams;

        return $this->sanitization->cleanAll($params);
    }

    /**
     * Test if request if of given type.
     * Useful to prevent technical misuse by enforcing proper type use.
     */
    public function isType(string $type) : bool
    {
        return $this->serverParams['REQUEST_METHOD'] === $type;
    }
}

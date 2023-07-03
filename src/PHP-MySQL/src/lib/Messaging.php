<?php

declare(strict_types=1);

namespace EXAMPLE\Lib;

use function error_log;
use function http_response_code;

/**
 * Message handling.
 * Stateless functions to encapsulate HTTP codes.
 */
final class Messaging
{
    /**
     * Log and show error with proper HTTP status code.
     *
     * @param string $errorClass Examples: Exception|PDOException
     */
    public static function error(string $message, int $statusCode = 400, $errorClass = 'Exception')
    {
        error_log($message);
        http_response_code($statusCode);

        throw new $errorClass($message);
    }
}

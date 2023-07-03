<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Database;

use EXAMPLE\Interfaces\ISanitization;

use function implode;

/**
 * Database PDO prepared statements preparations.
 */
// phpcs:ignore
final class DatabaseStatement
{
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
    }

    /**
     * Get column names for prepared statements.
     */
    public function getColumns(array $columns) : string
    {
        return implode(', ', $columns);
    }

    /**
     * Get column names as values for prepared statements.
     */
    public function getValues(array $columns) : string
    {
        return ':' . implode(', :', $columns);
    }

    /**
     * Map input to named prepared statement structure.
     * Sanitize all values.
     *
     * @example ':column' => 'Sanitized value'
     * @param array $columnValues Key/Value inputs
     * @return array PDO named prepared statement data
     */
    public function getData(array $columnValues) : array
    {
        $sanitization = $this->sanitization;
        $map          = [];

        foreach ($columnValues as $key => $value) {
            $mapKey          = $sanitization->clean($key);
            $map[":$mapKey"] = $sanitization->clean($value);
        }

        return $map;
    }
}

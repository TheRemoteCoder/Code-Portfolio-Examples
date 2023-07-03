<?php

declare(strict_types=1);

namespace EXAMPLE\Models\Csv;

use function array_keys;
use function array_merge;
use function array_unique;
use function array_walk;
use function sort;
use function trim;

/**
 * CSV column name model.
 */
// phpcs:ignore
final class CsvColumnsModel
{
    /**
     * Get unique columns from complex data items.
     *
     * @param array $nestedItems [[[string] => string]]
     * @return array [string]
     */
    public function getColumns(array $nestedItems) : array
    {
        return $this->getKeys($nestedItems);
    }

    /**
     * Get unique, sorted and sanitized keys.
     *
     * @param array $nestedItems [[[string] => string]]
     * @return array [string]
     */
    private function getKeys(array $nestedItems) : array
    {
        $keys = [];

        foreach ($nestedItems as $item) {
            $keys = array_merge($keys, array_keys($item));
        }

        $sanitizedKeys = $this->getSanitizedKeys($keys);
        $uniqueKeys    = array_unique($sanitizedKeys);

        return $this->getSortedKeys($uniqueKeys);
    }

    /**
     * Sanitize keys by stripping CSV-breaking whitespaces from source.
     *
     * @param array $keys [string]
     * @return array [string]
     */
    private function getSanitizedKeys(array $keys) : array
    {
        $sanitizedKeys = $keys;

        array_walk($sanitizedKeys, function (&$key) {
            $key = trim($key);
        });

        return $sanitizedKeys;
    }

    /**
     * Sort keys A-Z.
     */
    private function getSortedKeys(array $unsorted) : array
    {
        $sorted = $unsorted;

        sort($sorted);

        return $sorted;
    }
}

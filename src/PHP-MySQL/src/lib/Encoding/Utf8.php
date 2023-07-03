<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Encoding;

use function array_map;
use function utf8_encode;

/**
 * Encode values as UTF-8.
 */
// phpcs:ignore
final class EncodingUtf8
{
    public function __construct()
    {
    }

    /**
     * Encode associative array values in UTF-8.
     *
     * @param array $array [Key => Value]
     */
    public function encodeArray(array $array) : array
    {
        return array_map(function ($arr) {
            foreach ($arr as $key => $val) {
                $arr[$key] = utf8_encode($val);
            }

            return $arr;
        }, $array);
    }
}

<?php

declare(strict_types=1);

namespace EXAMPLE\Lib;

use EXAMPLE\Interfaces\ISanitization;

use function addslashes;
use function htmlspecialchars;
use function is_array;
use function is_string;
use function trim;

use const ENT_QUOTES;

/**
 * Sanitize unsafe string inputs.
 */
final class Sanitization implements ISanitization
{
    public function __construct()
    {
    }

    /**
     * Sanitize single unsafe string input.
     *
     * - Normalize 'null' values into empty strings.
     * - Ignore other data types.
     *
     * @param mixed $input
     * @return mixed
     */
    public function clean($input)
    {
        if (! is_string($input)) {
            return $input;
        }

        $cleanInput = empty($input) ? '' : $input;
        $cleanInput = trim($input);
        $cleanInput = htmlspecialchars($input, ENT_QUOTES);
        $cleanInput = addslashes($input);

        return $cleanInput;
    }

    /**
     * Sanitize many unsafe inputs, recursive.
     *
     * @return array [[string] => string|array]
     */
    public function cleanAll(array $inputs) : array
    {
        $output = [];

        foreach ($inputs as $key => $val) {
            $cleanKey = $this->clean($key);

            if (is_array($val)) {
                $output[$cleanKey] = $this->cleanAll($val);
            } else {
                $output[$cleanKey] = $this->clean($val);
            }
        }

        return $output;
    }
}

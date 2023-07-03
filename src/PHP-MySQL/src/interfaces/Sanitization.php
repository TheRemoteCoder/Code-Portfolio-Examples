<?php

declare(strict_types=1);

namespace EXAMPLE\Interfaces;

/**
 * Unsafe input sanitization.
 */
// phpcs:ignore
interface ISanitization
{
    /**
     * Sanitize single input.
     *
     * @param mixed $input
     * @return mixed
     */
    public function clean($input);

    /**
     * Sanitize many inputs.
     */
    public function cleanAll(array $inputs) : array;
}

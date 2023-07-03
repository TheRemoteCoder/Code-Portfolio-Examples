<?php

declare(strict_types=1);

namespace EXAMPLE\Interfaces;

/**
 * Action routes (from controller).
 */
// phpcs:ignore
interface IAction
{
    /**
     * Process request and response.
     */
    public function action();
}

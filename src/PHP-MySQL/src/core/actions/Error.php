<?php

declare(strict_types=1);

namespace EXAMPLE\Core\Action;

use EXAMPLE\Lib\Messaging;
use EXAMPLE\Lib\Request;

/**
 * Unknown route - Error.
 */
// phpcs:ignore
final class ErrorAction extends AbstractAction
{
    /**
     * Allowed HTTP request method.
     */
    protected $method = 'GET';

    /**
     * Constructor sets dependencies.
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Show error message.
     */
    public function action()
    {
        Messaging::error('Unknown or unsupported URL');
    }
}

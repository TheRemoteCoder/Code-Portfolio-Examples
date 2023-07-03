<?php

declare(strict_types=1);

namespace EXAMPLE\Core\Action;

use EXAMPLE\Config\Config;
use EXAMPLE\Interfaces\IAction;
use EXAMPLE\Lib\Messaging;
use EXAMPLE\Lib\Request;
use EXAMPLE\Lib\Response;

/**
 * Handle requests.
 */
// phpcs:ignore
abstract class AbstractAction implements IAction
{
    /**
     * Allowed HTTP request method.
     * Used for authentication - Define in subclasses.
     */
    protected $method = '';

    /**
     * Set if environment is DEV.
     */
    protected $isDevEnvironment = false;

    /**
     * Request class instance.
     *
     * @var Request
     */
    protected $request;

    /**
     * Response class instance.
     */
    protected $response;

    /**
     * Constructor sets dependencies.
     */
    public function __construct(Request $request)
    {
        $this->isDevEnvironment = Config::isDevEnvironment();
        $this->response         = new Response();
        $this->request          = $request;

        if (! $this->isDevEnvironment) {
            $this->authenticateMethod();
        }
    }

    /**
     * Implementation specific - Satisfy interface.
     */
    public function action()
    {
    }

    /**
     * Authenticate environment to allow access.
     */
    protected function authenticateEnvironment()
    {
        if (! $this->isDevEnvironment) {
            Messaging::error('Invalid environment for route');
        }
    }

    /**
     * Authenticate HTTP request method to allow access.
     * Defined by subclass. No authentication if type is not set.
     */
    private function authenticateMethod()
    {
        $method = $this->method;

        if (! $method) {
            return;
        }

        if (! $this->request->isType($method)) {
            Messaging::error('Invalid request method for route');
        }
    }
}

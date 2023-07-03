<?php

declare(strict_types=1);

namespace EXAMPLE\Core;

use EXAMPLE\Config\Config;
use EXAMPLE\Lib\Auth;
use EXAMPLE\Lib\Messaging;

/**
 * Authentication and routing for request.
 */
final class Controller extends AbstractController
{
    /**
     * Authentication class instance.
     */
    private $auth;

    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        $apiAuth = Config::getConfigByKey('auth');
        $routes  = Config::getConfigByKey('routes');

        parent::__construct($routes);

        $this->auth = new Auth($this->request, $apiAuth);
    }

    /**
     * Authenticate and route request.
     */
    public function init()
    {
        $this->authenticateOrFail();
        $this->routeUrl();
    }

    /**
     * Test if request is authenticated.
     */
    private function authenticateOrFail()
    {
        if (! $this->auth->isAuthenticated()) {
            Messaging::error('Unauthenticated API request', 401);
        }
    }
}

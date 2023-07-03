<?php

declare(strict_types=1);

namespace EXAMPLE\Core;

use EXAMPLE\Interfaces\IAction;
use EXAMPLE\Lib\Messaging;
use EXAMPLE\Lib\Request;
use EXAMPLE\Lib\Sanitization;

use function rtrim;
use function ucfirst;

/**
 * Store sanitized request params.
 * Route request to action.
 */
// phpcs:ignore
abstract class AbstractController
{
    /**
     * Action namespace path.
     * PHP can't parse these for dynamically created classes.
     */
    protected $actionNamespace = 'EXAMPLE\Core\Action\\';

    /**
     * Request class instance.
     *
     * @var Request|null
     */
    protected $request;

    /**
     * Routes + Actions
     * - Routes : With trailing slashes
     * - Actions: Lowercase names of action classes
     *
     * @example ['/' => 'index']
     * @var array Route => Action
     */
    protected $routeConfig = [];

    /**
     * Constructor sets dependencies.
     */
    public function __construct(array $routeConfig)
    {
        $this->request = new Request(new Sanitization());

        $this->routeConfig = $routeConfig;
    }

    /**
     * Call action of existing route or render error route.
     */
    protected function routeUrl()
    {
        $route = $this->getRouteName();

        if (! $route) {
            Messaging::error("Route cannot be parsed for: '{$route}'");
        }

        $this->callAction($route);
    }

    /**
     * Call action class.
     */
    private function callAction(string $route)
    {
        $class = $this->getActionClass($route);

        $class->action();
    }

    /**
     * Return action class for current route.
     */
    private function getActionClass(string $route) : IAction
    {
        $className = $this->actionNamespace . ucfirst($route) . 'Action';

        return new $className($this->request);
    }

    /**
     * Get matching route name from config.
     * Strip possible trailing slashes to allow both variants for convenience.
     */
    private function getRouteName() : string
    {
        $uri = $this->request->getUri();
        $uri = rtrim($uri, '/');

        return $this->routeConfig[$uri];
    }
}

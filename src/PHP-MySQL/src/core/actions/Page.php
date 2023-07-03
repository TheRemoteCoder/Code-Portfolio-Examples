<?php

declare(strict_types=1);

namespace EXAMPLE\Core\Action;

use EXAMPLE\Config\Config;
use EXAMPLE\Lib\Request;
use EXAMPLE\Models\PagesModel;

/**
 * Page content (example).
 */
// phpcs:ignore
final class PageAction extends AbstractAction
{
    /**
     * Allowed HTTP request method.
     */
    protected $method = 'GET';

    /**
     * Example URL parameter.
     */
    private $urlParameterExample = 'example';

    /**
     * Config URL parameters.
     */
    private $urlParameters = [];

    /**
     * Model class instance.
     */
    private $model;

    /**
     * Constructor sets dependencies.
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);

        $this->urlParameters = Config::getConfigByKey('parameters');
        $this->model         = new PagesModel();
    }

    /**
     * Page content.
     */
    public function action()
    {
        $id      = $this->getExampleId();
        $content = $this->model->getData($id);

        $this->response->setContentType('json');

        echo $content;
    }

    /**
     * Get example ID for page from request parameter.
     */
    private function getExampleId() : int
    {
        $example = $this->urlParameters[$this->urlParameterExample];
        $id      = $this->request->getParam($example);

        return (int) $id;
    }
}

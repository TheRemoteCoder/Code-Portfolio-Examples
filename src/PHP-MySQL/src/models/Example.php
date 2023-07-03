<?php

declare(strict_types=1);

namespace EXAMPLE\Models\Example;

use EXAMPLE\Lib\Messaging;
use EXAMPLE\Models\AbstractModel;

// phpcs:ignore
final class ExampleModel extends AbstractModel
{
    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function getExample(int $exampleId) : string
    {
        $val = $this->queryDatabase('example', [
            'val',
        ], "id_example = $exampleId");

        $success = $val[0]['val'];

        if (! $success) {
            Messaging::error("No val found for ID '{$exampleId}'");
        }

        return $success;
    }
}

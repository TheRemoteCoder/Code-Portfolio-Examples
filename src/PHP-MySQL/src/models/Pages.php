<?php

declare(strict_types=1);

namespace EXAMPLE\Models;

use EXAMPLE\Lib\Encoding\EncodingJson;

/**
 * Page data.
 */
// phpcs:ignore
final class PagesModel extends AbstractModel
{
    /**
     * JSON encoding library class instance.
     */
    private $encodingJson;

    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        parent::__construct();

        $this->encodingJson = new EncodingJson();
    }

    /**
     * Get page data as JSON.
     */
    public function getData(int $id) : string
    {
        $pageData = $this->getFromDatabase($id);

        return $this->encodingJson->encode($pageData);
    }

    /**
     * Get page data from database.
     */
    private function getFromDatabase(int $id) : array
    {
        $a = $this->queryDatabase('a', [
            'name',
        ]);

        $b = $this->queryDatabase('b', [
            'category',
        ], "id = {$id}");

        return [
            'a' => $a,
            'b' => $b[0],
        ];
    }
}

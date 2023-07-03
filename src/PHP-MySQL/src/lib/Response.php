<?php

declare(strict_types=1);

namespace EXAMPLE\Lib;

use function header;
use function json_encode;

/**
 * HTTP request responses.
 */
final class Response
{
    /**
     * 'Content-Type' header values.
     *
     * @var array [Key => ContentType]
     */
    private $headerContentTypes = [
        'html' => 'text/html',
        'json' => 'application/json',
        'text' => 'text/plain',
    ];

    public function __construct()
    {
    }

    /**
     * Set Content-Type header.
     */
    public function setContentType(string $type)
    {
        $contentType = $this->headerContentTypes[$type];

        header("Content-Type:$contentType; charset=utf-8");
    }

    /**
     * Set no-cache headers to prevent client-side caching.
     */
    public function setNoCache()
    {
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
    }

    /**
     * Send status response and data as JSON.
     *
     * @param string $status error|success
     */
    public function send(string $status, array $data = [])
    {
        $this->setContentType('json');

        echo json_encode([
            'status' => $status,
            'data'   => $data,
        ]);
    }
}

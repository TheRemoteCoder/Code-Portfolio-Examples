<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Encoding;

use function html_entity_decode;
use function htmlspecialchars;

use const ENT_QUOTES;

/**
 * Decode/Encode HTML.
 */
// phpcs:ignore
final class EncodingHtml
{
    public function __construct()
    {
    }

    /**
     * Decode characters.
     */
    public function decode(string $input) : string
    {
        return html_entity_decode($input, ENT_QUOTES, 'UTF-8');
    }

    /**
     * Encode characters.
     */
    public function encode(string $input) : string
    {
        return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    }
}

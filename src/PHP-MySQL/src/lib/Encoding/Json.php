<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Encoding;

use EXAMPLE\Lib\Messaging;

use function is_array;
use function json_decode;
use function json_encode;

use const JSON_HEX_AMP;
use const JSON_HEX_APOS;
use const JSON_HEX_QUOT;
use const JSON_HEX_TAG;
use const JSON_OBJECT_AS_ARRAY;
use const JSON_UNESCAPED_UNICODE;

/**
 * Decode/Encode JSON.
 *
 * - UTF-8 conversion can be needed before converting to JSON.
 * - Implementation is focused to work with this application.
 *   It will show errors for unexpected or broken data.
 */
// phpcs:ignore
final class EncodingJson
{
    /**
     * JSON decoding/encoding flags.
     *
     * @var number
     */
    private $jsonFlags = JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_TAG | JSON_OBJECT_AS_ARRAY | JSON_UNESCAPED_UNICODE;

    public function __construct()
    {
    }

    /**
     * Decode JSON data.
     *
     * Technically, 'json_decode' can return other data types.
     * For the purpose of this application it's considered error.
     */
    public function decode(string $input) : array
    {
        $decoded = json_decode($input, true, 512, $this->jsonFlags);

        if (! is_array($decoded)) {
            Messaging::error("Expected decoding as array '{$decoded}'");
        }

        return $decoded;
    }

    /**
     * Encode JSON data.
     *
     * Technically, 'json_encode' can also return 'false'.
     * For the purpose of this application it's considered error.
     *
     * @param mixed $input
     */
    public function encode($input) : string
    {
        $encoded = json_encode($input, $this->jsonFlags);

        if (! $encoded) {
            Messaging::error("Expected encoding as string '{$encoded}'");
        }

        return $encoded;
    }
}

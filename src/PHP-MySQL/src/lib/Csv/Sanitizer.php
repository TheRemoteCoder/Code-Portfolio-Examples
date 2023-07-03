<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Csv;

use function preg_replace;
use function str_replace;
use function stripcslashes;
use function stripslashes;
use function trim;

/**
 * CSV data sanitizer.
 */
// phpcs:ignore
final class CsvSanitizer extends CsvConfig
{
    /**
     * Any non-word characters will be counted as potentially harmful special characters.
     */
    private $regexNonWordSpecialCharacters = '[^\wäöüÄÖÜßàáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]';

    /**
     * Sanitize string input:
     * - Strip slashes, e.g. \" => "
     * - Remove linebreaks that can break CSV
     * - Replace unwanted quotes
     * - Trim
     */
    public function clean(string $raw) : string
    {
        $unescaped = stripcslashes($raw);
        $unescaped = stripslashes($unescaped);

        $noLinebreaks     = $this->removeLinebreaks($unescaped);
        $consistentQuotes = $this->convertQuotes($noLinebreaks);
        $sanitizedText    = $this->sanitizeCodeInjection($consistentQuotes);

        return trim($sanitizedText);
    }

    /**
     * Remove any line breaks to prevent breaking CSV file structure.
     */
    private function removeLinebreaks(string $text) : string
    {
        return preg_replace("/[\n\r]/", ' ', $text);
    }

    /**
     * Convert quote characters into a consistent version.
     * This prevents breaking CSV file structure and simplifies other code.
     */
    private function convertQuotes(string $text) : string
    {
        return str_replace($this->enclosure, $this->allowedQuote, $text);
    }

    /**
     * CSV Injection / Formula Injection safety:
     *
     * Remove any non-word characters at text start that might be harmful code injection
     * that 'survives' other escaping methods and becomes active once imported in tools like Excel.
     *
     * - Remove all non-word characters at text start (not just the first one as it might be needed).
     *   This avoids special characters behind the first turning potentially harmful after the first is removed.
     * - Although it is possible that harmless characters might appear at line starts, this method simply removes
     *   any non-known characters instead of whitelisting those known as dangerous. This increases the safety
     *   to use of other software besides Excel which might have different special characters being evaluated as code.
     * - Intended process: If content is missing from output that is expected to appear; someone should have a look
     *   in the Database to see if this is safe. Then adjust this methods behaviour if needed.
     *
     * @example Possible formula injection:
     *   Text before | Text after
     *   =CMD()      | CMD()
     */
    private function sanitizeCodeInjection(string $text) : string
    {
        $escapeRegex = '/^' . $this->regexNonWordSpecialCharacters . '+/im';

        return preg_replace($escapeRegex, '', $text);
    }
}

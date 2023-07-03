<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Csv;

/**
 * CSV config structure.
 */
// phpcs:ignore
abstract class CsvConfig
{
    /**
     * File output path, relative from root folder.
     */
    protected $outputPath = 'exports';

    /**
     * Field delimiter.
     */
    protected $delimiter = ",";

    /**
     * Field enclosure.
     * Must not clash with 'allowedQuote'.
     */
    protected $enclosure = "'";

    /**
     * Allowed quote symbol.
     * Must not clash with 'enclosure'.
     */
    protected $allowedQuote = '"';
}

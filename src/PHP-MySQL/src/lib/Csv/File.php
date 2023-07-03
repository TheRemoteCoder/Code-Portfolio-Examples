<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Csv;

use function array_flip;
use function array_merge;
use function array_walk;
use function date;
use function fclose;
use function fopen;
use function fputcsv;
use function header;
use function ob_clean;
use function ob_flush;

/**
 * CSV file creation.
 */
// phpcs:ignore
final class CsvFile extends CsvConfig
{
    /**
     * CSV sanitizer library class instance.
     */
    private $csvSanitizer;

    /**
     * Flag to download content as file.
     *
     * @var bool
     */
    private $downloadAsFile = true;

    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        $this->csvSanitizer = new CsvSanitizer();
    }

    /**
     * Get downloadable CSV file (must have been created previoiusly).
     *
     * @param array $content [[[string] => string]]
     * @param array $header  [string]
     */
    public function getDownloadableFile(array $content, array $header)
    {
        if ($this->downloadAsFile) {
            $fileName = $this->getFileName();

            header('Content-Type: text/csv');
            header('Content-Disposition: attachment;filename=' . $fileName);
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        }

        $fileContent = $this->getFileContent($content, $header);

        echo $fileContent;
    }

    /**
     * Create file from content and columns.
     *
     * @param array $content [[[string] => string]]
     * @param array $header  [string]
     */
    public function getFileContent(array $content, array $header)
    {
        $rows         = $this->getSanitizedContent($content);
        $emptyColumns = $this->getEmptyColumns($header);

        $handle = fopen('php://output', 'w');
        ob_clean();

        fputcsv($handle, $header, $this->delimiter);

        foreach ($rows as $row) {
            $rowCols = array_merge($emptyColumns, $row);

            fputcsv($handle, $rowCols, $this->delimiter, $this->enclosure);
        }

        ob_flush();
        fclose($handle);
    }

    /**
     * Get columns from header.
     *
     * @param array $header [string]
     * @return array [string => '']
     */
    private function getEmptyColumns(array $header) : array
    {
        $columns = array_flip($header);

        array_walk($columns, function (&$val) {
            $val = '';
        });

        return $columns;
    }

    /**
     * Get sanitized content.
     *
     * @param array $content [[[string] => string]]
     * @return array [[[string] => string]]
     */
    private function getSanitizedContent(array $content) : array
    {
        foreach ($content as $index => $fields) {
            foreach ($fields as $key => $value) {
                $fields[$key] = $this->csvSanitizer->clean($value);
            }

            $content[$index] = $fields;
        }

        return $content;
    }

    /**
     * Get file name.
     */
    private function getFileName() : string
    {
        return date('Y-m-d_h-i-s') . '.csv';
    }
}

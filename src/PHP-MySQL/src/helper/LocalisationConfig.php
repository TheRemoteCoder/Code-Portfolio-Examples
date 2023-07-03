<?php

declare(strict_types=1);

namespace EXAMPLE\Helper;

use function date_default_timezone_set;
use function setlocale;

use const LC_ALL;

/**
 * Set localisation and timezone.
 */
class LocalisationConfig
{
    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        $this->set();
    }

    /**
     * Set localisation and timezone.
     */
    private function set()
    {
        setlocale(LC_ALL, 'en_EN@euro', 'en_EN', 'en');

        date_default_timezone_set('Europe/Amsterdam');
    }
}

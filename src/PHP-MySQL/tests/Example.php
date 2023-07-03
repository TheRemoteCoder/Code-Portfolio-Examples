<?php

declare(strict_types=1);

namespace EXAMPLE\Tests\Example;

use PHPUnit\Framework\TestCase;
use EXAMPLE\Lib\Example;

use function count;

/**
 * @group lib
 */
// phpcs:ignore
final class GetExampleTest extends TestCase
{
    private static $instance;

    /**
     * Test setup to run before tests.
     */
    public function setUp() : void
    {
        self::$instance = new Example();
    }

    public function testExample() : void
    {
        $result = self::$instance->getExample();

        $this->assertEquals($result, true);
    }
}

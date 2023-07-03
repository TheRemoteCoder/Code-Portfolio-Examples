<?php

declare(strict_types=1);

namespace EXAMPLE\Models;

use EXAMPLE\Config\Config;
use EXAMPLE\Lib\Database\DatabaseConnection;
use EXAMPLE\Lib\Database\DatabaseStatement;
use EXAMPLE\Lib\Sanitization;

/**
 * Abstract data model with database access.
 */
// phpcs:ignore
abstract class AbstractModel
{
    /**
     * Database table prefix.
     */
    protected $tablePrefix = '';

    /**
     * Database connection class instance.
     */
    private $database;

    /**
     * Constructor sets dependencies.
     */
    public function __construct()
    {
        $connection  = Config::getConfigByKey('database', 'connection');
        $tablePrefix = Config::getConfigByKey('database', 'tablePrefix');

        $databaseStatement = new DatabaseStatement(new Sanitization());

        $this->database    = new DatabaseConnection($connection, $databaseStatement);
        $this->tablePrefix = $tablePrefix;
    }

    /**
     * Insert into database.
     */
    protected function insertIntoDatabase(string $tableName, array $columnData)
    {
        $this->database
            ->open()
            ->insert($this->tablePrefix . $tableName, $columnData)
            ->close();
    }

    /**
     * Query database with structurally predefined queries and return result.
     */
    protected function queryDatabase(string $tableName, array $columns, string $conditions = '') : array
    {
        $result = [];

        $this->database
            ->open()
            ->select($this->tablePrefix . $tableName, $columns, $conditions, $result)
            ->close();

        return $result;
    }

    /**
     * Query database with fully custom queries and return result.
     *
     * Warning: Security must be handled manually, there is no escaping!
     * Do not use with any untrusted input.
     */
    protected function queryDatabaseComplex(string $rawQuery) : array
    {
        $result = [];

        $this->database
            ->open()
            ->query($rawQuery, $result)
            ->close();

        return $result;
    }
}

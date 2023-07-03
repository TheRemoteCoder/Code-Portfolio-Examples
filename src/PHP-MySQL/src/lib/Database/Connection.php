<?php

declare(strict_types=1);

namespace EXAMPLE\Lib\Database;

use Exception;
use PDO;
use PDOException;
use EXAMPLE\Lib\Messaging;

use function array_keys;
use function preg_replace;
use function trim;

/**
 * PDO database connection.
 */
// phpcs:ignore
final class DatabaseConnection
{
    /**
     * Connection configuration.
     */
    private $config = [
        'host'     => '',
        'name'     => '',
        'user'     => '',
        'password' => '',
    ];

    /**
     * Connection reference.
     *
     * @var null|object
     */
    private $connection;

    /**
     * Database statement class instance.
     *
     * @var null|object
     */
    private $databaseStatement;

    /**
     * Constructor sets dependencies.
     *
     * @param array  $config            Database access - Strings [host|name|user|password]
     * @param object $databaseStatement DatabaseStatement class instance
     */
    public function __construct(array $config, object $databaseStatement)
    {
        $this->config            = $config;
        $this->databaseStatement = $databaseStatement;
    }

    /**
     * Close connection by nulling reference.
     */
    public function close() : self
    {
        $this->connection = null;

        return $this;
    }

    /**
     * Open connection and store reference.
     */
    public function open() : self
    {
        if ($this->connection) {
            Messaging::error('Connection already opened');
        }

        try {
            $this->connection = $this->getConnection();
        } catch (PDOException $error) {
            Messaging::error($error->getMessage(), 400, 'PDOException');
        }

        return $this;
    }

    /**
     * Insert statement.
     */
    public function insert(string $table, array $columnsValues) : self
    {
        $databaseStatement = $this->databaseStatement;

        $columns      = array_keys($columnsValues);
        $queryColumns = $databaseStatement->getColumns($columns);
        $queryValues  = $databaseStatement->getValues($columns);
        $queryData    = $databaseStatement->getData($columnsValues);

        $queryString = "INSERT INTO {$table} ({$queryColumns}) VALUES ({$queryValues})";

        $this->executeTransaction($queryString, $queryData);

        return $this;
    }

    /**
     * Select statement (unconditional, unlimited).
     * Return result as reference.
     */
    public function select(string $table, array $columns, string $conditions, array &$result) : self
    {
        $queryColumns = $this->databaseStatement->getColumns($columns);

        $queryString  = "SELECT {$queryColumns} FROM {$table}";
        $queryString .= $conditions ? " WHERE {$conditions}" : '';

        $result = $this->executeQuery($queryString);

        return $this;
    }

    /**
     * Run custom query of any kind and complexity.
     *
     * Warning: Security must be handled manually, there is no escaping!
     * Do not use with any untrusted input.
     */
    public function query(string $rawQuery, array &$result) : self
    {
        $queryString = preg_replace("/[\n\r]/", ' ', trim($rawQuery));

        $result = $this->executeCustomQuery($queryString);

        return $this;
    }

    /**
     * Execute prepared statement as transaction on existing connection.
     */
    private function executeTransaction(string $queryString, array $queryData = [])
    {
        $connection = $this->connection;

        try {
            $connection->beginTransaction();

            $pdoStatement = $connection->prepare($queryString);
            $pdoStatement->execute($queryData);

            $connection->commit();
        } catch (Exception $error) {
            $connection->rollBack();

            Messaging::error($error);
        }
    }

    /**
     * Execute prepared statement as query on existing connection.
     */
    private function executeQuery(string $queryString) : array
    {
        $connection  = $this->connection;
        $queryResult = [];

        try {
            $pdoStatement = $connection->prepare($queryString);
            $pdoStatement->execute([]);

            $queryResult = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $error) {
            Messaging::error($error);
        }

        return $queryResult;
    }

    /**
     * Execute custom query on existing connection.
     *
     * Warning: Security must be handled manually, there is no escaping!
     * Do not use with any untrusted input.
     */
    private function executeCustomQuery(string $queryString) : array
    {
        $connection  = $this->connection;
        $queryResult = [];

        try {
            $pdoStatement = $connection->query($queryString);

            $queryResult = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $error) {
            Messaging::error($error);
        }

        return $queryResult;
    }

    /**
     * Open connection and return handle.
     */
    private function getConnection() : object
    {
        $config = $this->config;

        $hostDatabase = "mysql:host={$config['host']};dbname={$config['name']}";
        $encoding     = [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4'];

        $connection = new PDO($hostDatabase, $config['user'], $config['password'], $encoding);

        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

        return $connection;
    }
}

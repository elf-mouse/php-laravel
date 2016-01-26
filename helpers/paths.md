# Paths

* [app_path](#app_path)
* [base_path](#base_path)
* [config_path](#config_path)
* [database_path](#database_path)
* [elixir](#elixir)
* [public_path](#public_path)
* [storage_path](#storage_path)

## app_path

The `app_path` function returns the fully qualified path to the `app` directory:

```
$path = app_path();
```

You may also use the `app_path` function to generate a fully qualified path to a given file relative to the application directory:

```
$path = app_path('Http/Controllers/Controller.php');
```

## base_path

The `base_path` function returns the fully qualified path to the project root:

```
$path = base_path();
```

You may also use the `base_path` function to generate a fully qualified path to a given file relative to the application directory:

```
$path = base_path('vendor/bin');
```

## config_path

The `config_path` function returns the fully qualified path to the application configuration directory:

```
$path = config_path();
```

## database_path

The `database_path` function returns the fully qualified path to the application's database directory:

```
$path = database_path();
```

## elixir

The `elixir` function gets the path to the versioned `Elixir` file:

```
elixir($file);
```

## public_path

The `public_path` function returns the fully qualified path to the `public` directory:

```
$path = public_path();
```

## storage_path

The `storage_path` function returns the fully qualified path to the `storage` directory:

```
$path = storage_path();
```

You may also use the `storage_path` function to generate a fully qualified path to a given file relative to the storage directory:

```
$path = storage_path('app/file.txt');
```

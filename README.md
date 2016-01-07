# Laravel

## Server Requirements

* PHP >= 5.5.9
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Tokenizer PHP Extension

## Installing Laravel

### Via Laravel Installer

```
composer global require "laravel/installer"
```

> Make sure to place the `~/.composer/vendor/bin` directory in your PATH so the `laravel` executable can be located by your system.

```
laravel new myProject
```

### Via Composer Create-Project

```
composer create-project --prefer-dist laravel/laravel myProject
```

## Configuration

### Directory Permissions

```
chmod -R 777 storage
chmod -R 777 bootstrap/cache
```

### Application Key

> No supported encrypter found. The cipher and / or key length are invalid.

```
php artisan key:generate
```

### Additional Configuration

* `config/app.php`

```
'timezone' => 'Asia/Shanghai',
'locale' => 'en',
```

* `config/database.php`

```
'collation' => 'utf8_general_ci', // utf8_unicode_ci
```

* `.env`

> Your `.env` file __should not be committed__ to your application's source control, since each developer / server using your application could require a different environment configuration.

### Maintenance Mode

```
php artisan down
```

```
php artisan up
```

* Maintenance Mode Response Template in `resources/views/errors/503.blade.php`

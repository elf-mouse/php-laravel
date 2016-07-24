## Q&A

Q: `composer update`

```
Script php artisan clear-compiled handling the post-install-cmd event returned with an error
```

A: [Upgrading To 5.2.0 From 5.1](https://laravel.com/docs/5.2/upgrade)

---

Q: Laravel installer fails at __guzzlehttp__

A:

```
rm -R ~/.composer/vendor/guzzlehttp
composer global require [<packages>]
```

---

Q:

```
[Composer\Downloader\TransportException]
The "*.zip" file could not be downloaded (HTTP/1.1 404 Not Found)
```

A:

```
composer require --no-update [package/name:version]
composer update --no-scripts
composer update
```

---

```
curl -sS https://getcomposer.org/installer | php
cp /app/local/composer.phar /usr/local/bin/composer

composer -V
```

```
The Process class relies on proc_open, which is not available on your PHP installation.

php.ini
disable_functions = xxx
```

```
chmod -R 777 storage
chmod -R 777 bootstrap/cache
chmod 777 public/uploads
```

```
No supported encrypter found. The cipher and / or key length are invalid.

php artisan key:generate
```

```
413 Request Entity Too Large

nginx.conf
client_max_body_size 20m;
```

```
502 Bad Gateway

php-cgi进程数不够用、php执行时间长、或者是php-cgi进程死掉
```

```
Error Output: PHP Fatal error:  Class 'Illuminate\Foundation\Application' not found

composer dump-autoload

Remove the "vendor" folder and "composer.lock" and run: composer install
composer update --no-scripts
```

```
Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 2611816 bytes)

memory_limit = 128M;//将128M改成了256M
```

```
curl_exec() has been disabled for security reasons

disable_functions 去掉 `curl_exec`
service php-fpm start
```

```
composer：zlib_decode():data error

先运行
composer diagnose
若全部返回OK

再执行
composer install -vvv
一般就行
```

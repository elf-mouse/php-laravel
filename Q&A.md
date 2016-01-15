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

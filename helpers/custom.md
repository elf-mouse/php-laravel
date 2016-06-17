## custom helpers

### 1. create file `app/helpers.php`

### 2. edit `composer.json`

```
{
    ...
    "autoload": {
        ...
        "files" : [
            "app/helpers.php"
        ]
    },
    ...
}
```

### 3. `composer dump-autoload` or `composer dumpautoload`

---

## custom util

### 1. create folder `app/Helpers`

### 2. create file `php artisan make:provider HelperServiceProvider`

### 3. edit `app/Providers/HelperServiceProvider.php`

```
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        foreach (glob(app_path().'/Helpers/*.php') as $filename)
        {
            require_once($filename);
        }
    }
}
```

### 4. edit `config/app.php`

```
...
    'providers' => [
        ...
        App\Providers\HelperServiceProvider::class,
    ],
...
```

### 5. create file `app/Helpers.php`

```
<?php

namespace App\Helpers;

class Util
{
    public static function foo()
    {
        // your code
    }
}
```

### 6. edit `config/app.php`

```
...
    'aliases' => [
        'Util' => App\Helpers\Util::class,
    ],
...
```

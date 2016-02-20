## Miscellaneous

### 36. share cookie between domains

```
// app/Http/Middleware/EncryptCookies.php
protected $except = [
    'shared_cookie'
];

Cookie::queue('shared_cookie', 'my_shared_value', 10080, null, '.example.com');
```

### 37. Easy model & migrations stubs

```
$ artisan make:model Books -m
```

### 38. add spark to existing project

```
$ composer require genealabs/laravel-sparkinstaller --dev

//
Laravel\Spark\Providers\SparkServiceProvider::class, GeneaLabs\LaravelSparkInstaller\Providers\LaravelSparkInstallerServiceProvider::class,

// do not run php artisan spark:install
$ php artisan spark:upgrade

// backup /resources/views/home.blade.php or it will be overwritten
$ php artisan vendor:publish --tag=spark-full
```

### 39. customize the default error page

```
<?php
namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\Debug\ExceptionHandler as SymfonyDisplayer;

class Handler extends ExceptionHandler
{
    protected function convertExceptionToResponse(Exception $e)
    {
        $debug = config('app.debug', false);

        if($debug) {
            return (new SymfonyDisplayer($debug))->createResponse($e);
        }

        return response()->view('errors.default', ['exception' => $e], 500);
    }
}
```

### 40. conditional service providers

```
// app/Providers/AppServiceProvider.php
public function register()
{
    $this->app->bind('Illuminate\Contracts\Auth\Registrar', 'App\Services\Registrar');

    if ($this->app->environment('production')) {
        $this->app->register('App\Providers\ProductionErrorHandlerServiceProvider');
    } else {
        $this->app->register('App\Providers\VerboseErrorHandlerServiceProvider');
    }
}
```

### 41. change a column name in migration

```
$ composer require doctrine/dbal
```

```
public function up()
{
    Schema::table('users', function($table)
    {
        $table->string('name', 50)->change();
    });
}
```

### 42. checking if a view exists

```
if (view()->exists('emails.' . $template))
{
    // ... sending an email to the customer
}
```

### 43. extending the application

```
// bootstrap/app.php

// replace this:
$app = new Illuminate\Foundation\Application(realpath(__DIR__ . '/../'));

// with this:
$app = new Fantabulous\Application(realpath(__DIR__ . '/../'));

<?php
namespace Fantabulous;

class Application extends \Illuminate\Foundation\Application
{
    /**
     * Get the path to the storage directory.
     *
     * @return string
     */
    public function storagePath()
    {
        return $this->basePath . '/FantabulousStorage';
    }
}
```

### 44. simple chching microservice

```
class fakeApiCaller
{
    public function getResultsForPath($path)
    {
        return [
            'status' => 200,
            'body' => json_encode([
                'title' => "Results for path [$path]"
            ]),
            'headers' => [
                "Content-Type" => "application/json"
            ]
        ];
    }
}

$app->get('{path?}', function($path)
{
    $result = Cache::remember($path, 60, function () use ($path) {
        return (new fakeApiCaller)->getResultsForPath($path);
    });

    return response($result['body'], $result['status'], array_only(
        $result['headers'], ['Content-Type', 'X-Pagination']
    ));
})->where('path', '.*');
```

### 45. use bleeding edge version

```
$ composer create - project laravel / laravel your-project-name-here dev-develop
```

```
// composer.json
{
    "require": {
        "php": ">=5.5.9",
        "laravel/framework": "5.2.*"
    },
    "minimum-stability": "dev"
}
```

```
$ composer update
```

### 46. capture queries

```
Event::listen('illuminate.query', function($query) {
    var_dump($query);
});

\DB::listen(function($query, $bindings, $time) {
    var_dump($query);
    var_dump($bindings);
    var_dump($time);
});
```

### 47. authorization without models

```
// app/Policies/AdminPolicy.php
class AdminPolicy
{
    public function managePages($user)
    {
        return $user->hasRole(['Administrator', 'Content Editor']);
    }
}

// app/Providers/AuthServiceProvider.php
public function boot(\Illuminate\Contracts\Auth\Access\GateContract $gate)
{
    foreach (get_class_methods(new \App\Policies\AdminPolicy) as $method) {
        $gate->define($method, "App\Policies\AdminPolicy@{$method}");
    }

    $this->registerPolicies($gate);
}

$this->authorize('managePages'); // in Controllers
@can('managePages') // in Blade Templates
$user->can('managePages'); // via Eloquent
```

### 48. efficient file transfer with streams

```
$disk = Storage::disk('s3');
$disk->put($targetFile, file_get_contents($sourceFile));

$disk = Storage::disk('s3');
$disk->put($targetFile, fopen($sourceFile, 'r+'));

$disk = Storage::disk('s3');
$stream = $disk->getDriver()->readStream($sourceFileOnS3);
file_put_contents($targetFile, stream_get_contents($stream), FILE_APPEND);

$stream = Storage::disk('s3')->getDriver()->readStream($sourceFile);
Storage::disk('sftp')->put($targetFile, $stream)
```

### 49. avoid overflowing log files

```
$schedule->call(function () {
    Storage::delete($logfile);
})->weekly();
```

### 50. pipeling

```
$result = (new Illuminate\Pipeline\Pipeline($container)
    ->send($something)
    ->through('ClassOne', 'ClassTwo', 'ClassThree')
    ->then(function ($something) {
        return 'foo';
    });
```

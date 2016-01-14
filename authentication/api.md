# API接口

## Auth（`app/config/auth.php`）

```
    'guards' => [
        'api' => [
            'driver' => 'token',
            'provider' => 'user',
        ],
    ],
```

## Migration（`database/migrations/create_users_table.php`）

```
    ...
    $table->string('api_token')->unique();
    ...
```

## Middleware

`php artisan make:middleware ApiAccess`

编辑`app/Http/Middleware/ApiAccess.php`

```
    public function handle($request, Closure $next)
    {
        $auth = Auth::guard('api');

        if ($auth->check()) {
            return $next($request);
        };

        abort(403, "You're not authorized to access this public REST API.");
    }
```

编辑`app/Http/Kernel.php`

```
'auth.api' => \App\Http\Middleware\ApiAccess::class,
```

## Route（`app/Http/routes.php`）

```
$options = [
    'api' => [
        'middleware' => 'auth.api',
        'prefix' => 'api',
        'namespace' => 'Api',
    ],
];

Route::get('api', function() {
    $auth = auth()->guard('api');

    if ($auth->check()) {
        return $auth->user();
    };

    abort(403, "You're not authorized to access this public REST API.");
});

Route::group($options['api'], function () {
    Route::get('/', function() {
        return auth('api')->user();
    });
});
```

访问`/api?api_token={your_token}`

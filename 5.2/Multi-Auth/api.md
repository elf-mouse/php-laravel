# RESTful API

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

编辑 `app/Http/Middleware/ApiAccess.php`

```
    public function handle($request, Closure $next)
    {
        $auth = auth('api');

        if ($auth->check()) {
            return $next($request);
        };

        abort(401, 'Unauthorized');
        // abort(403, "You're not authorized to access this public REST API.");
    }
```

编辑 `app/Http/Kernel.php`

```
    protected $middlewareGroups = [
        ...
        'api' => [
            'throttle:60,1',
            'auth.api',
        ],
    ];

    protected $routeMiddleware = [
        ...
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'auth.api' => \App\Http\Middleware\ApiAccess::class,
    ];
```

## Route（`app/Http/routes.php`）

```
$options = [
    'api' => [
        'middleware' => 'api',
        'prefix' => 'api',
        'namespace' => 'Api',
    ],
];

Route::group($options['api'], function () {
    Route::group(['prefix' => 'v1'], function () {
        Route::group(['prefix' => 'home'], function () {
            Route::get('index', 'HomeController@index');
        });
    });
});
```

访问 `/api?api_token={your_token}`

### middleware

> 1. api - Middleware Groups
> 2. auth.api - Route Middleware
> 3. auth:api - Auth Guards

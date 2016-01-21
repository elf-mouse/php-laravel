# Maintenance Mode

To enable maintenance mode, simply execute the `down` Artisan command:

```
php artisan down
```

To disable maintenance mode, use the `up` command:

```
php artisan up
```

* Maintenance Mode Response Template in `resources/views/errors/503.blade.php`

---

## 重写CheckForMaintenanceMode（`app/Http/Middleware/CheckForMaintenanceMode.php`）

```
public function handle($request, Closure $next)
{
    $disallow = !in_array($request->getClientIp(), ['127.0.0.1']);

    if ($this->app->isDownForMaintenance() && $disallow) {
        throw new HttpException(503);
    }

    return $next($request);
}
```

编辑`app/Http/Kernel.php`

```
protected $middleware = [
    \App\Http\Middleware\CheckForMaintenanceMode::class, // \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
];
```

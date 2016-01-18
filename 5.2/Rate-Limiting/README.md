## 默认允许每分钟最多请求60次 `429: Too Many Attempts`

```
Route::get('/api/users', ['middleware' => 'throttle:60,1', function () {
    //
}]);
```

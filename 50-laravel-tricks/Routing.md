## Routing

### 31. nested route groups

```
Route::group(['prefix' => 'account', 'as' => 'account.'], function () {

    Route::get('login', ['as' => 'login', 'uses' => 'AccountController@getLogin']);
    Route::get('register', ['as' => 'register', 'uses' => 'AccountController@getRegister']);

    Route::group(['middleware' => 'auth'], function () {
        Route::get('edit', ['as' => 'edit', 'uses' => 'AccountController@getEdit']);
    });

});
```

```
<a href="{{ route('account.login') }}">Login</a>
<a href="{{ route('account.register') }}">Register</a>
<a href="{{ route('account.edit') }}">Edit Account</a>
```

### 32. catch-all view route

```
// app/Http/routes.php
Route::group(['middleware' => 'auth'], function() {
    Route::get('{view}', function($view) {
        try {
            return view($view);
        } catch (\Exception $e) {
            abort(404);
        }
    })->where('view', '.*');
});
```

### 33. internal dispatch

```
// api controller
public function show(Car $car)
{
    if (Input::has('fields')) {
        // do something
    }
}

// internal request to api - fields are lost
$request = Request::create('/api/cars/' . $id . '?fields=id,color', 'GET');
$response = json_decode(Route::dispatch($request)->getContent());

// internal request to api - with fields
$originalInput = Request::input();
$request = Request::create('/api/cars/' . $id . '?fields=id,color', 'GET');
Request::replace($request->input());
$response = json_decode(Route::dispatch($request)->getContent());
Request::replace($originalInput);
```

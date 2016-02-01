# URLs

* [action](#action)
* [asset](#asset)
* [secure_asset](#secure_asset)
* [route](#route)
* [url](#url)

## action

The `action` function generates a URL for the given controller action. You do not need to pass the full namespace to the controller. Instead, pass the controller class name relative to the `App\Http\Controllers` namespace:

```
$url = action('HomeController@getIndex');
```

If the method accepts route parameters, you may pass them as the second argument to the method:

```
$url = action('UserController@profile', ['id' => 1]);
```

## asset

Generate a URL for an asset using the current scheme of the request (HTTP or HTTPS):

```
$url = asset('img/photo.jpg');
```

## secure_asset

Generate a URL for an asset using HTTPS:

```
echo secure_asset('foo/bar.zip', $title, $attributes = []);
```

## route

The `route` function generates a URL for the given named route:

```
$url = route('routeName');
```

If the route accepts parameters, you may pass them as the second argument to the method:

```
$url = route('routeName', ['id' => 1]);
```

## url()

The `url` function generates a fully qualified URL to the given path:

```
echo url('user/profile');

echo url('user/profile', [1]);
```

If no path is provided, a `Illuminate\Routing\UrlGenerator` instance is returned:

```
echo url()->current();
echo url()->full();
echo url()->previous();
```

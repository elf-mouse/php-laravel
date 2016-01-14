# 多用户验证

## Auth（`app/config/auth.php`）

```
    'defaults' => [
        'guard' => 'user',
        'passwords' => 'user',
    ],

    'guards' => [
        'user' => [
            'driver' => 'session',
            'provider' => 'user',
        ],
        'admin' => [
            'driver' => 'session',
            'provider' => 'admin',
        ],
    ],

    'providers' => [
        'user' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],
        'admin' => [
            'driver' => 'eloquent',
            'model' => App\Admin::class,
        ],
    ],
```

## Authenticate（`app/Http/Middleware/Authenticate.php`）声明跳转路径

```
    public function handle($request, Closure $next, $guard = null)
    {
        $redirect = ($guard == 'admin') ? 'admin/login' : 'user/login';

        if (Auth::guard($guard)->guest()) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return redirect()->guest($redirect);
            }
        }

        return $next($request);
    }
```

## Route（`app/Http/routes.php`）

```
$options = [
    'admin' => [
        'middleware' => ['web', 'auth:admin'],
        'prefix' => 'admin',
        'namespace' => 'Admin',
    ],
    'user' => [
        'middleware' => ['web', 'auth:user'],
        'prefix' => 'user',
        'namespace' => 'User'
    ],
];

Route::group($options['admin'], function () {
    Route::get('/', function() {
        return 'this is home of admin. <a href="' . url('admin/public/logout') . '">logout</a>';
    });
    // your admin routes
    Route::get('profile', function() {
        dd(auth('admin')->user());
    });
});

Route::group($options['user'], function () {
    Route::get('/', function() {
        return 'this is home of user. <a href="' . url('user/public/logout') . '">logout</a>';
    });
    // your user routes
    Route::get('profile', function() {
        dd(auth('user')->user());
    });
});

Route::group(['middleware' => 'web'], function() {
    Route::controllers([
        'admin/public' => 'Admin\PublicController',
        'user/public' => 'User\PublicController',
    ]);
    // your public routes
});
```

> `auth:admin`、`auth:user`中的`admin`、`user`为中间件参数，表示调用 __Authenticate__ 时handle的 _$guard_ 的参数为`admin`、`user`。

## Controller（`Controllers\Admin\PublicController.php`和`Controllers\User\PublicController.php`）

```
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublicController extends Controller
{
    public function getLogin()
    {
        return view('admin.login');
    }

    public function postLogin(Request $request)
    {
        $rules = [
            'email' => 'required',
            'password' => 'required',
        ];
        $this->validate($request, $rules);

        if (auth('admin')->attempt($request->only(['email', 'password']), $request->has('remember'))) {
            return back()->withInput()->withErrors(['password' => ['login successfully']]);
        }

        return back()->withInput()->withErrors(['password' => ['login failed']]);
    }

    public function getLogout()
    {
        auth('admin')->logout();

        return redirect('admin/public/login');
    }
}
```

## View（`views/admin/login.blade.php`）

```
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>
  @if(count($errors) > 0)
  <ul class="alert alert-error">
    @foreach($errors->all() as $error)
    <li>{{$error}}</li>
    @endforeach
  </ul>
  @endif
  <form method="post">
    <input type="email" name="email" value="{{old('email')}}" placeholder="your email">
    <br>
    <input type="password" name="password" placeholder="your password">
    <br>
    {{csrf_field()}}
    <button type="submit">submit</button>
  </form>
</body>

</html>
```

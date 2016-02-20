## Testing

### 34. evironmental varlables

```
// phpunit.xml
<php>
    <env name="APP_ENV" value="testing"/>
    <env name="CACHE_DRIVER" value="array"/>
    <env name="SESSION_DRIVER" value="array"/>
    <env name="QUEUE_DRIVER" value="sync"/>
    <env name="DB_DATABASE" value=":memory:"/>
    <env name="DB_CONNECTION" value="sqlite"/>
    <env name="TWILIO_FROM_NUMBER" value="+15005550006"/>
</php>
```

```
// .env.test – add to .gitignore
TWILIO_ACCOUNT_SID = fillmein
TWILIO_ACCOUNT_TOKEN = fillmein
```

```
// access directly from your tests using helper function
env('TWILIO_ACCOUNT_TOKEN');
```

```
// tests/TestCase.php
<?php
class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__ . '/../bootstrap/app.php';

        if (file_exists(dirname(__DIR__) . '/.env.test')) {
            Dotenv::load(dirname(__DIR__), '.env.test');
        }

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        return $app;
    }
}
```

### 35. run tests automatically

```
// gulpfile.js
var elixir = require('laravel-elixir');

mix.phpUnit();
```

```
$ gulp tdd
```

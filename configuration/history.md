# HTML5 History Mode

```php
Route::get('/path/to/yourRoute/{spa?}', function() {
    if ( ! Request::ajax() )
        return view('yourAction');
})->where('spa', '[\/\w\.-]*');
```

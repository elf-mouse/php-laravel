## Laravel 5.2

### 56. implicit model binding

```
// app/http/routes.php
Route::get('/api/posts/{post}', function(Post $post) {
    return $post;
});

// behind the scenes
Post::findOrFail($post);
```

### 57. append scheduler autput to a file

```
$schedule->command('emails:send')
         ->hourly()
         ->appendOutputTo($filePath);
```

### 58. collections wildcard

```
// returns titles for all posts
$titles = $posts->pluck('posts .*.title');
```

### 59. formarray validation

```
<p>
  <input type="text" name="person[1][id]">
  <input type="text" name="person[1][name]">
</p>
<p>
  <input type="text" name="person[2][id]">
  <input type="text" name="person[2][name]">
</p>
```

```
$v = Validator:: make($request->all(), [
    'person.*.id' => 'exists:users.id',
    'person.*.name' => 'required:string',
]);
```

### 60. easily clear user sessions

```
// included in database session driver
user_id
ip_address
```

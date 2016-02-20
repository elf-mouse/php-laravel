## Collections

### 19. Arrays as collections

```
$devs = [
    ['name' => 'Anouar Abdessalam', 'email' => 'dtekind@gmail.com'],
    ['name' => 'Bilal Ararou', 'email' => 'have@noIdea.com']
];

$devs = new Illuminate\Support\Collection($devs);

$devs->first();
$devs->last();
$devs->push(['name' => 'xroot', 'email' => 'xroot@root.com']);
```

### 20. Collection filters

```
$customers = Customer::all();

$us_customers = $customers->filter(function ($customer) {
    return $customer->country == 'United States';
});

$non_uk_customers = $customers->reject(function ($customer) {
    return $customer->country == 'United Kingdom';
});
```

### 21. find()

```
// returns a single row as a collection
$collection = App\Person::find([1]);

// can return multiple rows as a collection
$collection = App\Person::find([1, 2, 3]);
```

### 22. where()

```
$collection = App\Person::all();

$programmers = $collection->where('type', 'programmer');
$critic = $collection->where('type', 'critic');
$engineer = $collection->where('type', 'engineer');
```

### 23. implode()

```
$collection = App\Person::all();

$names = $collection->implode('first_name', ',');
```

### 24. where() & list()

```
// returns a collection of first names
$collection = App\Person::all()->where('type', 'engineer')->lists('first_name');

// returns all the meta records for user 1
$collection = App\WP_Meta::whereUserId(1)->get();

// returns the first & last name meta values
$first_name = $collection->where('meta_key', 'first_name')->lists('value')[0];
$last_name = $collection->where('meta_key', 'last_name')->lists('value')[0];
```

### 25. order belongs-to-many by pivot table

```
class Link extends Model
{
    public function users()
    {
        return $this->belongsToMany('Phpleaks\User')->withTimestamps();
    }
}
```

```
@if ($link->users->count() > 0)
<strong>Recently Favorited By</strong>
  @foreach ($link->users()->orderBy('link_user.created_at', 'desc')->take(15)->get() as $user)
  <p>
    <a href="{{ URL::Route('user.show', array('id' => $user->id)) }}">{{ $user->name }}</a>
  </p>
  @endforeach
@endif
```

### 26. sorting with closures

```
$collection = collect([
    ['name' => 'Desk'],
    ['name' => 'Chair'],
    ['name' => 'Bookcase']
]);

$sorted = $collection->sortBy(function($product, $key)
{
    return array_search($product['name'], [1 => 'Bookcase', 2 => 'Desk', 3 => 'Chair']);
});
```

### 27. keying arrays

```
$library = $books->keyBy('title');

[
    'Lean Startup' => ['title' => 'Lean Startup', 'price' => 10],
    'The One Thing' => ['title' => 'The One Thing', 'price' => 15],
    'Laravel: Code Bright' => ['title' => 'Laravel: Code Bright', 'price' => 20],
    'The 4-Hour Work Week' => ['title' => 'The 4-Hour Work Week', 'price' => 5],
]
```

### 28. grouped collections

```
$collection = App\Person::all();

$grouped = $collection->groupBy('type');
```

### 29. collection unions

```
// the point is to actually combine results from different models
$programmers = \App\Person::where('type', 'programmer')->get();
$critic = \App\Person::where('type', 'critic')->get();
$engineer = \App\Person::where('type', 'engineer')->get();

$collection = new Collection;

$all = $collection->merge($programmers)->merge($critic)->merge($engineer);
```

### 30. collection lookaheads

```
$collection = collect([1 => 11, 5 => 13, 12 => 14, 21 => 15])->getCachingIterator();

foreach ($collection as $key => $value) {
    dump($collection->current() . ':' . $collection->getInnerIterator()->current());
}
```

## Eloquent

### 1. Automatic model validation

```
class Post extends Eloquent
{
    public static $autoValidate = true;

    protected static $rules = array();

    protected static function boot()
    {
        parent::boot();

        // You can also replace this with static::creating or static::updating
        static::saving(function($model)
        {
            if ($model::$autoValidate)
            {
                return $model->validate();
            }
        });
    }

    public function validate()
    {
    }
}
```

### 2. Prevent updating

```
class Post extends Eloquent
{
    protected static function boot()
    {
        parent::boot();

        static::updating(function($model)
        {
            return false;
        });
    }
}
```

### 3. Conditional relationships

```
class myModel extents Model
{
    public function category()
    {
         return $this->belongsTo('myCategoryModel', 'categories_id')
                     ->where('users_id', Auth::user()->id);
    }
}
```

### 4. Expressive where syntax

```
$products = Product::where('category', '=', 3)->get();

$products = Product::where('category', 3)->get();

$products = Product::whereCategory(3)->get();
```

### 5. Query builder:having raw

```
SELECT *, COUNT(*) FROM products GROUP BY category_id HAVING count(*) > 1;
```

```
DB::table('products')
    ->select('*', DB::raw('COUNT(*) as products_count'))
    ->groupBy('category_id')
    ->having('products_count', '>', 1)
    ->get();

Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();
```

### 6. Simple date filtering

```
$q->whereDate('created_at', date('Y-m-d'));

$q->whereDay('created_at', date('d'));

$q->whereMonth('created_at', date('m'));

$q->whereYear('created_at', date('Y'));
```

### 7. Save options

```
// src/Illuminate/Database/Eloquent/Model.php
public function save(array $options = array())

// src/Illuminate/Database/Eloquent/Model.php
protected function performUpdate(Builder $query, array $options = [])
{
    if ($this->timestamps && array_get($options, 'timestamps', true))
    {
        $this->updateTimestamps();
    }
```

```
$product = Product::find($id);
$product->updated_at = '2015 -01-01 10:00:00';
$product->save(['timestamps' => false]);
```

### 8. Multilingual support

```
// database/migrations/create_articles_table.php
public function up()
{
    Schema::create('articles', function (Blueprint $table) {
        $table->increments('id');
        $table->boolean('online');
        $table->timestamps();
    });
}
```

```
// database/migrations/create_articles_table.php
public function up()
{
    $table->increments('id');
    $table->integer('article_id')->unsigned();
    $table->string('locale')->index();

    $table->string('name');
    $table->text('text');

    $table->unique(['article_id', 'locale']);
    $table->foreign('article_id')->references('id')
                                 ->on('articles')
                                 ->onDelete('cascade');
}
```

```
// app/Article.php
class Article extends Model
{
    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['name', 'text'];
}
```

```
// app/ArticleTranslation.php
class ArticleTranslation extends Model
{
    public $timestamps = false;
}
```

```
// app/http/routes.php
Route::get('{locale}', function ($locale) {
    app()->setLocale($locale);
    $article = Article::first();

    return view('article')->with(compact('article'));
});
```

```
// resources/views/article.blade.php
<h1>{{ $article->name }}</h1>
{{ $article->text }}
```

### 9. Retrieve random rows

```
$questions = Question::orderByRaw('RAND()')->take(10)->get();
```

### 10. uuid model primary key

```
use Ramsey\Uuid\Uuid;

trait UUIDModel
{
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $key = $model->getKeyName();

            if (empty($model->{$key})) {
                $model->{$key} = (string) $model->generateNewId();
            }
        });
    }

    public function generateNewUuid()
    {
        return Uuid::uuid4();
    }
}
```

### 11. Ordered relationships

```
class Category extends Model
{
    public function products()
    {
        return $this->hasMany('App\Product')->orderBy('name');
    }
}
```

### 12. Simple incrementing & Decrementing

```
$customer = Customer::find($customer_id);
$loyalty_points = $customer->loyalty_points + 50;
$customer->update(['loyalty_points' => $loyalty_points]);

// adds one loyalty point
Customer::find($customer_id)->increment('loyalty_points', 50);

// subtracts one loyalty point
Customer::find($customer_id)->decrement('loyalty_points', 50);
```

### 13. List with mutations

```
$employees = Employee::where('branch_id', 9)->lists('name', 'id');
return view('customers . create', compact('employees'));
```

```
{!! Form::select('employee_id', $employees, '') !!}
```

```
public function getFullNameAttribute() {
    return $this->name . ' ' . $this->surname;
}
```

```
 [2015-07-19 21:47:19] local.ERROR: exception 'PDOException' with message 'SQLSTATE[42S22]: Column not found:
 1054 Unknown column 'full_name' in 'field list'' in
 ...vendor\laravel\framework\src\Illuminate\Database\Connection.php:288
```

```
$employees = Employee::where('branch_id', 9)->get()->lists('full_name', 'id');
```

### 14. Appending mutated properties

```
function getFullNameAttribute()
{
    return $this->first_name . ' ' . $this->last_name;
}

{
    "id":1,
    "first_name":"Povilas",
    "last_name":"Korop",
    "email":"povilas@webcoderpro.com",
    "created_at":"2015-06-19 08:16:58",
    "updated_at":"2015-06-19 19:48:09"
}
```

```
class User extends Model
{
    protected $appends = ['full_name'];

{
    "id":1,
    "first_name":"Povilas",
    "last_name":"Korop",
    "email":"povilas@webcoderpro.com",
    "created_at":"2015-06-19 08:16:58",
    "updated_at":"2015-06-19 19:48:09",
    "full_name":"Povilas Korop"
}
```

### 15. Filter only rows with child rows

```
class Category extends Model
{
    public function products() {
        return $this->hasMany('App\Product');
    }
}

public function getIndex() {
    $categories = Category::with('products')->has('products')->get();
    return view('categories.index', compact('categories'));
}
```

### 16. Return relations on model save

```
public function store()
{
    $post = new Post;
    $post->fill(Input::all());
    $post->user_id = Auth::user()->user_id;

    $post->user;

    return $post->save();
}
```

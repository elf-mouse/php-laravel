## Blade

### 17. Dynamic with

```
// eloquent
Post::whereSlug('slug')->get();

// instead of
View::make('posts.index')->with('posts', $posts);

// do this
View::make('posts.index')->withPosts($posts);
```

### 18. First/last array element

```
// hide all but the first item
@foreach ($menu as $item)
<div @if ($item != reset($menu)) class="hidden" @endif>
  <h2>{{ $item->title }}</h2>
</div>
@endforeach

// apply css to last item only
@foreach ($menu as $item)
<div @if ($item == end($menu)) class="no_margin" @endif>
  <h2>{{ $item->title }}</h2>
</div>
@endforeach
```

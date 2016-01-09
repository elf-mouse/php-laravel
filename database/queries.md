# Query Builder

## Infinite scrolling

* in `Model`

```
public function getList($id = 0)
{
    $db = DB::table($this->table);

    if ($id) {
        $db->where($this->field_id, '<', $id); // 保证数据的连贯性
    }

    $result = $db->orderBy($this->field_id, 'desc')->paginate(PAGE_SIZE); // 倒序分页

    return $result;
}
```

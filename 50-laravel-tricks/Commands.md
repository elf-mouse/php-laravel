## Commands

### 51. command handler dispatch

```
class PurchasePodcastCommand extends Command
{
    public $user;
    public $podcast;

    public function __construct(User $user, Podcast $podcast)
    {
        $this->user = $user;
        $this->podcast = $podcast;
    }
}

class PurchasePodcastCommandHandler
{
    public function handle(BillingGateway $billing)
    {
        // Handle the logic to purchase the podcast...

        event(new PodcastWasPurchased($this->user, $this->podcast));
    }
}

class PodcastController extends Controller
{
    public function purchasePodcastCommand($podcastId)
    {
        $this->dispatch(
            new PurchasePodcast(Auth::user(), Podcast::findOrFail($podcastId))
        );
    }
}
```

### 52. self handling commands

```
class PurchasePodcast extends Command implements SelfHandling
{
    protected $user;
    protected $podcast;

    public function __construct(User $user, Podcast $podcast)
    {
        $this->user = $user;
        $this->podcast = $podcast;
    }

    public function handle(BillingGateway $billing)
    {
        // Handle the logic to purchase the podcast...

        event(new PodcastWasPurchased($this->user, $this->podcast));
    }

}

class PodcastController extends Controller
{
    public function purchasePodcast($podcastId)
    {
        $this->dispatch(
            new PurchasePodcast(Auth::user(), Podcast::findOrFail($podcastId))
        );
    }
}
```

### 53. automatic dispatch from requests

```
class PodcastController extends Controller
{
    public function purchasePodcast(PurchasePodcastRequest $request)
    {
        $this->dispatchFrom('Fantabulous\Commands\PurchasePodcastCommand', $request);
    }

}

class PodcastController extends Controller
{
    public function purchasePodcast(PurchasePodcastRequest $request)
    {
        $this->dispatchFrom('Fantabulous\Commands\PurchasePodcastCommand', $request, [
            'firstName' => 'Taylor',
        ]);
    }
}
```

### 54. queued commands

```
class PurchasePodcast extends Command implements ShouldBeQueued, SerializesModels
{
    public $user;
    public $podcast;

    public function __construct(User $user, Podcast $podcast)
    {
        $this->user = $user;
        $this->podcast = $podcast;
    }
}
```

### 55. commands pipeline

```
// App\Providers\BusServiceProvider::boot
$dispatcher->pipeThrough(['UseDatabaseTransactions', 'LogCommand']);

class UseDatabaseTransactions
{
    public function handle($command, $next)
    {
        return DB::transaction(function () use ($command, $next)
        {
            return $next($command);
        });
    }
}

// App\Providers\BusServiceProvider::boot
$dispatcher->pipeThrough([function ($command, $next)
{
    return DB::transaction(function () use ($command, $next)
    {
        return $next($command);
    });
}]);
```

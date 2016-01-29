var elixir = require('laravel-elixir');

elixir.config.sourcemaps = false;

elixir(function(mix) {
  mix.sass('app.scss');

  mix.scripts('app.js');

  mix.browserSync({
    notify: false,
    online: false,
    proxy: 'project.app',
  });
});

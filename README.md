[![<CircleCI>](https://circleci.com/gh/Seven-Y-Q-Guo/jsonp.svg?style=svg)](https://app.circleci.com/pipelines/github/Seven-Y-Q-Guo/jsonp)

# [build-your-own] JSONP
Inspired from https://github.com/webmodules/jsonp

## Installation
Install via NPM:

```bash
npm i @amy/jsonp
```

## Usage

```javascript
const jsonp = require("@amy/jsonp"); // or import jsonp from '@amy/jsonp';
jsonp('http://jsfiddle.net/echo/jsonp?name=amy', {
  name: 'hello',
  success: (info) => {
    console.log(info); // {name: 'amy'}
  },
  error: (error) => {
    console.log(error); // handle kinds of errors like timeout, 404, etc.
  }
});
```

## API

### jsonp(url, opts)

- `url` (`String`) url to fetch
- `opts` (`Object`)
  - `success` handle success
  - `error` handle error
  - `param` (`String`) name of the query string parameter to specify
    the callback (defaults to `callback`)
  - `timeout` (`Number`) how long after a timeout error is emitted. `0` or other falsy value to
    disable (defaults to `30000`)
  - `prefix` (`String`) prefix for the global callback functions that
    handle jsonp responses (defaults to `__jp`)
  - `name` (`String`) optional: name of the global callback functions that
    handle jsonp responses, will generate `__jp + incremented` counter if not passing specific name

Returns a function that, when called, will cancel the in-progress jsonp request
(`success` & `error` won't be called any more).

## Want Promise?

### You can implement easily

```javascript
function fetchJson(url, opts = {}) {
  return new Promise((resolve, reject) => {
    jsonp(url, {
      ...opts,
      success: resolve,
      error: reject
    });
  })
}
fetchJson('http://jsfiddle.net/echo/jsonp?name=amy').then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

## License

MIT

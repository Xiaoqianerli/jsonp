(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // jsonp.js
  var require_jsonp = __commonJS({
    "jsonp.js"(exports, module) {
      function jsonp2(url, { name, success, error, timeout = 3e3, parm = "callback" }) {
        const script = document.createElement("script");
        const u = new URL(url);
        const params = new URLSearchParams(u.search);
        params.set(parm, name);
        script.src = u.origin + u.pathname + "?" + params.toString();
        let timer;
        if (timeout) {
          timer = setTimeout(function() {
            clearup();
            error("timeout");
          }, timeout);
        }
        function clearup() {
          window[name] = () => {
          };
          script.remove();
          clearTimeout(timer);
        }
        window[name] = (data) => {
          clearup();
          success(data);
        };
        script.onerror = () => {
          clearup();
          error("Can't get url");
        };
        document.body.append(script);
        return clearup;
      }
      module.exports = jsonp2;
    }
  });

  // example/index.js
  var jsonp = require_jsonp();
  jsonp("http://127.0.0.1:8081/data.js?name=amy", {
    name: "hello",
    success: (info) => {
      console.log(info);
    },
    error: (error) => {
      console.log(error);
    },
    timeout: false
  });
})();

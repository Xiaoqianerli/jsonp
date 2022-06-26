(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // jsonp.js
  var require_jsonp = __commonJS({
    "jsonp.js"(exports, module) {
      var count = 0;
      function jsonp2(url, { name, success, error, timeout = 3e3, param = "callback", prefix }) {
        const script = document.createElement("script");
        const u = new URL(url);
        const params = new URLSearchParams(u.search);
        const id = name || (prefix || "__jp") + count++;
        params.set(param, id);
        script.src = u.origin + u.pathname + "?" + params.toString();
        let timer;
        if (timeout) {
          timer = setTimeout(function() {
            clearup();
            error("timeout");
          }, timeout);
        }
        function clearup() {
          window[id] = () => {
          };
          script.remove();
          clearTimeout(timer);
        }
        window[id] = (data) => {
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

  // test/main.js
  var jsonp = require_jsonp();
  mocha.setup("bdd");
  var obj = {
    name: "amy",
    gender: "female"
  };
  var searchParams = new URLSearchParams(obj);
  var queryString = searchParams.toString();
  describe("jsonp", function() {
    it("basic jsonp", function(done) {
      jsonp(`http://127.0.0.1:8081/data.js?${queryString}`, {
        name: "hello1",
        success: (info) => {
          chai.assert.deepEqual(info, obj);
          done();
        },
        error: (error) => {
        }
      });
    });
    it("404", function(done) {
      jsonp(`http://xxx?${queryString}`, {
        name: "hello2",
        success: (info) => {
        },
        error: (error) => {
          chai.assert.equal(error, "Can't get url");
          done();
        }
      });
    });
    it("timeout", function(done) {
      this.timeout(9e3);
      const obj3 = {
        name: "seven",
        gender: "female",
        delay: 5
      };
      const searchParams3 = new URLSearchParams(obj3);
      const queryString3 = searchParams3.toString();
      jsonp(`http://127.0.0.1:8081/data.js?${queryString3}`, {
        name: "hello3",
        success: (info) => {
        },
        error: (error) => {
          chai.assert.equal(error, "timeout");
          done();
        }
      });
    });
    it("named callback", function() {
      jsonp(`http://127.0.0.1:8081/data.js?${queryString}`, {
        name: "hello4",
        callback: "cb",
        success: (info) => {
          chai.assert.deepEqual(info, obj);
        },
        error: (error) => {
        }
      });
    });
    it("cancel jsonp", function(done) {
      const cancel = jsonp(`http://127.0.0.1:8081/data.js?${queryString}`, {
        name: "hello",
        callback: "cb",
        success: (info) => {
          chai.assert.throws(() => {
          }, "Should no success once cancel");
          done();
        },
        error: (error) => {
          chai.assert.throws(() => {
          }, "Should no error once cancel");
          done();
        }
      });
      cancel();
      chai.assert.equal("cancel", "cancel");
      done();
    });
    it("random name", function(done) {
      const cancel = jsonp(`http://127.0.0.1:8081/data.js?${queryString}`, {
        name: "hello",
        callback: "cb",
        success: (info) => {
          chai.assert.throws(() => {
          }, "Should no success once cancel");
          done();
        },
        error: (error) => {
          chai.assert.throws(() => {
          }, "Should no error once cancel");
          done();
        }
      });
      cancel();
      chai.assert.equal("cancel", "cancel");
      done();
    });
    it("set prefix of name", function(done) {
      const cancel = jsonp(`http://127.0.0.1:8081/data.js?${queryString}`, {
        success: (info) => {
          chai.assert.deepEqual(info, obj);
          done();
        },
        error: (error) => {
        },
        prefix: "amy"
      });
    });
  });
  mocha.run();
})();

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var Vue = window.Vue;
Vue.config.productionTip = false;
new Vue({
  data: {
    n: 0,
    history: [],
    inUndoMode: false
  },
  watch: {
    n: function n(newValue, oldValue) {
      console.log(this.inUndoMode);

      if (!this.inUndoMode) {
        this.history.push({
          from: oldValue,
          to: newValue
        });
      }
    }
  },
  // 不如用 computed 来计算 displayName
  template: "\n      <div>\n        {{n}}\n        <hr />\n        <button @click=\"add1\">+1</button>\n        <button @click=\"add2\">+2</button>\n        <button @click=\"minus1\">-1</button>\n        <button @click=\"minus2\">-2</button>\n        <hr/>\n        <button @click=\"undo\">\u64A4\u9500</button>\n        <hr/>\n  \n        {{history}}\n      </div>\n    ",
  methods: {
    add1: function add1() {
      this.n += 1;
    },
    add2: function add2() {
      this.n += 2;
    },
    minus1: function minus1() {
      this.n -= 1;
    },
    minus2: function minus2() {
      this.n -= 2;
    },
    undo: function undo() {
      var _this = this;

      var last = this.history.pop();
      this.inUndoMode = true;
      console.log("ha" + this.inUndoMode);
      var old = last.from;
      this.n = old; // watch n 的函数会异步调用

      this.$nextTick(function () {
        _this.inUndoMode = false;
      });
    }
  }
}).$mount("#app");
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.86c9e1a4.js.map
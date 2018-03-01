'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localStorage = require('./localStorage');

Object.keys(_localStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _localStorage[key];
    }
  });
});

var _sessionStorage = require('./sessionStorage');

Object.keys(_sessionStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sessionStorage[key];
    }
  });
});

var _webStorage = require('./webStorage');

Object.keys(_webStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _webStorage[key];
    }
  });
});
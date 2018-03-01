'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyStorage = require('./keyStorage');

Object.keys(_keyStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _keyStorage[key];
    }
  });
});

var _storageObserver = require('./storageObserver');

Object.keys(_storageObserver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _storageObserver[key];
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
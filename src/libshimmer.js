var biri = require('biri');
function shimLib (lib) {
  'use strict';

  function onExit () {
    lib.shouldClose.fire(new lib.Error('WINDOW_CLOSING', 'This instance of Window is closing'));
  }
  window.onbeforeunload = onExit;

  var _pid = null;
  function onMac (cb, mac) {
    if (!mac) {
      cb(new lib.Error('NO_BROWSER_ID_TO_SERVE_AS_MAC_ADDRESS', 'Biri Failed'));
      return;
    }
    _pid = mac;
    cb(null, _pid);
  }

  lib.getMac= function (cb) {
    var ret = biri().then(onMac.bind(null, cb));
    cb = null;
    return ret;
  };
  lib.isMac= function (maybemac) {
    return true;
  };
  lib.pid = function () {
    if (typeof chrome !== 'undefined' && lib.defined(chrome.processes)) {
      return chrome.processes.osProcessId;
    }
    if (typeof browser !== 'undefined' && lib.defined(browser.runtime)) {
      return browser.runtime.id;
    }
    return _pid;
  };
  lib.exit = function (code) {
    return window.close();
  }
}
module.exports = shimLib;

function ServiceInterface () {
}

ServiceInterface.prototype.introduceUser = ServiceInterface.prototype.onUserDestroyed = ServiceInterface.prototype.createNewStateFilter = function () {
};

function createExecSuite (execlib) {
  'use strict';
  var lib, Callable, TalkerFactory, ServiceSink, BaseSinkMap;
  lib = execlib.lib;
  lib.arryOperations = require('allex_arrayoperationslowlevellib')(lib.extend, lib.readPropertyFromDotDelimitedString, lib.isFunction, lib.Map, lib.AllexJSONizingError);
  lib.doMethod = function doMethod (method, args, obj){
    if (!obj || !method || !obj[method]) return;
    return obj[method].apply(obj, args);
  }
  Callable = require('allex_callableservercorelib')(lib);
  TalkerFactory = require('allex_transportservercorelib')(lib, window.signalR);
  require('allex_clientcore')(execlib, TalkerFactory);
  execlib.execSuite.Callable = Callable;
  ServiceSink = require('../node_modules/allex_servicepackservercorelib/servicesink')(execlib);
  BaseSinkMap = require('../node_modules/allex_servicepackservercorelib/base/sinkmapcreator')(ServiceSink, execlib);

  execlib.execSuite.ServiceInterface = ServiceInterface;

  execlib.execSuite.registry.registerClientSide('.', BaseSinkMap);
  execlib.execSuite.taskRegistry.register('.',require('../node_modules/allex_servicepackservercorelib/base/taskcreator')(execlib));
  execlib.execSuite.registry.registerClientSide('.authentication',require('../node_modules/allex_servicepackservercorelib/authentication/sinkmapcreator')(execlib, BaseSinkMap));
}

module.exports = createExecSuite;

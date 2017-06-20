function ServiceInterface () {
}

ServiceInterface.prototype.introduceUser = ServiceInterface.prototype.onUserDestroyed = ServiceInterface.prototype.createNewStateFilter = function () {
};

function createExecSuite (execlib) {
  'use strict';
  var lib, Callable, TalkerFactory, SessionIntroductor, servicepacklib;
  lib = execlib.lib;
  lib.arryOperations = require('allex_arrayoperationslowlevellib')(lib.extend, lib.readPropertyFromDotDelimitedString, lib.isFunction, lib.Map, lib.AllexJSONizingError);
  lib.doMethod = function doMethod (method, args, obj){
    if (!obj || !method || !obj[method]) return;
    return obj[method].apply(obj, args);
  }
  Callable = require('allex_callableservercorelib')(lib);
  TalkerFactory = require('allex_transportservercorelib')(lib);
  require('allex_clientcore')(execlib, TalkerFactory);
  execlib.execSuite.Callable = Callable;
  SessionIntroductor = require('allex_sessionintroductorservercorelib')(lib);
  servicepacklib = require('allex_servicepackservercorelib')(execlib, SessionIntroductor);

  TalkerFactory.prototype.HttpTalker.prototype.sendRequest = function(page,obj){
    lib.request(page,{
      params:obj,
      onComplete:this.onRequestDone.bind(this)
    });
  };
  TalkerFactory.prototype.HttpTalker.prototype.onRequestDone = function(response){
    console.log('got response',response);
  };
  execlib.execSuite.ServiceInterface = ServiceInterface;

  console.log(servicepacklib);
  execlib.execSuite.registry.registerClientSide('.', servicepacklib.base.sinkmap(execlib));
  execlib.execSuite.taskRegistry.register('.',servicepacklib.base.tasks(execlib));
  execlib.execSuite.registry.registerClientSide('.authentication',servicepacklib.authentication.sinkmap);
}

module.exports = createExecSuite;

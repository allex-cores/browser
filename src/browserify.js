var lib = require('allexlib');
require('./libshimmer')(lib);
window.ALLEX = {
  lib: lib,
  LOW_LEVEL_LIBS : {},
  WEB_COMPONENTS : {}
};
require('./index.js')(ALLEX);

var log4js = require('log4js');

log4js.configure({
  appenders: { teleTool: { type: 'console'} },
  categories: { default: { appenders: ['teleTool'], level: 'debug' } }
});
var logger = log4js.getLogger('teleTool');
logger.debug("21221122112");
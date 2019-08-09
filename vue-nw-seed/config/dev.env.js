var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  param: 'param --NWJS_EXEC=C:\ABC.exe --APP_PATH=c:\123 --USER_INFO={"staff_code":"CZ123","area_code":"0519","name":"常州电信"} param -key param2'
  })

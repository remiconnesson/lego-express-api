const monModule = require('./module');

console.log('monkey patching...')
monModule.method1 = function(){console.log('première methode MONKEYPATCHED')};

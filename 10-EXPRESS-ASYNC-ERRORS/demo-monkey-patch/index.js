const monModule = require('./module');
require('./monkeypatch');

console.log(monModule);
monModule.method1();
monModule.method2();

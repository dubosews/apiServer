const userData = require('./users');



exports.users = userData;

exports.testMod = () => {
    return 'testMod';
}

exports.testTwo = () => {
    console.log('testTwo log');
}

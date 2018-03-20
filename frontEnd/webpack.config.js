const path = require('path');

let env = process.env.NODE_ENV;

let name  = '';

switch (env) {
    case 'development':
        name = 'dev';
        break;
    default:
        name = 'dist'
}

module.exports = require(path.resolve(__dirname, 'cfg', name));

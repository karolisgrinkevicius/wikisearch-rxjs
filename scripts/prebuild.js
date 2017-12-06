const fse = require('fs-extra');
const { join } = require('path');

fse.removeSync(join(__dirname, '..', 'public'));
fse.mkdirSync(join(__dirname, '..', 'public'));

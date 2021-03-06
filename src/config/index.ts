'use strict';

import * as path from 'path';
import * as config from 'nconf';

config.argv().env();

const appMode = config.get('NODE_ENV') || 'development';

config.file({file: path.join(__dirname, appMode, 'main.json')});
config.add('common', {type: 'file', file: path.join(__dirname, 'common', 'main.json')});

config.set('params', {
  ...require(path.join(__dirname, 'common', 'params')),
  ...require(path.join(__dirname, appMode, 'params'))
});

config.defaults({
  SERVER_PORT: 3001,
  NODE_ENV: 'development'
});

config.required([]);

export default config;

// Version
import packageInfo from '../../package.json';

const env = {
  name: 'Chronos',
  version: packageInfo.version,
  connection: {
    protocol: 'http',
    host: 'localhost',
    port: 3500,
    path: '/'
  }
};

export default env;

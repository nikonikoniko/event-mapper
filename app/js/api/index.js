import jsonApi from './jsonApi';
import sheetsApi from './sheetsApi';

import config from '../../../config';

const apis = {
  jsonApi,
  sheetsApi,
};

export default apis['sheetsApi'](config);

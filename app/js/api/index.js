import jsonApi from './jsonApi';
import sheetsApi from './sheetsApi';

import {apiType, apiConfig} from '../../../env';

const apis = {
  jsonApi,
  sheetsApi,
};

export default apis[apiType](apiConfig);

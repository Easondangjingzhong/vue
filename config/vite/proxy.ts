/**
 * Generate proxy
 */

import {
  API_BASE_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
  API_OTHER_PREFIX,
  API_OTHER_TARGET_URL,
} from '../../config/constant';
import { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

const ret: ProxyTargetList = {
  // dev
  [API_BASE_URL]: {
    target: API_OTHER_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), API_OTHER_PREFIX),
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  },
};

export default ret;

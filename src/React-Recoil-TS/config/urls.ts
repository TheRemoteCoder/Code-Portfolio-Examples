import { getApiUrl, getPublicUrl } from 'helper/urls/env';

/**
 * Centralized management of URL paths or parts.
 * Environment based or hardcoded as needed.
 *
 * API specific
 * - Paths are relative to their base folder defined by environment.
 * - Methods: Query parameters to append to base URL.
 */
const urls: any = {
  base: getPublicUrl() ?? '/',
  api: {
    base: getApiUrl(),
    methods: {
      orders: 'orders',
    },
    data: {
      products: 'data/products.json',
    },
  },
  pages: {
    info: '/info',
    home: '/',
  },
};

export default urls;

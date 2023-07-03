const isDevEnv = document.location.hostname === 'localhost';

/**
 * - environment : Frontend | Value = development|production
 * - request     : Backend  | URL parameters for API interactions (see README)
 * - api.host    : Backend  | API server location for environments
 * - api.routes  : Backend  | GET/POST paths to server (without any slashes)
 * - prefix      : Frontend | Storage identifier to avoid collisions (ideally like in HTML/CSS)
 */
const AppConfig = {
  environment: isDevEnv ? 'development' : 'production',
  request: {
    exampleId: 'XXX',
  },
  api: {
    host: {
      development: 'https://localhost:8080',
      production: 'https://example.com',
    },
    routes: {
      get: {
        content: 'page',
      },
      post: {
        checkQuality: 'quality',
      },
    },
  },
  prefix: 'x',
};

export default AppConfig;

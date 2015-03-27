/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-ink-filepicker',
    environment: environment,
    baseURL: '/ember-ink-filepicker',
    locationType: 'hash',
    filepickerKey: 'AOkSBYOLvTqK3GzWzQMOuz',
    contentSecurityPolicy: {
      "script-src": "'self' http://api.filepicker.io/v1/filepicker.js",
      "img-src": "'self' https://www.filepicker.io/ https://www.filepicker.com/",
      "connect-src": "'self' ws://localhost:35729 ws://0.0.0.0:35729 http://0.0.0.0:4200/csp-report https://www.filepicker.io/",
      "frame-src": "https://dialog.filepicker.io/ https://www.filepicker.io/"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};

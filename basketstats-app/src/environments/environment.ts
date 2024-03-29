// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    url: 'http://localhost:8080/api',
    filesEndpoint: 'http://localhost:8080/api/file'
  },
  auth0: {
    domain: 'basketstats.eu.auth0.com',
    clientId: 'iB3EuDRdj7sB24EySgfnUyJQprr5u7Si',
    redirectUri: 'http://localhost:4200',
    audience: 'http://localhost:8080/api',
    errorPath: '/',
  },
  syncIntervalTime: 10000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

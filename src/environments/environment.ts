// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: {
  production: boolean
  apiEndpoint: string
  lobbySocketUrl: string
  lobbyFileSocketUrl: string
  cookieDomain: string | null
  recaptchaKey: string
  cdnUrl: string
} = {
  production: false,
  apiEndpoint: 'http://localhost:3000',
  lobbySocketUrl: 'http://localhost:3000',
  lobbyFileSocketUrl: 'http://localhost:3000',
  cookieDomain: null,
  recaptchaKey: '6LdBsNQeAAAAACf1hlHZv6h5jv_vnWBuafKzGPpT',
  cdnUrl: 'https://dbg54sbg10ngy.cloudfront.net/',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

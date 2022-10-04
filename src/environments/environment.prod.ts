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
} = {
  production: false,
  apiEndpoint: 'https://api.videogamemusicquiz.com',
  lobbySocketUrl: 'https://api.videogamemusicquiz.com',
  lobbyFileSocketUrl: 'https://api.videogamemusicquiz.com',
  cookieDomain: null,
  recaptchaKey: '6Lc24fYeAAAAALMn6_cL8_aQhqSArgHTtDyfhcVL',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

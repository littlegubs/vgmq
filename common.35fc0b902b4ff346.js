"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[592],{6498:(m,p,n)=>{n.d(p,{I:()=>d});var r=n(8504),a=n(553),o=n(6306),h=n(9212),u=n(9862);let d=(()=>{class s{http;apiEndpoint=a.N.apiEndpoint;constructor(t){this.http=t}search(t,e,i){return this.http.get(`${this.apiEndpoint}/admin/games`,{params:{query:t.query,...t.showDisabled&&{showDisabled:"true"},...t.onlyShowWithoutMusics&&{onlyShowWithoutMusics:"true"},...e&&{skip:e},...i&&{limit:i}}})}importByUrl(t){return this.http.get(`${this.apiEndpoint}/admin/games/import`,{params:{url:t}}).pipe((0,o.K)(e=>(0,r._)(e.error)))}get(t){return this.http.get(`${this.apiEndpoint}/admin/games/${t}`)}uploadMusics(t,e){const i=new FormData;for(const g of e)i.append("files",g);return this.http.post(`${this.apiEndpoint}/admin/games/${t}/musics`,i,{reportProgress:!0,observe:"events"})}saveMusic(t,e){return this.http.patch(`${this.apiEndpoint}/admin/game-to-music/${t}`,e)}deleteGameMusic(t){return this.http.delete(`${this.apiEndpoint}/admin/game-to-music/${t.id}`)}toggleGame(t){return this.http.patch(`${this.apiEndpoint}/admin/games/${t.slug}/toggle`,null).pipe((0,o.K)(e=>(0,r._)(e.error)))}toggleAlternativeName(t){return this.http.patch(`${this.apiEndpoint}/alternative-names/${t.id}/toggle`,null).pipe((0,o.K)(e=>(0,r._)(e.error)))}listen(t){return this.http.get(`${this.apiEndpoint}/admin/game-to-music/${t}/listen`,{responseType:"blob"})}addDerivedGameToMusic(t,e){return this.http.post(`${this.apiEndpoint}/admin/game-to-music/${t}/add-derived`,{gameId:e.id}).pipe((0,o.K)(i=>(0,r._)(i.error)))}createAlbum(t){return this.http.post(`${this.apiEndpoint}/admin/games/${t}/create-album`,null)}generateAlbums(t){return this.http.get(`${this.apiEndpoint}/admin/games/${t}/generate-albums`)}static \u0275fac=function(e){return new(e||s)(h.LFG(u.eN))};static \u0275prov=h.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})()},5438:(m,p,n)=>{n.d(p,{q:()=>d});var r=n(8504),a=n(553),o=n(6306),h=n(9212),u=n(9862);let d=(()=>{class s{http;apiEndpoint=a.N.apiEndpoint;constructor(t){this.http=t}search(t,e,i){return this.http.get(`${this.apiEndpoint}/games`,{params:{query:t.query,sortBy:t.sortBy,...t.myGames&&{filterByUser:"true"},...t.showDisabled&&{showDisabled:"true"},...t.onlyShowWithoutMusics&&{onlyShowWithoutMusics:"true"},...e&&{skip:e},...i&&{limit:i},...t.nsfw&&{nsfw:"true"}}})}importByUrl(t){return this.http.get(`${this.apiEndpoint}/games/import`,{params:{url:t}}).pipe((0,o.K)(e=>(0,r._)(()=>e.error)))}get(t){return this.http.get(`${this.apiEndpoint}/games/${t}`)}addToList(t){return this.http.get(`${this.apiEndpoint}/games/${t}/add`)}removeFromList(t){return this.http.get(`${this.apiEndpoint}/games/${t}/remove`)}getNames(t){return this.http.get(`${this.apiEndpoint}/games/names`,{params:{query:t}})}static \u0275fac=function(e){return new(e||s)(h.LFG(u.eN))};static \u0275prov=h.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})()},7494:(m,p,n)=>{n.d(p,{U:()=>r});var r=function(a){return a.Original="original",a.Reused="reused",a}(r||{})}}]);
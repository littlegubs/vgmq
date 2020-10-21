(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{XYSw:function(t,s,e){"use strict";e.d(s,"c",(function(){return o})),e.d(s,"a",(function(){return c})),e.d(s,"b",(function(){return u}));var i=e("eLK+"),r=e("lA9T"),n=e("x3yr");class a{constructor(t){this.music=new r.b(t.music),this.expectedAnswer=t.expectedAnswer?new n.a(t.expectedAnswer):null,this.startAt=t.startAt}}var o=function(t){return t.Waiting="waiting",t.Playing="playing",t.Loading="loading",t.PlayingMusic="playing_music",t.AnswerReveal="answer_reveal",t}({});class c{constructor(t){var s;this.isWaiting=()=>[o.Waiting.toString(),o.Loading.toString()].includes(this.status),this.isPLaying=()=>[o.AnswerReveal.toString(),o.Playing.toString(),o.PlayingMusic.toString()].includes(this.status),this.name=t.name,this.code=t.code,this.password=t.password,this.hasPassword=t.hasPassword,this.status=t.status,this.countMusics=t.countMusics,this.guessTime=t.guessTime,this.musicNumber=t.musicNumber,this.allowDuplicates=t.allowDuplicates,this.users=null===(s=t.users)||void 0===s?void 0:s.map(t=>new i.a(t)),this.currentMusic=t.currentMusic?new a(t.currentMusic):void 0}}class u{constructor(t){this.role=t.role,this.gameNames=t.gameNames,this.lobby=new c(t.lobby)}}},ZEaD:function(t,s,e){"use strict";e.d(s,"a",(function(){return p}));var i=e("z6cu"),r=e("AytR");class n{constructor(t){var s;this.errors=null===(s=t.errors)||void 0===s?void 0:s.map(t=>new a(t)),this.message=t.message}}class a{constructor(t){this.field=t.field,this.message=t.message}}class o{constructor(t){this.message=t.message}}var c=e("JIr8"),u=e("fXoL"),l=e("tk/3");let p=(()=>{class t{constructor(t){this.http=t,this.apiEndpoint=r.a.apiEndpoint}register(t){return this.http.post(this.apiEndpoint+"/register",t).pipe(Object(c.a)(t=>Object(i.a)(new n(t.error))))}login(t){return this.http.post(this.apiEndpoint+"/login",t).pipe(Object(c.a)(t=>Object(i.a)(new o(t.error))))}limitedAccessAllowed(){return this.http.get(this.apiEndpoint+"/limited-access/allowed")}limitedAccessPassword(t){return this.http.post(this.apiEndpoint+"/limited-access/password",{password:t})}}return t.\u0275fac=function(s){return new(s||t)(u.Sb(l.b))},t.\u0275prov=u.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"eLK+":function(t,s,e){"use strict";e.d(s,"b",(function(){return r})),e.d(s,"a",(function(){return n}));class i{constructor(t){this.username=t.username}}var r=function(t){return t.Host="host",t.Player="player",t.Spectator="spectator",t}({});class n{constructor(t){this.role=t.role,this.answer=t.answer,this.answered=t.answered,this.user=new i(t.user)}}},f7Zi:function(t,s,e){"use strict";e.d(s,"a",(function(){return u}));var i=e("0IaG"),r=e("fXoL"),n=e("wFdA"),a=e("3Pt+"),o=e("bTqV");const c=function(){return{standalone:!0}};let u=(()=>{class t{constructor(t,s,e){this.data=t,this.lobbyHttpService=s,this.dialogRef=e}submit(){this.lobbyHttpService.join(this.data,this.password).subscribe(t=>{this.dialogRef.close(t)},t=>{this.errorMessage=t.error})}}return t.\u0275fac=function(s){return new(s||t)(r.Jb(i.a),r.Jb(n.a),r.Jb(i.g))},t.\u0275cmp=r.Db({type:t,selectors:[["app-lobby-password-dialog"]],decls:14,vars:4,consts:[[3,"ngSubmit"],["mat-dialog-title",""],["mat-dialog-content",""],["type","password",3,"ngModel","ngModelOptions","ngModelChange"],[1,"text-danger"],["mat-button","","mat-dialog-close",""],["type","submit"]],template:function(t,s){1&t&&(r.Ob(0,"form",0),r.Vb("ngSubmit",(function(){return s.submit()})),r.Ob(1,"h1",1),r.yc(2,"Password required"),r.Nb(),r.Ob(3,"div",2),r.Ob(4,"label"),r.yc(5,"Please enter the lobby password"),r.Nb(),r.Ob(6,"input",3),r.Vb("ngModelChange",(function(t){return s.password=t})),r.Nb(),r.Ob(7,"span",4),r.yc(8),r.Nb(),r.Nb(),r.Ob(9,"mat-dialog-actions"),r.Ob(10,"button",5),r.yc(11,"Cancel"),r.Nb(),r.Ob(12,"button",6),r.yc(13,"Enter"),r.Nb(),r.Nb(),r.Nb()),2&t&&(r.zb(6),r.gc("ngModel",s.password)("ngModelOptions",r.ic(3,c)),r.zb(2),r.zc(s.errorMessage))},directives:[a.t,a.n,a.o,i.h,i.e,a.b,a.m,a.p,i.c,o.a,i.d],encapsulation:2}),t})()},lA9T:function(t,s,e){"use strict";e.d(s,"b",(function(){return i})),e.d(s,"a",(function(){return r}));class i{constructor(t){this.id=t.id,this.title=t.title,this.artist=t.artist,t.duration&&(this.duration=t.duration,this.durationDate=new Date(0,0,0,0,0,this.duration)),this.guessAccuracy=t.guessAccuracy,this.playNumber=t.playNumber,this.awsUrl=t.awsUrl}}class r{constructor(t){this.title=t.title,this.artist=t.artist}}},wFdA:function(t,s,e){"use strict";e.d(s,"a",(function(){return l}));var i=e("z6cu"),r=e("AytR"),n=e("lJxs"),a=e("JIr8"),o=e("XYSw"),c=e("fXoL"),u=e("tk/3");let l=(()=>{class t{constructor(t){this.http=t,this.apiEndpoint=r.a.apiEndpoint}list(){return this.http.get(this.apiEndpoint+"/lobbies").pipe(Object(n.a)(t=>t.map(t=>new o.a(t))))}create(t){return this.http.post(this.apiEndpoint+"/lobbies/create",t).pipe(Object(n.a)(t=>new o.a(t)),Object(a.a)(t=>Object(i.a)(t.error)))}update(t,s){return this.http.put(`${this.apiEndpoint}/lobbies/${t}`,s).pipe(Object(n.a)(t=>new o.a(t)),Object(a.a)(t=>Object(i.a)(t.error)))}join(t,s){const e=`${this.apiEndpoint}/lobbies/${t}/join`;let i=this.http.get(e);if(s){const t=new FormData;t.append("password",s),i=this.http.post(e,t)}return i.pipe(Object(n.a)(t=>new o.b(t)))}play(t){return this.http.get(`${this.apiEndpoint}/lobbies/${t}/play`)}answer(t,s){const e=new FormData;return e.append("answer",s),this.http.post(`${this.apiEndpoint}/lobbies/${t}/answer`,e).pipe(Object(a.a)(t=>Object(i.a)(t.error)))}}return t.\u0275fac=function(s){return new(s||t)(c.Sb(u.b))},t.\u0275prov=c.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},x3yr:function(t,s,e){"use strict";e.d(s,"a",(function(){return o})),e.d(s,"b",(function(){return c}));class i{constructor(t){Object.assign(this,t)}}class r{constructor(t){Object.assign(this,t)}}var n=e("lA9T");class a{constructor(t){this.id=t.id,this.music=new n.b(t.music)}}class o{constructor(t){var s,e;this.id=t.id,this.firstReleaseDate=t.firstReleaseDate,this.name=t.name,this.slug=t.slug,this.alternativeNames=null===(s=t.alternativeNames)||void 0===s?void 0:s.map(t=>new r(t)),this.musics=null===(e=t.musics)||void 0===e?void 0:e.map(t=>new a(t)),this.cover=new i(t.cover),this.enabled=t.enabled}}class c{constructor(t){this.errors=[],this.errors=t.errors}}}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{ZEaD:function(r,t,e){"use strict";e.d(t,"a",(function(){return d}));var s=e("z6cu"),n=e("AytR");class o{constructor(r){var t;this.errors=null===(t=r.errors)||void 0===t?void 0:t.map(r=>new i(r))}}class i{constructor(r){this.field=r.field,this.message=r.message}}class c{constructor(r){this.message=r.message}}var a=e("JIr8"),u=e("fXoL"),p=e("tk/3");let d=(()=>{class r{constructor(r){this.http=r,this.apiEndpoint=n.a.apiEndpoint}register(r){return this.http.post(`${this.apiEndpoint}/register`,r).pipe(Object(a.a)(r=>Object(s.a)(new o(r.error))))}login(r){return this.http.post(`${this.apiEndpoint}/login`,r).pipe(Object(a.a)(r=>Object(s.a)(new c(r.error))))}}return r.\u0275fac=function(t){return new(t||r)(u.Ub(p.b))},r.\u0275prov=u.Hb({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},z6cu:function(r,t,e){"use strict";e.d(t,"a",(function(){return n}));var s=e("HDdC");function n(r,t){return new s.a(t?e=>t.schedule(o,0,{error:r,subscriber:e}):t=>t.error(r))}function o({error:r,subscriber:t}){t.error(r)}}}]);
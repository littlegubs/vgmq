(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{lKKO:function(e,t,s){"use strict";s.r(t),s.d(t,"AccountModule",(function(){return O}));var n=s("ofXK"),r=s("nYR2"),i=s("fXoL"),a=s("7dP1"),c=s("z6cu"),o=s("AytR"),d=s("JIr8"),u=s("tk/3");let b=(()=>{class e{constructor(e){this.http=e,this.apiEndpoint=o.a.apiEndpoint}updateGameList(e){return this.http.post(this.apiEndpoint+"/update-game-list",{IGDBUsername:e}).pipe(Object(d.a)(e=>Object(c.a)(e.error)))}}return e.\u0275fac=function(t){return new(t||e)(i.Sb(u.b))},e.\u0275prov=i.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var p=s("3Pt+");function l(e,t){1&e&&(i.Ob(0,"div",7),i.sc(1," Game list successfully updated ! "),i.Nb())}function f(e,t){if(1&e&&(i.Ob(0,"div",8),i.sc(1),i.Nb()),2&e){const e=i.Zb();i.zb(1),i.uc(" ",e.errorMessage," ")}}function h(e,t){1&e&&i.Kb(0,"span",9)}const m=function(e,t){return{"is-invalid":e,"is-valid":t}};let g=(()=>{class e{constructor(e,t){this.authService=e,this.accountHttpService=t,this.IGDBUsername="",this.success=!1,this.loading=!1}ngOnInit(){const e=this.authService.decodeJwt();this.IGDBUsername=e.IGDBUsername}updateGameList(){this.success=!1,this.errorMessage=void 0,this.loading=!0,this.accountHttpService.updateGameList(this.IGDBUsername).pipe(Object(r.a)(()=>this.loading=!1)).subscribe(()=>{this.success=!0},e=>{this.errorMessage=e})}}return e.\u0275fac=function(t){return new(t||e)(i.Jb(a.a),i.Jb(b))},e.\u0275cmp=i.Db({type:e,selectors:[["app-account"]],decls:17,vars:9,consts:[[1,"form-group"],[1,"form-control",3,"ngModel","ngClass","ngModelChange"],["id","emailHelp",1,"form-text","text-muted"],["class","valid-feedback",4,"ngIf"],["class","invalid-feedback",4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"valid-feedback"],[1,"invalid-feedback"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(e,t){1&e&&(i.Ob(0,"div"),i.Ob(1,"h1"),i.sc(2,"Update my game list"),i.Nb(),i.Ob(3,"p"),i.sc(4,"Enter your IGDB username and press the Update button !"),i.Nb(),i.Ob(5,"div",0),i.Ob(6,"input",1),i.Vb("ngModelChange",(function(e){return t.IGDBUsername=e})),i.Nb(),i.Ob(7,"small",2),i.sc(8," take the username shown in the IGDB url (e.g., https://www.igdb.com/users/"),i.Ob(9,"strong"),i.sc(10,"your_username"),i.Nb(),i.sc(11,") "),i.Nb(),i.qc(12,l,2,0,"div",3),i.qc(13,f,2,1,"div",4),i.Ob(14,"button",5),i.Vb("click",(function(){return t.loading||t.updateGameList()})),i.qc(15,h,1,0,"span",6),i.sc(16," Update "),i.Nb(),i.Nb(),i.Nb()),2&e&&(i.zb(6),i.ec("ngModel",t.IGDBUsername)("ngClass",i.ic(6,m,t.errorMessage,t.success)),i.zb(6),i.ec("ngIf",t.success),i.zb(1),i.ec("ngIf",t.errorMessage),i.zb(1),i.ec("disabled",t.loading),i.zb(1),i.ec("ngIf",t.loading))},directives:[p.b,p.k,p.m,n.i,n.k],encapsulation:2}),e})();var v=s("tyNb"),I=s("PCNd");const G=[{path:"",component:g}];let O=(()=>{class e{}return e.\u0275mod=i.Hb({type:e}),e.\u0275inj=i.Gb({factory:function(t){return new(t||e)},providers:[b],imports:[[n.b,v.f.forChild(G),I.a]]}),e})()}}]);
"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[2],{3002:(M,p,l)=>{l.r(p),l.d(p,{LoginModule:()=>Q});var m=l(9808),d=l(1083),u=l(3075),v=l(8746),f=l(2340),e=l(5e3),Z=l(4857),C=l(263),g=l(3290);const T=["recaptcha"];function y(o,s){if(1&o&&(e.TgZ(0,"div",20),e._uU(1),e.qZA()),2&o){const r=e.oxw();e.xp6(1),e.hij(" ",r.formErrorMessage," ")}}function b(o,s){if(1&o&&(e.TgZ(0,"div",21),e._uU(1),e.qZA()),2&o){const r=s.ngIf;e.xp6(1),e.hij(" ",r," ")}}function A(o,s){if(1&o&&(e.TgZ(0,"div",21),e._uU(1),e.qZA()),2&o){const r=s.ngIf;e.xp6(1),e.hij(" ",r," ")}}function L(o,s){1&o&&e._UZ(0,"span",22)}const h=function(o){return{"is-invalid":o}};let U=(()=>{class o{constructor(r,n,t,i){this.fb=r,this.router=n,this.authHttpService=t,this.authService=i,this.loading=!1,this.environment=f.N,this.loginForm=this.fb.group({username:["",u.kI.required.bind(this)],password:["",u.kI.required.bind(this)]})}loginUser(r){this.loading=!0,this.authHttpService.login(this.loginForm.value,r).pipe((0,v.x)(()=>this.loading=!1)).subscribe({next:n=>{null!==n&&(f.N.production||(this.authService.setAccessTokenCookie(n.accessToken),this.authService.setRefreshTokenCookie(n.refreshToken))),this.router.navigate([""])},error:n=>{Array.isArray(n.message)?n.message.map(t=>{if("string"!=typeof t){const i=this.loginForm.get(t.property);null==i||i.markAsTouched(),null==i||i.setErrors({serverError:t.errors})}}):(console.log(n),this.formErrorMessage=n.message),this.recaptchaComponent.reset()}})}}return o.\u0275fac=function(r){return new(r||o)(e.Y36(u.qu),e.Y36(d.F0),e.Y36(Z.C),e.Y36(C.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-login"]],viewQuery:function(r,n){if(1&r&&e.Gf(T,5),2&r){let t;e.iGM(t=e.CRH())&&(n.recaptchaComponent=t.first)}},decls:35,vars:13,consts:[[1,"container"],[1,"h1","font-weight-normal","text-center"],[1,"h4","font-weight-normal","text-center"],[1,"row","align-items-center"],[1,"col-md-6"],[1,"form-login",3,"formGroup","ngSubmit"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],[1,"form-group"],["type","email","formControlName","username","placeholder","username","required","",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","password","formControlName","password","placeholder","Password",1,"form-control",3,"ngClass"],["theme","dark","size","invisible",3,"siteKey","resolved"],["recaptcha",""],[1,"col-md-12","text-center","mt-3"],["type","submit",1,"btn","btn-primary","col-md-6",3,"disabled"],["class","spinner-border spinner-border-sm","type","button","role","status","aria-hidden","true",4,"ngIf"],[1,"col-md-6","text-center"],[1,"orange"],[1,"col-md-12"],["routerLink","/register",1,"btn","btn-primary","col-md-6"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],["type","button","role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"VGMQ"),e.qZA(),e.TgZ(3,"h4",2),e._uU(4,"Video Game Music Quiz"),e.qZA(),e.TgZ(5,"div",3)(6,"div",4)(7,"form",5),e.NdJ("ngSubmit",function(){e.CHM(t);const a=e.MAs(20);return n.loading||a.execute()}),e.YNc(8,y,2,1,"div",6),e.TgZ(9,"div",7)(10,"label"),e._uU(11,"Username"),e.qZA(),e._UZ(12,"input",8),e.YNc(13,b,2,1,"div",9),e.qZA(),e.TgZ(14,"div",7)(15,"label"),e._uU(16,"Password"),e.qZA(),e._UZ(17,"input",10),e.YNc(18,A,2,1,"div",9),e.qZA(),e.TgZ(19,"re-captcha",11,12),e.NdJ("resolved",function(a){return a&&n.loginUser(a)}),e.qZA(),e.TgZ(21,"div",13)(22,"button",14),e.YNc(23,L,1,0,"span",15),e._uU(24," Log in "),e.qZA()()()(),e.TgZ(25,"div",16)(26,"div",7)(27,"label"),e._uU(28,"No "),e.TgZ(29,"span",17),e._uU(30,"account"),e.qZA(),e._uU(31," ?"),e.qZA(),e.TgZ(32,"div",18)(33,"a",19),e._uU(34,"Register now"),e.qZA()()()()()()}if(2&r){let t,i,a,c;e.xp6(7),e.Q6J("formGroup",n.loginForm),e.xp6(1),e.Q6J("ngIf",n.formErrorMessage),e.xp6(4),e.Q6J("ngClass",e.VKq(9,h,(null==(t=n.loginForm.get("username"))?null:t.invalid)&&((null==(t=n.loginForm.get("username"))?null:t.dirty)||(null==(t=n.loginForm.get("username"))?null:t.touched)))),e.xp6(1),e.Q6J("ngIf",null==(i=n.loginForm.get("username"))||null==i.errors?null:i.errors.serverError),e.xp6(4),e.Q6J("ngClass",e.VKq(11,h,(null==(a=n.loginForm.get("password"))?null:a.invalid)&&((null==(a=n.loginForm.get("password"))?null:a.dirty)||(null==(a=n.loginForm.get("password"))?null:a.touched)))),e.xp6(1),e.Q6J("ngIf",null==(c=n.loginForm.get("password"))||null==c.errors?null:c.errors.serverError),e.xp6(1),e.Q6J("siteKey",n.environment.recaptchaKey),e.xp6(3),e.Q6J("disabled",n.loading),e.xp6(1),e.Q6J("ngIf",n.loading)}},directives:[u._Y,u.JL,u.sg,m.O5,u.Fj,u.JJ,u.u,u.Q7,m.mk,g.wT,d.yS],encapsulation:2}),o})();var F=l(3149);const J=[{path:"",component:U}];let Q=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[m.ez,F.m,d.Bz.forChild(J),g.lQ,g.a]]}),o})()}}]);
"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[874],{2874:(H,u,c)=>{c.r(u),c.d(u,{RegisterModule:()=>j});var m=c(9808),l=c(4100),C=c(7288),n=c(3075),f=c(8746),h=c(2340),e=c(5e3),v=c(8966),_=c(4857),p=c(3290);const x=["recaptchaPassword"];function T(r,i){if(1&r&&(e.TgZ(0,"div",12),e._uU(1),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.hij(" ",t.formErrorMessage," ")}}function b(r,i){if(1&r&&(e.ynx(0),e._uU(1),e.BQk()),2&r){const t=i.$implicit;e.xp6(1),e.hij(" ",t," ")}}function w(r,i){if(1&r&&(e.ynx(0),e._uU(1),e.BQk()),2&r){const t=i.$implicit;e.xp6(1),e.hij(" ",t," ")}}function Z(r,i){if(1&r&&(e.TgZ(0,"div",13),e.YNc(1,b,2,1,"ng-container",14),e.YNc(2,w,2,1,"ng-container",14),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.limitedAccessForm.get("password").getError("serverError")),e.xp6(1),e.Q6J("ngForOf",t.limitedAccessError)}}function y(r,i){1&r&&e._UZ(0,"span",15)}const A=function(r){return{"is-invalid":r}};let Q=(()=>{class r{constructor(t,s){this.dialogRef=t,this.authHttpService=s,this.limitedAccessLoading=!1,this.limitedAccessForm=new n.cw({password:new n.NI("",n.kI.required.bind(this))}),this.environment=h.N}testLimitedAccessPassword(t){this.limitedAccessError=void 0,this.formErrorMessage=void 0,this.limitedAccessLoading=!0,this.authHttpService.limitedAccessPassword(this.limitedAccessForm.get("password").value,t).pipe((0,f.x)(()=>this.limitedAccessLoading=!1)).subscribe({next:()=>{this.dialogRef.close(!0)},error:s=>{Array.isArray(s.message)?s.message.map(o=>{if("string"!=typeof o){const a=this.limitedAccessForm.get(o.property);null==a||a.markAsTouched(),null==a||a.setErrors({serverError:o.errors})}}):this.formErrorMessage=s.message,this.recaptchaPasswordComponent.reset()}})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(v.so),e.Y36(_.C))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-limited-access"]],viewQuery:function(t,s){if(1&t&&e.Gf(x,5),2&t){let o;e.iGM(o=e.CRH())&&(s.recaptchaPasswordComponent=o.first)}},decls:17,vars:12,consts:[[1,"col-md-12","mt-5"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"input-group",3,"ngClass"],["type","password","placeholder","Limited password","aria-label","Limited password","aria-describedby","button-addon2","formControlName","password",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["theme","dark","size","invisible",1,"text-center",3,"siteKey","resolved"],["recaptchaPassword",""],[1,"col-md-12","text-center","mt-3"],["type","submit",1,"btn","btn-primary","col-md-6",3,"disabled"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],["routerLink","/login"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],[4,"ngFor","ngForOf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(t,s){if(1&t){const o=e.EpF();e.TgZ(0,"div",0),e.YNc(1,T,2,1,"div",1),e.TgZ(2,"form",2),e.NdJ("ngSubmit",function(){e.CHM(o);const d=e.MAs(9);return s.limitedAccessLoading||d.execute()}),e.TgZ(3,"label"),e._uU(4,"This website is a work in progress, to create an account, please enter the magic password below"),e.qZA(),e.TgZ(5,"div",3),e._UZ(6,"input",4),e.qZA(),e.YNc(7,Z,3,2,"div",5),e.TgZ(8,"re-captcha",6,7),e.NdJ("resolved",function(d){return d&&s.testLimitedAccessPassword(d)}),e.qZA(),e.TgZ(10,"div",8)(11,"button",9),e.YNc(12,y,1,0,"span",10),e._uU(13," Enter "),e.qZA()(),e.TgZ(14,"div",8)(15,"a",11),e._uU(16,"Come back to login"),e.qZA()()()()}2&t&&(e.xp6(1),e.Q6J("ngIf",s.formErrorMessage),e.xp6(1),e.Q6J("formGroup",s.limitedAccessForm),e.xp6(3),e.Q6J("ngClass",e.VKq(8,A,s.limitedAccessForm.get("password").hasError("serverError"))),e.xp6(1),e.Q6J("ngClass",e.VKq(10,A,s.limitedAccessForm.get("password").hasError("serverError"))),e.xp6(1),e.Q6J("ngIf",s.limitedAccessForm.get("password").hasError("serverError")||s.limitedAccessError),e.xp6(1),e.Q6J("siteKey",s.environment.recaptchaKey),e.xp6(3),e.Q6J("disabled",s.limitedAccessLoading),e.xp6(1),e.Q6J("ngIf",s.limitedAccessLoading))},directives:[m.O5,n._Y,n.JL,n.sg,m.mk,n.Fj,n.JJ,n.u,m.sg,p.wT,l.yS],encapsulation:2}),r})();var J=c(2160),k=c(263);const E=["recaptcha"];function L(r,i){if(1&r&&(e.TgZ(0,"div",18),e._uU(1),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.hij(" ",t.formErrorMessage," ")}}function I(r,i){1&r&&(e.ynx(0),e._uU(1," Username should be at least 4 characters long. "),e.BQk())}function U(r,i){if(1&r&&(e.ynx(0),e._uU(1),e.BQk()),2&r){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.username.errors.serverError," ")}}function F(r,i){if(1&r&&(e.TgZ(0,"div",19),e.YNc(1,I,2,0,"ng-container",20),e.YNc(2,U,2,1,"ng-container",20),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.username.errors.minlength),e.xp6(1),e.Q6J("ngIf",t.username.errors.serverError)}}function N(r,i){1&r&&(e.ynx(0),e._uU(1," Please enter a correct email. "),e.BQk())}function R(r,i){if(1&r&&(e.ynx(0),e._uU(1),e.BQk()),2&r){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.email.errors.serverError," ")}}function Y(r,i){if(1&r&&(e.TgZ(0,"div",19),e.YNc(1,N,2,0,"ng-container",20),e.YNc(2,R,2,1,"ng-container",20),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.email.errors.email),e.xp6(1),e.Q6J("ngIf",t.email.errors.serverError)}}function q(r,i){1&r&&(e.ynx(0),e._uU(1," Password should at least have 3 characters. "),e.BQk())}function S(r,i){if(1&r&&(e.ynx(0),e._uU(1),e.BQk()),2&r){const t=e.oxw(2);e.xp6(1),e.hij(" ",t.password.errors.serverError," ")}}function M(r,i){if(1&r&&(e.TgZ(0,"div",19),e.YNc(1,q,2,0,"ng-container",20),e.YNc(2,S,2,1,"ng-container",20),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.password.errors.minlength),e.xp6(1),e.Q6J("ngIf",t.password.errors.serverError)}}function K(r,i){1&r&&e._UZ(0,"span",21)}const g=function(r){return{"is-invalid":r}},P=[{path:"",component:(()=>{class r{constructor(t,s,o,a,d,B){this.fb=t,this.authHttpService=s,this.router=o,this.cookieService=a,this.dialog=d,this.authService=B,this.loading=!1,this.environment=h.N}ngOnInit(){this.signupForm=this.fb.group({username:["",[n.kI.required.bind(this),n.kI.minLength(4)]],email:["",[n.kI.required.bind(this),n.kI.email.bind(this)]],password:["",[n.kI.required.bind(this),n.kI.minLength(3)]]}),this.checkLimitedAccessAllowed()}ngOnDestroy(){this.dialog.closeAll()}registerUser(t){this.loading=!0,this.authHttpService.register(this.signupForm.value,t).pipe((0,f.x)(()=>this.loading=!1)).subscribe({next:s=>{this.signupForm.reset(),this.authService.setAccessTokenCookie(s.accessToken),this.authService.setRefreshTokenCookie(s.refreshToken),this.router.navigate(["/"])},error:s=>{s=s.error,Array.isArray(s.message)?s.message.map(o=>{if("string"!=typeof o){const a=this.signupForm.get(o.property);null==a||a.markAsTouched(),null==a||a.setErrors({serverError:o.errors})}}):this.formErrorMessage=s.message,this.recaptchaComponent.reset()}})}get username(){return this.signupForm.get("username")}get email(){return this.signupForm.get("email")}get password(){return this.signupForm.get("password")}checkLimitedAccessAllowed(){this.authHttpService.limitedAccessAllowed().subscribe(t=>{!1===t&&this.dialog.open(Q,{disableClose:!0}).afterClosed().subscribe(s=>{void 0!==s&&this.checkLimitedAccessAllowed()})})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(n.qu),e.Y36(_.C),e.Y36(l.F0),e.Y36(J.N),e.Y36(v.uw),e.Y36(k.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-register"]],viewQuery:function(t,s){if(1&t&&e.Gf(E,5),2&t){let o;e.iGM(o=e.CRH())&&(s.recaptchaComponent=o.first)}},decls:37,vars:17,consts:[[1,"container"],[1,"form-login",3,"formGroup","ngSubmit"],[1,"h3","mb-3","font-weight-normal","text-center"],[1,"row"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],[1,"col-md-8","offset-md-2"],[1,"form-group"],["type","text","formControlName","username","placeholder","ex : Dark sasuke","required","",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","email","formControlName","email","placeholder","ex : Darksaasuke420@sulfura.com","required","",1,"form-control",3,"ngClass"],["type","password","formControlName","password","placeholder","Password","required","",1,"form-control",3,"ngClass"],["theme","dark","size","invisible",1,"text-center",3,"siteKey","resolved"],["recaptcha",""],[1,"col","text-center"],["type","submit",1,"btn","btn-primary",3,"disabled"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"text-center","mt-3"],["routerLink","/login",1,"btn","btn-primary"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],[4,"ngIf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(t,s){if(1&t){const o=e.EpF();e.TgZ(0,"div",0)(1,"form",1),e.NdJ("ngSubmit",function(){e.CHM(o);const d=e.MAs(27);return s.loading||d.execute()}),e.TgZ(2,"h3",2),e._uU(3,"Inscription"),e.qZA(),e.TgZ(4,"div",3),e.YNc(5,L,2,1,"div",4),e.TgZ(6,"div",5)(7,"div",6)(8,"label"),e._uU(9,"Username"),e.qZA(),e._UZ(10,"input",7),e.YNc(11,F,3,2,"div",8),e.qZA()()(),e.TgZ(12,"div",3)(13,"div",5)(14,"div",6)(15,"label"),e._uU(16,"Email address"),e.qZA(),e._UZ(17,"input",9),e.YNc(18,Y,3,2,"div",8),e.qZA()()(),e.TgZ(19,"div",3)(20,"div",5)(21,"div",6)(22,"label"),e._uU(23,"Password"),e.qZA(),e._UZ(24,"input",10),e.YNc(25,M,3,2,"div",8),e.qZA()()(),e.TgZ(26,"re-captcha",11,12),e.NdJ("resolved",function(d){return d&&s.registerUser(d)}),e.qZA(),e.TgZ(28,"div",3)(29,"div",13)(30,"button",14),e._uU(31," Sign up "),e.YNc(32,K,1,0,"span",15),e.qZA()()()(),e.TgZ(33,"div",16),e._uU(34," Already have an account ? "),e.TgZ(35,"a",17),e._uU(36,"Login"),e.qZA()()()}2&t&&(e.xp6(1),e.Q6J("formGroup",s.signupForm),e.xp6(4),e.Q6J("ngIf",s.formErrorMessage),e.xp6(5),e.Q6J("ngClass",e.VKq(11,g,s.username.invalid&&(s.username.dirty||s.username.touched))),e.xp6(1),e.Q6J("ngIf",s.username.errors),e.xp6(6),e.Q6J("ngClass",e.VKq(13,g,s.email.invalid&&(s.email.dirty||s.email.touched))),e.xp6(1),e.Q6J("ngIf",s.email.errors),e.xp6(6),e.Q6J("ngClass",e.VKq(15,g,s.password.invalid&&(s.password.dirty||s.password.touched))),e.xp6(1),e.Q6J("ngIf",s.password.errors),e.xp6(1),e.Q6J("siteKey",s.environment.recaptchaKey),e.xp6(4),e.Q6J("disabled",s.signupForm.invalid||s.loading),e.xp6(2),e.Q6J("ngIf",s.loading))},directives:[n._Y,n.JL,n.sg,m.O5,n.Fj,n.JJ,n.u,n.Q7,m.mk,p.wT,l.yS],encapsulation:2}),r})()}];let j=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[m.ez,C.m,l.Bz.forChild(P),p.lQ,p.a]]}),r})()}}]);
"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[219],{9219:(M,h,o)=>{o.r(h),o.d(h,{RegisterModule:()=>q});var u=o(6814),d=o(8184),y=o(2132),s=o(6223),v=o(4716),T=o(553),e=o(9212),x=o(4621),Z=o(459),_=o(7700),C=o(304),p=o(2939),g=o(7679);const k=["recaptcha"];function b(t,a){if(1&t&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.hij(" ",r.formErrorMessage," ")}}function Q(t,a){1&t&&(e.ynx(0),e._uU(1," Username should be at least 4 characters long. "),e.BQk())}function I(t,a){if(1&t&&(e.ynx(0),e._uU(1),e.BQk()),2&t){const r=e.oxw(2);e.xp6(),e.hij(" ",r.username.errors.serverError," ")}}function A(t,a){if(1&t&&(e.TgZ(0,"div",18),e.YNc(1,Q,2,0,"ng-container",19)(2,I,2,1,"ng-container",19),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Q6J("ngIf",r.username.errors.minlength),e.xp6(),e.Q6J("ngIf",r.username.errors.serverError)}}function J(t,a){1&t&&(e.ynx(0),e._uU(1," Please enter a correct email. "),e.BQk())}function U(t,a){if(1&t&&(e.ynx(0),e._uU(1),e.BQk()),2&t){const r=e.oxw(2);e.xp6(),e.hij(" ",r.email.errors.serverError," ")}}function Y(t,a){if(1&t&&(e.TgZ(0,"div",18),e.YNc(1,J,2,0,"ng-container",19)(2,U,2,1,"ng-container",19),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Q6J("ngIf",r.email.errors.email),e.xp6(),e.Q6J("ngIf",r.email.errors.serverError)}}function R(t,a){1&t&&(e.ynx(0),e._uU(1," Password should at least have 3 characters. "),e.BQk())}function S(t,a){if(1&t&&(e.ynx(0),e._uU(1),e.BQk()),2&t){const r=e.oxw(2);e.xp6(),e.hij(" ",r.password.errors.serverError," ")}}function w(t,a){if(1&t&&(e.TgZ(0,"div",18),e.YNc(1,R,2,0,"ng-container",19)(2,S,2,1,"ng-container",19),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Q6J("ngIf",r.password.errors.minlength),e.xp6(),e.Q6J("ngIf",r.password.errors.serverError)}}function F(t,a){1&t&&e._UZ(0,"span",20)}const f=t=>({"is-invalid":t});function B(t,a){1&t&&(e.TgZ(0,"div",1)(1,"div",2)(2,"span",3),e._uU(3,"Loading..."),e.qZA()()())}const E=[{path:"",component:(()=>{class t{fb;authHttpService;router;cookieService;dialog;authService;snackBar;signupForm;formErrorMessage;loading=!1;environment=T.N;recaptchaComponent;constructor(r,i,n,c,m,l,P){this.fb=r,this.authHttpService=i,this.router=n,this.cookieService=c,this.dialog=m,this.authService=l,this.snackBar=P}ngOnInit(){this.signupForm=this.fb.group({username:["",[s.kI.required.bind(this),s.kI.minLength(4)]],email:["",[s.kI.required.bind(this),s.kI.email.bind(this)]],password:["",[s.kI.required.bind(this),s.kI.minLength(3)]]})}ngOnDestroy(){this.dialog.closeAll()}registerUser(r){this.loading=!0,this.authHttpService.register(this.signupForm.value,r).pipe((0,v.x)(()=>this.loading=!1)).subscribe({next:()=>{this.signupForm.reset(),this.snackBar.open("Account created! Please check your emails to activate your account",void 0,{horizontalPosition:"end",verticalPosition:"bottom",panelClass:"success",duration:1e4}),this.router.navigate(["/"])},error:i=>{i=i.error,Array.isArray(i.message)?i.message.map(n=>{if("string"!=typeof n){const c=this.signupForm.get(n.property);c?.markAsTouched(),c?.setErrors({serverError:n.errors})}}):this.formErrorMessage=i.message,this.recaptchaComponent.reset()}})}get username(){return this.signupForm.get("username")}get email(){return this.signupForm.get("email")}get password(){return this.signupForm.get("password")}static \u0275fac=function(i){return new(i||t)(e.Y36(s.qu),e.Y36(x.C),e.Y36(d.F0),e.Y36(Z.N),e.Y36(_.uw),e.Y36(C.e),e.Y36(p.ux))};static \u0275cmp=e.Xpm({type:t,selectors:[["app-register"]],viewQuery:function(i,n){if(1&i&&e.Gf(k,5),2&i){let c;e.iGM(c=e.CRH())&&(n.recaptchaComponent=c.first)}},decls:36,vars:17,consts:[[1,"form-login",3,"formGroup","ngSubmit"],[1,"h3","mb-3","font-weight-normal","text-center"],[1,"row"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],[1,"col-md-8","offset-md-2"],[1,"form-group"],["type","text","formControlName","username","placeholder","ex : Dark sasuke","required","",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","email","formControlName","email","placeholder","ex : Darksaasuke420@sulfura.com","required","",1,"form-control",3,"ngClass"],["type","password","formControlName","password","placeholder","Password","required","",1,"form-control",3,"ngClass"],["theme","dark","size","invisible",1,"text-center",3,"siteKey","resolved"],["recaptcha",""],[1,"col","text-center"],["type","submit",1,"btn","btn-primary",3,"disabled"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"text-center","mt-3"],["routerLink","/",1,"btn","btn-primary"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],[4,"ngIf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(i,n){if(1&i){const c=e.EpF();e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){e.CHM(c);const l=e.MAs(26);return e.KtG(n.loading||l.execute())}),e.TgZ(1,"h3",1),e._uU(2,"Inscription"),e.qZA(),e.TgZ(3,"div",2),e.YNc(4,b,2,1,"div",3),e.TgZ(5,"div",4)(6,"div",5)(7,"label"),e._uU(8,"Username"),e.qZA(),e._UZ(9,"input",6),e.YNc(10,A,3,2,"div",7),e.qZA()()(),e.TgZ(11,"div",2)(12,"div",4)(13,"div",5)(14,"label"),e._uU(15,"Email address"),e.qZA(),e._UZ(16,"input",8),e.YNc(17,Y,3,2,"div",7),e.qZA()()(),e.TgZ(18,"div",2)(19,"div",4)(20,"div",5)(21,"label"),e._uU(22,"Password"),e.qZA(),e._UZ(23,"input",9),e.YNc(24,w,3,2,"div",7),e.qZA()()(),e.TgZ(25,"re-captcha",10,11),e.NdJ("resolved",function(l){return l&&n.registerUser(l)}),e.qZA(),e.TgZ(27,"div",2)(28,"div",12)(29,"button",13),e._uU(30," Sign up "),e.YNc(31,F,1,0,"span",14),e.qZA()()()(),e.TgZ(32,"div",15),e._uU(33," Already have an account ? "),e.TgZ(34,"a",16),e._uU(35,"Login"),e.qZA()()}2&i&&(e.Q6J("formGroup",n.signupForm),e.xp6(4),e.Q6J("ngIf",n.formErrorMessage),e.xp6(5),e.Q6J("ngClass",e.VKq(11,f,n.username.invalid&&(n.username.dirty||n.username.touched))),e.xp6(),e.Q6J("ngIf",n.username.errors),e.xp6(6),e.Q6J("ngClass",e.VKq(13,f,n.email.invalid&&(n.email.dirty||n.email.touched))),e.xp6(),e.Q6J("ngIf",n.email.errors),e.xp6(6),e.Q6J("ngClass",e.VKq(15,f,n.password.invalid&&(n.password.dirty||n.password.touched))),e.xp6(),e.Q6J("ngIf",n.password.errors),e.xp6(),e.Q6J("siteKey",n.environment.recaptchaKey),e.xp6(4),e.Q6J("disabled",n.signupForm.invalid||n.loading),e.xp6(2),e.Q6J("ngIf",n.loading))},dependencies:[u.mk,u.O5,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.sg,s.u,d.rH,g.wT],encapsulation:2})}return t})()},{path:":token",component:(()=>{class t{authHttpService;authService;route;router;snackBar;loading=!1;constructor(r,i,n,c,m){this.authHttpService=r,this.authService=i,this.route=n,this.router=c,this.snackBar=m}ngOnInit(){this.loading=!0,this.route.paramMap.subscribe(r=>{this.authHttpService.confirm(r.get("token")).pipe((0,v.x)(()=>this.loading=!1)).subscribe({next:i=>{this.authService.setAccessTokenCookie(i.accessToken),this.authService.setRefreshTokenCookie(i.refreshToken),this.snackBar.open("Account activated!",void 0,{horizontalPosition:"end",verticalPosition:"bottom",panelClass:"success",duration:5e3})},error:i=>{400===i.status&&this.snackBar.open("account already activated",void 0,{horizontalPosition:"end",verticalPosition:"bottom",panelClass:"danger",duration:5e3}),this.router.navigate(["/"])}})})}static \u0275fac=function(i){return new(i||t)(e.Y36(x.C),e.Y36(C.e),e.Y36(d.gz),e.Y36(d.F0),e.Y36(p.ux))};static \u0275cmp=e.Xpm({type:t,selectors:[["app-confirmation"]],decls:1,vars:1,consts:[["class","d-flex justify-content-center",4,"ngIf"],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"]],template:function(i,n){1&i&&e.YNc(0,B,4,0,"div",0),2&i&&e.Q6J("ngIf",n.loading)},dependencies:[u.O5],encapsulation:2})}return t})()}];let q=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=e.oAB({type:t});static \u0275inj=e.cJS({imports:[u.ez,y.m,d.Bz.forChild(E),g.lQ,g.a,p.ZX]})}return t})()}}]);
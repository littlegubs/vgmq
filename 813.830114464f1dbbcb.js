"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[813],{813:(Y,h,l)=>{l.r(h),l.d(h,{ResetPasswordModule:()=>S});var u=l(6814),d=l(2787),C=l(2132),c=l(7679),a=l(6223),g=l(4716),w=l(553),e=l(9212),v=l(4621),b=l(304),f=l(2939);const y=["recaptcha"];function x(s,m){if(1&s&&(e.TgZ(0,"div",11),e._uU(1),e.qZA()),2&s){const n=e.oxw();e.xp6(),e.hij(" ",n.formErrorMessage," ")}}function T(s,m){if(1&s&&(e.TgZ(0,"div",12),e._uU(1),e.qZA()),2&s){const n=m.ngIf;e.xp6(),e.hij(" ",n," ")}}function Z(s,m){1&s&&e._UZ(0,"span",13)}const _=s=>({"is-invalid":s}),P=["recaptcha"];function k(s,m){if(1&s&&(e.TgZ(0,"div",10),e._uU(1),e.qZA()),2&s){const n=e.oxw();e.xp6(),e.hij(" ",n.formErrorMessage," ")}}function J(s,m){if(1&s&&(e.TgZ(0,"div",11),e._uU(1),e.qZA()),2&s){const n=m.ngIf;e.xp6(),e.hij(" ",n," ")}}function E(s,m){1&s&&e._UZ(0,"span",12)}const Q=s=>({"is-invalid":s}),A=[{path:"",component:(()=>{class s{fb;router;authHttpService;authService;snackBar;form;formErrorMessage;loading=!1;environment=w.N;recaptchaComponent;constructor(n,o,t,r,i){this.fb=n,this.router=o,this.authHttpService=t,this.authService=r,this.snackBar=i,this.form=this.fb.group({email:["",a.kI.required.bind(this)]})}submit(n){this.loading=!0,this.authHttpService.requestResetPassword(this.form.value,n).pipe((0,g.x)(()=>this.loading=!1)).subscribe({next:()=>{this.snackBar.open("Email successfully sent",void 0,{horizontalPosition:"end",verticalPosition:"bottom",panelClass:"success",duration:1e4}),this.form.reset(),this.recaptchaComponent.reset()},error:o=>{Array.isArray(o.message)?o.message.map(t=>{if("string"!=typeof t){const r=this.form.get(t.property);r?.markAsTouched(),r?.setErrors({serverError:t.errors})}}):this.formErrorMessage=o.message,this.recaptchaComponent.reset()}})}static \u0275fac=function(o){return new(o||s)(e.Y36(a.qu),e.Y36(d.F0),e.Y36(v.C),e.Y36(b.e),e.Y36(f.ux))};static \u0275cmp=e.Xpm({type:s,selectors:[["app-request-reset-password"]],viewQuery:function(o,t){if(1&o&&e.Gf(y,5),2&o){let r;e.iGM(r=e.CRH())&&(t.recaptchaComponent=r.first)}},decls:14,vars:9,consts:[[1,"tw-flex","tw-items-center","tw-justify-center","tw-flex-col",3,"formGroup","ngSubmit"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],["type","email","formControlName","email","placeholder","Email","required","",1,"form-control","!tw-bg-grey","tw-text-center","tw-w-[300px]","md:tw-w-[400px]","tw-h-[53px]","tw-mt-8","tw-mb-2","tw-rounded-md","placeholder:tw-text-white",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["theme","dark","size","invisible",3,"siteKey","resolved"],["recaptcha",""],[1,"col-md-12","text-center","mt-3"],["type","submit",1,"tw-h-btn","tw-w-[170px]","tw-bg-lime","tw-mt-6","tw-text-black","tw-border-none",3,"disabled"],["class","spinner-border spinner-border-sm","type","button","role","status","aria-hidden","true",4,"ngIf"],[1,"tw-text-sm","!tw-mt-5"],["routerLink","/",1,"tw-font-poppins","tw-text-[#59EE7F]","tw-no-underline"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],["type","button","role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(o,t){if(1&o){const r=e.EpF();e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){e.CHM(r);const p=e.MAs(5);return e.KtG(t.loading||p.execute())}),e.YNc(1,x,2,1,"div",1),e._UZ(2,"input",2),e.YNc(3,T,2,1,"div",3),e.TgZ(4,"re-captcha",4,5),e.NdJ("resolved",function(p){return p&&t.submit(p)}),e.qZA(),e.TgZ(6,"div",6)(7,"button",7),e.YNc(8,Z,1,0,"span",8),e._uU(9," Reset password "),e.qZA()(),e.TgZ(10,"p",9),e._uU(11," Back to login "),e.TgZ(12,"a",10),e._uU(13,"login"),e.qZA()()()}if(2&o){let r,i;e.Q6J("formGroup",t.form),e.xp6(),e.Q6J("ngIf",t.formErrorMessage),e.xp6(),e.Q6J("ngClass",e.VKq(7,_,(null==(r=t.form.get("email"))?null:r.invalid)&&((null==(r=t.form.get("email"))?null:r.dirty)||(null==(r=t.form.get("email"))?null:r.touched)))),e.xp6(),e.Q6J("ngIf",null==(i=t.form.get("email"))||null==i.errors?null:i.errors.serverError),e.xp6(),e.Q6J("siteKey",t.environment.recaptchaKey),e.xp6(3),e.Q6J("disabled",t.loading),e.xp6(),e.Q6J("ngIf",t.loading)}},dependencies:[u.mk,u.O5,a._Y,a.Fj,a.JJ,a.JL,a.Q7,a.sg,a.u,d.rH,c.wT],encapsulation:2})}return s})()},{path:":token",component:(()=>{class s{fb;router;authHttpService;authService;snackBar;route;form;formErrorMessage;loading=!1;environment=w.N;recaptchaComponent;constructor(n,o,t,r,i,p){this.fb=n,this.router=o,this.authHttpService=t,this.authService=r,this.snackBar=i,this.route=p,this.form=this.fb.group({password:["",a.kI.required.bind(this)]})}submit(n){this.loading=!0,this.route.paramMap.subscribe(o=>{this.authHttpService.resetPassword(this.form.value,o.get("token"),n).pipe((0,g.x)(()=>this.loading=!1)).subscribe({next:t=>{this.authService.setAccessTokenCookie(t.accessToken),this.authService.setRefreshTokenCookie(t.refreshToken),this.snackBar.open("Password successfully updated!",void 0,{horizontalPosition:"end",verticalPosition:"bottom",panelClass:"success",duration:5e3}),this.router.navigate(["/"])},error:t=>{Array.isArray(t.message)?t.message.map(r=>{if("string"!=typeof r){const i=this.form.get(r.property);i?.markAsTouched(),i?.setErrors({serverError:r.errors})}}):this.formErrorMessage=t.message,this.recaptchaComponent.reset()}})})}static \u0275fac=function(o){return new(o||s)(e.Y36(a.qu),e.Y36(d.F0),e.Y36(v.C),e.Y36(b.e),e.Y36(f.ux),e.Y36(d.gz))};static \u0275cmp=e.Xpm({type:s,selectors:[["app-reset-password"]],viewQuery:function(o,t){if(1&o&&e.Gf(P,5),2&o){let r;e.iGM(r=e.CRH())&&(t.recaptchaComponent=r.first)}},decls:13,vars:9,consts:[[1,"tw-flex","tw-items-center","tw-justify-center","tw-flex-col",3,"formGroup","ngSubmit"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],["type","password","formControlName","password","placeholder","New Password","required","",1,"form-control","!tw-bg-grey","tw-text-center","tw-w-[300px]","md:tw-w-[400px]","tw-h-[53px]","tw-mt-8","tw-mb-2","tw-rounded-md","placeholder:tw-text-white",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["theme","dark","size","invisible",3,"siteKey","resolved"],["recaptcha",""],["type","submit",1,"tw-h-btn","tw-w-[175px]","tw-bg-lime","tw-mt-6","tw-text-black","tw-border-none",3,"disabled"],["class","spinner-border spinner-border-sm","type","button","role","status","aria-hidden","true",4,"ngIf"],[1,"tw-text-sm","tw-text-white","!tw-mt-5"],["routerLink","/",1,"tw-font-poppins","tw-text-[#59EE7F]","tw-no-underline"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],["type","button","role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(o,t){if(1&o){const r=e.EpF();e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){e.CHM(r);const p=e.MAs(5);return e.KtG(t.loading||p.execute())}),e.YNc(1,k,2,1,"div",1),e._UZ(2,"input",2),e.YNc(3,J,2,1,"div",3),e.TgZ(4,"re-captcha",4,5),e.NdJ("resolved",function(p){return p&&t.submit(p)}),e.qZA(),e.TgZ(6,"button",6),e.YNc(7,E,1,0,"span",7),e._uU(8," Update password "),e.qZA(),e.TgZ(9,"p",8),e._uU(10," Back to login "),e.TgZ(11,"a",9),e._uU(12,"login"),e.qZA()()()}if(2&o){let r,i;e.Q6J("formGroup",t.form),e.xp6(),e.Q6J("ngIf",t.formErrorMessage),e.xp6(),e.Q6J("ngClass",e.VKq(7,Q,(null==(r=t.form.get("password"))?null:r.invalid)&&((null==(r=t.form.get("password"))?null:r.dirty)||(null==(r=t.form.get("password"))?null:r.touched)))),e.xp6(),e.Q6J("ngIf",null==(i=t.form.get("password"))||null==i.errors?null:i.errors.serverError),e.xp6(),e.Q6J("siteKey",t.environment.recaptchaKey),e.xp6(2),e.Q6J("disabled",t.loading),e.xp6(),e.Q6J("ngIf",t.loading)}},dependencies:[u.mk,u.O5,a._Y,a.Fj,a.JJ,a.JL,a.Q7,a.sg,a.u,d.rH,c.wT],encapsulation:2})}return s})()}];let S=(()=>{class s{static \u0275fac=function(o){return new(o||s)};static \u0275mod=e.oAB({type:s});static \u0275inj=e.cJS({imports:[u.ez,C.m,d.Bz.forChild(A),c.lQ,c.a,f.ZX]})}return s})()}}]);
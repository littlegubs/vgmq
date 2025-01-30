"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[816],{2816:(E,m,a)=>{a.r(m),a.d(m,{ProfileModule:()=>K});var u=a(6814),o=a(6223),e=a(9212),f=a(7700),_=a(553),x=a(9862);let g=(()=>{class t{http;apiEndpoint=_.N.apiEndpoint;constructor(r){this.http=r}getCurrentUser(){return this.http.get(`${this.apiEndpoint}/users/current`)}updatePassword(r,s){return this.http.post(`${this.apiEndpoint}/users/password/update`,{password:r,newPassword:s})}updateUsername(r){return this.http.post(`${this.apiEndpoint}/users/username/update`,{username:r})}deleteUser(){return this.http.delete(`${this.apiEndpoint}/users`)}static \u0275fac=function(s){return new(s||t)(e.LFG(x.eN))};static \u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var w=a(304);function v(t,i){if(1&t&&(e.TgZ(0,"p",7),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Oqu(r.errorMessage)}}let b=(()=>{class t{dialogRef;profileHttpService;authService;errorMessage;constructor(r,s,n){this.dialogRef=r,this.profileHttpService=s,this.authService=n}submit(){this.profileHttpService.deleteUser().subscribe({next:()=>{this.dialogRef.close(),this.authService.logout()},error:({error:r})=>{this.errorMessage=r.message}})}close(){this.dialogRef.close()}static \u0275fac=function(s){return new(s||t)(e.Y36(f.so),e.Y36(g),e.Y36(w.e))};static \u0275cmp=e.Xpm({type:t,selectors:[["app-confirm-delete-dialog"]],decls:11,vars:1,consts:[[1,"tw-flex","tw-flex-col","tw-items-center","!tw-bg-grey"],[1,"!tw-mb-6","!tw-mt-2","tw-text-white","!tw-font-fastup","!tw-text-5xl","tw-text-center","tw-px-6"],[1,"tw-text-center","tw-font-bold"],[1,"tw-flex","tw-justify-center","tw-pb-4"],[1,"btn","tw-bg-red","tw-border-none","tw-text-white","hover:tw-border-solid","hover:tw-border-red",3,"click"],[1,"tw-ml-4","btn","btn-outline-primary",3,"click"],["class","text-danger tw-text-center",4,"ngIf"],[1,"text-danger","tw-text-center"]],template:function(s,n){1&s&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2," Confirm Delete account "),e.qZA(),e.TgZ(3,"p",2),e._uU(4,"This action is irreversible, are you sure ?"),e.qZA(),e.TgZ(5,"div",3)(6,"button",4),e.NdJ("click",function(){return n.submit()}),e._uU(7," Delete "),e.qZA(),e.TgZ(8,"button",5),e.NdJ("click",function(){return n.close()}),e._uU(9,"Cancel"),e.qZA()(),e.YNc(10,v,2,1,"p",6),e.qZA()),2&s&&(e.xp6(10),e.Q6J("ngIf",n.errorMessage))},dependencies:[u.O5],encapsulation:2})}return t})();var p=a(4716),P=a(810),d=a(3305);function Z(t,i){if(1&t&&(e.TgZ(0,"span",26),e._uU(1),e.qZA()),2&t){const r=i.$implicit;e.xp6(),e.Oqu(r)}}function U(t,i){if(1&t&&(e.TgZ(0,"p"),e._uU(1," You unlocked benefits from these tiers: "),e.SjG(2,Z,2,1,"span",27,e.x6l),e.qZA()),2&t){const r=e.oxw(2);e.xp6(2),e.wJu(r.user.entitledTiers)}}function T(t,i){1&t&&(e.TgZ(0,"p"),e._uU(1,"You haven't pledge to any tier"),e.qZA())}function y(t,i){1&t&&e._UZ(0,"span",28)}function A(t,i){1&t&&e._UZ(0,"span",28)}const h=t=>({disabled:t});function q(t,i){if(1&t){const r=e.EpF();e.TgZ(0,"p"),e._uU(1,"Account linked with your Patreon account!"),e.qZA(),e.YNc(2,U,4,0,"p")(3,T,2,0),e.TgZ(4,"div",24)(5,"button",25),e.NdJ("click",function(){e.CHM(r);const n=e.oxw();return e.KtG(!n.loadingUnlinkPatreon&&n.unlinkPatreon())}),e._uU(6," Unlink account "),e.YNc(7,y,1,0,"span",17),e.qZA(),e.TgZ(8,"button",25),e.NdJ("click",function(){e.CHM(r);const n=e.oxw();return e.KtG(!n.loadingRefreshPatreon&&n.refreshPatreon())}),e._uU(9," Refresh data "),e.YNc(10,A,1,0,"span",17),e.qZA()()}if(2&t){const r=e.oxw();e.xp6(2),e.um2(2,(null==r.user?null:r.user.entitledTiers.length)>0?2:3),e.xp6(3),e.Q6J("ngClass",e.VKq(5,h,r.loadingUnlinkPatreon)),e.xp6(2),e.Q6J("ngIf",r.loadingUnlinkPatreon),e.xp6(),e.Q6J("ngClass",e.VKq(7,h,r.loadingRefreshPatreon)),e.xp6(2),e.Q6J("ngIf",r.loadingRefreshPatreon)}}function F(t,i){if(1&t){const r=e.EpF();e.TgZ(0,"p"),e._uU(1,"Connect your account with Patreon to retrieve your benefits!"),e.qZA(),e.TgZ(2,"div",29)(3,"button",30),e.NdJ("click",function(){e.CHM(r);const n=e.oxw();return e.KtG(n.patreonOAuth())}),e._uU(4,"Connect"),e.qZA()()}}function N(t,i){if(1&t&&(e.TgZ(0,"p",31),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Oqu(r.errorMessage)}}function k(t,i){if(1&t&&(e.TgZ(0,"p",32),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Oqu(r.successMessage)}}function M(t,i){1&t&&e._UZ(0,"span",28)}function I(t,i){1&t&&(e.TgZ(0,"p",33),e._uU(1,"Passwords not match"),e.qZA())}function J(t,i){if(1&t&&(e.TgZ(0,"p",31),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Oqu(r.errorMessage)}}function S(t,i){if(1&t&&(e.TgZ(0,"p",32),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(),e.Oqu(r.successMessage)}}function Y(t,i){1&t&&e._UZ(0,"span",28)}function Q(t,i){1&t&&e._UZ(0,"span",28)}const c=t=>({"is-invalid":t});let D=(()=>{class t{dialog;profileHttpService;oauthHttpService;authService;user;userSub;loading=!1;errorMessage;successMessage;passwordForm=new o.cw({currentPassword:new o.NI("",o.kI.required.bind(this)),newPassword:new o.NI("",[o.kI.required.bind(this),o.kI.minLength(3)]),confirmNewPassword:new o.NI("",[o.kI.required.bind(this),o.kI.minLength(3)])},{validators:t=>{const i=t.get("newPassword"),r=t.get("confirmNewPassword");return i&&r&&i.value!==r.value?{passwordMismatch:!0}:null}});usernameForm=new o.cw({username:new o.NI("",[o.kI.required.bind(this),o.kI.minLength(4)])});loadingUnlinkPatreon=!1;loadingRefreshPatreon=!1;constructor(r,s,n,l){this.dialog=r,this.profileHttpService=s,this.oauthHttpService=n,this.authService=l}ngOnInit(){this.userSub=this.getCurrentUser()}getCurrentUser(){return this.profileHttpService.getCurrentUser().subscribe(r=>{this.user=r})}submitUpdatePassword(){this.errorMessage=void 0,this.successMessage=void 0,this.loading=!0;const r=this.passwordForm.value;this.profileHttpService.updatePassword(r.currentPassword,r.newPassword).pipe((0,p.x)(()=>{this.loading=!1,this.passwordForm.reset()})).subscribe({next:()=>{this.successMessage="Password changed successfully"},error:({error:s})=>{this.errorMessage=s.message}})}submitUpdateUsername(){this.errorMessage=void 0,this.successMessage=void 0,this.loading=!0,this.profileHttpService.updateUsername(this.usernameForm.value.username).pipe((0,p.x)(()=>{this.loading=!1,this.usernameForm.reset()})).subscribe({next:s=>{this.successMessage="Username changed successfully",this.authService.setAccessTokenCookie(s.accessToken),this.authService.setRefreshTokenCookie(s.refreshToken),this.getCurrentUser()},error:({error:s})=>{this.errorMessage=s.message}})}openDeleteDialog(){this.dialog.open(b)}ngOnDestroy(){this.userSub.unsubscribe()}patreonOAuth(){window.open(`https://www.patreon.com/oauth2/authorize?response_type=code&client_id=nfItBwy3Cx9lObjpVyANkAgm3Z6GFHHoBOGIg_cCJY4lI-Xqwx6rdmKKKozBxSx9&redirect_uri=${window.location.origin}/oauth/patreon`,"_self")}refreshPatreon(){this.loadingRefreshPatreon=!0,this.oauthHttpService.refreshPatreon().subscribe(()=>{this.profileHttpService.getCurrentUser().pipe((0,p.x)(()=>this.loadingRefreshPatreon=!1)).subscribe(r=>{this.user=r})})}unlinkPatreon(){this.loadingUnlinkPatreon=!0,this.oauthHttpService.unlinkPatreon().pipe((0,p.x)(()=>this.loadingUnlinkPatreon=!1)).subscribe(()=>{this.user.patreonAccount=null})}static \u0275fac=function(s){return new(s||t)(e.Y36(f.uw),e.Y36(g),e.Y36(P.U),e.Y36(w.e))};static \u0275cmp=e.Xpm({type:t,selectors:[["app-profile"]],decls:67,vars:32,consts:[[1,"tw-flex","tw-flex-col","md:tw-flex-row","tw-w-full","md:tw-justify-center","tw-items-center","tw-gap-4"],[1,"tw-flex","tw-flex-col","tw-flex-1"],[1,"tw-text-center","!tw-text-2xl","!tw-font-fastup"],[1,"tw-font-bold"],[1,"tw-my-4"],[1,"bg-dark","tw-mt-2","tw-rounded-3xl"],[1,"tw-p-4"],[1,"tw-my-2"],["height","24px","width","24px","src","assets/svg/PATREON_SYMBOL_1_WHITE_RGB.svg"],["height","24px","src","assets/svg/PATREON_WORDMARK_1_WHITE_RGB.svg",1,"tw-ms-[12px]"],[1,"!tw-bg-newBlack"],[1,"tw-flex","tw-flex-col","tw-items-center"],[1,"tw-w-3/4",3,"formGroup","ngSubmit"],["type","text","required","","formControlName","username",1,"form-control","!tw-bg-grey","tw-rounded-md","placeholder:tw-text-light-grey","tw-mt-2",3,"placeholder","ngClass"],["class","!tw-my-4 text-danger tw-text-center",4,"ngIf"],["class","!tw-my-4 text-success tw-text-center",4,"ngIf"],["type","submit",1,"btn","btn-outline-primary",3,"disabled"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],["type","password","required","","formControlName","currentPassword","placeholder","Current Password",1,"form-control","!tw-bg-grey","tw-rounded-md","placeholder:tw-text-light-grey","tw-mt-2",3,"ngClass"],["type","password","required","","formControlName","newPassword","placeholder","New Password",1,"form-control","!tw-bg-grey","tw-rounded-md","placeholder:tw-text-light-grey","tw-my-4",3,"ngClass"],["type","password","required","","formControlName","confirmNewPassword","placeholder","Confirm new password",1,"form-control","!tw-bg-grey","tw-rounded-md","placeholder:tw-text-light-grey",3,"ngClass"],["class","!tw-my-4",4,"ngIf"],[1,"tw-flex","tw-justify-center","tw-mt-2"],[1,"btn","tw-bg-red","tw-border-none","tw-text-white","hover:tw-border-solid","hover:tw-border-red",3,"click"],[1,"tw-flex","tw-justify-center","tw-gap-4"],[1,"btn","btn-sm","btn-primary",3,"ngClass","click"],[1,"text-primary"],["class","text-primary"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"],[1,"tw-flex","tw-justify-center"],[1,"btn","btn-sm","btn-primary","tw-my-2",3,"click"],[1,"!tw-my-4","text-danger","tw-text-center"],[1,"!tw-my-4","text-success","tw-text-center"],[1,"!tw-my-4"]],template:function(s,n){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h4",2),e._uU(3,"Personal Informations"),e.qZA(),e.TgZ(4,"div")(5,"span",3),e._uU(6,"Username:"),e.qZA(),e._uU(7),e.qZA(),e.TgZ(8,"div",4)(9,"span",3),e._uU(10,"Email:"),e.qZA(),e._uU(11),e.qZA(),e.TgZ(12,"div")(13,"span",3),e._uU(14,"Member since:"),e.qZA(),e._uU(15),e.ALo(16,"date"),e.qZA(),e.TgZ(17,"div",5)(18,"div",6)(19,"div",7),e._UZ(20,"img",8)(21,"img",9),e.qZA(),e.YNc(22,q,11,9)(23,F,5,0),e.qZA()()(),e.TgZ(24,"div",1)(25,"h4",2),e._uU(26,"Settings"),e.qZA(),e.TgZ(27,"mat-accordion")(28,"mat-expansion-panel",10)(29,"mat-expansion-panel-header")(30,"mat-panel-title"),e._uU(31,"Update Username"),e.qZA()(),e.TgZ(32,"div",11)(33,"form",12),e.NdJ("ngSubmit",function(){return n.submitUpdateUsername()}),e._UZ(34,"input",13),e.TgZ(35,"div",11),e.YNc(36,N,2,1,"p",14)(37,k,2,1,"p",15),e.TgZ(38,"div",4)(39,"button",16),e._uU(40," Update"),e.YNc(41,M,1,0,"span",17),e.qZA()()()()()(),e.TgZ(42,"mat-expansion-panel",10)(43,"mat-expansion-panel-header")(44,"mat-panel-title"),e._uU(45,"Update Password"),e.qZA()(),e.TgZ(46,"div",11)(47,"form",12),e.NdJ("ngSubmit",function(){return n.submitUpdatePassword()}),e._UZ(48,"input",18)(49,"input",19)(50,"input",20),e.TgZ(51,"div",11),e.YNc(52,I,2,0,"p",21)(53,J,2,1,"p",14)(54,S,2,1,"p",15),e.TgZ(55,"div",4)(56,"button",16),e._uU(57," Update"),e.YNc(58,Y,1,0,"span",17),e.qZA()()()()()(),e.TgZ(59,"mat-expansion-panel",10)(60,"mat-expansion-panel-header")(61,"mat-panel-title"),e._uU(62,"Delete Account"),e.qZA()(),e.TgZ(63,"div",22)(64,"button",23),e.NdJ("click",function(){return n.openDeleteDialog()}),e._uU(65," Delete my account"),e.YNc(66,Q,1,0,"span",17),e.qZA()()()()()()),2&s&&(e.xp6(7),e.hij(" ",null==n.user?null:n.user.username,""),e.xp6(4),e.hij(" ",null==n.user?null:n.user.email,""),e.xp6(4),e.hij(" ",e.xi3(16,21,null==n.user?null:n.user.createdAt,"MM-dd-YYYY"),""),e.xp6(7),e.um2(22,null!=n.user&&n.user.patreonAccount?22:23),e.xp6(11),e.Q6J("formGroup",n.usernameForm),e.xp6(),e.Q6J("placeholder",null==n.user?null:n.user.username)("ngClass",e.VKq(24,c,n.usernameForm.get("username")&&n.usernameForm.get("username").invalid&&(n.usernameForm.get("username").dirty||n.usernameForm.get("username").touched))),e.xp6(2),e.Q6J("ngIf",n.errorMessage),e.xp6(),e.Q6J("ngIf",n.successMessage),e.xp6(2),e.Q6J("disabled",n.usernameForm.invalid||(null==n.usernameForm.errors?null:n.usernameForm.errors.passwordMismatch)),e.xp6(2),e.Q6J("ngIf",n.loading),e.xp6(6),e.Q6J("formGroup",n.passwordForm),e.xp6(),e.Q6J("ngClass",e.VKq(26,c,n.passwordForm.get("currentPassword")&&n.passwordForm.get("currentPassword").invalid&&(n.passwordForm.get("currentPassword").dirty||n.passwordForm.get("currentPassword").touched))),e.xp6(),e.Q6J("ngClass",e.VKq(28,c,n.passwordForm.get("newPassword")&&n.passwordForm.get("newPassword").invalid&&(n.passwordForm.get("newPassword").dirty||n.passwordForm.get("newPassword").touched))),e.xp6(),e.Q6J("ngClass",e.VKq(30,c,n.passwordForm.get("confirmNewPassword")&&n.passwordForm.get("confirmNewPassword").invalid&&(n.passwordForm.get("confirmNewPassword").dirty||n.passwordForm.get("confirmNewPassword").touched))),e.xp6(2),e.Q6J("ngIf",null==n.passwordForm.errors?null:n.passwordForm.errors.passwordMismatch),e.xp6(),e.Q6J("ngIf",n.errorMessage),e.xp6(),e.Q6J("ngIf",n.successMessage),e.xp6(2),e.Q6J("disabled",n.passwordForm.invalid||(null==n.passwordForm.errors?null:n.passwordForm.errors.passwordMismatch)),e.xp6(2),e.Q6J("ngIf",n.loading),e.xp6(8),e.Q6J("ngIf",n.loading))},dependencies:[u.mk,u.O5,d.pp,d.ib,d.yz,d.yK,o._Y,o.Fj,o.JJ,o.JL,o.Q7,o.sg,o.u,u.uU],encapsulation:2})}return t})();var H=a(2787),O=a(2132);const R=[{path:"",component:D}];let K=(()=>{class t{static \u0275fac=function(s){return new(s||t)};static \u0275mod=e.oAB({type:t});static \u0275inj=e.cJS({imports:[u.ez,H.Bz.forChild(R),O.m]})}return t})()}}]);
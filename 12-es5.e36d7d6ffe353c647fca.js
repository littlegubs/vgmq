function _classCallCheck(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(r,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(r,i.key,i)}}function _createClass(r,e,n){return e&&_defineProperties(r.prototype,e),n&&_defineProperties(r,n),r}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{CebT:function(r,e,n){"use strict";n.r(e),n.d(e,"RegisterModule",(function(){return k}));var i=n("ofXK"),s=n("tyNb"),a=n("PCNd"),t=n("3Pt+"),o=n("nYR2"),c=n("fXoL"),b=n("ZEaD");function l(r,e){if(1&r&&(c.Ob(0,"div",16),c.sc(1),c.Nb()),2&r){var n=c.Zb();c.zb(1),c.uc(" ",n.formErrorMessage," ")}}function u(r,e){1&r&&(c.Mb(0),c.sc(1," Username should be at least 4 characters long. "),c.Lb())}function d(r,e){if(1&r&&(c.Mb(0),c.sc(1),c.Lb()),2&r){var n=c.Zb(2);c.zb(1),c.uc(" ",n.username.errors.apiError," ")}}function f(r,e){if(1&r&&(c.Ob(0,"div",17),c.qc(1,u,2,0,"ng-container",18),c.qc(2,d,2,1,"ng-container",18),c.Nb()),2&r){var n=c.Zb();c.zb(1),c.ec("ngIf",n.username.errors.minlength),c.zb(1),c.ec("ngIf",n.username.errors.apiError)}}function p(r,e){1&r&&(c.Mb(0),c.sc(1," Please enter a correct email. "),c.Lb())}function m(r,e){if(1&r&&(c.Mb(0),c.sc(1),c.Lb()),2&r){var n=c.Zb(2);c.zb(1),c.uc(" ",n.email.errors.apiError," ")}}function g(r,e){if(1&r&&(c.Ob(0,"div",17),c.qc(1,p,2,0,"ng-container",18),c.qc(2,m,2,1,"ng-container",18),c.Nb()),2&r){var n=c.Zb();c.zb(1),c.ec("ngIf",n.email.errors.email),c.zb(1),c.ec("ngIf",n.email.errors.apiError)}}function h(r,e){1&r&&(c.Mb(0),c.sc(1," Password should at least have 8 characters. "),c.Lb())}function v(r,e){if(1&r&&(c.Mb(0),c.sc(1),c.Lb()),2&r){var n=c.Zb(2);c.zb(1),c.uc(" ",n.password.errors.apiError," ")}}function N(r,e){if(1&r&&(c.Ob(0,"div",17),c.qc(1,h,2,0,"ng-container",18),c.qc(2,v,2,1,"ng-container",18),c.Nb()),2&r){var n=c.Zb();c.zb(1),c.ec("ngIf",n.password.errors.minlength),c.zb(1),c.ec("ngIf",n.password.errors.apiError)}}function w(r,e){1&r&&c.Kb(0,"span",19)}var O,y,C=function(r){return{"is-invalid":r}},z=[{path:"",component:(O=function(){function r(e,n,i){_classCallCheck(this,r),this.fb=e,this.authHttpService=n,this.router=i,this.loading=!1,this.signupForm=this.fb.group({username:["",[t.p.required.bind(this),t.p.minLength(4)]],email:["",[t.p.required.bind(this),t.p.email.bind(this)]],password:["",[t.p.required.bind(this),t.p.minLength(8)]]})}return _createClass(r,[{key:"registerUser",value:function(){var r=this;this.loading=!0,this.authHttpService.register(this.signupForm.value).pipe(Object(o.a)((function(){return r.loading=!1}))).subscribe((function(){r.signupForm.reset(),r.router.navigate([""])}),(function(e){var n;null===(n=e.errors)||void 0===n||n.forEach((function(e){r.signupForm.get(e.field).setErrors({apiError:e.message})})),r.formErrorMessage=e.message}))}},{key:"username",get:function(){return this.signupForm.get("username")}},{key:"email",get:function(){return this.signupForm.get("email")}},{key:"password",get:function(){return this.signupForm.get("password")}}]),r}(),O.\u0275fac=function(r){return new(r||O)(c.Jb(t.c),c.Jb(b.a),c.Jb(s.b))},O.\u0275cmp=c.Db({type:O,selectors:[["app-register"]],decls:35,vars:16,consts:[[1,"container"],[1,"form-login",3,"formGroup","ngSubmit"],[1,"h3","mb-3","font-weight-normal","text-center"],[1,"row"],["class","col-md-12 alert alert-danger","role","alert",4,"ngIf"],[1,"col-md-8","offset-md-2"],[1,"form-group"],["type","text","formControlName","username","placeholder","ex : Dark sasuke","required","",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["type","email","formControlName","email","placeholder","ex : Darksaasuke420@sulfura.com","required","",1,"form-control",3,"ngClass"],["type","password","formControlName","password","placeholder","Password","required","",1,"form-control",3,"ngClass"],[1,"col","text-center"],["type","submit",1,"btn","btn-primary",3,"disabled"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"text-center","mt-3"],["routerLink","/login",1,"btn","btn-primary"],["role","alert",1,"col-md-12","alert","alert-danger"],[1,"invalid-feedback"],[4,"ngIf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(r,e){1&r&&(c.Ob(0,"div",0),c.Ob(1,"form",1),c.Vb("ngSubmit",(function(){return e.loading||e.signupForm.invalid||e.registerUser()})),c.Ob(2,"h3",2),c.sc(3,"Inscription"),c.Nb(),c.Ob(4,"div",3),c.qc(5,l,2,1,"div",4),c.Ob(6,"div",5),c.Ob(7,"div",6),c.Ob(8,"label"),c.sc(9,"Username"),c.Nb(),c.Kb(10,"input",7),c.qc(11,f,3,2,"div",8),c.Nb(),c.Nb(),c.Nb(),c.Ob(12,"div",3),c.Ob(13,"div",5),c.Ob(14,"div",6),c.Ob(15,"label"),c.sc(16,"Email address"),c.Nb(),c.Kb(17,"input",9),c.qc(18,g,3,2,"div",8),c.Nb(),c.Nb(),c.Nb(),c.Ob(19,"div",3),c.Ob(20,"div",5),c.Ob(21,"div",6),c.Ob(22,"label"),c.sc(23,"Password"),c.Nb(),c.Kb(24,"input",10),c.qc(25,N,3,2,"div",8),c.Nb(),c.Nb(),c.Nb(),c.Ob(26,"div",3),c.Ob(27,"div",11),c.Ob(28,"button",12),c.sc(29," Sign up "),c.qc(30,w,1,0,"span",13),c.Nb(),c.Nb(),c.Nb(),c.Nb(),c.Ob(31,"div",14),c.sc(32," Already have an account ? "),c.Ob(33,"a",15),c.sc(34,"Login"),c.Nb(),c.Nb(),c.Nb()),2&r&&(c.zb(1),c.ec("formGroup",e.signupForm),c.zb(4),c.ec("ngIf",e.formErrorMessage),c.zb(5),c.ec("ngClass",c.hc(10,C,e.username.invalid&&(e.username.dirty||e.username.touched))),c.zb(1),c.ec("ngIf",e.username.errors),c.zb(6),c.ec("ngClass",c.hc(12,C,e.email.invalid&&(e.email.dirty||e.email.touched))),c.zb(1),c.ec("ngIf",e.email.errors),c.zb(6),c.ec("ngClass",c.hc(14,C,e.password.invalid&&(e.password.dirty||e.password.touched))),c.zb(1),c.ec("ngIf",e.password.errors),c.zb(3),c.ec("disabled",e.signupForm.invalid||e.loading),c.zb(2),c.ec("ngIf",e.loading))},directives:[t.q,t.l,t.g,i.k,t.b,t.k,t.e,t.o,i.i,s.e],encapsulation:2}),O)}],k=((y=function r(){_classCallCheck(this,r)}).\u0275mod=c.Hb({type:y}),y.\u0275inj=c.Gb({factory:function(r){return new(r||y)},imports:[[i.b,a.a,s.f.forChild(z)]]}),y)}}]);
"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[634],{492:(Z,x,a)=>{a.d(x,{I:()=>I});var t=a(2843),e=a(2340),g=a(262),C=a(5e3),D=a(520);let I=(()=>{class h{constructor(m){this.http=m,this.apiEndpoint=e.N.apiEndpoint}search(m,p,T){return this.http.get(`${this.apiEndpoint}/admin/games`,{params:{query:m.query,...m.showDisabled&&{showDisabled:"true"},...m.onlyShowWithoutMusics&&{onlyShowWithoutMusics:"true"},...p&&{skip:p},...T&&{limit:T}}})}importByUrl(m){return this.http.get(`${this.apiEndpoint}/admin/games/import`,{params:{url:m}}).pipe((0,g.K)(p=>(0,t._)(p.error)))}get(m){return this.http.get(`${this.apiEndpoint}/admin/games/${m}`)}uploadMusics(m,p){const T=new FormData;for(const w of p)T.append("files",w);return this.http.post(`${this.apiEndpoint}/admin/games/${m}/musics`,T,{reportProgress:!0,observe:"events"})}saveMusic(m,p){return this.http.patch(`${this.apiEndpoint}/admin/game-to-music/${m.id}`,p)}deleteGameMusic(m){return this.http.delete(`${this.apiEndpoint}/admin/game-to-music/${m.id}`)}toggleGame(m){return this.http.patch(`${this.apiEndpoint}/admin/games/${m.slug}/toggle`,null).pipe((0,g.K)(p=>(0,t._)(p.error)))}toggleAlternativeName(m){return this.http.patch(`${this.apiEndpoint}/alternative-names/${m.id}/toggle`,null).pipe((0,g.K)(p=>(0,t._)(p.error)))}listen(m){return this.http.get(`${this.apiEndpoint}/admin/game-to-music/${m}/listen`,{responseType:"blob"})}addDerivedGameToMusic(m,p){return this.http.post(`${this.apiEndpoint}/admin/game-to-music/${m}/add-derived`,{gameId:p.id}).pipe((0,g.K)(T=>(0,t._)(T.error)))}}return h.\u0275fac=function(m){return new(m||h)(C.LFG(D.eN))},h.\u0275prov=C.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})()},9743:(Z,x,a)=>{a.d(x,{q:()=>I});var t=a(2843),e=a(2340),g=a(262),C=a(5e3),D=a(520);let I=(()=>{class h{constructor(m){this.http=m,this.apiEndpoint=e.N.apiEndpoint}search(m,p,T){return this.http.get(`${this.apiEndpoint}/games`,{params:{query:m.query,...m.myGames&&{filterByUser:"true"},...p&&{skip:p},...T&&{limit:T}}})}importByUrl(m){return this.http.get(`${this.apiEndpoint}/games/import`,{params:{url:m}}).pipe((0,g.K)(p=>(0,t._)(()=>p.error)))}get(m){return this.http.get(`${this.apiEndpoint}/games/${m}`)}addToList(m){return this.http.get(`${this.apiEndpoint}/games/${m}/add`)}removeFromList(m){return this.http.get(`${this.apiEndpoint}/games/${m}/remove`)}getNames(m){return this.http.get(`${this.apiEndpoint}/games/names`,{params:{query:m}})}}return h.\u0275fac=function(m){return new(m||h)(C.LFG(D.eN))},h.\u0275prov=C.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})()},7706:(Z,x,a)=>{a.d(x,{X:()=>Y});var t=a(5e3),e=a(8372),g=a(3075),C=a(8746),D=a(2349),I=a(492),h=a(9808);function b(r,u){if(1&r&&(t.ynx(0),t._uU(1),t.BQk()),2&r){const i=t.oxw(2);t.xp6(1),t.hij(" ",i.form.errors.serverError," ")}}function m(r,u){if(1&r&&(t.TgZ(0,"div",10),t.YNc(1,b,2,1,"ng-container",5),t.qZA()),2&r){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.form.errors.serverError)}}function p(r,u){if(1&r&&(t.TgZ(0,"p",11),t._uU(1),t.qZA()),2&r){const i=t.oxw();t.xp6(1),t.Oqu(i.errorMessage)}}function T(r,u){if(1&r&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&r){const i=u.$implicit;t.xp6(1),t.Oqu(i)}}function w(r,u){if(1&r&&(t.TgZ(0,"div")(1,"p",12),t._uU(2),t.qZA(),t.TgZ(3,"ul"),t.YNc(4,T,2,1,"li",13),t.qZA()()),2&r){const i=t.oxw();t.xp6(2),t.hij("Successfully imported ",i.importedGames.length," games!"),t.xp6(2),t.Q6J("ngForOf",i.importedGames)}}function N(r,u){1&r&&t._UZ(0,"span",14)}const K=function(r){return{"is-invalid":r}},H=function(r){return{disabled:r}};let F=(()=>{class r{constructor(i,s){this.dialogRef=i,this.gameHttpService=s,this.loading=!1,this.form=new g.NI(null,g.kI.required.bind(this)),this.importedGames=[]}submit(){this.errorMessage=void 0,this.loading=!0,this.importedGames=[],this.gameHttpService.importByUrl(this.form.value).pipe((0,C.x)(()=>this.loading=!1)).subscribe({next:i=>{this.importedGames=i,this.form.reset()},error:i=>{Array.isArray(i.message)?this.form.setErrors({serverError:i.message[0].errors}):this.errorMessage=i.message}})}}return r.\u0275fac=function(i){return new(i||r)(t.Y36(D.so),t.Y36(I.I))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-admin-import-game-dialog"]],decls:17,vars:12,consts:[["href","https://www.igdb.com/search","target","_blank"],[1,"form-group",3,"ngSubmit"],["required","","placeholder","IGDB url",1,"form-control",3,"formControl","ngClass"],["class","invalid-feedback",4,"ngIf"],["class","text-danger",4,"ngIf"],[4,"ngIf"],["mat-dialog-actions","",1,"row","justify-content-end"],[1,"col"],[1,"btn","btn-outline-primary",3,"disabled","ngClass","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"invalid-feedback"],[1,"text-danger"],[1,"text-success"],[4,"ngFor","ngForOf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(i,s){1&i&&(t.TgZ(0,"h2"),t._uU(1,"Import a game"),t.qZA(),t.TgZ(2,"p"),t._uU(3," import a game from "),t.TgZ(4,"a",0),t._uU(5,"igdb.com"),t.qZA(),t._uU(6," by searching a game and copying its url below\n"),t.qZA(),t.TgZ(7,"form",1),t.NdJ("ngSubmit",function(){return s.submit()}),t._UZ(8,"input",2),t.YNc(9,m,2,1,"div",3),t.qZA(),t.YNc(10,p,2,1,"p",4),t.YNc(11,w,5,2,"div",5),t.TgZ(12,"div",6)(13,"div",7)(14,"button",8),t.NdJ("click",function(){return s.form.invalid||s.loading||s.submit()}),t._uU(15," Import"),t.YNc(16,N,1,0,"span",9),t.qZA()()()),2&i&&(t.xp6(8),t.Q6J("formControl",s.form)("ngClass",t.VKq(8,K,s.form.invalid&&(s.form.dirty||s.form.touched))),t.xp6(1),t.Q6J("ngIf",s.form.errors),t.xp6(1),t.Q6J("ngIf",s.errorMessage),t.xp6(1),t.Q6J("ngIf",s.importedGames.length>0),t.xp6(3),t.Q6J("disabled",s.form.invalid||s.loading)("ngClass",t.VKq(10,H,s.form.invalid||s.loading)),t.xp6(2),t.Q6J("ngIf",s.loading))},dependencies:[h.mk,h.sg,h.O5,D.H8,g._Y,g.Fj,g.JJ,g.JL,g.Q7,g.F,g.oH],encapsulation:2}),r})();var W=a(7961),P=a(7771);function A(r,u){if(1&r&&(t.TgZ(0,"h1"),t._uU(1),t.qZA()),2&r){const i=t.oxw();t.xp6(1),t.hij("",i.gamesCount," games")}}function L(r,u){if(1&r&&(t.TgZ(0,"form",9)(1,"div",10)(2,"div",11)(3,"div",12),t._UZ(4,"input",13),t.qZA()(),t.TgZ(5,"div",2)(6,"mat-checkbox",14),t._uU(7,"Only Show Without Music"),t.qZA()(),t.TgZ(8,"div",2)(9,"mat-checkbox",15),t._uU(10,"Disabled "),t.qZA()()()()),2&r){const i=t.oxw();t.Q6J("formGroup",i.form)}}function U(r,u){1&r&&(t.ynx(0),t.TgZ(1,"div",16)(2,"div",17)(3,"span",18),t._uU(4,"Loading..."),t.qZA()()(),t.BQk())}function M(r,u){1&r&&t._UZ(0,"app-game-item",22),2&r&&t.Q6J("game",u.$implicit)}function B(r,u){1&r&&(t.TgZ(0,"div",16)(1,"div",17)(2,"span",18),t._uU(3,"Loading..."),t.qZA()()())}function J(r,u){if(1&r){const i=t.EpF();t.TgZ(0,"div",19),t.NdJ("scrolled",function(){t.CHM(i);const _=t.oxw();return t.KtG(_.onScrollDown())}),t.YNc(1,M,1,1,"app-game-item",20),t.YNc(2,B,4,0,"div",21),t.qZA()}if(2&r){const i=t.oxw();t.xp6(1),t.Q6J("ngForOf",i.games),t.xp6(1),t.Q6J("ngIf",i.scrollLoading)}}let Y=(()=>{class r{constructor(i,s,_,R){this.adminGameHttpService=i,this.dialog=s,this.router=_,this.activatedRoute=R,this.name="xd",this.games=[],this.query="",this.showDisabled=!1,this.onlyShowWithoutMusics=!1,this.loading=!1,this.scrollLoading=!1}ngOnInit(){this.activatedRoute.queryParamMap.subscribe(i=>{var s;this.form=new g.cw({query:new g.NI(null!==(s=i.get("query"))&&void 0!==s?s:"",g.kI.required.bind(this)),showDisabled:new g.NI("true"===i.get("showDisabled")),onlyShowWithoutMusics:new g.NI("true"===i.get("onlyShowWithoutMusics"))}),this.search()}).unsubscribe(),this.form.valueChanges.pipe((0,e.b)(250)).subscribe(()=>{this.search(),this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:this.form.value,replaceUrl:!0})})}search(){this.loading=!0,this.adminGameHttpService.search(this.form.value,0,24).pipe((0,C.x)(()=>this.loading=!1)).subscribe(i=>{this.gamesCount=i.count,this.games=i.data})}onScrollDown(){this.scrollLoading||(this.scrollLoading=!0,this.adminGameHttpService.search(this.form.value,this.games.length,24).pipe((0,C.x)(()=>this.scrollLoading=!1)).subscribe(i=>{this.games=[...this.games,...i.data]}))}openImportDialog(){this.dialog.open(F).afterClosed().subscribe(()=>{this.search()})}}return r.\u0275fac=function(i){return new(i||r)(t.Y36(I.I),t.Y36(D.uw),t.Y36(P.F0),t.Y36(P.gz))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-game-search"]],features:[t._Bn([{provide:W.X,useExisting:(0,t.Gpc)(()=>r)}])],decls:11,vars:4,consts:[[1,"container"],[1,"row","justify-content-between"],[1,"col"],[4,"ngIf"],[1,"col","text-end"],[1,"btn","btn-outline-primary",3,"click"],[3,"formGroup",4,"ngIf"],[4,"ngIf","ngIfElse"],["cardColumns",""],[3,"formGroup"],[1,"row","justify-content-between","align-items-center"],[1,"col-md-3"],[1,"form-group"],["type","text","id","exampleFormControlInput1","placeholder","game...","formControlName","query",1,"form-control"],["color","primary","formControlName","onlyShowWithoutMusics"],["color","primary","formControlName","showDisabled"],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"],["infinite-scroll","",1,"mt-4","row",3,"scrolled"],["class","col-6 col-md-2",3,"game",4,"ngFor","ngForOf"],["class","d-flex justify-content-center",4,"ngIf"],[1,"col-6","col-md-2",3,"game"]],template:function(i,s){if(1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t.YNc(3,A,2,1,"h1",3),t.qZA(),t.TgZ(4,"div",4)(5,"button",5),t.NdJ("click",function(){return s.openImportDialog()}),t._uU(6,"Import game from IGDB"),t.qZA()()(),t.YNc(7,L,11,1,"form",6),t.YNc(8,U,5,0,"ng-container",7),t.YNc(9,J,3,2,"ng-template",null,8,t.W1O),t.qZA()),2&i){const _=t.MAs(10);t.xp6(3),t.Q6J("ngIf",s.gamesCount),t.xp6(4),t.Q6J("ngIf",s.form),t.xp6(1),t.Q6J("ngIf",s.loading)("ngIfElse",_)}},encapsulation:2}),r})()},8636:(Z,x,a)=>{a.d(x,{F:()=>Y});var t=a(7706),e=a(5e3),g=a(9743),C=a(263),D=a(7961),I=a(9808),h=a(7423),b=a(7771),m=a(5245);const p=function(r){return{"background-color":r}};function T(r,u){if(1&r&&(e.TgZ(0,"button",13),e._uU(1),e._UZ(2,"i",14),e.qZA()),2&r){const i=e.oxw();e.Q6J("ngStyle",e.VKq(2,p,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"black")),e.xp6(1),e.hij(" ",i.game.countUsers," ")}}function w(r,u){if(1&r){const i=e.EpF();e.TgZ(0,"button",16),e.NdJ("click",function(){e.CHM(i);const _=e.oxw(2);return e.KtG(_.addToList(_.game))}),e.TgZ(1,"mat-icon"),e._uU(2,"add"),e.qZA()()}if(2&r){const i=e.oxw(2);e.Q6J("ngStyle",e.VKq(1,p,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"black"))}}function N(r,u){if(1&r){const i=e.EpF();e.TgZ(0,"button",16),e.NdJ("click",function(){e.CHM(i);const _=e.oxw(2);return e.KtG(_.removeFromList(_.game))}),e.TgZ(1,"mat-icon"),e._uU(2,"remove"),e.qZA()()}if(2&r){const i=e.oxw(2);e.Q6J("ngStyle",e.VKq(1,p,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"black"))}}function K(r,u){if(1&r&&(e.ynx(0),e.YNc(1,w,3,3,"button",15),e.YNc(2,N,3,3,"button",15),e.BQk()),2&r){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",!1===i.game.selectedByUser),e.xp6(1),e.Q6J("ngIf",!0===i.game.selectedByUser)}}function H(r,u){1&r&&e._UZ(0,"div",17)}function F(r,u){if(1&r&&(e.ynx(0),e._uU(1),e.BQk()),2&r){const i=e.oxw(2);e.xp6(1),e.Oqu(i.game.platforms[0].name)}}function W(r,u){1&r&&(e.ynx(0),e._uU(1,", "),e.BQk())}function P(r,u){if(1&r&&(e.ynx(0),e._uU(1),e.YNc(2,W,2,0,"ng-container",8),e.BQk()),2&r){const i=u.$implicit,s=u.last,_=u.last;e.xp6(1),e.hij(" ",i.abbreviation,""),e.xp6(1),e.Q6J("ngIf",!s&&!_)}}function A(r,u){if(1&r&&(e.ynx(0),e.YNc(1,P,3,2,"ng-container",19),e.BQk()),2&r){const i=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",i.game.platforms)}}function L(r,u){if(1&r&&(e.TgZ(0,"small",18),e._uU(1," \u2022 "),e.YNc(2,F,2,1,"ng-container",8),e.YNc(3,A,2,1,"ng-container",8),e.qZA()),2&r){const i=e.oxw();e.xp6(2),e.Q6J("ngIf",1===(null==i.game.platforms?null:i.game.platforms.length)),e.xp6(1),e.Q6J("ngIf",(null==i.game.platforms?null:i.game.platforms.length)>1&&11===i.game.category)}}const U=function(r){return["/admin/games/",r]},M=function(){return[]},B=function(r){return{"d-none":r}},J=function(r){return{"has-admin-pill":r}};let Y=(()=>{class r{constructor(i,s,_){this.gameHttpService=i,this.authService=s,this.parentComponent=_,this.isAdminSearchComponent=!0,this.hidden=!0,this.isAdmin=!1}ngOnInit(){this.isAdminSearchComponent=this.parentComponent instanceof t.X,this.isAdmin=this.authService.isAdmin}addToList(i){this.gameHttpService.addToList(i.slug).subscribe(()=>{i.selectedByUser=!i.selectedByUser})}removeFromList(i){this.gameHttpService.removeFromList(i.slug).subscribe(()=>{i.selectedByUser=!i.selectedByUser})}}return r.\u0275fac=function(i){return new(i||r)(e.Y36(g.q),e.Y36(C.e),e.Y36(D.X,8))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-game-item"]],inputs:{game:"game"},decls:16,vars:32,consts:[[2,"position","relative","aspect-ratio","3/4","display","flex","align-items","center"],[3,"routerLink"],[1,"card-img-top",2,"flex","0",3,"src","ngClass","alt","load"],[1,"w-100","h-100",2,"position","absolute","top","0","z-index","-1","filter","brightness(50%)",3,"ngStyle","routerLink"],[1,"pills-container",3,"ngClass"],["class","pill countUsers","mat-raised-button","",3,"ngStyle",4,"ngIf"],["mat-raised-button","",1,"pill","countMusics",3,"ngStyle"],[1,"fa-solid","fa-music"],[4,"ngIf"],[1,"card-title","orange"],["class","played",4,"ngIf"],[1,"text-white",3,"routerLink"],["class","ms-1 text-muted","style","font-size: 11px",4,"ngIf"],["mat-raised-button","",1,"pill","countUsers",3,"ngStyle"],[1,"fa-solid","fa-gamepad"],["class","game-item-cta","mat-mini-fab","","aria-label","Example icon button with a heart icon",3,"ngStyle","click",4,"ngIf"],["mat-mini-fab","","aria-label","Example icon button with a heart icon",1,"game-item-cta",3,"ngStyle","click"],[1,"played"],[1,"ms-1","text-muted",2,"font-size","11px"],[4,"ngFor","ngForOf"]],template:function(i,s){1&i&&(e.TgZ(0,"div",0)(1,"a",1)(2,"img",2),e.NdJ("load",function(){return s.hidden=!1}),e.qZA()(),e._UZ(3,"div",3),e.TgZ(4,"div",4),e.YNc(5,T,3,4,"button",5),e.TgZ(6,"button",6),e._uU(7),e._UZ(8,"i",7),e.qZA()(),e.YNc(9,K,3,2,"ng-container",8),e.qZA(),e.TgZ(10,"div",9),e.YNc(11,H,1,0,"div",10),e.TgZ(12,"p")(13,"a",11),e._uU(14),e.qZA(),e.YNc(15,L,4,2,"small",12),e.qZA()()),2&i&&(e.xp6(1),e.Q6J("routerLink",s.isAdmin?e.VKq(15,U,s.game.slug):e.DdM(17,M)),e.xp6(1),e.Q6J("src",null!=s.game.cover&&s.game.cover.imageId?"https://images.igdb.com/igdb/image/upload/t_720p/"+s.game.cover.imageId+".jpg":"assets/imgs/missing picture.png",e.LSH)("ngClass",e.VKq(18,B,s.hidden))("alt",s.game.name),e.xp6(1),e.Q6J("ngStyle",e.VKq(20,p,s.game.cover?s.game.cover.colorPalette.backgroundColorHex:"black"))("routerLink",s.isAdmin?e.VKq(22,U,s.game.slug):e.DdM(24,M)),e.xp6(1),e.Q6J("ngClass",e.VKq(25,J,s.isAdminSearchComponent)),e.xp6(1),e.Q6J("ngIf",s.isAdminSearchComponent),e.xp6(1),e.Q6J("ngStyle",e.VKq(27,p,s.game.cover?s.game.cover.colorPalette.backgroundColorHex:"black")),e.xp6(1),e.hij(" ",s.game.countMusics," "),e.xp6(2),e.Q6J("ngIf",!1===s.isAdminSearchComponent),e.xp6(2),e.Q6J("ngIf",s.game.selectedByUser),e.xp6(2),e.Q6J("routerLink",s.isAdmin?e.VKq(29,U,s.game.slug):e.DdM(31,M)),e.xp6(1),e.Oqu(s.game.name),e.xp6(1),e.Q6J("ngIf",1===(null==s.game.platforms?null:s.game.platforms.length)||(null==s.game.platforms?null:s.game.platforms.length)>1&&11===s.game.category))},dependencies:[I.mk,I.sg,I.O5,I.PC,h.lW,b.rH,b.yS,m.Hw],encapsulation:2}),r})()},7961:(Z,x,a)=>{a.d(x,{X:()=>t});class t{}},9685:(Z,x,a)=>{a.d(x,{Ry:()=>ut,Rq:()=>pt});var t=a(5e3),e=a(9646),g=a(4968),C=a(5577),D=a(4004),I=a(8505),h=a(9300),b=a(4986),m=a(4482),p=a(5403),T=a(8421);const w={leading:!0,trailing:!1};var K=a(5963);function W(n,o,l,c){const d=window&&!!window.document&&window.document.documentElement;let f=d&&o?window:l;if(n&&(f=n&&d&&"string"==typeof n?function P(n,o,l){return(l?window.document:o).querySelector(n)}(n,l.nativeElement,c):n,!f))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return f}function A(n){return n&&!n.firstChange}const U={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},M={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"};class B{constructor(o=!0){this.vertical=o,this.propsMap=o?U:M}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}}function u(n){return["Window","global"].some(l=>Object.prototype.toString.call(n).includes(l))}function i(n,o){return n?o.document.documentElement:null}function s(n,o){const l=function X({container:n,isWindow:o,axis:l}){const{offsetHeightKey:c,clientHeightKey:d}=k(l);return q(n,o,c,d)}(o);return o.isWindow?function _(n,o,l){const{axis:c,container:d,isWindow:f}=l,{offsetHeightKey:v,clientHeightKey:E}=k(c),S=n+j(i(f,d),c,f),y=q(o.nativeElement,f,v,E),O=function tt(n,o,l){const c=o.topKey();if(n.getBoundingClientRect)return n.getBoundingClientRect()[c]+j(n,o,l)}(o.nativeElement,c,f)+y;return{height:n,scrolled:S,totalToScroll:O,isWindow:f}}(l,n,o):function R(n,o,l){const{axis:c,container:d}=l;return{height:n,scrolled:d[c.scrollTopKey()],totalToScroll:d[c.scrollHeightKey()],isWindow:!1}}(l,0,o)}function k(n){return{offsetHeightKey:n.offsetHeightKey(),clientHeightKey:n.clientHeightKey()}}function q(n,o,l,c){if(isNaN(n[l])){const d=i(o,n);return d?d[c]:0}return n[l]}function j(n,o,l){const c=o.pageYOffsetKey(),d=o.scrollTopKey(),f=o.offsetTopKey();return isNaN(window.pageYOffset)?i(l,n)[d]:n.ownerDocument?n.ownerDocument.defaultView[c]:n[f]}function et(n,o={down:0,up:0},l){let c,d;if(n.totalToScroll<=0)return!1;const f=n.isWindow?n.scrolled:n.height+n.scrolled;return l?(c=(n.totalToScroll-f)/n.totalToScroll,d=(null!=o&&o.down?o.down:0)/10):(c=n.scrolled/(n.scrolled+(n.totalToScroll-f)),d=(null!=o&&o.up?o.up:0)/10),c<=d}class st{constructor({totalToScroll:o}){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=o}updateScrollPosition(o){return this.lastScrollPosition=o}updateTotalToScroll(o){this.lastTotalToScroll!==o&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=o)}updateScroll(o,l){this.updateScrollPosition(o),this.updateTotalToScroll(l)}updateTriggeredFlag(o,l){l?this.triggered.down=o:this.triggered.up=o}isTriggeredScroll(o,l){return l?this.triggered.down===o:this.triggered.up===o}}function lt(n){const{scrollContainer:o,scrollWindow:l,element:c,fromRoot:d}=n,f=function Y({windowElement:n,axis:o}){return function r(n,o){const l=n.isWindow||o&&!o.nativeElement?o:o.nativeElement;return Object.assign(Object.assign({},n),{container:l})}({axis:o,isWindow:u(n)},n)}({axis:new B(!n.horizontal),windowElement:W(o,l,c,d)}),v=new st({totalToScroll:s(c,f)}),S={up:n.upDistance,down:n.downDistance};return function at(n){let o=(0,g.R)(n.container,"scroll");return n.throttle&&(o=o.pipe(function H(n,o=b.z,l=w){const c=(0,K.H)(n,o);return function N(n,o=w){return(0,m.e)((l,c)=>{const{leading:d,trailing:f}=o;let v=!1,E=null,S=null,y=!1;const O=()=>{null==S||S.unsubscribe(),S=null,f&&(V(),y&&c.complete())},$=()=>{S=null,y&&c.complete()},z=G=>S=(0,T.Xf)(n(G)).subscribe((0,p.x)(c,O,$)),V=()=>{if(v){v=!1;const G=E;E=null,c.next(G),!y&&z(G)}};l.subscribe((0,p.x)(c,G=>{v=!0,E=G,(!S||S.closed)&&(d?V():z(G))},()=>{y=!0,(!(f&&v&&S)||S.closed)&&c.complete()}))})}(()=>c,l)}(n.throttle,void 0,{leading:!0,trailing:!0}))),o}({container:f.container,throttle:n.throttle}).pipe((0,C.z)(()=>(0,e.of)(s(c,f))),(0,D.U)(y=>function ct(n,o,l){const{scrollDown:c,fire:d}=function ot(n,o,l){const c=function nt(n,o){return n<o.scrolled}(n,o);return{fire:et(o,l,c),scrollDown:c}}(n,o,l);return{scrollDown:c,fire:d,stats:o}}(v.lastScrollPosition,y,S)),(0,I.b)(({stats:y})=>v.updateScroll(y.scrolled,y.totalToScroll)),(0,h.h)(({fire:y,scrollDown:O,stats:{totalToScroll:$}})=>function J(n,o,l){return!!(n&&o||!l&&o)}(n.alwaysCallback,y,v.isTriggeredScroll($,O))),(0,I.b)(({scrollDown:y,stats:{totalToScroll:O}})=>{v.updateTriggeredFlag(O,y)}),(0,D.U)(mt))}function mt(n){const{scrollDown:o,stats:{scrolled:l}}=n;return{type:o?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:l}}}let ut=(()=>{class n{constructor(l,c){this.element=l,this.zone=c,this.scrolled=new t.vpe,this.scrolledUp=new t.vpe,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:l,infiniteScrollDisabled:c,infiniteScrollDistance:d}){const f=A(l),v=A(c),E=A(d),S=!v&&!this.infiniteScrollDisabled||v&&!c.currentValue||E;(f||v||E)&&(this.destroyScroller(),S&&this.setup())}setup(){(function L(){return"undefined"!=typeof window})()&&this.zone.runOutsideAngular(()=>{this.disposeScroller=lt({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(l=>this.zone.run(()=>this.handleOnScroll(l)))})}handleOnScroll({type:l,payload:c}){switch(l){case"[NGX_ISE] DOWN":return this.scrolled.emit(c);case"[NGX_ISE] UP":return this.scrolledUp.emit(c);default:return}}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}return n.\u0275fac=function(l){return new(l||n)(t.Y36(t.SBq),t.Y36(t.R0b))},n.\u0275dir=t.lG2({type:n,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[t.TTD]}),n})(),pt=(()=>{class n{}return n.\u0275fac=function(l){return new(l||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({}),n})()}}]);
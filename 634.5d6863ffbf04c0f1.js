"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[634],{492:(W,w,l)=>{l.d(w,{I:()=>D});var t=l(2843),o=l(2340),h=l(262),b=l(5e3),I=l(520);let D=(()=>{class u{constructor(c){this.http=c,this.apiEndpoint=o.N.apiEndpoint}search(c,T,U){return this.http.get(`${this.apiEndpoint}/admin/games`,{params:{query:c.query,...c.showDisabled&&{showDisabled:"true"},...c.onlyShowWithoutMusics&&{onlyShowWithoutMusics:"true"},...T&&{skip:T},...U&&{limit:U}}})}importByUrl(c){return this.http.get(`${this.apiEndpoint}/admin/games/import`,{params:{url:c}}).pipe((0,h.K)(T=>(0,t._)(T.error)))}get(c){return this.http.get(`${this.apiEndpoint}/admin/games/${c}`)}uploadMusics(c,T){const U=new FormData;for(const A of T)U.append("files",A);return this.http.post(`${this.apiEndpoint}/admin/games/${c}/musics`,U,{reportProgress:!0,observe:"events"})}saveMusic(c,T){return this.http.patch(`${this.apiEndpoint}/musics/${c.id}`,T)}deleteGameMusic(c){return this.http.delete(`${this.apiEndpoint}/admin/game-to-music/${c.id}`)}toggleGame(c){return this.http.patch(`${this.apiEndpoint}/admin/games/${c.slug}/toggle`,null).pipe((0,h.K)(T=>(0,t._)(T.error)))}toggleAlternativeName(c){return this.http.patch(`${this.apiEndpoint}/alternative-names/${c.id}/toggle`,null).pipe((0,h.K)(T=>(0,t._)(T.error)))}listen(c){return this.http.get(`${this.apiEndpoint}/admin/game-to-music/${c}/listen`,{responseType:"blob"})}}return u.\u0275fac=function(c){return new(c||u)(b.LFG(I.eN))},u.\u0275prov=b.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},9743:(W,w,l)=>{l.d(w,{q:()=>b});var t=l(2340),o=l(5e3),h=l(520);let b=(()=>{class I{constructor(u){this.http=u,this.apiEndpoint=t.N.apiEndpoint}search(u,x,c){return this.http.get(`${this.apiEndpoint}/games`,{params:{query:u.query,...u.myGames&&{filterByUser:"true"},...x&&{skip:x},...c&&{limit:c}}})}get(u){return this.http.get(`${this.apiEndpoint}/games/${u}`)}addToList(u){return this.http.get(`${this.apiEndpoint}/games/${u}/add`)}removeFromList(u){return this.http.get(`${this.apiEndpoint}/games/${u}/remove`)}getNames(u){return this.http.get(`${this.apiEndpoint}/games/names`,{params:{query:u}})}}return I.\u0275fac=function(u){return new(u||I)(o.LFG(h.eN))},I.\u0275prov=o.Yz7({token:I,factory:I.\u0275fac,providedIn:"root"}),I})()},3818:(W,w,l)=>{l.d(w,{X:()=>Y});var t=l(5e3),o=l(8372),h=l(3075),b=l(8746),I=l(8966),D=l(492),u=l(9808);function x(a,_){if(1&a&&(t.ynx(0),t._uU(1),t.BQk()),2&a){const r=t.oxw(2);t.xp6(1),t.hij(" ",r.form.errors.serverError," ")}}function c(a,_){if(1&a&&(t.TgZ(0,"div",9),t.YNc(1,x,2,1,"ng-container",4),t.qZA()),2&a){const r=t.oxw();t.xp6(1),t.Q6J("ngIf",r.form.errors.serverError)}}function T(a,_){if(1&a&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&a){const r=_.$implicit;t.xp6(1),t.Oqu(r)}}function U(a,_){if(1&a&&(t.TgZ(0,"div")(1,"p",10),t._uU(2),t.qZA(),t.TgZ(3,"ul"),t.YNc(4,T,2,1,"li",11),t.qZA()()),2&a){const r=t.oxw();t.xp6(2),t.hij("Successfully imported ",r.importedGames.length," games!"),t.xp6(2),t.Q6J("ngForOf",r.importedGames)}}function A(a,_){1&a&&t._UZ(0,"span",12)}const Z=function(a){return{"is-invalid":a}},H=function(a){return{disabled:a}};let K=(()=>{class a{constructor(r,m){this.dialogRef=r,this.gameHttpService=m,this.loading=!1,this.form=new h.NI(null,h.kI.required.bind(this)),this.importedGames=[]}ngOnInit(){}submit(){this.loading=!0,this.importedGames=[],this.gameHttpService.importByUrl(this.form.value).pipe((0,b.x)(()=>this.loading=!1)).subscribe({next:r=>{this.importedGames=r,this.form.reset()},error:r=>{Array.isArray(r.message)?this.form.setErrors({serverError:r.message[0].errors}):this.errorMessage=r.message}})}}return a.\u0275fac=function(r){return new(r||a)(t.Y36(I.so),t.Y36(D.I))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-import-game-dialog"]],decls:16,vars:11,consts:[["href","https://www.igdb.com/search","target","_blank"],[1,"form-group"],["required","","placeholder","IGDB url",1,"form-control",3,"formControl","ngClass"],["class","invalid-feedback",4,"ngIf"],[4,"ngIf"],["mat-dialog-actions","",1,"row","justify-content-end"],[1,"col"],[1,"btn","btn-outline-primary",3,"disabled","ngClass","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"invalid-feedback"],[1,"text-success"],[4,"ngFor","ngForOf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(r,m){1&r&&(t.TgZ(0,"h2"),t._uU(1,"Import a game"),t.qZA(),t.TgZ(2,"p"),t._uU(3," import a game from "),t.TgZ(4,"a",0),t._uU(5,"igdb.com"),t.qZA(),t._uU(6," by searching a game and copying its url below\n"),t.qZA(),t.TgZ(7,"div",1),t._UZ(8,"input",2),t.YNc(9,c,2,1,"div",3),t.qZA(),t.YNc(10,U,5,2,"div",4),t.TgZ(11,"div",5)(12,"div",6)(13,"button",7),t.NdJ("click",function(){return m.form.invalid||m.loading||m.submit()}),t._uU(14," Import"),t.YNc(15,A,1,0,"span",8),t.qZA()()()),2&r&&(t.xp6(8),t.Q6J("formControl",m.form)("ngClass",t.VKq(7,Z,m.form.invalid&&(m.form.dirty||m.form.touched))),t.xp6(1),t.Q6J("ngIf",m.form.errors),t.xp6(1),t.Q6J("ngIf",m.importedGames.length>0),t.xp6(3),t.Q6J("disabled",m.form.invalid||m.loading)("ngClass",t.VKq(9,H,m.form.invalid||m.loading)),t.xp6(2),t.Q6J("ngIf",m.loading))},directives:[h.Fj,h.Q7,h.JJ,h.oH,u.mk,u.O5,u.sg,I.H8],encapsulation:2}),a})();var f=l(7961),O=l(1083);function p(a,_){if(1&a&&(t.TgZ(0,"h1"),t._uU(1),t.qZA()),2&a){const r=t.oxw();t.xp6(1),t.hij("",r.gamesCount," games")}}function v(a,_){if(1&a&&(t.TgZ(0,"form",8)(1,"div",9)(2,"div",10)(3,"div",11),t._UZ(4,"input",12),t.qZA()(),t.TgZ(5,"div",1)(6,"mat-checkbox",13),t._uU(7,"Only Show Without Music"),t.qZA()(),t.TgZ(8,"div",1)(9,"mat-checkbox",14),t._uU(10,"Disabled "),t.qZA()()()()),2&a){const r=t.oxw();t.Q6J("formGroup",r.form)}}function M(a,_){1&a&&(t.ynx(0),t.TgZ(1,"div",15)(2,"div",16)(3,"span",17),t._uU(4,"Loading..."),t.qZA()()(),t.BQk())}function B(a,_){1&a&&t._UZ(0,"app-game-item",21),2&a&&t.Q6J("game",_.$implicit)}function F(a,_){1&a&&(t.TgZ(0,"div",15)(1,"div",16)(2,"span",17),t._uU(3,"Loading..."),t.qZA()()())}function R(a,_){if(1&a){const r=t.EpF();t.TgZ(0,"div",18),t.NdJ("scrolled",function(){return t.CHM(r),t.oxw().onScrollDown()}),t.YNc(1,B,1,1,"app-game-item",19),t.YNc(2,F,4,0,"div",20),t.qZA()}if(2&a){const r=t.oxw();t.xp6(1),t.Q6J("ngForOf",r.games),t.xp6(1),t.Q6J("ngIf",r.scrollLoading)}}let Y=(()=>{class a{constructor(r,m,G,J){this.adminGameHttpService=r,this.dialog=m,this.router=G,this.activatedRoute=J,this.name="xd",this.games=[],this.query="",this.showDisabled=!1,this.onlyShowWithoutMusics=!1,this.loading=!1,this.scrollLoading=!1}ngOnInit(){this.activatedRoute.queryParamMap.subscribe(r=>{var m;this.form=new h.cw({query:new h.NI(null!==(m=r.get("query"))&&void 0!==m?m:"",h.kI.required.bind(this)),showDisabled:new h.NI("true"===r.get("showDisabled")),onlyShowWithoutMusics:new h.NI("true"===r.get("onlyShowWithoutMusics"))}),this.search()}).unsubscribe(),this.form.valueChanges.pipe((0,o.b)(250)).subscribe(()=>{this.search(),this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:this.form.value,replaceUrl:!0})})}search(){this.loading=!0,this.adminGameHttpService.search(this.form.value,0,24).pipe((0,b.x)(()=>this.loading=!1)).subscribe(r=>{this.gamesCount=r.count,this.games=r.data})}onScrollDown(){this.scrollLoading||(this.scrollLoading=!0,this.adminGameHttpService.search(this.form.value,this.games.length,24).pipe((0,b.x)(()=>this.scrollLoading=!1)).subscribe(r=>{this.games=[...this.games,...r.data]}))}openImportDialog(){this.dialog.open(K).afterClosed().subscribe(()=>{this.search()})}}return a.\u0275fac=function(r){return new(r||a)(t.Y36(D.I),t.Y36(I.uw),t.Y36(O.F0),t.Y36(O.gz))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-game-search"]],features:[t._Bn([{provide:f.X,useExisting:(0,t.Gpc)(()=>a)}])],decls:10,vars:4,consts:[[1,"row","justify-content-between"],[1,"col"],[4,"ngIf"],[1,"col","text-end"],[1,"btn","btn-outline-primary",3,"click"],[3,"formGroup",4,"ngIf"],[4,"ngIf","ngIfElse"],["cardColumns",""],[3,"formGroup"],[1,"row","justify-content-between","align-items-center"],[1,"col-md-3"],[1,"form-group"],["type","text","id","exampleFormControlInput1","placeholder","game...","formControlName","query",1,"form-control"],["color","primary","formControlName","onlyShowWithoutMusics"],["color","primary","formControlName","showDisabled"],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"],["infinite-scroll","",1,"mt-4","row",3,"scrolled"],["class","col-6 col-md-2",3,"game",4,"ngFor","ngForOf"],["class","d-flex justify-content-center",4,"ngIf"],[1,"col-6","col-md-2",3,"game"]],template:function(r,m){if(1&r&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,p,2,1,"h1",2),t.qZA(),t.TgZ(3,"div",3)(4,"button",4),t.NdJ("click",function(){return m.openImportDialog()}),t._uU(5,"Import game from IGDB"),t.qZA()()(),t.YNc(6,v,11,1,"form",5),t.YNc(7,M,5,0,"ng-container",6),t.YNc(8,R,3,2,"ng-template",null,7,t.W1O)),2&r){const G=t.MAs(9);t.xp6(2),t.Q6J("ngIf",m.gamesCount),t.xp6(4),t.Q6J("ngIf",m.form),t.xp6(1),t.Q6J("ngIf",m.loading)("ngIfElse",G)}},encapsulation:2}),a})()},8636:(W,w,l)=>{l.d(w,{F:()=>K});var t=l(3818),o=l(5e3),h=l(9743),b=l(7961),I=l(1083),D=l(9808),u=l(7423),x=l(5245);function c(f,O){if(1&f&&(o.TgZ(0,"span",10),o._uU(1),o._UZ(2,"i",11),o.qZA()),2&f){const p=o.oxw();o.xp6(1),o.hij(" ",p.game.countUsers," ")}}function T(f,O){if(1&f){const p=o.EpF();o.TgZ(0,"button",14),o.NdJ("click",function(){o.CHM(p);const M=o.oxw(2);return M.addToList(M.game)}),o.TgZ(1,"mat-icon"),o._uU(2,"add"),o.qZA()()}}function U(f,O){if(1&f){const p=o.EpF();o.TgZ(0,"button",15),o.NdJ("click",function(){o.CHM(p);const M=o.oxw(2);return M.removeFromList(M.game)}),o.TgZ(1,"mat-icon"),o._uU(2,"close"),o.qZA()()}}function A(f,O){if(1&f&&(o.ynx(0),o.YNc(1,T,3,0,"button",12),o.YNc(2,U,3,0,"button",13),o.BQk()),2&f){const p=o.oxw();o.xp6(1),o.Q6J("ngIf",!1===p.game.selectedByUser),o.xp6(1),o.Q6J("ngIf",!0===p.game.selectedByUser)}}const Z=function(f){return["/admin/games/",f]},H=function(f){return{played:f}};let K=(()=>{class f{constructor(p,v){this.gameHttpService=p,this.parentComponent=v,this.isAdminSearchComponent=!0}ngOnInit(){this.isAdminSearchComponent=this.parentComponent instanceof t.X}addToList(p){this.gameHttpService.addToList(p.slug).subscribe(()=>{p.selectedByUser=!p.selectedByUser})}removeFromList(p){this.gameHttpService.removeFromList(p.slug).subscribe(()=>{p.selectedByUser=!p.selectedByUser})}}return f.\u0275fac=function(p){return new(p||f)(o.Y36(h.q),o.Y36(b.X,8))},f.\u0275cmp=o.Xpm({type:f,selectors:[["app-game-item"]],inputs:{game:"game"},decls:13,vars:15,consts:[[2,"position","relative"],[3,"routerLink"],[1,"card-img-top",3,"src","alt","ngClass"],[1,"row","mx-0","pt-1","justify-content-end",2,"position","absolute","top","0","left","0","right","0","z-index","1"],[1,"col","text-end"],[1,"badge","bg-primary","rounded-pill","text-black"],[1,"fa-solid","fa-music"],["class","badge bg-primary rounded-pill text-black ms-2",4,"ngIf"],[4,"ngIf"],[1,"card-title","orange"],[1,"badge","bg-primary","rounded-pill","text-black","ms-2"],[1,"fa-solid","fa-gamepad"],["style","position: absolute; bottom: 1rem; right: 1rem; z-index: 1","mat-mini-fab","","aria-label","Example icon button with a heart icon","color","accent",3,"click",4,"ngIf"],["style","position: absolute; bottom: 1rem; right: 1rem; z-index: 9000","mat-mini-fab","","aria-label","Example icon button with a heart icon","color","accent",3,"click",4,"ngIf"],["mat-mini-fab","","aria-label","Example icon button with a heart icon","color","accent",2,"position","absolute","bottom","1rem","right","1rem","z-index","1",3,"click"],["mat-mini-fab","","aria-label","Example icon button with a heart icon","color","accent",2,"position","absolute","bottom","1rem","right","1rem","z-index","9000",3,"click"]],template:function(p,v){1&p&&(o.TgZ(0,"div",0)(1,"a",1),o._UZ(2,"img",2),o.qZA(),o.TgZ(3,"div",3)(4,"div",4)(5,"span",5),o._uU(6),o._UZ(7,"i",6),o.qZA(),o.YNc(8,c,3,1,"span",7),o.qZA()(),o.YNc(9,A,3,2,"ng-container",8),o.qZA(),o.TgZ(10,"a",1)(11,"h3",9),o._uU(12),o.qZA()()),2&p&&(o.xp6(1),o.Q6J("routerLink",o.VKq(9,Z,v.game.slug)),o.xp6(1),o.Q6J("src",null!=v.game.cover&&v.game.cover.imageId?"https://images.igdb.com/igdb/image/upload/t_720p/"+v.game.cover.imageId+".jpg":"assets/imgs/missing picture.png",o.LSH)("alt",v.game.name)("ngClass",o.VKq(11,H,v.game.selectedByUser)),o.xp6(4),o.hij("",v.game.countMusics," "),o.xp6(2),o.Q6J("ngIf",v.isAdminSearchComponent),o.xp6(1),o.Q6J("ngIf",!1===v.isAdminSearchComponent),o.xp6(1),o.Q6J("routerLink",o.VKq(13,Z,v.game.slug)),o.xp6(2),o.Oqu(v.game.name))},directives:[I.yS,D.mk,D.O5,u.lW,x.Hw],encapsulation:2}),f})()},7961:(W,w,l)=>{l.d(w,{X:()=>t});class t{}},9685:(W,w,l)=>{l.d(w,{Ry:()=>ut,Rq:()=>pt});var t=l(5e3),o=l(9646),h=l(4968),b=l(4986),I=l(4482),D=l(5403),u=l(8421);const x={leading:!0,trailing:!1};var T=l(5963);var A=l(5577),Z=l(4004),H=l(8505),K=l(9300);function O(e,n,i,s){const d=window&&!!window.document&&window.document.documentElement;let g=d&&n?window:i;if(e&&(g=e&&d&&"string"==typeof e?function p(e,n,i){return(i?window.document:n).querySelector(e)}(e,i.nativeElement,s):e,!g))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return g}function v(e){return e&&!e.firstChange}const B={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},F={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"};class R{constructor(n=!0){this.vertical=n,this.propsMap=n?B:F}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}}function r(e){return["Window","global"].some(i=>Object.prototype.toString.call(e).includes(i))}function m(e,n){return e?n.document.documentElement:null}function G(e,n){const i=function V({container:e,isWindow:n,axis:i}){const{offsetHeightKey:s,clientHeightKey:d}=Q(i);return z(e,n,s,d)}(n);return n.isWindow?function J(e,n,i){const{axis:s,container:d,isWindow:g}=i,{offsetHeightKey:S,clientHeightKey:E}=Q(s),y=e+j(m(g,d),s,g),C=z(n.nativeElement,g,S,E),P=function tt(e,n,i){const s=n.topKey();if(e.getBoundingClientRect)return e.getBoundingClientRect()[s]+j(e,n,i)}(n.nativeElement,s,g)+C;return{height:e,scrolled:y,totalToScroll:P,isWindow:g}}(i,e,n):function X(e,n,i){const{axis:s,container:d}=i;return{height:e,scrolled:d[s.scrollTopKey()],totalToScroll:d[s.scrollHeightKey()],isWindow:!1}}(i,0,n)}function Q(e){return{offsetHeightKey:e.offsetHeightKey(),clientHeightKey:e.clientHeightKey()}}function z(e,n,i,s){if(isNaN(e[i])){const d=m(n,e);return d?d[s]:0}return e[i]}function j(e,n,i){const s=n.pageYOffsetKey(),d=n.scrollTopKey(),g=n.offsetTopKey();return isNaN(window.pageYOffset)?m(i,e)[d]:e.ownerDocument?e.ownerDocument.defaultView[s]:e[g]}function et(e,n={down:0,up:0},i){let s,d;if(e.totalToScroll<=0)return!1;const g=e.isWindow?e.scrolled:e.height+e.scrolled;return i?(s=(e.totalToScroll-g)/e.totalToScroll,d=((null==n?void 0:n.down)?n.down:0)/10):(s=e.scrolled/(e.scrolled+(e.totalToScroll-g)),d=((null==n?void 0:n.up)?n.up:0)/10),s<=d}class st{constructor({totalToScroll:n}){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=n}updateScrollPosition(n){return this.lastScrollPosition=n}updateTotalToScroll(n){this.lastTotalToScroll!==n&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=n)}updateScroll(n,i){this.updateScrollPosition(n),this.updateTotalToScroll(i)}updateTriggeredFlag(n,i){i?this.triggered.down=n:this.triggered.up=n}isTriggeredScroll(n,i){return i?this.triggered.down===n:this.triggered.up===n}}function lt(e){const{scrollContainer:n,scrollWindow:i,element:s,fromRoot:d}=e,g=function a({windowElement:e,axis:n}){return function _(e,n){const i=e.isWindow||n&&!n.nativeElement?n:n.nativeElement;return Object.assign(Object.assign({},e),{container:i})}({axis:n,isWindow:r(e)},e)}({axis:new R(!e.horizontal),windowElement:O(n,i,s,d)}),S=new st({totalToScroll:G(s,g)}),y={up:e.upDistance,down:e.downDistance};return function at(e){let n=(0,h.R)(e.container,"scroll");return e.throttle&&(n=n.pipe(function U(e,n=b.z,i=x){const s=(0,T.H)(e,n);return function c(e,n=x){return(0,I.e)((i,s)=>{const{leading:d,trailing:g}=n;let S=!1,E=null,y=null,C=!1;const P=()=>{null==y||y.unsubscribe(),y=null,g&&(k(),C&&s.complete())},$=()=>{y=null,C&&s.complete()},q=N=>y=(0,u.Xf)(e(N)).subscribe((0,D.x)(s,P,$)),k=()=>{if(S){S=!1;const N=E;E=null,s.next(N),!C&&q(N)}};i.subscribe((0,D.x)(s,N=>{S=!0,E=N,(!y||y.closed)&&(d?k():q(N))},()=>{C=!0,(!(g&&S&&y)||y.closed)&&s.complete()}))})}(()=>s,i)}(e.throttle,void 0,{leading:!0,trailing:!0}))),n}({container:g.container,throttle:e.throttle}).pipe((0,A.z)(()=>(0,o.of)(G(s,g))),(0,Z.U)(C=>function ct(e,n,i){const{scrollDown:s,fire:d}=function ot(e,n,i){const s=function nt(e,n){return e<n.scrolled}(e,n);return{fire:et(n,i,s),scrollDown:s}}(e,n,i);return{scrollDown:s,fire:d,stats:n}}(S.lastScrollPosition,C,y)),(0,H.b)(({stats:C})=>S.updateScroll(C.scrolled,C.totalToScroll)),(0,K.h)(({fire:C,scrollDown:P,stats:{totalToScroll:$}})=>function Y(e,n,i){return!!(e&&n||!i&&n)}(e.alwaysCallback,C,S.isTriggeredScroll($,P))),(0,H.b)(({scrollDown:C,stats:{totalToScroll:P}})=>{S.updateTriggeredFlag(P,C)}),(0,Z.U)(mt))}function mt(e){const{scrollDown:n,stats:{scrolled:i}}=e;return{type:n?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:i}}}let ut=(()=>{class e{constructor(i,s){this.element=i,this.zone=s,this.scrolled=new t.vpe,this.scrolledUp=new t.vpe,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:i,infiniteScrollDisabled:s,infiniteScrollDistance:d}){const g=v(i),S=v(s),E=v(d),y=!S&&!this.infiniteScrollDisabled||S&&!s.currentValue||E;(g||S||E)&&(this.destroyScroller(),y&&this.setup())}setup(){(function M(){return"undefined"!=typeof window})()&&this.zone.runOutsideAngular(()=>{this.disposeScroller=lt({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(i=>this.zone.run(()=>this.handleOnScroll(i)))})}handleOnScroll({type:i,payload:s}){switch(i){case"[NGX_ISE] DOWN":return this.scrolled.emit(s);case"[NGX_ISE] UP":return this.scrolledUp.emit(s);default:return}}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(t.SBq),t.Y36(t.R0b))},e.\u0275dir=t.lG2({type:e,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[t.TTD]}),e})(),pt=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[],imports:[[]]}),e})()}}]);
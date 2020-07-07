(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BXcl:function(t,e,i){"use strict";i.r(e),i.d(e,"GameModule",(function(){return at}));var n=i("ofXK");class s{constructor(t){Object.assign(this,t)}}class c{constructor(t){Object.assign(this,t)}}class a{constructor(t){this.id=t.id,this.title=t.title,this.artist=t.artist,this.duration=t.duration,this.durationDate=new Date(0,0,0,0,0,this.duration),this.guessAccuracy=t.guessAccuracy,this.playNumber=t.playNumber}}class r{constructor(t){this.title=t.title,this.artist=t.artist}}class o{constructor(t){this.id=t.id,this.music=new a(t.music)}}class l{constructor(t){var e,i;this.id=t.id,this.firstReleaseDate=t.firstReleaseDate,this.name=t.name,this.slug=t.slug,this.alternativeNames=null===(e=t.alternativeNames)||void 0===e?void 0:e.map(t=>new c(t)),this.gameMusics=null===(i=t.gameMusics)||void 0===i?void 0:i.map(t=>new o(t)),this.cover=new s(t.cover),this.enabled=t.enabled}}class b{constructor(t){this.errors=[],this.errors=t.errors}}var u=i("nYR2"),d=i("fXoL"),g=i("z6cu"),m=i("AytR"),p=i("JIr8"),h=i("tk/3");let f=(()=>{class t{constructor(t){this.http=t,this.apiEndpoint=m.a.apiEndpoint}search(t,e){return this.http.get(this.apiEndpoint+"/admin/games",{params:{...(null==t?void 0:t.length)>0&&{query:t},...e&&{showDisabled:"true"}}})}get(t){return this.http.get(`${this.apiEndpoint}/admin/games/${t}`)}uploadMusics(t,e){const i=new FormData;for(const n of e)i.append("music_files[files][]",n);return this.http.post(`${this.apiEndpoint}/admin/games/${t}/musics/upload`,i).pipe(Object(p.a)(t=>Object(g.a)(new b(t.error))))}saveMusic(t,e){return this.http.patch(`${this.apiEndpoint}/admin/musics/${t.id}`,e).pipe(Object(p.a)(t=>Object(g.a)(new r(t.error.errors))))}deleteGameMusic(t){return this.http.delete(`${this.apiEndpoint}/admin/games-musics/${t.id}`)}toggleGame(t){return this.http.patch(`${this.apiEndpoint}/admin/games/${t.slug}/toggle`,null).pipe(Object(p.a)(t=>Object(g.a)(t.error)))}toggleAlternativeName(t){return this.http.patch(`${this.apiEndpoint}/admin/alternative-names/${t.id}/toggle`,null).pipe(Object(p.a)(t=>Object(g.a)(t.error)))}}return t.\u0275fac=function(e){return new(e||t)(d.Sb(h.b))},t.\u0275prov=d.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var N=i("1jcm"),O=i("3Pt+"),v=i("tyNb");function M(t,e){if(1&t&&(d.Ob(0,"h1"),d.sc(1),d.Nb()),2&t){const t=d.Zb();d.zb(1),d.uc("",t.gamesCount," games")}}function w(t,e){1&t&&(d.Mb(0),d.Ob(1,"div",6),d.Ob(2,"div",7),d.Ob(3,"span",8),d.sc(4,"Loading..."),d.Nb(),d.Nb(),d.Nb(),d.Lb())}function y(t,e){if(1&t&&d.Kb(0,"img",16),2&t){const t=d.Zb().$implicit;d.fc("src","https://images.igdb.com/igdb/image/upload/t_720p/",t.cover.imageId,".jpg",d.nc)}}const k=function(t){return["/admin/games/",t]};function z(t,e){if(1&t&&(d.Ob(0,"a",11),d.qc(1,y,1,1,"img",12),d.Ob(2,"div",13),d.Ob(3,"h3",14),d.sc(4),d.Nb(),d.Ob(5,"p",15),d.sc(6),d.ac(7,"date"),d.Nb(),d.Nb(),d.Nb()),2&t){const t=e.$implicit;d.ec("routerLink",d.hc(7,k,t.slug)),d.zb(1),d.ec("ngIf",t.cover.imageId),d.zb(3),d.tc(t.name),d.zb(2),d.tc(d.bc(7,4,t.firstReleaseDate,"y"))}}function I(t,e){if(1&t&&(d.Ob(0,"div",9),d.qc(1,z,8,9,"a",10),d.Nb()),2&t){const t=d.Zb();d.zb(1),d.ec("ngForOf",t.games)}}let q=(()=>{class t{constructor(t){this.adminGameHttpService=t,this.games=[],this.query="",this.showDisabled=!1,this.loading=!1}ngOnInit(){this.search()}search(){this.http&&this.http.unsubscribe(),this.loading=!0,this.http=this.adminGameHttpService.search(this.query,this.showDisabled).pipe(Object(u.a)(()=>this.loading=!1)).subscribe(t=>{this.gamesCount=t.count,this.games=t.data.map(t=>new l(t))})}toggleShowDisabled(){this.showDisabled=!this.showDisabled,this.search()}}return t.\u0275fac=function(e){return new(e||t)(d.Jb(f))},t.\u0275cmp=d.Db({type:t,selectors:[["app-game-search"]],decls:10,vars:6,consts:[[1,"form-group"],[4,"ngIf"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["type","text","id","exampleFormControlInput1","placeholder","game...",1,"form-control",3,"ngModel","ngModelChange","keyup"],[4,"ngIf","ngIfElse"],["cardColumns",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"card-columns","admin-card-columns"],["class","card","style","width: 18rem;",3,"routerLink",4,"ngFor","ngForOf"],[1,"card",2,"width","18rem",3,"routerLink"],["class","card-img-top","alt","...",3,"src",4,"ngIf"],[1,"card-body"],[1,"card-title","orange"],[1,"card-text"],["alt","...",1,"card-img-top",3,"src"]],template:function(t,e){if(1&t&&(d.Ob(0,"div",0),d.qc(1,M,2,1,"h1",1),d.Ob(2,"div",0),d.Ob(3,"label"),d.sc(4,"Show disabled game"),d.Nb(),d.Ob(5,"mat-slide-toggle",2),d.Vb("ngModelChange",(function(t){return e.showDisabled=t}))("click",(function(){return e.loading||e.toggleShowDisabled()})),d.Nb(),d.Nb(),d.Ob(6,"input",3),d.Vb("ngModelChange",(function(t){return e.query=t}))("keyup",(function(){return e.search()})),d.Nb(),d.Nb(),d.qc(7,w,5,0,"ng-container",4),d.qc(8,I,2,1,"ng-template",null,5,d.rc)),2&t){const t=d.kc(9);d.zb(1),d.ec("ngIf",e.gamesCount),d.zb(4),d.ec("ngModel",e.showDisabled)("disabled",e.loading),d.zb(1),d.ec("ngModel",e.query),d.zb(1),d.ec("ngIf",e.loading)("ngIfElse",t)}},directives:[n.k,N.a,O.k,O.m,O.b,n.j,v.e],pipes:[n.d],encapsulation:2}),t})();var E=i("PCNd"),G=i("Xa2L"),L=i("6NWb");const D=["musicRow",""];function F(t,e){if(1&t&&(d.Mb(0),d.Ob(1,"th",3),d.sc(2),d.Nb(),d.Ob(3,"td"),d.sc(4),d.Nb(),d.Lb()),2&t){const t=d.Zb();d.zb(2),d.tc(t.gameMusic.music.title),d.zb(2),d.tc(t.gameMusic.music.artist)}}function C(t,e){1&t&&(d.Mb(0),d.sc(1," title cannot be empty "),d.Lb())}function j(t,e){if(1&t&&(d.Mb(0),d.sc(1),d.Lb()),2&t){const t=d.Zb(3);d.zb(1),d.uc(" ",t.title.errors.apiError[0]," ")}}function Z(t,e){if(1&t&&(d.Ob(0,"div",8),d.qc(1,C,2,0,"ng-container",9),d.qc(2,j,2,1,"ng-container",9),d.Nb()),2&t){const t=d.Zb(2);d.zb(1),d.ec("ngIf",t.title.errors.required),d.zb(1),d.ec("ngIf",t.title.errors.apiError)}}const $=function(t){return{"is-invalid":t}};function S(t,e){if(1&t&&(d.Mb(0,4),d.Ob(1,"th",3),d.Kb(2,"input",5),d.qc(3,Z,3,2,"div",6),d.Nb(),d.Ob(4,"td"),d.Kb(5,"input",7),d.Nb(),d.Lb()),2&t){const t=d.Zb();d.ec("formGroup",t.formGroup),d.zb(2),d.ec("ngClass",d.hc(3,$,t.title.invalid&&(t.title.dirty||t.title.touched))),d.zb(1),d.ec("ngIf",t.title.errors)}}function H(t,e){1&t&&(d.Mb(0),d.Ob(1,"div",10),d.Ob(2,"span",11),d.sc(3,"Loading..."),d.Nb(),d.Nb(),d.Lb())}const K=function(){return["fas","pen"]},R=function(){return["fas","times"]};function x(t,e){if(1&t){const t=d.Pb();d.Mb(0),d.Ob(1,"button",13),d.Vb("click",(function(){return d.lc(t),d.Zb(2).createFormGroup()})),d.Kb(2,"fa-icon",14),d.Nb(),d.Ob(3,"button",15),d.Vb("click",(function(){return d.lc(t),d.Zb(2).delete()})),d.Kb(4,"fa-icon",14),d.Nb(),d.Lb()}2&t&&(d.zb(2),d.ec("icon",d.gc(2,K)),d.zb(2),d.ec("icon",d.gc(3,R)))}const V=function(){return["fas","check"]};function J(t,e){if(1&t){const t=d.Pb();d.Ob(0,"button",16),d.Vb("click",(function(){return d.lc(t),d.Zb(2).save()})),d.Kb(1,"fa-icon",14),d.Nb(),d.Ob(2,"button",15),d.Vb("click",(function(){return d.lc(t),d.Zb(2).cancel()})),d.Kb(3,"fa-icon",14),d.Nb()}2&t&&(d.zb(1),d.ec("icon",d.gc(2,V)),d.zb(2),d.ec("icon",d.gc(3,R)))}function A(t,e){if(1&t&&(d.qc(0,x,5,4,"ng-container",0),d.qc(1,J,4,4,"ng-template",null,12,d.rc)),2&t){const t=d.kc(2),e=d.Zb();d.ec("ngIf",!e.edit)("ngIfElse",t)}}let B=(()=>{class t{constructor(t,e){this.formBuilder=t,this.adminGameHttpService=e,this.onDelete=new d.n,this.edit=!1,this.loading=!1}createFormGroup(){this.edit=!0,this.formGroup=new O.f({title:new O.d(this.gameMusic.music.title,O.p.required.bind(this)),artist:new O.d(this.gameMusic.music.artist)})}get title(){return this.formGroup.get("title")}get artist(){return this.formGroup.get("artist")}cancel(){this.edit=!1,this.formGroup.reset()}save(){this.loading=!0,this.adminGameHttpService.saveMusic(this.gameMusic.music,this.formGroup.value).pipe(Object(u.a)(()=>this.loading=!1)).subscribe(t=>{this.gameMusic.music=t,this.edit=!1},t=>{t.title&&this.title.setErrors({apiError:t.title}),t.artist&&this.artist.setErrors({apiError:t.artist})})}delete(){this.loading=!0,this.adminGameHttpService.deleteGameMusic(this.gameMusic).pipe(Object(u.a)(()=>this.loading=!1)).subscribe(()=>{this.onDelete.emit(this.gameMusic)})}}return t.\u0275fac=function(e){return new(e||t)(d.Jb(O.c),d.Jb(f))},t.\u0275cmp=d.Db({type:t,selectors:[["","musicRow",""]],inputs:{gameMusic:"gameMusic"},outputs:{onDelete:"onDelete"},attrs:D,decls:14,vars:10,consts:[[4,"ngIf","ngIfElse"],["editMusic",""],["musicRowButtons",""],["scope","row"],[3,"formGroup"],["formControlName","title",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["formControlName","artist"],[1,"invalid-feedback"],[4,"ngIf"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"],["editMusicButtons",""],[1,"btn","btn-sm","btn-primary",3,"click"],[3,"icon"],[1,"btn","btn-sm","btn-danger",3,"click"],[1,"btn","btn-sm","btn-success",3,"click"]],template:function(t,e){if(1&t&&(d.qc(0,F,5,2,"ng-container",0),d.qc(1,S,6,5,"ng-template",null,1,d.rc),d.Ob(3,"td"),d.sc(4),d.ac(5,"date"),d.Nb(),d.Ob(6,"td"),d.sc(7),d.Nb(),d.Ob(8,"td"),d.sc(9),d.Nb(),d.Ob(10,"td"),d.qc(11,H,4,0,"ng-container",0),d.qc(12,A,3,2,"ng-template",null,2,d.rc),d.Nb()),2&t){const t=d.kc(2),i=d.kc(13);d.ec("ngIf",!e.edit)("ngIfElse",t),d.zb(4),d.tc(d.bc(5,7,e.gameMusic.music.durationDate,"HH:mm:ss")),d.zb(3),d.tc(e.gameMusic.music.guessAccuracy||"-"),d.zb(2),d.tc(e.gameMusic.music.playNumber),d.zb(2),d.ec("ngIf",e.loading)("ngIfElse",i)}},directives:[n.k,O.l,O.g,O.b,O.k,O.e,n.i,L.a],pipes:[n.d],encapsulation:2}),t})();const P=["alternativeNameRow",""];function U(t,e){1&t&&d.Kb(0,"mat-spinner",3)}let X=(()=>{class t{constructor(t){this.adminGameHttpService=t,this.loading=!1}toggle(){this.loading=!0,this.adminGameHttpService.toggleAlternativeName(this.alternativeName).pipe(Object(u.a)(()=>this.loading=!1)).subscribe(()=>{this.alternativeName.enabled=!this.alternativeName.enabled})}}return t.\u0275fac=function(e){return new(e||t)(d.Jb(f))},t.\u0275cmp=d.Db({type:t,selectors:[["","alternativeNameRow",""]],inputs:{alternativeName:"alternativeName"},attrs:P,decls:5,vars:4,consts:[["scope","row"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["color","primary",4,"ngIf"],["color","primary"]],template:function(t,e){1&t&&(d.Ob(0,"th",0),d.sc(1),d.Nb(),d.Ob(2,"td"),d.Ob(3,"mat-slide-toggle",1),d.Vb("ngModelChange",(function(t){return e.alternativeName.enabled=t}))("click",(function(){return e.loading||e.toggle()})),d.Nb(),d.qc(4,U,1,0,"mat-spinner",2),d.Nb()),2&t&&(d.zb(1),d.tc(e.alternativeName.name),d.zb(2),d.ec("ngModel",e.alternativeName.enabled)("disabled",e.loading),d.zb(1),d.ec("ngIf",e.loading))},directives:[N.a,O.k,O.m,n.k,G.b],encapsulation:2}),t})();function _(t,e){1&t&&(d.Mb(0),d.Ob(1,"div",3),d.Ob(2,"div",4),d.Ob(3,"span",5),d.sc(4,"Loading..."),d.Nb(),d.Nb(),d.Nb(),d.Lb())}function W(t,e){1&t&&d.Kb(0,"mat-spinner",22)}function Y(t,e){if(1&t&&(d.Ob(0,"span",23),d.sc(1),d.Nb()),2&t){const t=d.Zb(2);d.zb(1),d.tc(t.toggleErrorMessage)}}function Q(t,e){if(1&t&&(d.Ob(0,"div",25),d.sc(1),d.Nb()),2&t){const t=e.$implicit;d.zb(1),d.uc(" ",t," ")}}function T(t,e){if(1&t&&(d.Mb(0),d.qc(1,Q,2,1,"div",24),d.Lb()),2&t){const t=d.Zb(2);d.zb(1),d.ec("ngForOf",t.musics.errors.apiErrors)}}function tt(t,e){1&t&&d.Kb(0,"span",26)}function et(t,e){if(1&t){const t=d.Pb();d.Mb(0),d.Ob(1,"tr",27),d.Vb("onDelete",(function(e){return d.lc(t),d.Zb(2).handleGameMusicDeleted(e)})),d.Nb(),d.Lb()}if(2&t){const t=e.$implicit;d.zb(1),d.ec("gameMusic",t)}}function it(t,e){if(1&t&&(d.Mb(0),d.Kb(1,"tr",28),d.Lb()),2&t){const t=e.$implicit;d.zb(1),d.ec("alternativeName",t)}}const nt=function(t){return{"is-invalid":t}};function st(t,e){if(1&t){const t=d.Pb();d.Ob(0,"h1"),d.sc(1),d.Nb(),d.Ob(2,"div",6),d.Ob(3,"div",7),d.sc(4," enabled "),d.Ob(5,"mat-slide-toggle",8),d.Vb("ngModelChange",(function(e){return d.lc(t),d.Zb().game.enabled=e}))("click",(function(){d.lc(t);const e=d.Zb();return e.loading||e.toggle()})),d.Nb(),d.qc(6,W,1,0,"mat-spinner",9),d.qc(7,Y,2,1,"span",10),d.Nb(),d.Ob(8,"div",11),d.Ob(9,"h2"),d.sc(10,"Musics"),d.Nb(),d.Ob(11,"div",12),d.Ob(12,"label",13),d.sc(13,"add musics"),d.Nb(),d.Ob(14,"input",14),d.Vb("change",(function(e){return d.lc(t),d.Zb().fileUpload(e)})),d.Nb(),d.qc(15,T,2,1,"ng-container",15),d.Ob(16,"button",16),d.Vb("click",(function(){d.lc(t);const e=d.Zb();return e.uploadLoading||0===e.musicFiles.length||e.uploadMusic()})),d.sc(17," Upload "),d.qc(18,tt,1,0,"span",17),d.Nb(),d.Nb(),d.Ob(19,"table",18),d.Ob(20,"thead",19),d.Ob(21,"tr"),d.Ob(22,"th",20),d.sc(23,"title"),d.Nb(),d.Ob(24,"th",20),d.sc(25,"artist"),d.Nb(),d.Ob(26,"th",20),d.sc(27,"duration"),d.Nb(),d.Ob(28,"th",20),d.sc(29,"accuracy"),d.Nb(),d.Ob(30,"th",20),d.sc(31,"played"),d.Nb(),d.Ob(32,"th",20),d.sc(33,"action"),d.Nb(),d.Nb(),d.Nb(),d.Ob(34,"tbody"),d.qc(35,et,2,1,"ng-container",21),d.Nb(),d.Nb(),d.Nb(),d.Ob(36,"div",11),d.Ob(37,"table",18),d.Ob(38,"thead",19),d.Ob(39,"tr"),d.Ob(40,"th",20),d.sc(41,"Alternative names"),d.Nb(),d.Ob(42,"th",20),d.sc(43,"Enabled"),d.Nb(),d.Nb(),d.Nb(),d.Ob(44,"tbody"),d.qc(45,it,2,1,"ng-container",21),d.Nb(),d.Nb(),d.Nb(),d.Nb()}if(2&t){const t=d.Zb();d.zb(1),d.tc(t.game.name),d.zb(4),d.ec("ngModel",t.game.enabled)("disabled",t.toggleLoading),d.zb(1),d.ec("ngIf",t.toggleLoading),d.zb(1),d.ec("ngIf",t.toggleErrorMessage),d.zb(4),d.ec("formGroup",t.musicUploadForm),d.zb(3),d.ec("ngClass",d.hc(12,nt,t.musics.invalid&&(t.musics.dirty||t.musics.touched))),d.zb(1),d.ec("ngIf",t.musics.errors),d.zb(1),d.ec("disabled",t.uploadLoading||0===t.musicFiles.length),d.zb(2),d.ec("ngIf",t.uploadLoading),d.zb(17),d.ec("ngForOf",t.game.gameMusics),d.zb(10),d.ec("ngForOf",t.game.alternativeNames)}}const ct=[{path:":slug",component:(()=>{class t{constructor(t,e,i){this.adminGameHttpService=t,this.route=e,this.formBuilder=i,this.loading=!1,this.uploadLoading=!1,this.musicFiles=[],this.toggleLoading=!1}get musics(){return this.musicUploadForm.get("musics")}ngOnInit(){this.loading=!0,this.adminGameHttpService.get(this.route.snapshot.paramMap.get("slug")).subscribe(t=>{this.game=new l(t),this.loading=!1}),this.musicUploadForm=this.formBuilder.group({musics:[null,[O.p.required.bind(this)]]})}uploadMusic(){this.uploadLoading=!0,this.adminGameHttpService.uploadMusics(this.route.snapshot.paramMap.get("slug"),this.musicFiles).pipe(Object(u.a)(()=>this.uploadLoading=!1)).subscribe(t=>{this.game=new l(t)},t=>{t.errors.forEach(t=>{this.musics.setErrors({apiErrors:t})})})}fileUpload(t){this.musicFiles=t.target.files&&t.target.files.length?t.target.files:[]}handleGameMusicDeleted(t){this.game.gameMusics.splice(this.game.gameMusics.indexOf(this.game.gameMusics.find(e=>e.id===t.id)),1)}toggle(){this.toggleErrorMessage=void 0,this.toggleLoading=!0,this.adminGameHttpService.toggleGame(this.game).pipe(Object(u.a)(()=>this.toggleLoading=!1)).subscribe(t=>{this.game=t},t=>{this.toggleErrorMessage=t})}}return t.\u0275fac=function(e){return new(e||t)(d.Jb(f),d.Jb(v.a),d.Jb(O.c))},t.\u0275cmp=d.Db({type:t,selectors:[["app-game-show"]],decls:5,vars:2,consts:[["routerLink","admin/games",1,"btn","btn-info"],[4,"ngIf","ngIfElse"],["gameShow",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"row"],[1,"col-md-12"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["color","primary",4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"col-md-6"],[1,"form-group",3,"formGroup"],["for","exampleFormControlFile1"],["type","file","id","exampleFormControlFile1","formControlName","musics","multiple","","accept","audio/mpeg",1,"form-control-file",3,"ngClass","change"],[4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"table"],[1,"thead-dark"],["scope","col"],[4,"ngFor","ngForOf"],["color","primary"],[1,"text-danger"],["class","invalid-feedback",4,"ngFor","ngForOf"],[1,"invalid-feedback"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"],["musicRow","",3,"gameMusic","onDelete"],["alternativeNameRow","",3,"alternativeName"]],template:function(t,e){if(1&t&&(d.Ob(0,"a",0),d.sc(1,"back to list"),d.Nb(),d.qc(2,_,5,0,"ng-container",1),d.qc(3,st,46,14,"ng-template",null,2,d.rc)),2&t){const t=d.kc(4);d.zb(2),d.ec("ngIf",e.loading)("ngIfElse",t)}},directives:[v.e,n.k,N.a,O.k,O.m,O.l,O.g,O.b,O.e,n.i,n.j,G.b,B,X],encapsulation:2}),t})()},{path:"",component:q}];let at=(()=>{class t{}return t.\u0275mod=d.Hb({type:t}),t.\u0275inj=d.Gb({factory:function(e){return new(e||t)},imports:[[n.b,v.f.forChild(ct),E.a]]}),t})()}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BXcl:function(t,e,i){"use strict";i.r(e),i.d(e,"GameModule",(function(){return et}));var n=i("ofXK"),c=i("x3yr"),s=i("nYR2"),a=i("fXoL"),o=i("z6cu"),r=i("AytR"),b=i("JIr8"),l=i("lA9T"),g=i("tk/3");let u=(()=>{class t{constructor(t){this.http=t,this.apiEndpoint=r.a.apiEndpoint}search(t,e){return this.http.get(this.apiEndpoint+"/admin/games",{params:{...(null==t?void 0:t.length)>0&&{query:t},...e&&{showDisabled:"true"}}})}get(t){return this.http.get(`${this.apiEndpoint}/admin/games/${t}`)}uploadMusics(t,e){const i=new FormData;for(const n of e)i.append("music_files[files][]",n);return this.http.post(`${this.apiEndpoint}/admin/games/${t}/musics/upload`,i).pipe(Object(b.a)(t=>Object(o.a)(new c.b(t.error))))}saveMusic(t,e){return this.http.patch(`${this.apiEndpoint}/admin/musics/${t.id}`,e).pipe(Object(b.a)(t=>Object(o.a)(new l.a(t.error.errors))))}deleteGameMusic(t){return this.http.delete(`${this.apiEndpoint}/admin/games-musics/${t.id}`)}toggleGame(t){return this.http.patch(`${this.apiEndpoint}/admin/games/${t.slug}/toggle`,null).pipe(Object(b.a)(t=>Object(o.a)(t.error)))}toggleAlternativeName(t){return this.http.patch(`${this.apiEndpoint}/admin/alternative-names/${t.id}/toggle`,null).pipe(Object(b.a)(t=>Object(o.a)(t.error)))}}return t.\u0275fac=function(e){return new(e||t)(a.Sb(g.b))},t.\u0275prov=a.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var d=i("1jcm"),m=i("3Pt+"),p=i("tyNb");function h(t,e){if(1&t&&(a.Ob(0,"h1"),a.yc(1),a.Nb()),2&t){const t=a.Zb();a.zb(1),a.Ac("",t.gamesCount," games")}}function f(t,e){1&t&&(a.Mb(0),a.Ob(1,"div",6),a.Ob(2,"div",7),a.Ob(3,"span",8),a.yc(4,"Loading..."),a.Nb(),a.Nb(),a.Nb(),a.Lb())}function O(t,e){if(1&t&&a.Kb(0,"img",16),2&t){const t=a.Zb().$implicit;a.hc("src","https://images.igdb.com/igdb/image/upload/t_720p/",t.cover.imageId,".jpg",a.pc)}}const N=function(t){return["/admin/games/",t]};function v(t,e){if(1&t&&(a.Ob(0,"a",11),a.wc(1,O,1,1,"img",12),a.Ob(2,"div",13),a.Ob(3,"h3",14),a.yc(4),a.Nb(),a.Ob(5,"p",15),a.yc(6),a.ac(7,"date"),a.Nb(),a.Nb(),a.Nb()),2&t){const t=e.$implicit;a.gc("routerLink",a.jc(7,N,t.slug)),a.zb(1),a.gc("ngIf",t.cover.imageId),a.zb(3),a.zc(t.name),a.zb(2),a.zc(a.cc(7,4,t.firstReleaseDate,"y"))}}function y(t,e){if(1&t&&(a.Ob(0,"div",9),a.wc(1,v,8,9,"a",10),a.Nb()),2&t){const t=a.Zb();a.zb(1),a.gc("ngForOf",t.games)}}let w=(()=>{class t{constructor(t){this.adminGameHttpService=t,this.games=[],this.query="",this.showDisabled=!1,this.loading=!1}ngOnInit(){this.search()}search(){this.http&&this.http.unsubscribe(),this.loading=!0,this.http=this.adminGameHttpService.search(this.query,this.showDisabled).pipe(Object(s.a)(()=>this.loading=!1)).subscribe(t=>{this.gamesCount=t.count,this.games=t.data.map(t=>new c.a(t))})}toggleShowDisabled(){this.showDisabled=!this.showDisabled,this.search()}}return t.\u0275fac=function(e){return new(e||t)(a.Jb(u))},t.\u0275cmp=a.Db({type:t,selectors:[["app-game-search"]],decls:10,vars:6,consts:[[1,"form-group"],[4,"ngIf"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["type","text","id","exampleFormControlInput1","placeholder","game...",1,"form-control",3,"ngModel","ngModelChange","keyup"],[4,"ngIf","ngIfElse"],["cardColumns",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"card-columns","admin-card-columns"],["class","card","style","width: 18rem;",3,"routerLink",4,"ngFor","ngForOf"],[1,"card",2,"width","18rem",3,"routerLink"],["class","card-img-top","alt","...",3,"src",4,"ngIf"],[1,"card-body"],[1,"card-title","orange"],[1,"card-text"],["alt","...",1,"card-img-top",3,"src"]],template:function(t,e){if(1&t&&(a.Ob(0,"div",0),a.wc(1,h,2,1,"h1",1),a.Ob(2,"div",0),a.Ob(3,"label"),a.yc(4,"Show disabled game"),a.Nb(),a.Ob(5,"mat-slide-toggle",2),a.Vb("ngModelChange",(function(t){return e.showDisabled=t}))("click",(function(){return e.loading||e.toggleShowDisabled()})),a.Nb(),a.Nb(),a.Ob(6,"input",3),a.Vb("ngModelChange",(function(t){return e.query=t}))("keyup",(function(){return e.search()})),a.Nb(),a.Nb(),a.wc(7,f,5,0,"ng-container",4),a.wc(8,y,2,1,"ng-template",null,5,a.xc)),2&t){const t=a.mc(9);a.zb(1),a.gc("ngIf",e.gamesCount),a.zb(4),a.gc("ngModel",e.showDisabled)("disabled",e.loading),a.zb(1),a.gc("ngModel",e.query),a.zb(1),a.gc("ngIf",e.loading)("ngIfElse",t)}},directives:[n.l,d.a,m.m,m.p,m.b,n.k,p.e],pipes:[n.e],encapsulation:2}),t})();var M=i("PCNd"),z=i("Xa2L"),I=i("6NWb");const k=["musicRow",""];function E(t,e){if(1&t&&(a.Mb(0),a.Ob(1,"th",3),a.yc(2),a.Nb(),a.Ob(3,"td"),a.yc(4),a.Nb(),a.Lb()),2&t){const t=a.Zb();a.zb(2),a.zc(t.gameMusic.music.title),a.zb(2),a.zc(t.gameMusic.music.artist)}}function G(t,e){1&t&&(a.Mb(0),a.yc(1," title cannot be empty "),a.Lb())}function L(t,e){if(1&t&&(a.Mb(0),a.yc(1),a.Lb()),2&t){const t=a.Zb(3);a.zb(1),a.Ac(" ",t.title.errors.apiError[0]," ")}}function F(t,e){if(1&t&&(a.Ob(0,"div",8),a.wc(1,G,2,0,"ng-container",9),a.wc(2,L,2,1,"ng-container",9),a.Nb()),2&t){const t=a.Zb(2);a.zb(1),a.gc("ngIf",t.title.errors.required),a.zb(1),a.gc("ngIf",t.title.errors.apiError)}}const j=function(t){return{"is-invalid":t}};function C(t,e){if(1&t&&(a.Mb(0,4),a.Ob(1,"th",3),a.Kb(2,"input",5),a.wc(3,F,3,2,"div",6),a.Nb(),a.Ob(4,"td"),a.Kb(5,"input",7),a.Nb(),a.Lb()),2&t){const t=a.Zb();a.gc("formGroup",t.formGroup),a.zb(2),a.gc("ngClass",a.jc(3,j,t.title.invalid&&(t.title.dirty||t.title.touched))),a.zb(1),a.gc("ngIf",t.title.errors)}}function D(t,e){1&t&&(a.Mb(0),a.Ob(1,"div",10),a.Ob(2,"span",11),a.yc(3,"Loading..."),a.Nb(),a.Nb(),a.Lb())}const Z=function(){return["fas","pen"]},x=function(){return["fas","times"]};function $(t,e){if(1&t){const t=a.Pb();a.Mb(0),a.Ob(1,"button",13),a.Vb("click",(function(){return a.nc(t),a.Zb(2).createFormGroup()})),a.Kb(2,"fa-icon",14),a.Nb(),a.Ob(3,"button",15),a.Vb("click",(function(){return a.nc(t),a.Zb(2).delete()})),a.Kb(4,"fa-icon",14),a.Nb(),a.Lb()}2&t&&(a.zb(2),a.gc("icon",a.ic(2,Z)),a.zb(2),a.gc("icon",a.ic(3,x)))}const S=function(){return["fas","check"]};function H(t,e){if(1&t){const t=a.Pb();a.Ob(0,"button",16),a.Vb("click",(function(){return a.nc(t),a.Zb(2).save()})),a.Kb(1,"fa-icon",14),a.Nb(),a.Ob(2,"button",15),a.Vb("click",(function(){return a.nc(t),a.Zb(2).cancel()})),a.Kb(3,"fa-icon",14),a.Nb()}2&t&&(a.zb(1),a.gc("icon",a.ic(2,S)),a.zb(2),a.gc("icon",a.ic(3,x)))}function K(t,e){if(1&t&&(a.wc(0,$,5,4,"ng-container",0),a.wc(1,H,4,4,"ng-template",null,12,a.xc)),2&t){const t=a.mc(2),e=a.Zb();a.gc("ngIf",!e.edit)("ngIfElse",t)}}let V=(()=>{class t{constructor(t,e){this.formBuilder=t,this.adminGameHttpService=e,this.onDelete=new a.n,this.edit=!1,this.loading=!1}createFormGroup(){this.edit=!0,this.formGroup=new m.g({title:new m.d(this.gameMusic.music.title,m.s.required.bind(this)),artist:new m.d(this.gameMusic.music.artist)})}get title(){return this.formGroup.get("title")}get artist(){return this.formGroup.get("artist")}cancel(){this.edit=!1,this.formGroup.reset()}save(){this.loading=!0,this.adminGameHttpService.saveMusic(this.gameMusic.music,this.formGroup.value).pipe(Object(s.a)(()=>this.loading=!1)).subscribe(t=>{this.gameMusic.music=t,this.edit=!1},t=>{t.title&&this.title.setErrors({apiError:t.title}),t.artist&&this.artist.setErrors({apiError:t.artist})})}delete(){this.loading=!0,this.adminGameHttpService.deleteGameMusic(this.gameMusic).pipe(Object(s.a)(()=>this.loading=!1)).subscribe(()=>{this.onDelete.emit(this.gameMusic)})}}return t.\u0275fac=function(e){return new(e||t)(a.Jb(m.c),a.Jb(u))},t.\u0275cmp=a.Db({type:t,selectors:[["","musicRow",""]],inputs:{gameMusic:"gameMusic"},outputs:{onDelete:"onDelete"},attrs:k,decls:14,vars:10,consts:[[4,"ngIf","ngIfElse"],["editMusic",""],["musicRowButtons",""],["scope","row"],[3,"formGroup"],["formControlName","title",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["formControlName","artist"],[1,"invalid-feedback"],[4,"ngIf"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"],["editMusicButtons",""],[1,"btn","btn-sm","btn-primary",3,"click"],[3,"icon"],[1,"btn","btn-sm","btn-danger",3,"click"],[1,"btn","btn-sm","btn-success",3,"click"]],template:function(t,e){if(1&t&&(a.wc(0,E,5,2,"ng-container",0),a.wc(1,C,6,5,"ng-template",null,1,a.xc),a.Ob(3,"td"),a.yc(4),a.ac(5,"date"),a.Nb(),a.Ob(6,"td"),a.yc(7),a.Nb(),a.Ob(8,"td"),a.yc(9),a.Nb(),a.Ob(10,"td"),a.wc(11,D,4,0,"ng-container",0),a.wc(12,K,3,2,"ng-template",null,2,a.xc),a.Nb()),2&t){const t=a.mc(2),i=a.mc(13);a.gc("ngIf",!e.edit)("ngIfElse",t),a.zb(4),a.zc(a.cc(5,7,e.gameMusic.music.durationDate,"HH:mm:ss")),a.zb(3),a.zc(e.gameMusic.music.guessAccuracy||"-"),a.zb(2),a.zc(e.gameMusic.music.playNumber),a.zb(2),a.gc("ngIf",e.loading)("ngIfElse",i)}},directives:[n.l,m.n,m.h,m.b,m.m,m.f,n.j,I.a],pipes:[n.e],encapsulation:2}),t})();const J=["alternativeNameRow",""];function R(t,e){1&t&&a.Kb(0,"mat-spinner",3)}let A=(()=>{class t{constructor(t){this.adminGameHttpService=t,this.loading=!1}toggle(){this.loading=!0,this.adminGameHttpService.toggleAlternativeName(this.alternativeName).pipe(Object(s.a)(()=>this.loading=!1)).subscribe(()=>{this.alternativeName.enabled=!this.alternativeName.enabled})}}return t.\u0275fac=function(e){return new(e||t)(a.Jb(u))},t.\u0275cmp=a.Db({type:t,selectors:[["","alternativeNameRow",""]],inputs:{alternativeName:"alternativeName"},attrs:J,decls:5,vars:4,consts:[["scope","row"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["color","primary",4,"ngIf"],["color","primary"]],template:function(t,e){1&t&&(a.Ob(0,"th",0),a.yc(1),a.Nb(),a.Ob(2,"td"),a.Ob(3,"mat-slide-toggle",1),a.Vb("ngModelChange",(function(t){return e.alternativeName.enabled=t}))("click",(function(){return e.loading||e.toggle()})),a.Nb(),a.wc(4,R,1,0,"mat-spinner",2),a.Nb()),2&t&&(a.zb(1),a.zc(e.alternativeName.name),a.zb(2),a.gc("ngModel",e.alternativeName.enabled)("disabled",e.loading),a.zb(1),a.gc("ngIf",e.loading))},directives:[d.a,m.m,m.p,n.l,z.b],encapsulation:2}),t})();function q(t,e){1&t&&(a.Mb(0),a.Ob(1,"div",3),a.Ob(2,"div",4),a.Ob(3,"span",5),a.yc(4,"Loading..."),a.Nb(),a.Nb(),a.Nb(),a.Lb())}function B(t,e){1&t&&a.Kb(0,"mat-spinner",22)}function P(t,e){if(1&t&&(a.Ob(0,"span",23),a.yc(1),a.Nb()),2&t){const t=a.Zb(2);a.zb(1),a.zc(t.toggleErrorMessage)}}function U(t,e){if(1&t&&(a.Ob(0,"div",25),a.yc(1),a.Nb()),2&t){const t=e.$implicit;a.zb(1),a.Ac(" ",t," ")}}function X(t,e){if(1&t&&(a.Mb(0),a.wc(1,U,2,1,"div",24),a.Lb()),2&t){const t=a.Zb(2);a.zb(1),a.gc("ngForOf",t.musics.errors.apiErrors)}}function _(t,e){1&t&&a.Kb(0,"span",26)}function T(t,e){if(1&t){const t=a.Pb();a.Mb(0),a.Ob(1,"tr",27),a.Vb("onDelete",(function(e){return a.nc(t),a.Zb(2).handleGameMusicDeleted(e)})),a.Nb(),a.Lb()}if(2&t){const t=e.$implicit;a.zb(1),a.gc("gameMusic",t)}}function W(t,e){if(1&t&&(a.Mb(0),a.Kb(1,"tr",28),a.Lb()),2&t){const t=e.$implicit;a.zb(1),a.gc("alternativeName",t)}}const Y=function(t){return{"is-invalid":t}};function Q(t,e){if(1&t){const t=a.Pb();a.Ob(0,"h1"),a.yc(1),a.Nb(),a.Ob(2,"div",6),a.Ob(3,"div",7),a.yc(4," enabled "),a.Ob(5,"mat-slide-toggle",8),a.Vb("ngModelChange",(function(e){return a.nc(t),a.Zb().game.enabled=e}))("click",(function(){a.nc(t);const e=a.Zb();return e.loading||e.toggle()})),a.Nb(),a.wc(6,B,1,0,"mat-spinner",9),a.wc(7,P,2,1,"span",10),a.Nb(),a.Ob(8,"div",11),a.Ob(9,"h2"),a.yc(10,"Musics"),a.Nb(),a.Ob(11,"div",12),a.Ob(12,"label",13),a.yc(13,"add musics"),a.Nb(),a.Ob(14,"input",14),a.Vb("change",(function(e){return a.nc(t),a.Zb().fileUpload(e)})),a.Nb(),a.wc(15,X,2,1,"ng-container",15),a.Ob(16,"button",16),a.Vb("click",(function(){a.nc(t);const e=a.Zb();return e.uploadLoading||0===e.musicFiles.length||e.uploadMusic()})),a.yc(17," Upload "),a.wc(18,_,1,0,"span",17),a.Nb(),a.Nb(),a.Ob(19,"table",18),a.Ob(20,"thead",19),a.Ob(21,"tr"),a.Ob(22,"th",20),a.yc(23,"title"),a.Nb(),a.Ob(24,"th",20),a.yc(25,"artist"),a.Nb(),a.Ob(26,"th",20),a.yc(27,"duration"),a.Nb(),a.Ob(28,"th",20),a.yc(29,"accuracy"),a.Nb(),a.Ob(30,"th",20),a.yc(31,"played"),a.Nb(),a.Ob(32,"th",20),a.yc(33,"action"),a.Nb(),a.Nb(),a.Nb(),a.Ob(34,"tbody"),a.wc(35,T,2,1,"ng-container",21),a.Nb(),a.Nb(),a.Nb(),a.Ob(36,"div",11),a.Ob(37,"table",18),a.Ob(38,"thead",19),a.Ob(39,"tr"),a.Ob(40,"th",20),a.yc(41,"Alternative names"),a.Nb(),a.Ob(42,"th",20),a.yc(43,"Enabled"),a.Nb(),a.Nb(),a.Nb(),a.Ob(44,"tbody"),a.wc(45,W,2,1,"ng-container",21),a.Nb(),a.Nb(),a.Nb(),a.Nb()}if(2&t){const t=a.Zb();a.zb(1),a.zc(t.game.name),a.zb(4),a.gc("ngModel",t.game.enabled)("disabled",t.toggleLoading),a.zb(1),a.gc("ngIf",t.toggleLoading),a.zb(1),a.gc("ngIf",t.toggleErrorMessage),a.zb(4),a.gc("formGroup",t.musicUploadForm),a.zb(3),a.gc("ngClass",a.jc(12,Y,t.musics.invalid&&(t.musics.dirty||t.musics.touched))),a.zb(1),a.gc("ngIf",t.musics.errors),a.zb(1),a.gc("disabled",t.uploadLoading||0===t.musicFiles.length),a.zb(2),a.gc("ngIf",t.uploadLoading),a.zb(17),a.gc("ngForOf",t.game.musics),a.zb(10),a.gc("ngForOf",t.game.alternativeNames)}}const tt=[{path:":slug",component:(()=>{class t{constructor(t,e,i){this.adminGameHttpService=t,this.route=e,this.formBuilder=i,this.loading=!1,this.uploadLoading=!1,this.musicFiles=[],this.toggleLoading=!1}get musics(){return this.musicUploadForm.get("musics")}ngOnInit(){this.loading=!0,this.adminGameHttpService.get(this.route.snapshot.paramMap.get("slug")).subscribe(t=>{this.game=new c.a(t),this.loading=!1}),this.musicUploadForm=this.formBuilder.group({musics:[null,[m.s.required.bind(this)]]})}uploadMusic(){this.uploadLoading=!0,this.adminGameHttpService.uploadMusics(this.route.snapshot.paramMap.get("slug"),this.musicFiles).pipe(Object(s.a)(()=>this.uploadLoading=!1)).subscribe(t=>{this.game=new c.a(t)},t=>{t.errors.forEach(t=>{this.musics.setErrors({apiErrors:t})})})}fileUpload(t){var e;this.musicFiles=(null===(e=null==t?void 0:t.target)||void 0===e?void 0:e.files)?t.target.files:void 0}handleGameMusicDeleted(t){this.game.musics.splice(this.game.musics.indexOf(this.game.musics.find(e=>e.id===t.id)),1)}toggle(){this.toggleErrorMessage=void 0,this.toggleLoading=!0,this.adminGameHttpService.toggleGame(this.game).pipe(Object(s.a)(()=>this.toggleLoading=!1)).subscribe(t=>{this.game=t},t=>{this.toggleErrorMessage=t})}}return t.\u0275fac=function(e){return new(e||t)(a.Jb(u),a.Jb(p.a),a.Jb(m.c))},t.\u0275cmp=a.Db({type:t,selectors:[["app-game-show"]],decls:5,vars:2,consts:[["routerLink","admin/games",1,"btn","btn-info"],[4,"ngIf","ngIfElse"],["gameShow",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"row"],[1,"col-md-12"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["color","primary",4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"col-md-6"],[1,"form-group",3,"formGroup"],["for","exampleFormControlFile1"],["type","file","id","exampleFormControlFile1","formControlName","musics","multiple","","accept","audio/mpeg",1,"form-control-file",3,"ngClass","change"],[4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"table"],[1,"thead-dark"],["scope","col"],[4,"ngFor","ngForOf"],["color","primary"],[1,"text-danger"],["class","invalid-feedback",4,"ngFor","ngForOf"],[1,"invalid-feedback"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"],["musicRow","",3,"gameMusic","onDelete"],["alternativeNameRow","",3,"alternativeName"]],template:function(t,e){if(1&t&&(a.Ob(0,"a",0),a.yc(1,"back to list"),a.Nb(),a.wc(2,q,5,0,"ng-container",1),a.wc(3,Q,46,14,"ng-template",null,2,a.xc)),2&t){const t=a.mc(4);a.zb(2),a.gc("ngIf",e.loading)("ngIfElse",t)}},directives:[p.e,n.l,d.a,m.m,m.p,m.n,m.h,m.b,m.f,n.j,n.k,z.b,V,A],encapsulation:2}),t})()},{path:"",component:w}];let et=(()=>{class t{}return t.\u0275mod=a.Hb({type:t}),t.\u0275inj=a.Gb({factory:function(e){return new(e||t)},imports:[[n.c,p.f.forChild(tt),M.a]]}),t})()}}]);
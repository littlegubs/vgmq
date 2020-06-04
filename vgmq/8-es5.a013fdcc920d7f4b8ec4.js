function _createForOfIteratorHelper(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=_unsupportedIterableToArray(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r,c=!0,a=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return c=t.done,t},e:function(t){a=!0,r=t},f:function(){try{c||null==i.return||i.return()}finally{if(a)throw r}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{BXcl:function(t,e,n){"use strict";n.r(e),n.d(e,"GameModule",(function(){return rt}));var i,r=n("ofXK"),c=function t(e){_classCallCheck(this,t),Object.assign(this,e)},a=function t(e){_classCallCheck(this,t),Object.assign(this,e)},s=function t(e){_classCallCheck(this,t),this.id=e.id,this.title=e.title,this.artist=e.artist,this.duration=e.duration,this.durationDate=new Date(0,0,0,0,0,this.duration),this.guessAccuracy=e.guessAccuracy,this.playNumber=e.playNumber},o=function t(e){_classCallCheck(this,t),this.title=e.title,this.artist=e.artist},u=function t(e){_classCallCheck(this,t),this.id=e.id,this.music=new s(e.music)},l=function t(e){var n,i;_classCallCheck(this,t),this.id=e.id,this.firstReleaseDate=e.firstReleaseDate,this.name=e.name,this.slug=e.slug,this.alternativeNames=null===(n=e.alternativeNames)||void 0===n?void 0:n.map((function(t){return new a(t)})),this.gameMusics=null===(i=e.gameMusics)||void 0===i?void 0:i.map((function(t){return new u(t)})),this.cover=new c(e.cover)},b=function t(e){_classCallCheck(this,t),this.errors=[],this.errors=e.errors},f=n("nYR2"),d=n("fXoL"),m=n("z6cu"),h=n("AytR"),p=n("JIr8"),g=n("tk/3"),v=((i=function(){function t(e){_classCallCheck(this,t),this.http=e,this.apiEndpoint=h.a.apiEndpoint}return _createClass(t,[{key:"search",value:function(t){return this.http.get("".concat(this.apiEndpoint,"/admin/games?query=").concat(t))}},{key:"get",value:function(t){return this.http.get("".concat(this.apiEndpoint,"/admin/games/").concat(t))}},{key:"uploadMusics",value:function(t,e){var n,i=new FormData,r=_createForOfIteratorHelper(e);try{for(r.s();!(n=r.n()).done;){var c=n.value;i.append("music_files[files][]",c)}}catch(a){r.e(a)}finally{r.f()}return this.http.post("".concat(this.apiEndpoint,"/admin/games/").concat(t,"/musics/upload"),i).pipe(Object(p.a)((function(t){return Object(m.a)(new b(t.error))})))}},{key:"saveMusic",value:function(t,e){return this.http.patch("".concat(this.apiEndpoint,"/admin/musics/").concat(t.id),e).pipe(Object(p.a)((function(t){return Object(m.a)(new o(t.error.errors))})))}},{key:"deleteGameMusic",value:function(t){return this.http.delete("".concat(this.apiEndpoint,"/admin/games-musics/").concat(t.id))}}]),t}()).\u0275fac=function(t){return new(t||i)(d.Ub(g.b))},i.\u0275prov=d.Hb({token:i,factory:i.\u0275fac,providedIn:"root"}),i),y=n("3Pt+"),k=n("tyNb");function P(t,e){1&t&&(d.Ob(0),d.Qb(1,"div",5),d.Qb(2,"div",6),d.Qb(3,"span",7),d.tc(4,"Loading..."),d.Pb(),d.Pb(),d.Pb(),d.Nb())}function Q(t,e){if(1&t&&d.Mb(0,"img",15),2&t){var n=d.cc().$implicit;d.ic("src","https://images.igdb.com/igdb/image/upload/t_720p/",n.cover.imageId,".jpg",d.pc)}}var C=function(t){return["/admin/games/",t]};function M(t,e){if(1&t&&(d.Qb(0,"a",10),d.rc(1,Q,1,1,"img",11),d.Qb(2,"div",12),d.Qb(3,"h3",13),d.tc(4),d.Pb(),d.Qb(5,"p",14),d.tc(6),d.dc(7,"date"),d.Pb(),d.Pb(),d.Pb()),2&t){var n=e.$implicit;d.hc("routerLink",d.kc(7,C,n.slug)),d.Bb(1),d.hc("ngIf",n.cover.imageId),d.Bb(3),d.uc(n.name),d.Bb(2),d.uc(d.ec(7,4,n.firstReleaseDate,"y"))}}function w(t,e){if(1&t&&(d.Qb(0,"div",8),d.rc(1,M,8,9,"a",9),d.Pb()),2&t){var n=d.cc();d.Bb(1),d.hc("ngForOf",n.games)}}var I,B=((I=function(){function t(e){_classCallCheck(this,t),this.adminGameHttpService=e,this.games=[],this.query="",this.loading=!1}return _createClass(t,[{key:"ngOnInit",value:function(){this.search()}},{key:"search",value:function(){var t=this;this.http&&this.http.unsubscribe(),this.loading=!0,this.http=this.adminGameHttpService.search(this.query).pipe(Object(f.a)((function(){return t.loading=!1}))).subscribe((function(e){t.games=e.data.map((function(t){return new l(t)}))}))}}]),t}()).\u0275fac=function(t){return new(t||I)(d.Lb(v))},I.\u0275cmp=d.Fb({type:I,selectors:[["app-game-search"]],decls:7,vars:3,consts:[[1,"form-group"],["for","exampleFormControlInput1"],["type","text","id","exampleFormControlInput1","placeholder","game...",1,"form-control",3,"ngModel","ngModelChange","keyup"],[4,"ngIf","ngIfElse"],["cardColumns",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"card-columns","admin-card-columns"],["class","card","style","width: 18rem;",3,"routerLink",4,"ngFor","ngForOf"],[1,"card",2,"width","18rem",3,"routerLink"],["class","card-img-top","alt","...",3,"src",4,"ngIf"],[1,"card-body"],[1,"card-title","orange"],[1,"card-text"],["alt","...",1,"card-img-top",3,"src"]],template:function(t,e){if(1&t&&(d.Qb(0,"div",0),d.Qb(1,"label",1),d.tc(2,"Search games"),d.Pb(),d.Qb(3,"input",2),d.Yb("ngModelChange",(function(t){return e.query=t}))("keyup",(function(){return e.search()})),d.Pb(),d.Pb(),d.rc(4,P,5,0,"ng-container",3),d.rc(5,w,2,1,"ng-template",null,4,d.sc)),2&t){var n=d.mc(6);d.Bb(3),d.hc("ngModel",e.query),d.Bb(1),d.hc("ngIf",e.loading)("ngIfElse",n)}},directives:[y.b,y.k,y.m,r.k,r.j,k.e],pipes:[r.d],encapsulation:2}),I),O=n("PCNd"),F=n("6NWb"),_=["musicRow",""];function E(t,e){if(1&t&&(d.Ob(0),d.Qb(1,"th",3),d.tc(2),d.Pb(),d.Qb(3,"td"),d.tc(4),d.Pb(),d.Nb()),2&t){var n=d.cc();d.Bb(2),d.uc(n.gameMusic.music.title),d.Bb(2),d.uc(n.gameMusic.music.artist)}}function G(t,e){1&t&&(d.Ob(0),d.tc(1," title cannot be empty "),d.Nb())}function j(t,e){if(1&t&&(d.Ob(0),d.tc(1),d.Nb()),2&t){var n=d.cc(3);d.Bb(1),d.vc(" ",n.title.errors.apiError[0]," ")}}function L(t,e){if(1&t&&(d.Qb(0,"div",8),d.rc(1,G,2,0,"ng-container",9),d.rc(2,j,2,1,"ng-container",9),d.Pb()),2&t){var n=d.cc(2);d.Bb(1),d.hc("ngIf",n.title.errors.required),d.Bb(1),d.hc("ngIf",n.title.errors.apiError)}}var N=function(t){return{"is-invalid":t}};function A(t,e){if(1&t&&(d.Ob(0,4),d.Qb(1,"th",3),d.Mb(2,"input",5),d.rc(3,L,3,2,"div",6),d.Pb(),d.Qb(4,"td"),d.Mb(5,"input",7),d.Pb(),d.Nb()),2&t){var n=d.cc();d.hc("formGroup",n.formGroup),d.Bb(2),d.hc("ngClass",d.kc(3,N,n.title.invalid&&(n.title.dirty||n.title.touched))),d.Bb(1),d.hc("ngIf",n.title.errors)}}function D(t,e){1&t&&(d.Ob(0),d.Qb(1,"div",10),d.Qb(2,"span",11),d.tc(3,"Loading..."),d.Pb(),d.Pb(),d.Nb())}var S=function(){return["fas","pen"]},R=function(){return["fas","times"]};function H(t,e){if(1&t){var n=d.Rb();d.Ob(0),d.Qb(1,"button",13),d.Yb("click",(function(){return d.nc(n),d.cc(2).createFormGroup()})),d.Mb(2,"fa-icon",14),d.Pb(),d.Qb(3,"button",15),d.Yb("click",(function(){return d.nc(n),d.cc(2).delete()})),d.Mb(4,"fa-icon",14),d.Pb(),d.Nb()}2&t&&(d.Bb(2),d.hc("icon",d.jc(2,S)),d.Bb(2),d.hc("icon",d.jc(3,R)))}var x=function(){return["fas","check"]};function Y(t,e){if(1&t){var n=d.Rb();d.Qb(0,"button",16),d.Yb("click",(function(){return d.nc(n),d.cc(2).save()})),d.Mb(1,"fa-icon",14),d.Pb(),d.Qb(2,"button",15),d.Yb("click",(function(){return d.nc(n),d.cc(2).cancel()})),d.Mb(3,"fa-icon",14),d.Pb()}2&t&&(d.Bb(1),d.hc("icon",d.jc(2,x)),d.Bb(2),d.hc("icon",d.jc(3,R)))}function q(t,e){if(1&t&&(d.rc(0,H,5,4,"ng-container",0),d.rc(1,Y,4,4,"ng-template",null,12,d.sc)),2&t){var n=d.mc(2),i=d.cc();d.hc("ngIf",!i.edit)("ngIfElse",n)}}var U,T=((U=function(){function t(e,n){_classCallCheck(this,t),this.formBuilder=e,this.adminGameHttpService=n,this.onDelete=new d.n,this.edit=!1,this.loading=!1}return _createClass(t,[{key:"createFormGroup",value:function(){this.edit=!0,this.formGroup=new y.f({title:new y.d(this.gameMusic.music.title,y.p.required.bind(this)),artist:new y.d(this.gameMusic.music.artist)})}},{key:"cancel",value:function(){this.edit=!1,this.formGroup.reset()}},{key:"save",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.saveMusic(this.gameMusic.music,this.formGroup.value).pipe(Object(f.a)((function(){return t.loading=!1}))).subscribe((function(e){t.gameMusic.music=e,t.edit=!1}),(function(e){e.title&&t.title.setErrors({apiError:e.title}),e.artist&&t.artist.setErrors({apiError:e.artist})}))}},{key:"delete",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.deleteGameMusic(this.gameMusic).pipe(Object(f.a)((function(){return t.loading=!1}))).subscribe((function(){t.onDelete.emit(t.gameMusic)}))}},{key:"title",get:function(){return this.formGroup.get("title")}},{key:"artist",get:function(){return this.formGroup.get("artist")}}]),t}()).\u0275fac=function(t){return new(t||U)(d.Lb(y.c),d.Lb(v))},U.\u0275cmp=d.Fb({type:U,selectors:[["","musicRow",""]],inputs:{gameMusic:"gameMusic"},outputs:{onDelete:"onDelete"},attrs:_,decls:14,vars:10,consts:[[4,"ngIf","ngIfElse"],["editMusic",""],["musicRowButtons",""],["scope","row"],[3,"formGroup"],["formControlName","title",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["formControlName","artist"],[1,"invalid-feedback"],[4,"ngIf"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"],["editMusicButtons",""],[1,"btn","btn-sm","btn-primary",3,"click"],[3,"icon"],[1,"btn","btn-sm","btn-danger",3,"click"],[1,"btn","btn-sm","btn-success",3,"click"]],template:function(t,e){if(1&t&&(d.rc(0,E,5,2,"ng-container",0),d.rc(1,A,6,5,"ng-template",null,1,d.sc),d.Qb(3,"td"),d.tc(4),d.dc(5,"date"),d.Pb(),d.Qb(6,"td"),d.tc(7),d.Pb(),d.Qb(8,"td"),d.tc(9),d.Pb(),d.Qb(10,"td"),d.rc(11,D,4,0,"ng-container",0),d.rc(12,q,3,2,"ng-template",null,2,d.sc),d.Pb()),2&t){var n=d.mc(2),i=d.mc(13);d.hc("ngIf",!e.edit)("ngIfElse",n),d.Bb(4),d.uc(d.ec(5,7,e.gameMusic.music.durationDate,"HH:mm:ss")),d.Bb(3),d.uc(e.gameMusic.music.guessAccuracy||"-"),d.Bb(2),d.uc(e.gameMusic.music.playNumber),d.Bb(2),d.hc("ngIf",e.loading)("ngIfElse",i)}},directives:[r.k,y.l,y.g,y.b,y.k,y.e,r.i,F.a],pipes:[r.d],encapsulation:2}),U);function $(t,e){1&t&&(d.Ob(0),d.Qb(1,"div",3),d.Qb(2,"div",4),d.Qb(3,"span",5),d.tc(4,"Loading..."),d.Pb(),d.Pb(),d.Pb(),d.Nb())}function J(t,e){if(1&t&&(d.Qb(0,"div",20),d.tc(1),d.Pb()),2&t){var n=e.$implicit;d.Bb(1),d.vc(" ",n," ")}}function X(t,e){if(1&t&&(d.Ob(0),d.rc(1,J,2,1,"div",19),d.Nb()),2&t){var n=d.cc(2);d.Bb(1),d.hc("ngForOf",n.musics.errors.apiError)}}function z(t,e){1&t&&d.Mb(0,"span",21)}function K(t,e){if(1&t){var n=d.Rb();d.Ob(0),d.Qb(1,"tr",22),d.Yb("onDelete",(function(t){return d.nc(n),d.cc(2).handleGameMusicDeleted(t)})),d.Pb(),d.Nb()}if(2&t){var i=e.$implicit;d.Bb(1),d.hc("gameMusic",i)}}var W=function(t){return{"table-danger":t}};function V(t,e){if(1&t&&(d.Qb(0,"tr",23),d.Qb(1,"th",24),d.tc(2),d.Pb(),d.Qb(3,"td"),d.tc(4),d.Pb(),d.Pb()),2&t){var n=e.$implicit;d.hc("ngClass",d.kc(3,W,!n.enabled)),d.Bb(2),d.uc(n.name),d.Bb(2),d.uc(n.enabled)}}var Z=function(t){return{"is-invalid":t}};function tt(t,e){if(1&t){var n=d.Rb();d.Qb(0,"h1"),d.tc(1),d.Pb(),d.Qb(2,"div",6),d.Qb(3,"div",7),d.Qb(4,"h2"),d.tc(5,"Musics"),d.Pb(),d.Qb(6,"div",8),d.Qb(7,"label",9),d.tc(8,"add musics"),d.Pb(),d.Qb(9,"input",10),d.Yb("change",(function(t){return d.nc(n),d.cc().fileUpload(t)})),d.Pb(),d.rc(10,X,2,1,"ng-container",11),d.Qb(11,"button",12),d.Yb("click",(function(){d.nc(n);var t=d.cc();return t.uploadLoading||0===t.musicFiles.length||t.uploadMusic()})),d.tc(12," Upload "),d.rc(13,z,1,0,"span",13),d.Pb(),d.Pb(),d.Qb(14,"table",14),d.Qb(15,"thead",15),d.Qb(16,"tr"),d.Qb(17,"th",16),d.tc(18,"title"),d.Pb(),d.Qb(19,"th",16),d.tc(20,"artist"),d.Pb(),d.Qb(21,"th",16),d.tc(22,"duration"),d.Pb(),d.Qb(23,"th",16),d.tc(24,"accuracy"),d.Pb(),d.Qb(25,"th",16),d.tc(26,"played"),d.Pb(),d.Qb(27,"th",16),d.tc(28,"action"),d.Pb(),d.Pb(),d.Pb(),d.Qb(29,"tbody"),d.rc(30,K,2,1,"ng-container",17),d.Pb(),d.Pb(),d.Pb(),d.Qb(31,"div",7),d.Qb(32,"table",14),d.Qb(33,"thead",15),d.Qb(34,"tr"),d.Qb(35,"th",16),d.tc(36,"Alternative names"),d.Pb(),d.Qb(37,"th",16),d.tc(38,"Enabled"),d.Pb(),d.Pb(),d.Pb(),d.Qb(39,"tbody"),d.rc(40,V,5,5,"tr",18),d.Pb(),d.Pb(),d.Pb(),d.Pb()}if(2&t){var i=d.cc();d.Bb(1),d.uc(i.game.name),d.Bb(5),d.hc("formGroup",i.musicUploadForm),d.Bb(3),d.hc("ngClass",d.kc(8,Z,i.musics.invalid&&(i.musics.dirty||i.musics.touched))),d.Bb(1),d.hc("ngIf",i.musics.errors),d.Bb(1),d.hc("disabled",i.uploadLoading||0===i.musicFiles.length),d.Bb(2),d.hc("ngIf",i.uploadLoading),d.Bb(17),d.hc("ngForOf",i.game.gameMusics),d.Bb(10),d.hc("ngForOf",i.game.alternativeNames)}}var et,nt,it=[{path:":slug",component:(et=function(){function t(e,n,i,r){_classCallCheck(this,t),this.adminGameHttpService=e,this.route=n,this.formBuilder=i,this.changeDetectorRef=r,this.loading=!1,this.uploadLoading=!1,this.musicFiles=[]}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.get(this.route.snapshot.paramMap.get("slug")).subscribe((function(e){t.game=new l(e),t.loading=!1})),this.musicUploadForm=this.formBuilder.group({musics:[null,[y.p.required.bind(this)]]})}},{key:"uploadMusic",value:function(){var t=this;this.uploadLoading=!0,this.adminGameHttpService.uploadMusics(this.route.snapshot.paramMap.get("slug"),this.musicFiles).pipe(Object(f.a)((function(){return t.uploadLoading=!1}))).subscribe((function(e){t.game=new l(e)}),(function(e){t.musics.setErrors({apiError:e.errors})}))}},{key:"fileUpload",value:function(t){this.musicFiles=t.target.files&&t.target.files.length?t.target.files:[]}},{key:"handleGameMusicDeleted",value:function(t){console.log(t),this.game.gameMusics.splice(this.game.gameMusics.indexOf(this.game.gameMusics.find((function(e){return e.id===t.id}))),1)}},{key:"musics",get:function(){return this.musicUploadForm.get("musics")}}]),t}(),et.\u0275fac=function(t){return new(t||et)(d.Lb(v),d.Lb(k.a),d.Lb(y.c),d.Lb(d.h))},et.\u0275cmp=d.Fb({type:et,selectors:[["app-game-show"]],decls:5,vars:2,consts:[["routerLink","admin/games",1,"btn","btn-info"],[4,"ngIf","ngIfElse"],["gameShow",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"row"],[1,"col-md-6"],[1,"form-group",3,"formGroup"],["for","exampleFormControlFile1"],["type","file","id","exampleFormControlFile1","formControlName","musics","multiple","","accept","audio/mpeg",1,"form-control-file",3,"ngClass","change"],[4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"table"],[1,"thead-dark"],["scope","col"],[4,"ngFor","ngForOf"],[3,"ngClass",4,"ngFor","ngForOf"],["class","invalid-feedback",4,"ngFor","ngForOf"],[1,"invalid-feedback"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"],["musicRow","",3,"gameMusic","onDelete"],[3,"ngClass"],["scope","row"]],template:function(t,e){if(1&t&&(d.Qb(0,"a",0),d.tc(1,"back to list"),d.Pb(),d.rc(2,$,5,0,"ng-container",1),d.rc(3,tt,41,10,"ng-template",null,2,d.sc)),2&t){var n=d.mc(4);d.Bb(2),d.hc("ngIf",e.loading)("ngIfElse",n)}},directives:[k.e,r.k,y.l,y.g,y.b,y.k,y.e,r.i,r.j,T],encapsulation:2}),et)},{path:"",component:B}],rt=((nt=function t(){_classCallCheck(this,t)}).\u0275mod=d.Jb({type:nt}),nt.\u0275inj=d.Ib({factory:function(t){return new(t||nt)},imports:[[r.b,k.f.forChild(it),O.a]]}),nt)}}]);
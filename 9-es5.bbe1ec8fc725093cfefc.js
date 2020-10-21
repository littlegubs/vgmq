!function(){function t(t,n){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return e(t,n)}(t))||n&&t&&"number"==typeof t.length){i&&(t=i);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,o=!0,s=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return o=t.done,t},e:function(t){s=!0,c=t},f:function(){try{o||null==i.return||i.return()}finally{if(s)throw c}}}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function n(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function i(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){r(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BXcl:function(e,n,r){"use strict";r.r(n),r.d(n,"GameModule",(function(){return bt}));var c,s=r("ofXK"),u=r("x3yr"),l=r("nYR2"),b=r("fXoL"),g=r("z6cu"),d=r("AytR"),f=r("JIr8"),m=r("lA9T"),p=r("tk/3"),h=((c=function(){function e(t){a(this,e),this.http=t,this.apiEndpoint=d.a.apiEndpoint}return o(e,[{key:"search",value:function(t,e){return this.http.get(this.apiEndpoint+"/admin/games",{params:i(i({},(null==t?void 0:t.length)>0&&{query:t}),e&&{showDisabled:"true"})})}},{key:"get",value:function(t){return this.http.get("".concat(this.apiEndpoint,"/admin/games/").concat(t))}},{key:"uploadMusics",value:function(e,n){var i,r=new FormData,a=t(n);try{for(a.s();!(i=a.n()).done;){var c=i.value;r.append("music_files[files][]",c)}}catch(o){a.e(o)}finally{a.f()}return this.http.post("".concat(this.apiEndpoint,"/admin/games/").concat(e,"/musics/upload"),r).pipe(Object(f.a)((function(t){return Object(g.a)(new u.b(t.error))})))}},{key:"saveMusic",value:function(t,e){return this.http.patch("".concat(this.apiEndpoint,"/admin/musics/").concat(t.id),e).pipe(Object(f.a)((function(t){return Object(g.a)(new m.a(t.error.errors))})))}},{key:"deleteGameMusic",value:function(t){return this.http.delete("".concat(this.apiEndpoint,"/admin/games-musics/").concat(t.id))}},{key:"toggleGame",value:function(t){return this.http.patch("".concat(this.apiEndpoint,"/admin/games/").concat(t.slug,"/toggle"),null).pipe(Object(f.a)((function(t){return Object(g.a)(t.error)})))}},{key:"toggleAlternativeName",value:function(t){return this.http.patch("".concat(this.apiEndpoint,"/admin/alternative-names/").concat(t.id,"/toggle"),null).pipe(Object(f.a)((function(t){return Object(g.a)(t.error)})))}}]),e}()).\u0275fac=function(t){return new(t||c)(b.Sb(p.b))},c.\u0275prov=b.Fb({token:c,factory:c.\u0275fac,providedIn:"root"}),c),v=r("1jcm"),y=r("3Pt+"),O=r("tyNb");function N(t,e){if(1&t&&(b.Ob(0,"h1"),b.yc(1),b.Nb()),2&t){var n=b.Zb();b.zb(1),b.Ac("",n.gamesCount," games")}}function w(t,e){1&t&&(b.Mb(0),b.Ob(1,"div",6),b.Ob(2,"div",7),b.Ob(3,"span",8),b.yc(4,"Loading..."),b.Nb(),b.Nb(),b.Nb(),b.Lb())}function M(t,e){if(1&t&&b.Kb(0,"img",16),2&t){var n=b.Zb().$implicit;b.hc("src","https://images.igdb.com/igdb/image/upload/t_720p/",n.cover.imageId,".jpg",b.pc)}}var k=function(t){return["/admin/games/",t]};function z(t,e){if(1&t&&(b.Ob(0,"a",11),b.wc(1,M,1,1,"img",12),b.Ob(2,"div",13),b.Ob(3,"h3",14),b.yc(4),b.Nb(),b.Ob(5,"p",15),b.yc(6),b.ac(7,"date"),b.Nb(),b.Nb(),b.Nb()),2&t){var n=e.$implicit;b.gc("routerLink",b.jc(7,k,n.slug)),b.zb(1),b.gc("ngIf",n.cover.imageId),b.zb(3),b.zc(n.name),b.zb(2),b.zc(b.cc(7,4,n.firstReleaseDate,"y"))}}function I(t,e){if(1&t&&(b.Ob(0,"div",9),b.wc(1,z,8,9,"a",10),b.Nb()),2&t){var n=b.Zb();b.zb(1),b.gc("ngForOf",n.games)}}var j,E=((j=function(){function t(e){a(this,t),this.adminGameHttpService=e,this.games=[],this.query="",this.showDisabled=!1,this.loading=!1}return o(t,[{key:"ngOnInit",value:function(){this.search()}},{key:"search",value:function(){var t=this;this.http&&this.http.unsubscribe(),this.loading=!0,this.http=this.adminGameHttpService.search(this.query,this.showDisabled).pipe(Object(l.a)((function(){return t.loading=!1}))).subscribe((function(e){t.gamesCount=e.count,t.games=e.data.map((function(t){return new u.a(t)}))}))}},{key:"toggleShowDisabled",value:function(){this.showDisabled=!this.showDisabled,this.search()}}]),t}()).\u0275fac=function(t){return new(t||j)(b.Jb(h))},j.\u0275cmp=b.Db({type:j,selectors:[["app-game-search"]],decls:10,vars:6,consts:[[1,"form-group"],[4,"ngIf"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["type","text","id","exampleFormControlInput1","placeholder","game...",1,"form-control",3,"ngModel","ngModelChange","keyup"],[4,"ngIf","ngIfElse"],["cardColumns",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"card-columns","admin-card-columns"],["class","card","style","width: 18rem;",3,"routerLink",4,"ngFor","ngForOf"],[1,"card",2,"width","18rem",3,"routerLink"],["class","card-img-top","alt","...",3,"src",4,"ngIf"],[1,"card-body"],[1,"card-title","orange"],[1,"card-text"],["alt","...",1,"card-img-top",3,"src"]],template:function(t,e){if(1&t&&(b.Ob(0,"div",0),b.wc(1,N,2,1,"h1",1),b.Ob(2,"div",0),b.Ob(3,"label"),b.yc(4,"Show disabled game"),b.Nb(),b.Ob(5,"mat-slide-toggle",2),b.Vb("ngModelChange",(function(t){return e.showDisabled=t}))("click",(function(){return e.loading||e.toggleShowDisabled()})),b.Nb(),b.Nb(),b.Ob(6,"input",3),b.Vb("ngModelChange",(function(t){return e.query=t}))("keyup",(function(){return e.search()})),b.Nb(),b.Nb(),b.wc(7,w,5,0,"ng-container",4),b.wc(8,I,2,1,"ng-template",null,5,b.xc)),2&t){var n=b.mc(9);b.zb(1),b.gc("ngIf",e.gamesCount),b.zb(4),b.gc("ngModel",e.showDisabled)("disabled",e.loading),b.zb(1),b.gc("ngModel",e.query),b.zb(1),b.gc("ngIf",e.loading)("ngIfElse",n)}},directives:[s.l,v.a,y.m,y.p,y.b,s.k,O.e],pipes:[s.e],encapsulation:2}),j),G=r("PCNd"),L=r("Xa2L"),D=r("6NWb"),F=["musicRow",""];function C(t,e){if(1&t&&(b.Mb(0),b.Ob(1,"th",3),b.yc(2),b.Nb(),b.Ob(3,"td"),b.yc(4),b.Nb(),b.Lb()),2&t){var n=b.Zb();b.zb(2),b.zc(n.gameMusic.music.title),b.zb(2),b.zc(n.gameMusic.music.artist)}}function S(t,e){1&t&&(b.Mb(0),b.yc(1," title cannot be empty "),b.Lb())}function Z(t,e){if(1&t&&(b.Mb(0),b.yc(1),b.Lb()),2&t){var n=b.Zb(3);b.zb(1),b.Ac(" ",n.title.errors.apiError[0]," ")}}function x(t,e){if(1&t&&(b.Ob(0,"div",8),b.wc(1,S,2,0,"ng-container",9),b.wc(2,Z,2,1,"ng-container",9),b.Nb()),2&t){var n=b.Zb(2);b.zb(1),b.gc("ngIf",n.title.errors.required),b.zb(1),b.gc("ngIf",n.title.errors.apiError)}}var P=function(t){return{"is-invalid":t}};function A(t,e){if(1&t&&(b.Mb(0,4),b.Ob(1,"th",3),b.Kb(2,"input",5),b.wc(3,x,3,2,"div",6),b.Nb(),b.Ob(4,"td"),b.Kb(5,"input",7),b.Nb(),b.Lb()),2&t){var n=b.Zb();b.gc("formGroup",n.formGroup),b.zb(2),b.gc("ngClass",b.jc(3,P,n.title.invalid&&(n.title.dirty||n.title.touched))),b.zb(1),b.gc("ngIf",n.title.errors)}}function H(t,e){1&t&&(b.Mb(0),b.Ob(1,"div",10),b.Ob(2,"span",11),b.yc(3,"Loading..."),b.Nb(),b.Nb(),b.Lb())}var K=function(){return["fas","pen"]},V=function(){return["fas","times"]};function J(t,e){if(1&t){var n=b.Pb();b.Mb(0),b.Ob(1,"button",13),b.Vb("click",(function(){return b.nc(n),b.Zb(2).createFormGroup()})),b.Kb(2,"fa-icon",14),b.Nb(),b.Ob(3,"button",15),b.Vb("click",(function(){return b.nc(n),b.Zb(2).delete()})),b.Kb(4,"fa-icon",14),b.Nb(),b.Lb()}2&t&&(b.zb(2),b.gc("icon",b.ic(2,K)),b.zb(2),b.gc("icon",b.ic(3,V)))}var R=function(){return["fas","check"]};function q(t,e){if(1&t){var n=b.Pb();b.Ob(0,"button",16),b.Vb("click",(function(){return b.nc(n),b.Zb(2).save()})),b.Kb(1,"fa-icon",14),b.Nb(),b.Ob(2,"button",15),b.Vb("click",(function(){return b.nc(n),b.Zb(2).cancel()})),b.Kb(3,"fa-icon",14),b.Nb()}2&t&&(b.zb(1),b.gc("icon",b.ic(2,R)),b.zb(2),b.gc("icon",b.ic(3,V)))}function U(t,e){if(1&t&&(b.wc(0,J,5,4,"ng-container",0),b.wc(1,q,4,4,"ng-template",null,12,b.xc)),2&t){var n=b.mc(2),i=b.Zb();b.gc("ngIf",!i.edit)("ngIfElse",n)}}var B,$=((B=function(){function t(e,n){a(this,t),this.formBuilder=e,this.adminGameHttpService=n,this.onDelete=new b.n,this.edit=!1,this.loading=!1}return o(t,[{key:"createFormGroup",value:function(){this.edit=!0,this.formGroup=new y.g({title:new y.d(this.gameMusic.music.title,y.s.required.bind(this)),artist:new y.d(this.gameMusic.music.artist)})}},{key:"cancel",value:function(){this.edit=!1,this.formGroup.reset()}},{key:"save",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.saveMusic(this.gameMusic.music,this.formGroup.value).pipe(Object(l.a)((function(){return t.loading=!1}))).subscribe((function(e){t.gameMusic.music=e,t.edit=!1}),(function(e){e.title&&t.title.setErrors({apiError:e.title}),e.artist&&t.artist.setErrors({apiError:e.artist})}))}},{key:"delete",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.deleteGameMusic(this.gameMusic).pipe(Object(l.a)((function(){return t.loading=!1}))).subscribe((function(){t.onDelete.emit(t.gameMusic)}))}},{key:"title",get:function(){return this.formGroup.get("title")}},{key:"artist",get:function(){return this.formGroup.get("artist")}}]),t}()).\u0275fac=function(t){return new(t||B)(b.Jb(y.c),b.Jb(h))},B.\u0275cmp=b.Db({type:B,selectors:[["","musicRow",""]],inputs:{gameMusic:"gameMusic"},outputs:{onDelete:"onDelete"},attrs:F,decls:14,vars:10,consts:[[4,"ngIf","ngIfElse"],["editMusic",""],["musicRowButtons",""],["scope","row"],[3,"formGroup"],["formControlName","title",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],["formControlName","artist"],[1,"invalid-feedback"],[4,"ngIf"],["role","status",1,"spinner-border","text-primary"],[1,"sr-only"],["editMusicButtons",""],[1,"btn","btn-sm","btn-primary",3,"click"],[3,"icon"],[1,"btn","btn-sm","btn-danger",3,"click"],[1,"btn","btn-sm","btn-success",3,"click"]],template:function(t,e){if(1&t&&(b.wc(0,C,5,2,"ng-container",0),b.wc(1,A,6,5,"ng-template",null,1,b.xc),b.Ob(3,"td"),b.yc(4),b.ac(5,"date"),b.Nb(),b.Ob(6,"td"),b.yc(7),b.Nb(),b.Ob(8,"td"),b.yc(9),b.Nb(),b.Ob(10,"td"),b.wc(11,H,4,0,"ng-container",0),b.wc(12,U,3,2,"ng-template",null,2,b.xc),b.Nb()),2&t){var n=b.mc(2),i=b.mc(13);b.gc("ngIf",!e.edit)("ngIfElse",n),b.zb(4),b.zc(b.cc(5,7,e.gameMusic.music.durationDate,"HH:mm:ss")),b.zb(3),b.zc(e.gameMusic.music.guessAccuracy||"-"),b.zb(2),b.zc(e.gameMusic.music.playNumber),b.zb(2),b.gc("ngIf",e.loading)("ngIfElse",i)}},directives:[s.l,y.n,y.h,y.b,y.m,y.f,s.j,D.a],pipes:[s.e],encapsulation:2}),B),X=["alternativeNameRow",""];function T(t,e){1&t&&b.Kb(0,"mat-spinner",3)}var _,W=((_=function(){function t(e){a(this,t),this.adminGameHttpService=e,this.loading=!1}return o(t,[{key:"toggle",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.toggleAlternativeName(this.alternativeName).pipe(Object(l.a)((function(){return t.loading=!1}))).subscribe((function(){t.alternativeName.enabled=!t.alternativeName.enabled}))}}]),t}()).\u0275fac=function(t){return new(t||_)(b.Jb(h))},_.\u0275cmp=b.Db({type:_,selectors:[["","alternativeNameRow",""]],inputs:{alternativeName:"alternativeName"},attrs:X,decls:5,vars:4,consts:[["scope","row"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["color","primary",4,"ngIf"],["color","primary"]],template:function(t,e){1&t&&(b.Ob(0,"th",0),b.yc(1),b.Nb(),b.Ob(2,"td"),b.Ob(3,"mat-slide-toggle",1),b.Vb("ngModelChange",(function(t){return e.alternativeName.enabled=t}))("click",(function(){return e.loading||e.toggle()})),b.Nb(),b.wc(4,T,1,0,"mat-spinner",2),b.Nb()),2&t&&(b.zb(1),b.zc(e.alternativeName.name),b.zb(2),b.gc("ngModel",e.alternativeName.enabled)("disabled",e.loading),b.zb(1),b.gc("ngIf",e.loading))},directives:[v.a,y.m,y.p,s.l,L.b],encapsulation:2}),_);function Y(t,e){1&t&&(b.Mb(0),b.Ob(1,"div",3),b.Ob(2,"div",4),b.Ob(3,"span",5),b.yc(4,"Loading..."),b.Nb(),b.Nb(),b.Nb(),b.Lb())}function Q(t,e){1&t&&b.Kb(0,"mat-spinner",22)}function tt(t,e){if(1&t&&(b.Ob(0,"span",23),b.yc(1),b.Nb()),2&t){var n=b.Zb(2);b.zb(1),b.zc(n.toggleErrorMessage)}}function et(t,e){if(1&t&&(b.Ob(0,"div",25),b.yc(1),b.Nb()),2&t){var n=e.$implicit;b.zb(1),b.Ac(" ",n," ")}}function nt(t,e){if(1&t&&(b.Mb(0),b.wc(1,et,2,1,"div",24),b.Lb()),2&t){var n=b.Zb(2);b.zb(1),b.gc("ngForOf",n.musics.errors.apiErrors)}}function it(t,e){1&t&&b.Kb(0,"span",26)}function rt(t,e){if(1&t){var n=b.Pb();b.Mb(0),b.Ob(1,"tr",27),b.Vb("onDelete",(function(t){return b.nc(n),b.Zb(2).handleGameMusicDeleted(t)})),b.Nb(),b.Lb()}if(2&t){var i=e.$implicit;b.zb(1),b.gc("gameMusic",i)}}function at(t,e){if(1&t&&(b.Mb(0),b.Kb(1,"tr",28),b.Lb()),2&t){var n=e.$implicit;b.zb(1),b.gc("alternativeName",n)}}var ct=function(t){return{"is-invalid":t}};function ot(t,e){if(1&t){var n=b.Pb();b.Ob(0,"h1"),b.yc(1),b.Nb(),b.Ob(2,"div",6),b.Ob(3,"div",7),b.yc(4," enabled "),b.Ob(5,"mat-slide-toggle",8),b.Vb("ngModelChange",(function(t){return b.nc(n),b.Zb().game.enabled=t}))("click",(function(){b.nc(n);var t=b.Zb();return t.loading||t.toggle()})),b.Nb(),b.wc(6,Q,1,0,"mat-spinner",9),b.wc(7,tt,2,1,"span",10),b.Nb(),b.Ob(8,"div",11),b.Ob(9,"h2"),b.yc(10,"Musics"),b.Nb(),b.Ob(11,"div",12),b.Ob(12,"label",13),b.yc(13,"add musics"),b.Nb(),b.Ob(14,"input",14),b.Vb("change",(function(t){return b.nc(n),b.Zb().fileUpload(t)})),b.Nb(),b.wc(15,nt,2,1,"ng-container",15),b.Ob(16,"button",16),b.Vb("click",(function(){b.nc(n);var t=b.Zb();return t.uploadLoading||0===t.musicFiles.length||t.uploadMusic()})),b.yc(17," Upload "),b.wc(18,it,1,0,"span",17),b.Nb(),b.Nb(),b.Ob(19,"table",18),b.Ob(20,"thead",19),b.Ob(21,"tr"),b.Ob(22,"th",20),b.yc(23,"title"),b.Nb(),b.Ob(24,"th",20),b.yc(25,"artist"),b.Nb(),b.Ob(26,"th",20),b.yc(27,"duration"),b.Nb(),b.Ob(28,"th",20),b.yc(29,"accuracy"),b.Nb(),b.Ob(30,"th",20),b.yc(31,"played"),b.Nb(),b.Ob(32,"th",20),b.yc(33,"action"),b.Nb(),b.Nb(),b.Nb(),b.Ob(34,"tbody"),b.wc(35,rt,2,1,"ng-container",21),b.Nb(),b.Nb(),b.Nb(),b.Ob(36,"div",11),b.Ob(37,"table",18),b.Ob(38,"thead",19),b.Ob(39,"tr"),b.Ob(40,"th",20),b.yc(41,"Alternative names"),b.Nb(),b.Ob(42,"th",20),b.yc(43,"Enabled"),b.Nb(),b.Nb(),b.Nb(),b.Ob(44,"tbody"),b.wc(45,at,2,1,"ng-container",21),b.Nb(),b.Nb(),b.Nb(),b.Nb()}if(2&t){var i=b.Zb();b.zb(1),b.zc(i.game.name),b.zb(4),b.gc("ngModel",i.game.enabled)("disabled",i.toggleLoading),b.zb(1),b.gc("ngIf",i.toggleLoading),b.zb(1),b.gc("ngIf",i.toggleErrorMessage),b.zb(4),b.gc("formGroup",i.musicUploadForm),b.zb(3),b.gc("ngClass",b.jc(12,ct,i.musics.invalid&&(i.musics.dirty||i.musics.touched))),b.zb(1),b.gc("ngIf",i.musics.errors),b.zb(1),b.gc("disabled",i.uploadLoading||0===i.musicFiles.length),b.zb(2),b.gc("ngIf",i.uploadLoading),b.zb(17),b.gc("ngForOf",i.game.musics),b.zb(10),b.gc("ngForOf",i.game.alternativeNames)}}var st,ut,lt=[{path:":slug",component:(st=function(){function t(e,n,i){a(this,t),this.adminGameHttpService=e,this.route=n,this.formBuilder=i,this.loading=!1,this.uploadLoading=!1,this.musicFiles=[],this.toggleLoading=!1}return o(t,[{key:"ngOnInit",value:function(){var t=this;this.loading=!0,this.adminGameHttpService.get(this.route.snapshot.paramMap.get("slug")).subscribe((function(e){t.game=new u.a(e),t.loading=!1})),this.musicUploadForm=this.formBuilder.group({musics:[null,[y.s.required.bind(this)]]})}},{key:"uploadMusic",value:function(){var t=this;this.uploadLoading=!0,this.adminGameHttpService.uploadMusics(this.route.snapshot.paramMap.get("slug"),this.musicFiles).pipe(Object(l.a)((function(){return t.uploadLoading=!1}))).subscribe((function(e){t.game=new u.a(e)}),(function(e){e.errors.forEach((function(e){t.musics.setErrors({apiErrors:e})}))}))}},{key:"fileUpload",value:function(t){var e;this.musicFiles=(null===(e=null==t?void 0:t.target)||void 0===e?void 0:e.files)?t.target.files:void 0}},{key:"handleGameMusicDeleted",value:function(t){this.game.musics.splice(this.game.musics.indexOf(this.game.musics.find((function(e){return e.id===t.id}))),1)}},{key:"toggle",value:function(){var t=this;this.toggleErrorMessage=void 0,this.toggleLoading=!0,this.adminGameHttpService.toggleGame(this.game).pipe(Object(l.a)((function(){return t.toggleLoading=!1}))).subscribe((function(e){t.game=e}),(function(e){t.toggleErrorMessage=e}))}},{key:"musics",get:function(){return this.musicUploadForm.get("musics")}}]),t}(),st.\u0275fac=function(t){return new(t||st)(b.Jb(h),b.Jb(O.a),b.Jb(y.c))},st.\u0275cmp=b.Db({type:st,selectors:[["app-game-show"]],decls:5,vars:2,consts:[["routerLink","admin/games",1,"btn","btn-info"],[4,"ngIf","ngIfElse"],["gameShow",""],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"row"],[1,"col-md-12"],["color","primary",3,"ngModel","disabled","ngModelChange","click"],["color","primary",4,"ngIf"],["class","text-danger",4,"ngIf"],[1,"col-md-6"],[1,"form-group",3,"formGroup"],["for","exampleFormControlFile1"],["type","file","id","exampleFormControlFile1","formControlName","musics","multiple","","accept","audio/mpeg",1,"form-control-file",3,"ngClass","change"],[4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"table"],[1,"thead-dark"],["scope","col"],[4,"ngFor","ngForOf"],["color","primary"],[1,"text-danger"],["class","invalid-feedback",4,"ngFor","ngForOf"],[1,"invalid-feedback"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"],["musicRow","",3,"gameMusic","onDelete"],["alternativeNameRow","",3,"alternativeName"]],template:function(t,e){if(1&t&&(b.Ob(0,"a",0),b.yc(1,"back to list"),b.Nb(),b.wc(2,Y,5,0,"ng-container",1),b.wc(3,ot,46,14,"ng-template",null,2,b.xc)),2&t){var n=b.mc(4);b.zb(2),b.gc("ngIf",e.loading)("ngIfElse",n)}},directives:[O.e,s.l,v.a,y.m,y.p,y.n,y.h,y.b,y.f,s.j,s.k,L.b,$,W],encapsulation:2}),st)},{path:"",component:E}],bt=((ut=function t(){a(this,t)}).\u0275mod=b.Hb({type:ut}),ut.\u0275inj=b.Gb({factory:function(t){return new(t||ut)},imports:[[s.c,O.f.forChild(lt),G.a]]}),ut)}}])}();
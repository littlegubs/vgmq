"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[434],{2434:(Ie,h,s)=>{s.r(h),s.d(h,{GameModule:()=>be});var c=s(6814),u=s(8184),C=s(5037),A=s(7494),e=s(9212),d=s(5438),p=s(304);const y=n=>["/admin/games/",n];function G(n,a){if(1&n&&(e.TgZ(0,"a",11),e._uU(1,"admin"),e.qZA()),2&n){const t=e.oxw(2);e.Q6J("routerLink",e.VKq(1,y,t.game.slug))}}const S=n=>({"background-color":n});function U(n,a){if(1&n&&(e.TgZ(0,"span",12),e._uU(1),e.qZA()),2&n){const t=a.$implicit,o=e.oxw(2);e.Q6J("ngStyle",e.VKq(2,S,o.game.cover?o.game.cover.colorPalette.backgroundColorHex:"black")),e.xp6(),e.Oqu(t.abbreviation)}}function q(n,a){if(1&n&&(e.TgZ(0,"div")(1,"small"),e._uU(2," from "),e.TgZ(3,"span",23),e._uU(4),e.qZA()()()),2&n){const t=e.oxw().$implicit;e.xp6(4),e.hij(" ",t.originalGameToMusic.game.name," ")}}function J(n,a){if(1&n&&(e.ynx(0),e.TgZ(1,"span",23),e._uU(2),e.qZA(),e._uU(3),e.BQk()),2&n){const t=a.$implicit,o=a.last;e.xp6(2),e.Oqu(t.game.name),e.xp6(),e.hij("",o?"":", "," ")}}function N(n,a){if(1&n&&(e.TgZ(0,"div",16)(1,"small",24),e._uU(2," Also appears in "),e.YNc(3,J,4,2,"ng-container",25),e.qZA()()),2&n){const t=e.oxw().$implicit;e.xp6(3),e.Q6J("ngForOf",t.derivedGameToMusics)}}function Q(n,a){if(1&n&&(e.TgZ(0,"div",19)(1,"div",20)(2,"div",16),e.YNc(3,q,5,1,"div",21),e._uU(4),e.qZA(),e.TgZ(5,"div",16),e._uU(6),e.qZA(),e.TgZ(7,"div",17),e._uU(8),e.ALo(9,"date"),e.qZA(),e.TgZ(10,"div",17),e._uU(11),e.ALo(12,"number"),e.qZA(),e.YNc(13,N,4,1,"div",22),e.qZA()()),2&n){const t=a.$implicit,o=e.oxw(3);let i,m;e.xp6(3),e.Q6J("ngIf",t.type!==o.gameToMusicType.Original),e.xp6(),e.hij(" ",null!==(i=t.title)&&void 0!==i?i:t.music.title," "),e.xp6(2),e.Oqu(null!==(m=t.artist)&&void 0!==m?m:t.music.artist),e.xp6(2),e.Oqu(e.xi3(9,6,o.getDuration(t),"mm:ss")),e.xp6(3),e.hij(" ",null!==t.guessAccuracy?e.xi3(12,9,100*t.guessAccuracy,"1.0-2")+"%":"-"," "),e.xp6(2),e.Q6J("ngIf",t.derivedGameToMusics&&t.derivedGameToMusics.length>0)}}function L(n,a){if(1&n&&(e.TgZ(0,"div",13)(1,"h2"),e._uU(2,"Music list"),e.qZA(),e.TgZ(3,"div",14)(4,"div",15)(5,"div",16),e._uU(6,"title"),e.qZA(),e.TgZ(7,"div",16),e._uU(8,"artist"),e.qZA(),e.TgZ(9,"div",17),e._uU(10,"duration"),e.qZA(),e.TgZ(11,"div",17),e._uU(12,"accuracy"),e.qZA()(),e.YNc(13,Q,14,12,"div",18),e.qZA()()),2&n){const t=e.oxw(2);e.xp6(13),e.Q6J("ngForOf",t.game.musics)}}function M(n,a){if(1&n&&(e.TgZ(0,"div",28),e._uU(1),e.qZA()),2&n){const t=a.$implicit;e.xp6(),e.hij(" ",t.name," ")}}function Y(n,a){if(1&n&&(e.TgZ(0,"div",26)(1,"h2"),e._uU(2,"Alternative names"),e.qZA(),e.YNc(3,M,2,1,"div",27),e.qZA()),2&n){const t=e.oxw(2);e.xp6(3),e.Q6J("ngForOf",t.getEnabledAlternativeNames())}}function k(n,a){if(1&n&&(e.TgZ(0,"div",2)(1,"div",3)(2,"div",4)(3,"h1"),e._uU(4),e.qZA()(),e.TgZ(5,"div",5)(6,"a",6),e._uU(7,"IGDB"),e.qZA(),e.YNc(8,G,2,3,"a",7),e.qZA()(),e.TgZ(9,"h4"),e.YNc(10,U,2,4,"span",8),e.qZA(),e.TgZ(11,"div",3),e.YNc(12,L,14,1,"div",9)(13,Y,4,1,"div",10),e.qZA()()),2&n){const t=e.oxw();e.Q6J("ngStyle",t.getGradientBackground()),e.xp6(4),e.Oqu(t.game.name),e.xp6(2),e.Q6J("href",t.game.url,e.LSH),e.xp6(2),e.Q6J("ngIf",t.isAdmin),e.xp6(2),e.Q6J("ngForOf",t.game.platforms),e.xp6(2),e.Q6J("ngIf",t.game.musics.length>0),e.xp6(),e.Q6J("ngIf",t.getEnabledAlternativeNames().length>0)}}function H(n,a){1&n&&(e.TgZ(0,"div",29),e._UZ(1,"h1",30),e.qZA())}let x=(()=>{class n{gameHttpService;viewportScroller;authService;game;loading=!1;set slug(t){this.loading=!0,this.gameHttpService.get(t).subscribe(o=>{this.game=o,this.loading=!1})}gameToMusicType=A.U;isAdmin=!1;constructor(t,o,i){this.gameHttpService=t,this.viewportScroller=o,this.authService=i}ngOnInit(){this.isAdmin=this.authService.isAdmin}getDuration(t){return C.ou.fromSeconds(t.music.duration).toJSDate()}getEnabledAlternativeNames(){return this.game.alternativeNames.filter(t=>t.enabled)}getGradientBackground(){if(!this.game.cover)return null;const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.game.cover.colorPalette.backgroundColorHex);return parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),{"background-image":`linear-gradient(to bottom, rgba(20, 21, 22, 0.70), rgba(20, 21, 22, 1) 150px), url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${this.game.cover.imageId}.jpg)`}}static \u0275fac=function(o){return new(o||n)(e.Y36(d.q),e.Y36(c.EM),e.Y36(p.e))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-show"]],inputs:{slug:"slug"},decls:3,vars:2,consts:[["id","sex","class","bg-dark p-4",3,"ngStyle",4,"ngIf","ngIfElse"],["skeleton",""],["id","sex",1,"bg-dark","p-4",3,"ngStyle"],[1,"row","justify-content-between"],[1,"col-md-5"],[1,"col","text-end"],["target","_blank",1,"btn","text-white",2,"background-color","#9147ff",3,"href"],["class","btn btn-primary","target","_blank",3,"routerLink",4,"ngIf"],["class","badge text-white",3,"ngStyle",4,"ngFor","ngForOf"],["class","col-md-8","style","overflow: auto; max-height: 90vh",4,"ngIf"],["class","col-md-3 alternative-name-container",4,"ngIf"],["target","_blank",1,"btn","btn-primary",3,"routerLink"],[1,"badge","text-white",3,"ngStyle"],[1,"col-md-8",2,"overflow","auto","max-height","90vh"],[2,"overflow","visible"],[1,"row",2,"padding","10px"],[1,"col-5"],[1,"col-1"],["class","music-list",4,"ngFor","ngForOf"],[1,"music-list"],[1,"row"],[4,"ngIf"],["class","col-5",4,"ngIf"],[1,"text-primary"],[1,"text-muted-light"],[4,"ngFor","ngForOf"],[1,"col-md-3","alternative-name-container"],["class","alternative-name",4,"ngFor","ngForOf"],[1,"alternative-name"],[1,"col-md-12","bg-dark","p-4"],[1,"placeholder","col-md-2"]],template:function(o,i){if(1&o&&e.YNc(0,k,14,7,"div",0)(1,H,2,0,"ng-template",null,1,e.W1O),2&o){const m=e.MAs(2);e.Q6J("ngIf",!i.loading)("ngIfElse",m)}},dependencies:[c.sg,c.O5,c.PC,u.rH,c.JJ,c.uU],encapsulation:2})}return n})();var D=s(2132),F=s(3620),_=s(4716),f=function(n){return n.NameAsc="name_asc",n.NameDesc="name_desc",n.CountUsersAsc="count_user_asc",n.CountUsersDesc="count_user_desc",n.CountMusicsAsc="count_music_asc",n.CountMusicsDesc="count_music_desc",n}(f||{}),r=s(6223),v=s(7700),B=s(6498);function E(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.BQk()),2&n){const t=e.oxw(2);e.xp6(),e.hij(" ",t.form.errors.serverError," ")}}function j(n,a){if(1&n&&(e.TgZ(0,"div",12),e.YNc(1,E,2,1,"ng-container",7),e.qZA()),2&n){const t=e.oxw();e.xp6(),e.Q6J("ngIf",t.form.errors.serverError)}}function P(n,a){if(1&n&&(e.TgZ(0,"p",13),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(),e.Oqu(t.errorMessage)}}function K(n,a){if(1&n&&(e.TgZ(0,"li"),e._uU(1),e.qZA()),2&n){const t=a.$implicit;e.xp6(),e.Oqu(t)}}function W(n,a){if(1&n&&(e.TgZ(0,"div")(1,"p",14),e._uU(2),e.qZA(),e.TgZ(3,"ul"),e.YNc(4,K,2,1,"li",15),e.qZA()()),2&n){const t=e.oxw();e.xp6(2),e.hij("Successfully imported ",t.importedGames.length," games!"),e.xp6(2),e.Q6J("ngForOf",t.importedGames)}}function R(n,a){1&n&&e._UZ(0,"span",16)}const V=n=>({"is-invalid":n}),$=n=>({disabled:n});let z=(()=>{class n{dialogRef;gameHttpService;adminGameHttpService;authService;loading=!1;errorMessage;form=new r.NI(null,r.kI.required.bind(this));importedGames=[];constructor(t,o,i,m){this.dialogRef=t,this.gameHttpService=o,this.adminGameHttpService=i,this.authService=m}submit(){this.errorMessage=void 0,this.loading=!0,this.importedGames=[],(this.authService.isAdmin?this.adminGameHttpService.importByUrl(this.form.value):this.gameHttpService.importByUrl(this.form.value)).pipe((0,_.x)(()=>this.loading=!1)).subscribe({next:o=>{this.importedGames=o,this.form.reset()},error:o=>{Array.isArray(o.message)?this.form.setErrors({serverError:o.message[0].errors}):this.errorMessage=o.message}})}static \u0275fac=function(o){return new(o||n)(e.Y36(v.so),e.Y36(d.q),e.Y36(B.I),e.Y36(p.e))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-import-game-dialog"]],decls:26,vars:12,consts:[["href","https://www.igdb.com/search","target","_blank"],[1,"text-primary"],["href","https://discord.com/channels/978654868296331314/1036244380031402075","target","_blank"],[1,"form-group",3,"ngSubmit"],["required","","placeholder","IGDB url (ex: https://www.igdb.com/games/nier-automata)",1,"form-control",3,"formControl","ngClass"],["class","invalid-feedback",4,"ngIf"],["class","text-danger",4,"ngIf"],[4,"ngIf"],["mat-dialog-actions","",1,"row","justify-content-end"],[1,"col"],[1,"btn","btn-outline-primary",3,"disabled","ngClass","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"invalid-feedback"],[1,"text-danger"],[1,"text-success"],[4,"ngFor","ngForOf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(o,i){1&o&&(e.TgZ(0,"h2"),e._uU(1,"Import a game"),e.qZA(),e.TgZ(2,"p"),e._uU(3," import a game from "),e.TgZ(4,"a",0),e._uU(5,"igdb.com"),e.qZA(),e._uU(6," by searching a game and copying its url below\n"),e.qZA(),e.TgZ(7,"p"),e._uU(8," You are only allowed to import what IGDB calls "),e.TgZ(9,"b",1),e._uU(10,'"main games"'),e.qZA(),e._uU(11,"."),e._UZ(12,"br"),e._uU(13," If you want to add a DLC, expansion, chapter, etc... please request your game in "),e.TgZ(14,"a",2),e._uU(15," the dedicated Discord channel "),e.qZA()(),e.TgZ(16,"form",3),e.NdJ("ngSubmit",function(){return i.submit()}),e._UZ(17,"input",4),e.YNc(18,j,2,1,"div",5),e.qZA(),e.YNc(19,P,2,1,"p",6)(20,W,5,2,"div",7),e.TgZ(21,"div",8)(22,"div",9)(23,"button",10),e.NdJ("click",function(){return i.form.invalid||i.loading||i.submit()}),e._uU(24," Import"),e.YNc(25,R,1,0,"span",11),e.qZA()()()),2&o&&(e.xp6(17),e.Q6J("formControl",i.form)("ngClass",e.VKq(8,V,i.form.invalid&&(i.form.dirty||i.form.touched))),e.xp6(),e.Q6J("ngIf",i.form.errors),e.xp6(),e.Q6J("ngIf",i.errorMessage),e.xp6(),e.Q6J("ngIf",i.importedGames.length>0),e.xp6(3),e.Q6J("disabled",i.form.invalid||i.loading)("ngClass",e.VKq(10,$,i.form.invalid||i.loading)),e.xp6(2),e.Q6J("ngIf",i.loading))},dependencies:[c.mk,c.sg,c.O5,v.H8,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.F,r.oH],encapsulation:2})}return n})();var X=s(5986),Z=s(9157),ee=s(3680),te=s(2032);class ne{}var T=s(2296),b=s(617);const oe=n=>({"d-none":n});function ie(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"img",11),e.NdJ("load",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.hidden=!1)}),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("src","https://images.igdb.com/igdb/image/upload/t_720p/"+t.game.cover.imageId+".jpg",e.LSH)("ngClass",e.VKq(3,oe,t.hidden))("alt",t.game.name)}}function ae(n,a){if(1&n&&(e.TgZ(0,"div",12)(1,"h2",13),e._uU(2),e.qZA()()),2&n){const t=e.oxw();e.xp6(2),e.Oqu(t.game.name)}}const l=n=>({"background-color":n});function se(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"button",14),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.addToList(i.game))}),e.TgZ(1,"mat-icon"),e._uU(2,"add"),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("ngStyle",e.VKq(1,l,t.game.cover?t.game.cover.colorPalette.backgroundColorHex:"#171717"))}}function re(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"button",14),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.removeFromList(i.game))}),e.TgZ(1,"mat-icon"),e._uU(2,"remove"),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("ngStyle",e.VKq(1,l,t.game.cover?t.game.cover.colorPalette.backgroundColorHex:"#171717"))}}let me=(()=>{class n{gameHttpService;authService;parentComponent;game;hidden=!0;isAdmin=!1;selected=new e.vpe;constructor(t,o,i){this.gameHttpService=t,this.authService=o,this.parentComponent=i}ngOnInit(){this.isAdmin=this.authService.isAdmin}addToList(t){this.gameHttpService.addToList(t.slug).subscribe(()=>{t.selectedByUser=!t.selectedByUser})}removeFromList(t){this.gameHttpService.removeFromList(t.slug).subscribe(()=>{t.selectedByUser=!t.selectedByUser})}click(){this.selected.emit()}static \u0275fac=function(o){return new(o||n)(e.Y36(d.q),e.Y36(p.e),e.Y36(ne,8))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-item"]],inputs:{game:"game"},outputs:{selected:"selected"},decls:16,vars:15,consts:[[2,"position","relative","aspect-ratio","3/4","display","flex","align-items","center"],[1,"w-100",2,"cursor","pointer",3,"click"],["class","card-img-top","style","flex: 0",3,"src","ngClass","alt","load",4,"ngIf","ngIfElse"],["noImage",""],[1,"w-100","h-100",2,"position","absolute","top","0","z-index","-1","filter","brightness(50%)",3,"ngStyle"],[1,"pills-container","has-admin-pill"],["mat-raised-button","",1,"pill","countUsers",3,"ngStyle"],[1,"fa-solid","fa-gamepad"],["mat-raised-button","",1,"pill","countMusics",3,"ngStyle"],[1,"fa-solid","fa-music"],["class","game-item-cta","mat-mini-fab","","aria-label","Example icon button with a heart icon",3,"ngStyle","click",4,"ngIf"],[1,"card-img-top",2,"flex","0",3,"src","ngClass","alt","load"],[1,"p-2","text-center"],[1,"m-0"],["mat-mini-fab","","aria-label","Example icon button with a heart icon",1,"game-item-cta",3,"ngStyle","click"]],template:function(o,i){if(1&o&&(e.TgZ(0,"div",0)(1,"div",1),e.NdJ("click",function(){return i.click()}),e.YNc(2,ie,1,5,"img",2)(3,ae,3,1,"ng-template",null,3,e.W1O),e.qZA(),e._UZ(5,"div",4),e.TgZ(6,"div",5)(7,"button",6),e._uU(8),e._UZ(9,"i",7),e.qZA(),e.TgZ(10,"button",8),e._uU(11),e._UZ(12,"i",9),e.qZA()(),e.ynx(13),e.YNc(14,se,3,3,"button",10)(15,re,3,3,"button",10),e.BQk(),e.qZA()),2&o){const m=e.MAs(4);e.xp6(2),e.Q6J("ngIf",i.game.cover)("ngIfElse",m),e.xp6(3),e.Q6J("ngStyle",e.VKq(9,l,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"#171717")),e.xp6(2),e.Q6J("ngStyle",e.VKq(11,l,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"#171717")),e.xp6(),e.hij(" ",i.game.countUsers," "),e.xp6(2),e.Q6J("ngStyle",e.VKq(13,l,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"#171717")),e.xp6(),e.hij(" ",i.game.countMusics," "),e.xp6(3),e.Q6J("ngIf",!1===i.game.selectedByUser),e.xp6(),e.Q6J("ngIf",!0===i.game.selectedByUser)}},dependencies:[c.mk,c.O5,c.PC,T.lW,T.nh,b.Hw],encapsulation:2})}return n})();var I=s(6283),w=s(8525);function ce(n,a){if(1&n&&(e.TgZ(0,"h1"),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(),e.hij("",t.gamesCount," games")}}function le(n,a){if(1&n&&(e.TgZ(0,"mat-option",23),e._uU(1," Music number Lowest "),e.qZA()),2&n){const t=e.oxw(2);e.Q6J("value",t.gameSearchSortBy.CountMusicsAsc)}}function ge(n,a){if(1&n&&(e.TgZ(0,"mat-option",23),e._uU(1," Music number Highest "),e.qZA()),2&n){const t=e.oxw(2);e.Q6J("value",t.gameSearchSortBy.CountMusicsDesc)}}function ue(n,a){1&n&&(e.TgZ(0,"div")(1,"div",19)(2,"mat-checkbox",25),e._uU(3," Only Show Without Music "),e.qZA()(),e.TgZ(4,"div",19)(5,"mat-checkbox",26),e._uU(6,"Disabled"),e.qZA()()())}function de(n,a){if(1&n&&(e.TgZ(0,"form",14)(1,"div",15)(2,"div",16)(3,"mat-form-field",17)(4,"mat-label"),e._uU(5,"Search..."),e.qZA(),e._UZ(6,"input",18),e.qZA()(),e.TgZ(7,"div",2)(8,"div",19)(9,"mat-checkbox",20),e._uU(10,"Only Show My Games"),e.qZA()(),e.TgZ(11,"mat-form-field",21)(12,"mat-label"),e._uU(13,"Sort By"),e.qZA(),e.TgZ(14,"mat-select",22)(15,"mat-option",23),e._uU(16,"Title A-Z"),e.qZA(),e.TgZ(17,"mat-option",23),e._uU(18,"Title Z-A"),e.qZA(),e.TgZ(19,"mat-option",23),e._uU(20,"Most to Least Popular"),e.qZA(),e.TgZ(21,"mat-option",23),e._uU(22,"Least to Most Popular"),e.qZA(),e.YNc(23,le,2,1,"mat-option",24)(24,ge,2,1,"mat-option",24),e.qZA()(),e.YNc(25,ue,7,0,"div",3),e.qZA()()()),2&n){const t=e.oxw();e.Q6J("formGroup",t.form),e.xp6(15),e.Q6J("value",t.gameSearchSortBy.NameAsc),e.xp6(2),e.Q6J("value",t.gameSearchSortBy.NameDesc),e.xp6(2),e.Q6J("value",t.gameSearchSortBy.CountUsersDesc),e.xp6(2),e.Q6J("value",t.gameSearchSortBy.CountUsersAsc),e.xp6(2),e.Q6J("ngIf",t.authService.isAdmin),e.xp6(),e.Q6J("ngIf",t.authService.isAdmin),e.xp6(),e.Q6J("ngIf",t.authService.isAdmin)}}function pe(n,a){1&n&&(e.ynx(0),e.TgZ(1,"div",27)(2,"div",28)(3,"span",29),e._uU(4,"Loading..."),e.qZA()()(),e.BQk())}function _e(n,a){if(1&n&&e._UZ(0,"app-game-show",35),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function fe(n,a){if(1&n&&e._UZ(0,"app-game-show",35),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function ve(n,a){if(1&n&&(e.ynx(0),e.YNc(1,_e,1,1,"app-game-show",34)(2,fe,1,1,"app-game-show",34),e.BQk()),2&n){const t=e.oxw().index,o=e.oxw(2);e.xp6(),e.Q6J("ngIf",o.innerWidth>=768&&((t+1)%5==0||o.games.length===t+1)&&o.getNextGameShowIndex(t,5)),e.xp6(),e.Q6J("ngIf",o.innerWidth<768&&((t+1)%2==0||o.games.length===t+1)&&o.getNextGameShowIndex(t,2))}}function he(n,a){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"app-game-item",33),e.NdJ("selected",function(){const m=e.CHM(t).index,g=e.oxw(2);return e.KtG(g.selectGame(m))}),e.qZA(),e.YNc(2,ve,3,2,"ng-container",3),e.BQk()}if(2&n){const t=a.$implicit,o=e.oxw(2);e.xp6(),e.Q6J("game",t),e.xp6(),e.Q6J("ngIf",void 0!==o.selectedGameIndex)}}function xe(n,a){1&n&&(e.TgZ(0,"div",27)(1,"div",36)(2,"span",29),e._uU(3,"Loading..."),e.qZA()()())}function Ze(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"div",30),e.NdJ("scrolled",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onScrollDown())}),e.YNc(1,he,3,2,"ng-container",31)(2,xe,4,0,"div",32),e.qZA()}if(2&n){const t=e.oxw();e.xp6(),e.Q6J("ngForOf",t.games),e.xp6(),e.Q6J("ngIf",t.scrollLoading)}}const Te=[{path:":slug",component:x},{path:"",component:(()=>{class n{gameHttpService;router;activatedRoute;dialog;authService;games=[];gamesCount;loading=!1;myGames=!1;form;scrollLoading=!1;innerWidth;selectedGameIndex;gameSearchSortBy=f;constructor(t,o,i,m,g){this.gameHttpService=t,this.router=o,this.activatedRoute=i,this.dialog=m,this.authService=g}ngOnInit(){this.innerWidth=window.innerWidth,this.activatedRoute.queryParamMap.subscribe(t=>{this.form=new r.cw({query:new r.NI(t.get("query")??""),myGames:new r.NI("true"===t.get("myGames")),showDisabled:new r.NI("true"===t.get("showDisabled")),onlyShowWithoutMusics:new r.NI("true"===t.get("onlyShowWithoutMusics")),nsfw:new r.NI("true"===t.get("nsfw")),sortBy:new r.NI(t.get("sortBy")??f.CountUsersDesc)}),this.search()}).unsubscribe(),this.form.valueChanges.pipe((0,F.b)(250)).subscribe(()=>{this.search(),this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:this.form.value,replaceUrl:!0})})}search(){this.loading=!0,this.selectedGameIndex=void 0,this.gameHttpService.search(this.form.value,0,25).pipe((0,_.x)(()=>this.loading=!1)).subscribe(t=>{this.gamesCount=t.count,this.games=t.data})}onScrollDown(){this.scrollLoading||(this.scrollLoading=!0,this.gameHttpService.search(this.form.value,this.games.length,24).pipe((0,_.x)(()=>this.scrollLoading=!1)).subscribe(t=>{this.games=[...this.games,...t.data]}))}openImportDialog(){this.dialog.open(z).afterClosed().subscribe(()=>{this.search()})}getRow(t,o){return Math.floor(t/o)}getNextGameShowIndex(t,o){return this.getRow(t,o)===Math.floor(this.selectedGameIndex/o)}onResize(){this.innerWidth=window.innerWidth}selectGame(t){this.selectedGameIndex=t}static \u0275fac=function(o){return new(o||n)(e.Y36(d.q),e.Y36(u.F0),e.Y36(u.gz),e.Y36(v.uw),e.Y36(p.e))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-list"]],hostBindings:function(o,i){1&o&&e.NdJ("resize",function(g){return i.onResize(g)},!1,e.Jf7)},decls:16,vars:4,consts:[[1,"container"],[1,"row","justify-content-between"],[1,"col"],[4,"ngIf"],[1,"col","text-end"],[1,"btn","btn-outline-primary",3,"click"],[1,"row"],[1,"col-md-2","position-relative"],[1,"game-list-form"],[1,"position-sticky","pt-4",2,"top","0"],[3,"formGroup",4,"ngIf"],[1,"col-md-10"],[4,"ngIf","ngIfElse"],["cardColumns",""],[3,"formGroup"],[1,"row","justify-content-between","align-items-center"],[1,"col-md-12"],[1,"example-full-width"],["matInput","","formControlName","query"],[1,"form-group"],["color","primary","formControlName","myGames"],["appearance","fill"],["formControlName","sortBy"],[3,"value"],[3,"value",4,"ngIf"],["color","primary","formControlName","onlyShowWithoutMusics"],["color","primary","formControlName","showDisabled"],[1,"d-flex","justify-content-center"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],["infinite-scroll","",1,"mt-4","row",3,"scrolled"],[4,"ngFor","ngForOf"],["class","d-flex justify-content-center",4,"ngIf"],[3,"game","selected"],["class","col-12 mb-4",3,"slug",4,"ngIf"],[1,"col-12","mb-4",3,"slug"],["role","status",1,"spinner-border","text-primary"]],template:function(o,i){if(1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e.YNc(3,ce,2,1,"h1",3),e.qZA(),e.TgZ(4,"div",4)(5,"button",5),e.NdJ("click",function(){return i.openImportDialog()}),e._uU(6,"Import game from IGDB"),e.qZA()()(),e.TgZ(7,"div",6)(8,"div",7)(9,"div",8)(10,"div",9),e.YNc(11,de,26,8,"form",10),e.qZA()()(),e.TgZ(12,"div",11),e.YNc(13,pe,5,0,"ng-container",12)(14,Ze,3,2,"ng-template",null,13,e.W1O),e.qZA()()()),2&o){const m=e.MAs(15);e.xp6(3),e.Q6J("ngIf",i.gamesCount),e.xp6(8),e.Q6J("ngIf",i.form),e.xp6(2),e.Q6J("ngIf",i.loading)("ngIfElse",m)}},dependencies:[c.sg,c.O5,X.oG,Z.KE,Z.hX,ee.ey,te.Nt,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,me,I.Ry,w.gD,x],encapsulation:2})}return n})()}];let be=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[c.ez,u.Bz.forChild(Te),D.m,b.Ps,I.Rq,w.LD]})}return n})()}}]);
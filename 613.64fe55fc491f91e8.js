"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[613],{5613:(Ne,x,m)=>{m.r(x),m.d(x,{GameModule:()=>Je});var r=m(6814),u=m(2787),h=m(7494),e=m(9212),p=m(5438),d=m(304),G=m(5037),A=m(553);function C(n,a){if(1&n&&e._UZ(0,"img",7),2&n){const t=e.oxw();e.Q6J("src",t.cdnUrl+t.album.cover.path,e.LSH)}}function y(n,a){if(1&n&&(e.TgZ(0,"div",18)(1,"h3"),e._uU(2),e.qZA()()),2&n){const t=e.oxw().$implicit;let i;e.xp6(2),e.hij("Disk ",null!==(i=t.disk)&&void 0!==i?i:t.music.disk,"")}}function I(n,a){if(1&n&&(e.TgZ(0,"div",19),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;let i;e.xp6(),e.hij(" ",null!==(i=t.track)&&void 0!==i?i:t.music.track," ")}}function U(n,a){if(1&n&&(e.TgZ(0,"span"),e._uU(1," as "),e.TgZ(2,"span",20),e._uU(3),e.qZA()()),2&n){const t=e.oxw(2).$implicit;e.xp6(3),e.AsE("",t.originalGameToMusic.title," - ",t.originalGameToMusic.artist,"")}}function q(n,a){if(1&n&&(e.TgZ(0,"div")(1,"small"),e._uU(2," from "),e.TgZ(3,"span",20),e._uU(4),e.qZA(),e.YNc(5,U,4,2,"span",15),e.qZA()()),2&n){const t=e.oxw().$implicit;e.xp6(4),e.hij(" ",t.originalGameToMusic.game.name," "),e.xp6(),e.Q6J("ngIf",t.title!==t.originalGameToMusic.title||t.artist!==t.originalGameToMusic.artist)}}function S(n,a){if(1&n&&(e.TgZ(0,"span"),e._uU(1," as "),e.TgZ(2,"span",20),e._uU(3),e.qZA()()),2&n){const t=e.oxw().$implicit;e.xp6(3),e.AsE("",t.title," - ",t.artist,"")}}function J(n,a){1&n&&e._UZ(0,"br")}function N(n,a){if(1&n&&(e.ynx(0),e.TgZ(1,"span",20),e._uU(2),e.YNc(3,S,4,2,"span",15),e.qZA(),e.YNc(4,J,1,0,"br",15),e.BQk()),2&n){const t=a.$implicit,i=a.last,o=e.oxw(2).$implicit;e.xp6(2),e.hij("",t.game.name," "),e.xp6(),e.Q6J("ngIf",o.title!==t.title||o.artist!==t.artist),e.xp6(),e.Q6J("ngIf",!i)}}function Q(n,a){if(1&n&&(e.TgZ(0,"div",21)(1,"small",14),e._uU(2," Also appears in"),e._UZ(3,"br"),e.YNc(4,N,5,3,"ng-container",6),e.qZA()()),2&n){const t=e.oxw().$implicit;e.xp6(4),e.Q6J("ngForOf",t.derivedGameToMusics)}}function M(n,a){if(1&n&&(e.ynx(0),e.YNc(1,y,3,1,"div",8),e.TgZ(2,"div",9)(3,"div",10)(4,"div",11),e.YNc(5,I,2,1,"div",12),e.TgZ(6,"div",13),e._uU(7),e.TgZ(8,"div",14)(9,"small"),e._uU(10),e.qZA()(),e.YNc(11,q,6,2,"div",15)(12,Q,5,1,"div",16),e.qZA()(),e.TgZ(13,"div",17),e._uU(14),e.ALo(15,"date"),e.qZA(),e.TgZ(16,"div",17),e._uU(17),e.qZA(),e.TgZ(18,"div",17),e._uU(19),e.ALo(20,"number"),e.qZA()()(),e.BQk()),2&n){const t=a.$implicit,i=a.index,o=e.oxw();let l,c;e.xp6(),e.um2(1,o.showDisk(i,t)?1:-1),e.xp6(4),e.Q6J("ngIf",t.track||t.music.track),e.xp6(2),e.hij(" ",null!==(l=t.title)&&void 0!==l?l:t.music.title," "),e.xp6(3),e.Oqu(null!==(c=t.artist)&&void 0!==c?c:t.music.artist),e.xp6(),e.Q6J("ngIf",t.type!==o.gameToMusicType.Original),e.xp6(),e.Q6J("ngIf",t.derivedGameToMusics&&t.derivedGameToMusics.length>0),e.xp6(2),e.Oqu(e.xi3(15,9,o.getDuration(t),"mm:ss")),e.xp6(3),e.Oqu(t.playNumber),e.xp6(2),e.hij(" ",null!==t.guessAccuracy?e.xi3(20,12,100*t.guessAccuracy,"1.0-2")+"%":"-"," ")}}let k=(()=>{class n{gameToMusicType=h.U;album;gameToMusics;cdnUrl=A.N.cdnUrl;getDuration(t){return G.ou.fromSeconds(t.music.duration).toJSDate()}getGameToMusic(){return this.album?this.album.musics:this.gameToMusics}showDisk(t,i){const o=this.getGameToMusic()[t-1];return(t-1==-1||(o.disk??o.music.disk)!==(i.disk??i.music.disk))&&null!==(i.disk??i.music.disk)}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-album"]],inputs:{album:"album",gameToMusics:"gameToMusics"},standalone:!0,features:[e.jDz],decls:10,vars:4,consts:[[2,"margin-bottom","0"],[1,"tw-flex","tw-pb-4"],[1,"tw-w-1/5","pe-4"],[1,"tw-w-full","tw-aspect-square","tw-bg-[#141F2B]"],["width","100%","height","100%","alt","album cover",3,"src",4,"ngIf"],[1,"tw-w-4/5"],[4,"ngFor","ngForOf"],["width","100%","height","100%","alt","album cover",3,"src"],["class","tw-mt-[16px]"],[1,"music-list"],[1,"tw-flex","tw-justify-between"],[1,"tw-flex"],["class","text-muted-light tw-text-right tw-me-[30px] tw-w-[20px]",4,"ngIf"],[1,"tw-w-[270px]"],[1,"text-muted-light"],[4,"ngIf"],["class","tw-mt-3",4,"ngIf"],[1,"tw-w-[60px]","tw-text-center"],[1,"tw-mt-[16px]"],[1,"text-muted-light","tw-text-right","tw-me-[30px]","tw-w-[20px]"],[1,"text-primary"],[1,"tw-mt-3"]],template:function(i,o){1&i&&(e.TgZ(0,"h1",0),e._uU(1),e.qZA(),e.TgZ(2,"h5"),e._uU(3),e.qZA(),e.TgZ(4,"div",1)(5,"div",2)(6,"div",3),e.YNc(7,C,1,1,"img",4),e.qZA()(),e.TgZ(8,"div",5),e.YNc(9,M,21,15,"ng-container",6),e.qZA()()),2&i&&(e.xp6(),e.Oqu(o.album?o.album.name:"Other musics"),e.xp6(2),e.Oqu(null==o.album?null:o.album.date),e.xp6(4),e.Q6J("ngIf",null==o.album||null==o.album.cover?null:o.album.cover.path),e.xp6(2),e.Q6J("ngForOf",o.getGameToMusic()))},dependencies:[r.uU,r.JJ,r.sg,r.O5],encapsulation:2})}return n})();const L=n=>["/admin/games/",n];function Y(n,a){if(1&n&&(e.TgZ(0,"a",11),e._uU(1,"admin"),e.qZA()),2&n){const t=e.oxw(2);e.Q6J("routerLink",e.VKq(1,L,t.game.slug))}}const O=n=>({"background-color":n});function F(n,a){if(1&n&&(e.TgZ(0,"span",12),e._uU(1),e.qZA()),2&n){const t=a.$implicit,i=e.oxw(2);e.Q6J("ngStyle",e.VKq(2,O,i.game.cover?i.game.cover.colorPalette.backgroundColorHex:"black")),e.xp6(),e.Oqu(t.abbreviation)}}function H(n,a){1&n&&e._UZ(0,"app-game-album",16),2&n&&e.Q6J("album",a.$implicit)}function D(n,a){if(1&n&&e._UZ(0,"app-game-album",17),2&n){const t=e.oxw(3);e.Q6J("gameToMusics",t.game.musics)}}function B(n,a){if(1&n&&(e.TgZ(0,"div",13),e.YNc(1,H,1,1,"app-game-album",14)(2,D,1,1,"app-game-album",15),e.qZA()),2&n){const t=e.oxw(2);e.xp6(),e.Q6J("ngForOf",t.game.albums),e.xp6(),e.Q6J("ngIf",t.game.musics.length>0)}}function E(n,a){if(1&n&&(e.TgZ(0,"div",20),e._uU(1),e.qZA()),2&n){const t=a.$implicit;e.xp6(),e.hij(" ",t.name," ")}}function j(n,a){if(1&n&&(e.TgZ(0,"div",18)(1,"h2"),e._uU(2,"Alternative names"),e.qZA(),e.YNc(3,E,2,1,"div",19),e.qZA()),2&n){const t=e.oxw(2);e.xp6(3),e.Q6J("ngForOf",t.getEnabledAlternativeNames())}}function W(n,a){if(1&n&&(e.TgZ(0,"div",2)(1,"div",3)(2,"div",4)(3,"h1"),e._uU(4),e.qZA()(),e.TgZ(5,"div",5)(6,"a",6),e._uU(7,"IGDB"),e.qZA(),e.YNc(8,Y,2,3,"a",7),e.qZA()(),e.TgZ(9,"h4",4),e.YNc(10,F,2,4,"span",8),e.qZA(),e.YNc(11,B,3,2,"div",9)(12,j,4,1,"div",10),e.qZA()),2&n){const t=e.oxw();e.Q6J("ngStyle",t.getGradientBackground()),e.xp6(4),e.Oqu(t.game.name),e.xp6(2),e.Q6J("href",t.game.url,e.LSH),e.xp6(2),e.Q6J("ngIf",t.isAdmin),e.xp6(2),e.Q6J("ngForOf",t.game.platforms),e.xp6(),e.Q6J("ngIf",t.game.albums.length>0||t.game.musics.length>0),e.xp6(),e.Q6J("ngIf",t.getEnabledAlternativeNames().length>0)}}function K(n,a){1&n&&(e.TgZ(0,"div",21),e._UZ(1,"h1",22),e.qZA())}let w=(()=>{class n{gameHttpService;viewportScroller;authService;game;loading=!1;set slug(t){this.loading=!0,this.gameHttpService.get(t).subscribe(i=>{this.game=i,this.loading=!1})}gameToMusicType=h.U;isAdmin=!1;constructor(t,i,o){this.gameHttpService=t,this.viewportScroller=i,this.authService=o}ngOnInit(){this.isAdmin=this.authService.isAdmin}getEnabledAlternativeNames(){return this.game.alternativeNames.filter(t=>t.enabled)}getGradientBackground(){return this.game.cover?{"background-image":`linear-gradient(to bottom, rgba(20, 21, 22, 0.70), rgb(8 17 26 / var(--tw-bg-opacity)) 150px), url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${this.game.cover.imageId}.jpg)`}:null}static \u0275fac=function(i){return new(i||n)(e.Y36(p.q),e.Y36(r.EM),e.Y36(d.e))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-show"]],inputs:{slug:"slug"},decls:3,vars:2,consts:[["class","tw-bg-newBlack p-4",3,"ngStyle",4,"ngIf","ngIfElse"],["skeleton",""],[1,"tw-bg-newBlack","p-4",3,"ngStyle"],[1,"row","justify-content-between"],[1,"tw-flex","tw-justify-center"],[1,"col","text-end"],["target","_blank",1,"btn","text-white","tw-mr-2",2,"background-color","#9147ff",3,"href"],["class","btn btn-primary","target","_blank",3,"routerLink",4,"ngIf"],["class","badge text-white tw-mx-1",3,"ngStyle",4,"ngFor","ngForOf"],["class","tw-flex tw-items-center tw-flex-col tw-max-h-[80vh] tw-overflow-y-scroll",4,"ngIf"],["class","col-md-3 alternative-name-container",4,"ngIf"],["target","_blank",1,"btn","btn-primary",3,"routerLink"],[1,"badge","text-white","tw-mx-1",3,"ngStyle"],[1,"tw-flex","tw-items-center","tw-flex-col","tw-max-h-[80vh]","tw-overflow-y-scroll"],["class","tw-w-full",3,"album",4,"ngFor","ngForOf"],["class","tw-w-full",3,"gameToMusics",4,"ngIf"],[1,"tw-w-full",3,"album"],[1,"tw-w-full",3,"gameToMusics"],[1,"col-md-3","alternative-name-container"],["class","alternative-name",4,"ngFor","ngForOf"],[1,"alternative-name"],[1,"col-md-12","bg-dark","p-4"],[1,"placeholder","col-md-2"]],template:function(i,o){if(1&i&&e.YNc(0,W,13,7,"div",0)(1,K,2,0,"ng-template",null,1,e.W1O),2&i){const l=e.MAs(2);e.Q6J("ngIf",!o.loading)("ngIfElse",l)}},dependencies:[r.sg,r.O5,r.PC,u.rH,k],encapsulation:2})}return n})();var P=m(2132),$=m(3620),_=m(4716),f=function(n){return n.NameAsc="name_asc",n.NameDesc="name_desc",n.CountUsersAsc="count_user_asc",n.CountUsersDesc="count_user_desc",n.CountMusicsAsc="count_music_asc",n.CountMusicsDesc="count_music_desc",n}(f||{}),s=m(6223),v=m(7700),z=m(6498);function V(n,a){if(1&n&&(e.ynx(0),e._uU(1),e.BQk()),2&n){const t=e.oxw(2);e.xp6(),e.hij(" ",t.form.errors.serverError," ")}}function X(n,a){if(1&n&&(e.TgZ(0,"div",14),e.YNc(1,V,2,1,"ng-container",10),e.qZA()),2&n){const t=e.oxw();e.xp6(),e.Q6J("ngIf",t.form.errors.serverError)}}function ee(n,a){if(1&n&&(e.TgZ(0,"p",15),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(),e.Oqu(t.errorMessage)}}function te(n,a){if(1&n&&(e.TgZ(0,"li"),e._uU(1),e.qZA()),2&n){const t=a.$implicit;e.xp6(),e.Oqu(t)}}function ne(n,a){if(1&n&&(e.TgZ(0,"div")(1,"p",16),e._uU(2),e.qZA(),e.TgZ(3,"ul"),e.YNc(4,te,2,1,"li",17),e.qZA()()),2&n){const t=e.oxw();e.xp6(2),e.hij("Successfully imported ",t.importedGames.length," games!"),e.xp6(2),e.Q6J("ngForOf",t.importedGames)}}function ie(n,a){1&n&&e._UZ(0,"span",18)}const oe=n=>({"is-invalid":n}),ae=n=>({disabled:n});let se=(()=>{class n{dialogRef;gameHttpService;adminGameHttpService;authService;loading=!1;errorMessage;form=new s.NI(null,s.kI.required.bind(this));importedGames=[];constructor(t,i,o,l){this.dialogRef=t,this.gameHttpService=i,this.adminGameHttpService=o,this.authService=l}submit(){this.errorMessage=void 0,this.loading=!0,this.importedGames=[],(this.authService.isAdmin?this.adminGameHttpService.importByUrl(this.form.value):this.gameHttpService.importByUrl(this.form.value)).pipe((0,_.x)(()=>this.loading=!1)).subscribe({next:i=>{this.importedGames=i,this.form.reset()},error:i=>{Array.isArray(i.message)?this.form.setErrors({serverError:i.message[0].errors}):this.errorMessage=i.message}})}static \u0275fac=function(i){return new(i||n)(e.Y36(v.so),e.Y36(p.q),e.Y36(z.I),e.Y36(d.e))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-import-game-dialog"]],decls:26,vars:12,consts:[[1,"tw-flex","tw-flex-col","tw-items-center","!tw-bg-grey"],[1,"!tw-mb-8","!tw-mt-2","tw-text-white","!tw-font-fastup","!tw-text-6xl","tw-text-center"],[1,"tw-w-3/4","tw-text-center"],["href","https://www.igdb.com/search","target","_blank"],[1,"text-primary"],["href","https://discord.com/channels/978654868296331314/1036244380031402075","target","_blank"],[1,"tw-w-3/4",3,"ngSubmit"],["required","","placeholder","IGDB url (ex: https://www.igdb.com/games/nier-automata)",1,"form-control","!tw-bg-grey","tw-rounded-md","placeholder:tw-text-light-grey",3,"formControl","ngClass"],["class","invalid-feedback",4,"ngIf"],["class","text-danger",4,"ngIf"],[4,"ngIf"],[1,"tw-my-4"],[1,"btn","btn-outline-primary",3,"disabled","ngClass","click"],["class","spinner-border spinner-border-sm","role","status","aria-hidden","true",4,"ngIf"],[1,"invalid-feedback"],[1,"text-danger"],[1,"text-success"],[4,"ngFor","ngForOf"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"]],template:function(i,o){1&i&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"Import a game"),e.qZA(),e.TgZ(3,"p",2),e._uU(4," import a game from "),e.TgZ(5,"a",3),e._uU(6,"igdb.com"),e.qZA(),e._uU(7," by searching a game and copying its url below "),e.qZA(),e.TgZ(8,"p",2),e._uU(9," You are only allowed to import what IGDB calls "),e.TgZ(10,"b",4),e._uU(11,'"main games"'),e.qZA(),e._uU(12,". "),e.qZA(),e.TgZ(13,"p",2),e._uU(14," If you want to add a DLC, expansion, chapter, etc... please request your game in "),e.TgZ(15,"a",5),e._uU(16," the dedicated Discord channel "),e.qZA()(),e.TgZ(17,"form",6),e.NdJ("ngSubmit",function(){return o.submit()}),e._UZ(18,"input",7),e.YNc(19,X,2,1,"div",8),e.qZA(),e.YNc(20,ee,2,1,"p",9)(21,ne,5,2,"div",10),e.TgZ(22,"div",11)(23,"button",12),e.NdJ("click",function(){return o.form.invalid||o.loading||o.submit()}),e._uU(24," Import"),e.YNc(25,ie,1,0,"span",13),e.qZA()()()),2&i&&(e.xp6(18),e.Q6J("formControl",o.form)("ngClass",e.VKq(8,oe,o.form.invalid&&(o.form.dirty||o.form.touched))),e.xp6(),e.Q6J("ngIf",o.form.errors),e.xp6(),e.Q6J("ngIf",o.errorMessage),e.xp6(),e.Q6J("ngIf",o.importedGames.length>0),e.xp6(2),e.Q6J("disabled",o.form.invalid||o.loading)("ngClass",e.VKq(10,ae,o.form.invalid||o.loading)),e.xp6(2),e.Q6J("ngIf",o.loading))},dependencies:[r.mk,r.sg,r.O5,s._Y,s.Fj,s.JJ,s.JL,s.Q7,s.F,s.oH],encapsulation:2})}return n})();var me=m(5986);class le{}var b=m(2296),Z=m(617);const re=n=>({"d-none":n});function ce(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"img",12),e.NdJ("load",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.hidden=!1)}),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("src","https://images.igdb.com/igdb/image/upload/t_720p/"+t.game.cover.imageId+".jpg",e.LSH)("ngClass",e.VKq(3,re,t.hidden))("alt",t.game.name)}}function ge(n,a){if(1&n&&(e.TgZ(0,"div",13)(1,"h2",14),e._uU(2),e.qZA()()),2&n){const t=e.oxw();e.xp6(2),e.Oqu(t.game.name)}}const g=n=>({"background-color":n});function ue(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"button",15),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.addToList(o.game))}),e.TgZ(1,"mat-icon"),e._uU(2,"add"),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("ngStyle",e.VKq(1,g,t.game.cover?t.game.cover.colorPalette.backgroundColorHex:"#171717"))}}function pe(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"button",15),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.removeFromList(o.game))}),e.TgZ(1,"mat-icon"),e._uU(2,"remove"),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("ngStyle",e.VKq(1,g,t.game.cover?t.game.cover.colorPalette.backgroundColorHex:"#171717"))}}let de=(()=>{class n{gameHttpService;authService;parentComponent;game;hidden=!0;isAdmin=!1;selected=new e.vpe;constructor(t,i,o){this.gameHttpService=t,this.authService=i,this.parentComponent=o}ngOnInit(){this.isAdmin=this.authService.isAdmin}addToList(t){this.gameHttpService.addToList(t.slug).subscribe(()=>{t.selectedByUser=!t.selectedByUser})}removeFromList(t){this.gameHttpService.removeFromList(t.slug).subscribe(()=>{t.selectedByUser=!t.selectedByUser})}click(){this.selected.emit()}static \u0275fac=function(i){return new(i||n)(e.Y36(p.q),e.Y36(d.e),e.Y36(le,8))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-item"]],inputs:{game:"game"},outputs:{selected:"selected"},decls:18,vars:15,consts:[[2,"position","relative","aspect-ratio","3/4","display","flex","align-items","center"],[1,"w-100","tw-cursor-pointer",3,"click"],["class","card-img-top tw-rounded-xl","style","flex: 0",3,"src","ngClass","alt","load",4,"ngIf","ngIfElse"],["noImage",""],[1,"w-100","h-100","tw-rounded-xl",2,"position","absolute","top","0","z-index","-1","filter","brightness(50%)",3,"ngStyle"],[1,"pills-container","has-admin-pill"],["mat-raised-button","",1,"pill","!tw-rounded-br-lg","!tw-rounded-tl-xl","!tw-rounded-none",3,"ngStyle"],[1,"tw-text-xs"],[1,"fa-solid","fa-gamepad"],["mat-raised-button","",1,"pill","!tw-rounded-bl-lg","!tw-rounded-tr-xl","!tw-rounded-none",3,"ngStyle"],[1,"fa-solid","fa-music"],["class","game-item-cta","mat-mini-fab","","aria-label","Example icon button with a heart icon",3,"ngStyle","click",4,"ngIf"],[1,"card-img-top","tw-rounded-xl",2,"flex","0",3,"src","ngClass","alt","load"],[1,"p-2","text-center"],[1,"m-0"],["mat-mini-fab","","aria-label","Example icon button with a heart icon",1,"game-item-cta",3,"ngStyle","click"]],template:function(i,o){if(1&i&&(e.TgZ(0,"div",0)(1,"div",1),e.NdJ("click",function(){return o.click()}),e.YNc(2,ce,1,5,"img",2)(3,ge,3,1,"ng-template",null,3,e.W1O),e.qZA(),e._UZ(5,"div",4),e.TgZ(6,"div",5)(7,"button",6)(8,"span",7),e._uU(9),e.qZA(),e._UZ(10,"i",8),e.qZA(),e.TgZ(11,"button",9)(12,"span",7),e._uU(13),e.qZA(),e._UZ(14,"i",10),e.qZA()(),e.ynx(15),e.YNc(16,ue,3,3,"button",11)(17,pe,3,3,"button",11),e.BQk(),e.qZA()),2&i){const l=e.MAs(4);e.xp6(2),e.Q6J("ngIf",o.game.cover)("ngIfElse",l),e.xp6(3),e.Q6J("ngStyle",e.VKq(9,g,o.game.cover?o.game.cover.colorPalette.backgroundColorHex:"#171717")),e.xp6(2),e.Q6J("ngStyle",e.VKq(11,g,o.game.cover?o.game.cover.colorPalette.backgroundColorHex:"#171717")),e.xp6(2),e.Oqu(o.game.countUsers),e.xp6(2),e.Q6J("ngStyle",e.VKq(13,g,o.game.cover?o.game.cover.colorPalette.backgroundColorHex:"#171717")),e.xp6(2),e.Oqu(o.game.countMusics),e.xp6(3),e.Q6J("ngIf",!1===o.game.selectedByUser),e.xp6(),e.Q6J("ngIf",!0===o.game.selectedByUser)}},dependencies:[r.mk,r.O5,r.PC,b.lW,b.nh,Z.Hw],encapsulation:2})}return n})();var T=m(6283);function _e(n,a){if(1&n&&(e.TgZ(0,"span",7),e._uU(1),e.qZA()),2&n){const t=e.oxw();e.xp6(),e.Oqu(t.gamesCount)}}function fe(n,a){if(1&n&&(e.TgZ(0,"option",14),e._uU(1,"Music number Lowest"),e.qZA()),2&n){const t=e.oxw(2);e.Q6J("value",t.gameSearchSortBy.CountMusicsAsc)}}function xe(n,a){if(1&n&&(e.TgZ(0,"option",14),e._uU(1,"Music number Highest"),e.qZA()),2&n){const t=e.oxw(2);e.Q6J("value",t.gameSearchSortBy.CountMusicsDesc)}}function he(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"form",8)(1,"div",9),e._UZ(2,"input",10),e.qZA(),e.TgZ(3,"div",11)(4,"select",12)(5,"option",13),e._uU(6,"Sort By"),e.qZA(),e.TgZ(7,"option",14),e._uU(8,"Title A-Z"),e.qZA(),e.TgZ(9,"option",14),e._uU(10,"Title Z-A"),e.qZA(),e.TgZ(11,"option",14),e._uU(12,"Most to Least Popular"),e.qZA(),e.TgZ(13,"option",14),e._uU(14,"Least to Most Popular"),e.qZA(),e.YNc(15,fe,2,1,"option",15)(16,xe,2,1,"option",15),e.qZA(),e.TgZ(17,"mat-checkbox",16),e._uU(18,"Only Show My Games"),e.qZA(),e.TgZ(19,"mat-checkbox",17),e._uU(20," Only Show Without Music "),e.qZA(),e.TgZ(21,"mat-checkbox",18),e._uU(22,"Disabled"),e.qZA(),e.TgZ(23,"button",19),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.openImportDialog())}),e._UZ(24,"img",20),e._uU(25," Import game "),e.qZA()()()}if(2&n){const t=e.oxw();e.Q6J("formGroup",t.form),e.xp6(7),e.Q6J("value",t.gameSearchSortBy.NameAsc),e.xp6(2),e.Q6J("value",t.gameSearchSortBy.NameDesc),e.xp6(2),e.Q6J("value",t.gameSearchSortBy.CountUsersDesc),e.xp6(2),e.Q6J("value",t.gameSearchSortBy.CountUsersAsc),e.xp6(2),e.Q6J("ngIf",t.authService.isAdmin),e.xp6(),e.Q6J("ngIf",t.authService.isAdmin)}}function we(n,a){1&n&&(e.ynx(0),e.TgZ(1,"div",3)(2,"div",21)(3,"span",22),e._uU(4,"Loading..."),e.qZA()()(),e.BQk())}function ve(n,a){if(1&n&&e._UZ(0,"app-game-show",30),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function be(n,a){if(1&n&&e._UZ(0,"app-game-show",30),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function Ze(n,a){if(1&n&&e._UZ(0,"app-game-show",30),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function Te(n,a){if(1&n&&e._UZ(0,"app-game-show",30),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function Ge(n,a){if(1&n&&e._UZ(0,"app-game-show",30),2&n){const t=e.oxw(4);e.Q6J("slug",t.games[t.selectedGameIndex].slug)}}function Ae(n,a){if(1&n&&(e.ynx(0),e.YNc(1,ve,1,1,"app-game-show",29)(2,be,1,1)(3,Ze,1,1)(4,Te,1,1)(5,Ge,1,1),e.BQk()),2&n){const t=e.oxw().index,i=e.oxw(2);e.xp6(),e.um2(1,i.innerWidth<768&&((t+1)%2==0||i.games.length===t+1)&&i.getNextGameShowIndex(t,2)?1:i.innerWidth>=768&&i.innerWidth<1024&&((t+1)%3==0||i.games.length===t+1)&&i.getNextGameShowIndex(t,3)?2:i.innerWidth>=1024&&i.innerWidth<1280&&((t+1)%4==0||i.games.length===t+1)&&i.getNextGameShowIndex(t,4)?3:i.innerWidth>=1280&&i.innerWidth<1536&&((t+1)%5==0||i.games.length===t+1)&&i.getNextGameShowIndex(t,5)?4:i.innerWidth>=1536&&((t+1)%6==0||i.games.length===t+1)&&i.getNextGameShowIndex(t,6)?5:-1)}}function Ce(n,a){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"app-game-item",27),e.NdJ("selected",function(){const l=e.CHM(t).index,c=e.oxw(2);return e.KtG(c.selectGame(l))}),e.qZA(),e.YNc(2,Ae,6,1,"ng-container",28),e.BQk()}if(2&n){const t=a.$implicit,i=e.oxw(2);e.xp6(),e.Q6J("game",t),e.xp6(),e.Q6J("ngIf",void 0!==i.selectedGameIndex)}}function ye(n,a){1&n&&(e.TgZ(0,"div",31)(1,"div",32)(2,"span",22),e._uU(3,"Loading..."),e.qZA()()())}function Ie(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"div",23)(1,"div",24),e.NdJ("scrolled",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.onScrollDown())}),e.YNc(2,Ce,3,2,"ng-container",25),e.qZA(),e.YNc(3,ye,4,0,"div",26),e.qZA()}if(2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngForOf",t.games),e.xp6(),e.Q6J("ngIf",t.scrollLoading)}}let Ue=(()=>{class n{gameHttpService;router;activatedRoute;dialog;authService;games=[];gamesCount;loading=!1;myGames=!1;form;scrollLoading=!1;innerWidth;selectedGameIndex;gameSearchSortBy=f;constructor(t,i,o,l,c){this.gameHttpService=t,this.router=i,this.activatedRoute=o,this.dialog=l,this.authService=c}ngOnInit(){this.innerWidth=window.innerWidth,this.activatedRoute.queryParamMap.subscribe(t=>{this.form=new s.cw({query:new s.NI(t.get("query")??""),myGames:new s.NI("true"===t.get("myGames")),showDisabled:new s.NI("true"===t.get("showDisabled")),onlyShowWithoutMusics:new s.NI("true"===t.get("onlyShowWithoutMusics")),nsfw:new s.NI("true"===t.get("nsfw")),sortBy:new s.NI(t.get("sortBy")??f.CountUsersDesc)}),this.search()}).unsubscribe(),this.form.valueChanges.pipe((0,$.b)(250)).subscribe(()=>{this.search(),this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:this.form.value,replaceUrl:!0})})}search(){this.loading=!0,this.selectedGameIndex=void 0,this.gameHttpService.search(this.form.value,0,25).pipe((0,_.x)(()=>this.loading=!1)).subscribe(t=>{this.gamesCount=t.count,this.games=t.data})}onScrollDown(){this.scrollLoading||(this.scrollLoading=!0,this.gameHttpService.search(this.form.value,this.games.length,24).pipe((0,_.x)(()=>this.scrollLoading=!1)).subscribe(t=>{this.games=[...this.games,...t.data]}))}openImportDialog(){this.dialog.open(se).afterClosed().subscribe(()=>{this.search()})}getRow(t,i){return Math.floor(t/i)}getNextGameShowIndex(t,i){return this.getRow(t,i)===Math.floor(this.selectedGameIndex/i)}onResize(){this.innerWidth=window.innerWidth}selectGame(t){this.selectedGameIndex=t}static \u0275fac=function(i){return new(i||n)(e.Y36(p.q),e.Y36(u.F0),e.Y36(u.gz),e.Y36(v.uw),e.Y36(d.e))};static \u0275cmp=e.Xpm({type:n,selectors:[["app-game-list"]],hostBindings:function(i,o){1&i&&e.NdJ("resize",function(c){return o.onResize(c)},!1,e.Jf7)},decls:9,vars:4,consts:[[1,"tw-flex","tw-flex-col"],[1,"!tw-mb-8","tw-text-white","!tw-font-fastup","!tw-text-6xl","tw-text-center"],["class","tw-font-poppins tw-font-bold tw-italic",4,"ngIf"],[1,"tw-flex","tw-flex-col","tw-items-center"],["class","tw-w-full",3,"formGroup",4,"ngIf"],[4,"ngIf","ngIfElse"],["cardColumns",""],[1,"tw-font-poppins","tw-font-bold","tw-italic"],[1,"tw-w-full",3,"formGroup"],[1,"tw-flex","tw-justify-center"],["type","text","formControlName","query","placeholder","Search",1,"form-control","!tw-bg-grey","tw-rounded-md","placeholder:tw-text-light-grey","tw-h-[50px]","tw-max-w-[400px]"],[1,"tw-mt-6","tw-flex","tw-flex-col","lg:tw-flex-row","tw-justify-between"],["formControlName","sortBy",1,"form-select","!tw-bg-grey","tw-rounded-md","tw-h-[40px]","tw-max-w-[400px]","md:tw-w-[215px]"],["selected","","disabled",""],[3,"value"],[3,"value",4,"ngIf"],["color","primary","formControlName","myGames"],["color","primary","formControlName","onlyShowWithoutMusics"],["color","primary","formControlName","showDisabled"],[1,"tw-h-btn","btn","btn-outline-primary",3,"click"],["src","assets/svg/download.svg","width","12","height","12"],["role","status",1,"spinner-border","orange"],[1,"sr-only"],[1,"tw-mt-4","tw-flex","tw-flex-col","tw-items-center"],["infinite-scroll","",1,"tw-flex","tw-flex-wrap","tw-w-full","tw-justify-evenly","md:tw-justify-center","lg:tw-gap-x-12","tw-gap-x-4","md:tw-gap-x-10","tw-gap-y-8","md:tw-gap-y-12",3,"scrolled"],[4,"ngFor","ngForOf"],["class","tw-flex-col tw-justify-center",4,"ngIf"],[3,"game","selected"],[4,"ngIf"],["class","col-12 mb-4",3,"slug"],[1,"col-12","mb-4",3,"slug"],[1,"tw-flex-col","tw-justify-center"],["role","status",1,"spinner-border","text-primary"]],template:function(i,o){if(1&i&&(e.TgZ(0,"div",0)(1,"h1",1),e.YNc(2,_e,2,1,"span",2),e._uU(3," Games "),e.qZA(),e.TgZ(4,"div",3),e.YNc(5,he,26,7,"form",4),e.qZA(),e.YNc(6,we,5,0,"ng-container",5)(7,Ie,4,2,"ng-template",null,6,e.W1O),e.qZA()),2&i){const l=e.MAs(8);e.xp6(2),e.Q6J("ngIf",o.gamesCount),e.xp6(3),e.Q6J("ngIf",o.form),e.xp6(),e.Q6J("ngIf",o.loading)("ngIfElse",l)}},dependencies:[r.sg,r.O5,me.oG,s._Y,s.YN,s.Kr,s.Fj,s.EJ,s.JJ,s.JL,s.sg,s.u,de,T.Ry,w],encapsulation:2})}return n})();var qe=m(8525);const Se=[{path:":slug",component:w},{path:"",component:Ue}];let Je=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=e.oAB({type:n});static \u0275inj=e.cJS({imports:[r.ez,u.Bz.forChild(Se),P.m,Z.Ps,T.Rq,qe.LD]})}return n})()}}]);
"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[994],{4994:(f,c,i)=>{i.r(c),i.d(c,{SystemModule:()=>h});var a=i(6814),l=i(4716),t=i(9212),r=i(553),b=i(9862);let u=(()=>{class s{http;apiEndpoint=r.N.apiEndpoint;constructor(e){this.http=e}listJobs(){return this.http.get(`${this.apiEndpoint}/admin/system/listJobs`)}resetPublicLobbies(){return this.http.get(`${this.apiEndpoint}/admin/system/resetPublicLobbies`)}static \u0275fac=function(o){return new(o||s)(t.LFG(b.eN))};static \u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})(),p=(()=>{class s{http;getListJobsLoading=!1;resetPublicLobbiesLoading=!1;constructor(e){this.http=e}listJobs(){this.getListJobsLoading=!0,this.http.listJobs().pipe((0,l.x)(()=>{this.getListJobsLoading=!1})).subscribe(e=>{console.log(e)})}resetPublicLobbies(){this.resetPublicLobbiesLoading=!0,this.http.resetPublicLobbies().pipe((0,l.x)(()=>{this.resetPublicLobbiesLoading=!1})).subscribe(()=>{})}static \u0275fac=function(o){return new(o||s)(t.Y36(u))};static \u0275cmp=t.Xpm({type:s,selectors:[["app-system"]],decls:4,vars:2,consts:[[1,"btn","btn-primary",3,"disabled","click"]],template:function(o,n){1&o&&(t.TgZ(0,"button",0),t.NdJ("click",function(){return n.listJobs()}),t._uU(1,"list jobs"),t.qZA(),t.TgZ(2,"button",0),t.NdJ("click",function(){return n.resetPublicLobbies()}),t._uU(3," reset public lobbies\n"),t.qZA()),2&o&&(t.Q6J("disabled",n.getListJobsLoading),t.xp6(2),t.Q6J("disabled",n.resetPublicLobbiesLoading))},encapsulation:2})}return s})();var d=i(2787);const m=[{path:"",component:p}];let h=(()=>{class s{static \u0275fac=function(o){return new(o||s)};static \u0275mod=t.oAB({type:s});static \u0275inj=t.cJS({imports:[a.ez,d.Bz.forChild(m)]})}return s})()}}]);
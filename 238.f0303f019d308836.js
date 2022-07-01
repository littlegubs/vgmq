"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[238],{7238:(j,A,a)=>{a.d(A,{gM:()=>K,AV:()=>X});var m=a(1314),v=a(5664),f=a(9808),s=a(5e3),D=a(508),b=a(495),g=a(3191),P=a(1159),O=a(5113),I=a(925),S=a(7429),C=a(6360),M=a(7579),_=a(2722),B=a(5698),Y=a(226);a(1777);const x=["tooltip"],R="tooltip-panel",w=(0,I.i$)({passive:!0}),L=new s.OlP("mat-tooltip-scroll-strategy"),V={provide:L,deps:[m.aV],useFactory:function N(n){return()=>n.scrollStrategies.reposition({scrollThrottle:20})}},G=new s.OlP("mat-tooltip-default-options",{providedIn:"root",factory:function H(){return{showDelay:0,hideDelay:0,touchendHideDelay:1500}}});let F=(()=>{class n{constructor(t,e,i,o,l,p,c,y,T,u,d,E){this._overlay=t,this._elementRef=e,this._scrollDispatcher=i,this._viewContainerRef=o,this._ngZone=l,this._platform=p,this._ariaDescriber=c,this._focusMonitor=y,this._dir=u,this._defaultOptions=d,this._position="below",this._disabled=!1,this._viewInitialized=!1,this._pointerExitEventsInitialized=!1,this._viewportMargin=8,this._cssClassPrefix="mat",this._showDelay=this._defaultOptions.showDelay,this._hideDelay=this._defaultOptions.hideDelay,this.touchGestures="auto",this._message="",this._passiveListeners=[],this._destroyed=new M.x,this._scrollStrategy=T,this._document=E,d&&(d.position&&(this.position=d.position),d.touchGestures&&(this.touchGestures=d.touchGestures)),u.change.pipe((0,_.R)(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})}get position(){return this._position}set position(t){var e;t!==this._position&&(this._position=t,this._overlayRef&&(this._updatePosition(this._overlayRef),null===(e=this._tooltipInstance)||void 0===e||e.show(0),this._overlayRef.updatePosition()))}get disabled(){return this._disabled}set disabled(t){this._disabled=(0,g.Ig)(t),this._disabled?this.hide(0):this._setupPointerEnterEventsIfNeeded()}get showDelay(){return this._showDelay}set showDelay(t){this._showDelay=(0,g.su)(t)}get hideDelay(){return this._hideDelay}set hideDelay(t){this._hideDelay=(0,g.su)(t),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}get message(){return this._message}set message(t){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this._message,"tooltip"),this._message=null!=t?String(t).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage(),this._ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")})}))}get tooltipClass(){return this._tooltipClass}set tooltipClass(t){this._tooltipClass=t,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe((0,_.R)(this._destroyed)).subscribe(t=>{t?"keyboard"===t&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){const t=this._elementRef.nativeElement;clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._passiveListeners.forEach(([e,i])=>{t.removeEventListener(e,i,w)}),this._passiveListeners.length=0,this._destroyed.next(),this._destroyed.complete(),this._ariaDescriber.removeDescription(t,this.message,"tooltip"),this._focusMonitor.stopMonitoring(t)}show(t=this.showDelay){if(this.disabled||!this.message||this._isTooltipVisible()&&!this._tooltipInstance._showTimeoutId&&!this._tooltipInstance._hideTimeoutId)return;const e=this._createOverlay();this._detach(),this._portal=this._portal||new S.C5(this._tooltipComponent,this._viewContainerRef);const i=this._tooltipInstance=e.attach(this._portal).instance;i._triggerElement=this._elementRef.nativeElement,i._mouseLeaveHideDelay=this._hideDelay,i.afterHidden().pipe((0,_.R)(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),i.show(t)}hide(t=this.hideDelay){this._tooltipInstance&&this._tooltipInstance.hide(t)}toggle(){this._isTooltipVisible()?this.hide():this.show()}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(){var t;if(this._overlayRef)return this._overlayRef;const e=this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),i=this._overlay.position().flexibleConnectedTo(this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(e);return i.positionChanges.pipe((0,_.R)(this._destroyed)).subscribe(o=>{this._updateCurrentPositionClass(o.connectionPair),this._tooltipInstance&&o.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=this._overlay.create({direction:this._dir,positionStrategy:i,panelClass:`${this._cssClassPrefix}-${R}`,scrollStrategy:this._scrollStrategy()}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe((0,_.R)(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe((0,_.R)(this._destroyed)).subscribe(()=>{var o;return null===(o=this._tooltipInstance)||void 0===o?void 0:o._handleBodyInteraction()}),this._overlayRef.keydownEvents().pipe((0,_.R)(this._destroyed)).subscribe(o=>{this._isTooltipVisible()&&o.keyCode===P.hY&&!(0,P.Vb)(o)&&(o.preventDefault(),o.stopPropagation(),this._ngZone.run(()=>this.hide(0)))}),(null===(t=this._defaultOptions)||void 0===t?void 0:t.disableTooltipInteractivity)&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(t){const e=t.getConfig().positionStrategy,i=this._getOrigin(),o=this._getOverlayPosition();e.withPositions([this._addOffset(Object.assign(Object.assign({},i.main),o.main)),this._addOffset(Object.assign(Object.assign({},i.fallback),o.fallback))])}_addOffset(t){return t}_getOrigin(){const t=!this._dir||"ltr"==this._dir.value,e=this.position;let i;"above"==e||"below"==e?i={originX:"center",originY:"above"==e?"top":"bottom"}:"before"==e||"left"==e&&t||"right"==e&&!t?i={originX:"start",originY:"center"}:("after"==e||"right"==e&&t||"left"==e&&!t)&&(i={originX:"end",originY:"center"});const{x:o,y:l}=this._invertPosition(i.originX,i.originY);return{main:i,fallback:{originX:o,originY:l}}}_getOverlayPosition(){const t=!this._dir||"ltr"==this._dir.value,e=this.position;let i;"above"==e?i={overlayX:"center",overlayY:"bottom"}:"below"==e?i={overlayX:"center",overlayY:"top"}:"before"==e||"left"==e&&t||"right"==e&&!t?i={overlayX:"end",overlayY:"center"}:("after"==e||"right"==e&&t||"left"==e&&!t)&&(i={overlayX:"start",overlayY:"center"});const{x:o,y:l}=this._invertPosition(i.overlayX,i.overlayY);return{main:i,fallback:{overlayX:o,overlayY:l}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),this._ngZone.onMicrotaskEmpty.pipe((0,B.q)(1),(0,_.R)(this._destroyed)).subscribe(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()}))}_setTooltipClass(t){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=t,this._tooltipInstance._markForCheck())}_invertPosition(t,e){return"above"===this.position||"below"===this.position?"top"===e?e="bottom":"bottom"===e&&(e="top"):"end"===t?t="start":"start"===t&&(t="end"),{x:t,y:e}}_updateCurrentPositionClass(t){const{overlayY:e,originX:i,originY:o}=t;let l;if(l="center"===e?this._dir&&"rtl"===this._dir.value?"end"===i?"left":"right":"start"===i?"left":"right":"bottom"===e&&"top"===o?"above":"below",l!==this._currentPosition){const p=this._overlayRef;if(p){const c=`${this._cssClassPrefix}-${R}-`;p.removePanelClass(c+this._currentPosition),p.addPanelClass(c+l)}this._currentPosition=l}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._passiveListeners.length||(this._platformSupportsMouseEvents()?this._passiveListeners.push(["mouseenter",()=>{this._setupPointerExitEventsIfNeeded(),this.show()}]):"off"!==this.touchGestures&&(this._disableNativeGesturesIfNecessary(),this._passiveListeners.push(["touchstart",()=>{this._setupPointerExitEventsIfNeeded(),clearTimeout(this._touchstartTimeout),this._touchstartTimeout=setTimeout(()=>this.show(),500)}])),this._addListeners(this._passiveListeners))}_setupPointerExitEventsIfNeeded(){if(this._pointerExitEventsInitialized)return;this._pointerExitEventsInitialized=!0;const t=[];if(this._platformSupportsMouseEvents())t.push(["mouseleave",e=>{var i;const o=e.relatedTarget;(!o||!(null===(i=this._overlayRef)||void 0===i?void 0:i.overlayElement.contains(o)))&&this.hide()}],["wheel",e=>this._wheelListener(e)]);else if("off"!==this.touchGestures){this._disableNativeGesturesIfNecessary();const e=()=>{clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions.touchendHideDelay)};t.push(["touchend",e],["touchcancel",e])}this._addListeners(t),this._passiveListeners.push(...t)}_addListeners(t){t.forEach(([e,i])=>{this._elementRef.nativeElement.addEventListener(e,i,w)})}_platformSupportsMouseEvents(){return!this._platform.IOS&&!this._platform.ANDROID}_wheelListener(t){if(this._isTooltipVisible()){const e=this._document.elementFromPoint(t.clientX,t.clientY),i=this._elementRef.nativeElement;e!==i&&!i.contains(e)&&this.hide()}}_disableNativeGesturesIfNecessary(){const t=this.touchGestures;if("off"!==t){const e=this._elementRef.nativeElement,i=e.style;("on"===t||"INPUT"!==e.nodeName&&"TEXTAREA"!==e.nodeName)&&(i.userSelect=i.msUserSelect=i.webkitUserSelect=i.MozUserSelect="none"),("on"===t||!e.draggable)&&(i.webkitUserDrag="none"),i.touchAction="none",i.webkitTapHighlightColor="transparent"}}}return n.\u0275fac=function(t){s.$Z()},n.\u0275dir=s.lG2({type:n,inputs:{position:["matTooltipPosition","position"],disabled:["matTooltipDisabled","disabled"],showDelay:["matTooltipShowDelay","showDelay"],hideDelay:["matTooltipHideDelay","hideDelay"],touchGestures:["matTooltipTouchGestures","touchGestures"],message:["matTooltip","message"],tooltipClass:["matTooltipClass","tooltipClass"]}}),n})(),K=(()=>{class n extends F{constructor(t,e,i,o,l,p,c,y,T,u,d,E){super(t,e,i,o,l,p,c,y,T,u,d,E),this._tooltipComponent=z}}return n.\u0275fac=function(t){return new(t||n)(s.Y36(m.aV),s.Y36(s.SBq),s.Y36(b.mF),s.Y36(s.s_b),s.Y36(s.R0b),s.Y36(I.t4),s.Y36(v.$s),s.Y36(v.tE),s.Y36(L),s.Y36(Y.Is,8),s.Y36(G,8),s.Y36(f.K0))},n.\u0275dir=s.lG2({type:n,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-tooltip-trigger"],exportAs:["matTooltip"],features:[s.qOj]}),n})(),W=(()=>{class n{constructor(t,e){this._changeDetectorRef=t,this._visibility="initial",this._closeOnInteraction=!1,this._isVisible=!1,this._onHide=new M.x,this._animationsDisabled="NoopAnimations"===e}show(t){clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},t)}hide(t){clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},t)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){clearTimeout(this._showTimeoutId),clearTimeout(this._hideTimeoutId),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:t}){(!t||!this._triggerElement.contains(t))&&this.hide(this._mouseLeaveHideDelay)}_onShow(){}_handleAnimationEnd({animationName:t}){(t===this._showAnimation||t===this._hideAnimation)&&this._finalizeAnimation(t===this._showAnimation)}_finalizeAnimation(t){t?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(t){const e=this._tooltip.nativeElement,i=this._showAnimation,o=this._hideAnimation;if(e.classList.remove(t?o:i),e.classList.add(t?i:o),this._isVisible=t,t&&!this._animationsDisabled&&"function"==typeof getComputedStyle){const l=getComputedStyle(e);("0s"===l.getPropertyValue("animation-duration")||"none"===l.getPropertyValue("animation-name"))&&(this._animationsDisabled=!0)}t&&this._onShow(),this._animationsDisabled&&(e.classList.add("_mat-animation-noopable"),this._finalizeAnimation(t))}}return n.\u0275fac=function(t){return new(t||n)(s.Y36(s.sBO),s.Y36(C.Qb,8))},n.\u0275dir=s.lG2({type:n}),n})(),z=(()=>{class n extends W{constructor(t,e,i){super(t,i),this._breakpointObserver=e,this._isHandset=this._breakpointObserver.observe(O.u3.Handset),this._showAnimation="mat-tooltip-show",this._hideAnimation="mat-tooltip-hide"}}return n.\u0275fac=function(t){return new(t||n)(s.Y36(s.sBO),s.Y36(O.Yg),s.Y36(C.Qb,8))},n.\u0275cmp=s.Xpm({type:n,selectors:[["mat-tooltip-component"]],viewQuery:function(t,e){if(1&t&&s.Gf(x,7),2&t){let i;s.iGM(i=s.CRH())&&(e._tooltip=i.first)}},hostAttrs:["aria-hidden","true"],hostVars:2,hostBindings:function(t,e){1&t&&s.NdJ("mouseleave",function(o){return e._handleMouseLeave(o)}),2&t&&s.Udp("zoom",e.isVisible()?1:null)},features:[s.qOj],decls:4,vars:6,consts:[[1,"mat-tooltip",3,"ngClass","animationend"],["tooltip",""]],template:function(t,e){if(1&t&&(s.TgZ(0,"div",0,1),s.NdJ("animationend",function(o){return e._handleAnimationEnd(o)}),s.ALo(2,"async"),s._uU(3),s.qZA()),2&t){let i;s.ekj("mat-tooltip-handset",null==(i=s.lcZ(2,4,e._isHandset))?null:i.matches),s.Q6J("ngClass",e.tooltipClass),s.xp6(3),s.Oqu(e.message)}},directives:[f.mk],pipes:[f.Ov],styles:[".mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis;transform:scale(0)}.mat-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}.mat-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-tooltip-show{0%{opacity:0;transform:scale(0)}50%{opacity:.5;transform:scale(0.99)}100%{opacity:1;transform:scale(1)}}@keyframes mat-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}.mat-tooltip-show{animation:mat-tooltip-show 200ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-tooltip-hide{animation:mat-tooltip-hide 100ms cubic-bezier(0, 0, 0.2, 1) forwards}\n"],encapsulation:2,changeDetection:0}),n})(),X=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=s.oAB({type:n}),n.\u0275inj=s.cJS({providers:[V],imports:[[v.rt,f.ez,m.U8,D.BQ],D.BQ,b.ZD]}),n})()}}]);
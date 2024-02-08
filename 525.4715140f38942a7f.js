"use strict";(self.webpackChunkvgmq=self.webpackChunkvgmq||[]).push([[525],{8337:(H,R,c)=>{c.d(R,{A8:()=>A,Ov:()=>g});var E=c(8645),I=c(9212);class g{get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}constructor(a=!1,n,r=!0,m){this._multiple=a,this._emitChanges=r,this.compareWith=m,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new E.x,n&&n.length&&(a?n.forEach(d=>this._markSelected(d)):this._markSelected(n[0]),this._selectedToEmit.length=0)}select(...a){this._verifyValueAssignment(a),a.forEach(r=>this._markSelected(r));const n=this._hasQueuedChanges();return this._emitChangeEvent(),n}deselect(...a){this._verifyValueAssignment(a),a.forEach(r=>this._unmarkSelected(r));const n=this._hasQueuedChanges();return this._emitChangeEvent(),n}setSelection(...a){this._verifyValueAssignment(a);const n=this.selected,r=new Set(a);a.forEach(d=>this._markSelected(d)),n.filter(d=>!r.has(this._getConcreteValue(d,r))).forEach(d=>this._unmarkSelected(d));const m=this._hasQueuedChanges();return this._emitChangeEvent(),m}toggle(a){return this.isSelected(a)?this.deselect(a):this.select(a)}clear(a=!0){this._unmarkAll();const n=this._hasQueuedChanges();return a&&this._emitChangeEvent(),n}isSelected(a){return this._selection.has(this._getConcreteValue(a))}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(a){this._multiple&&this.selected&&this._selected.sort(a)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(a){a=this._getConcreteValue(a),this.isSelected(a)||(this._multiple||this._unmarkAll(),this.isSelected(a)||this._selection.add(a),this._emitChanges&&this._selectedToEmit.push(a))}_unmarkSelected(a){a=this._getConcreteValue(a),this.isSelected(a)&&(this._selection.delete(a),this._emitChanges&&this._deselectedToEmit.push(a))}_unmarkAll(){this.isEmpty()||this._selection.forEach(a=>this._unmarkSelected(a))}_verifyValueAssignment(a){}_hasQueuedChanges(){return!(!this._deselectedToEmit.length&&!this._selectedToEmit.length)}_getConcreteValue(a,n){if(this.compareWith){n=n??this._selection;for(let r of n)if(this.compareWith(a,r))return r;return a}return a}}let A=(()=>{class h{constructor(){this._listeners=[]}notify(n,r){for(let m of this._listeners)m(n,r)}listen(n){return this._listeners.push(n),()=>{this._listeners=this._listeners.filter(r=>n!==r)}}ngOnDestroy(){this._listeners=[]}static#e=this.\u0275fac=function(r){return new(r||h)};static#t=this.\u0275prov=I.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})()},8525:(H,R,c)=>{c.d(R,{LD:()=>ie,gD:()=>te});var E=c(3651),I=c(6814),t=c(9212),y=c(3680),x=c(9157),C=c(9829),k=c(4300),V=c(9388),B=c(8337),g=c(6028),w=c(6223),A=c(8645),h=c(4911),a=c(3019),n=c(7921),r=c(4664),m=c(8180),d=c(2181),u=c(7398),O=c(3997),f=c(9773),_=c(6825);const M=["trigger"],S=["panel"];function U(o,D){if(1&o&&(t.TgZ(0,"span",9),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(),t.Oqu(e.placeholder)}}function Y(o,D){1&o&&t.Hsn(0)}function G(o,D){if(1&o&&(t.TgZ(0,"span",11),t._uU(1),t.qZA()),2&o){const e=t.oxw(2);t.xp6(),t.Oqu(e.triggerValue)}}function N(o,D){if(1&o&&(t.TgZ(0,"span",10),t.YNc(1,Y,1,0)(2,G,2,1),t.qZA()),2&o){const e=t.oxw();t.xp6(),t.um2(1,e.customTrigger?1:2)}}function z(o,D){if(1&o){const e=t.EpF();t.O4$(),t.kcU(),t.TgZ(0,"div",12,13),t.NdJ("@transformPanel.done",function(s){t.CHM(e);const l=t.oxw();return t.KtG(l._panelDoneAnimatingStream.next(s.toState))})("keydown",function(s){t.CHM(e);const l=t.oxw();return t.KtG(l._handleKeydown(s))}),t.Hsn(2,1),t.qZA()}if(2&o){const e=t.oxw();t.Gre("mat-mdc-select-panel mdc-menu-surface mdc-menu-surface--open ",e._getPanelTheme(),""),t.Q6J("ngClass",e.panelClass)("@transformPanel","showing"),t.uIk("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}const Z=[[["mat-select-trigger"]],"*"],j=["mat-select-trigger","*"],Q={transformPanelWrap:(0,_.X$)("transformPanelWrap",[(0,_.eR)("* => void",(0,_.IO)("@transformPanel",[(0,_.pV)()],{optional:!0}))]),transformPanel:(0,_.X$)("transformPanel",[(0,_.SB)("void",(0,_.oB)({opacity:0,transform:"scale(1, 0.8)"})),(0,_.eR)("void => showing",(0,_.jt)("120ms cubic-bezier(0, 0, 0.2, 1)",(0,_.oB)({opacity:1,transform:"scale(1, 1)"}))),(0,_.eR)("* => void",(0,_.jt)("100ms linear",(0,_.oB)({opacity:0})))])};let W=0;const K=new t.OlP("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{const o=(0,t.f3M)(E.aV);return()=>o.scrollStrategies.reposition()}}),X=new t.OlP("MAT_SELECT_CONFIG"),J={provide:K,deps:[E.aV],useFactory:function $(o){return()=>o.scrollStrategies.reposition()}},q=new t.OlP("MatSelectTrigger");class ee{constructor(D,e){this.source=D,this.value=e}}let te=(()=>{class o{_scrollOptionIntoView(e){const i=this.options.toArray()[e];if(i){const s=this.panel.nativeElement,l=(0,y.CB)(e,this.options,this.optionGroups),p=i._getHostElement();s.scrollTop=0===e&&1===l?0:(0,y.jH)(p.offsetTop,p.offsetHeight,s.scrollTop,s.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new ee(this,e)}get focused(){return this._focused||this._panelOpen}get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}get required(){return this._required??this.ngControl?.control?.hasValidator(w.kI.required)??!1}set required(e){this._required=e,this.stateChanges.next()}get multiple(){return this._multiple}set multiple(e){this._multiple=e}get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}constructor(e,i,s,l,p,T,v,se,ae,F,ne,re,le,P){this._viewportRuler=e,this._changeDetectorRef=i,this._ngZone=s,this._elementRef=p,this._dir=T,this._parentFormField=ae,this.ngControl=F,this._liveAnnouncer=le,this._defaultOptions=P,this._positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}],this._panelOpen=!1,this._compareWith=(b,L)=>b===L,this._uid="mat-select-"+W++,this._triggerAriaLabelledBy=null,this._destroy=new A.x,this.stateChanges=new A.x,this._onChange=()=>{},this._onTouched=()=>{},this._valueId="mat-select-value-"+W++,this._panelDoneAnimatingStream=new A.x,this._overlayPanelClass=this._defaultOptions?.overlayPanelClass||"",this._focused=!1,this.controlType="mat-select",this.disabled=!1,this.disableRipple=!1,this.tabIndex=0,this._hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1,this._multiple=!1,this.disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1,this.ariaLabel="",this.panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto",this.optionSelectionChanges=(0,h.P)(()=>{const b=this.options;return b?b.changes.pipe((0,n.O)(b),(0,r.w)(()=>(0,a.T)(...b.map(L=>L.onSelectionChange)))):this._ngZone.onStable.pipe((0,m.q)(1),(0,r.w)(()=>this.optionSelectionChanges))}),this.openedChange=new t.vpe,this._openedStream=this.openedChange.pipe((0,d.h)(b=>b),(0,u.U)(()=>{})),this._closedStream=this.openedChange.pipe((0,d.h)(b=>!b),(0,u.U)(()=>{})),this.selectionChange=new t.vpe,this.valueChange=new t.vpe,this._trackedModal=null,this._skipPredicate=b=>!this.panelOpen&&b.disabled,this.ngControl&&(this.ngControl.valueAccessor=this),null!=P?.typeaheadDebounceInterval&&(this.typeaheadDebounceInterval=P.typeaheadDebounceInterval),this._errorStateTracker=new y.ZT(l,F,se,v,this.stateChanges),this._scrollStrategyFactory=re,this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=parseInt(ne)||0,this.id=this.id}ngOnInit(){this._selectionModel=new B.Ov(this.multiple),this.stateChanges.next(),this._panelDoneAnimatingStream.pipe((0,O.x)(),(0,f.R)(this._destroy)).subscribe(()=>this._panelDoneAnimating(this.panelOpen)),this._viewportRuler.change().pipe((0,f.R)(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initKeyManager(),this._selectionModel.changed.pipe((0,f.R)(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe((0,n.O)(null),(0,f.R)(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){const e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){const s=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?s.setAttribute("aria-labelledby",e):s.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(void 0!==this._previousControl&&null!==i.disabled&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval)}ngOnDestroy(){this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_applyModalPanelOwnership(){const e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;const i=`${this.id}-panel`;this._trackedModal&&(0,k.iD)(this._trackedModal,"aria-owns",i),(0,k.Zf)(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){this._trackedModal&&((0,k.iD)(this._trackedModal,"aria-owns",`${this.id}-panel`),this._trackedModal=null)}close(){this._panelOpen&&(this._panelOpen=!1,this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next())}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){const e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return!!this._dir&&"rtl"===this._dir.value}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){const i=e.keyCode,s=i===g.JH||i===g.LH||i===g.oh||i===g.SV,l=i===g.K5||i===g.L_,p=this._keyManager;if(!p.isTyping()&&l&&!(0,g.Vb)(e)||(this.multiple||e.altKey)&&s)e.preventDefault(),this.open();else if(!this.multiple){const T=this.selected;p.onKeydown(e);const v=this.selected;v&&T!==v&&this._liveAnnouncer.announce(v.viewValue,1e4)}}_handleOpenKeydown(e){const i=this._keyManager,s=e.keyCode,l=s===g.JH||s===g.LH,p=i.isTyping();if(l&&e.altKey)e.preventDefault(),this.close();else if(p||s!==g.K5&&s!==g.L_||!i.activeItem||(0,g.Vb)(e))if(!p&&this._multiple&&s===g.A&&e.ctrlKey){e.preventDefault();const T=this.options.some(v=>!v.disabled&&!v.selected);this.options.forEach(v=>{v.disabled||(T?v.select():v.deselect())})}else{const T=i.activeItemIndex;i.onKeydown(e),this._multiple&&l&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==T&&i.activeItem._selectViaInteraction()}else e.preventDefault(),i.activeItem._selectViaInteraction()}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}_onAttached(){this._overlayDir.positionChange.pipe((0,m.q)(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()})}_getPanelTheme(){return this._parentFormField?`mat-${this._parentFormField.color}`:""}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{const i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){const i=this.options.find(s=>{if(this._selectionModel.isSelected(s))return!1;try{return null!=s.value&&this._compareWith(s.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return!!(e!==this._value||this._multiple&&Array.isArray(e))&&(this.options&&this._setSelectionByValue(e),this._value=e,!0)}_getOverlayWidth(e){return"auto"===this.panelWidth?(e instanceof E.xu?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:null===this.panelWidth?"":this.panelWidth}_syncParentProperties(){if(this.options)for(const e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new k.s1(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){const e=(0,a.T)(this.options.changes,this._destroy);this.optionSelectionChanges.pipe((0,f.R)(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),(0,a.T)(...this.options.map(i=>i._stateChanges)).pipe((0,f.R)(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){const s=this._selectionModel.isSelected(e);null!=e.value||this._multiple?(s!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())):(e.deselect(),this._selectionModel.clear(),null!=this.value&&this._propagateChanges(e.value)),s!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){const e=this.options.toArray();this._selectionModel.sort((i,s)=>this.sortComparator?this.sortComparator(i,s,e):e.indexOf(i)-e.indexOf(s)),this.stateChanges.next()}}_propagateChanges(e){let i;i=this.multiple?this.selected.map(s=>s.value):this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;const e=this._parentFormField?.getLabelId();return this.ariaLabelledby?(e?e+" ":"")+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;const e=this._parentFormField?.getLabelId();let i=(e?e+" ":"")+this._valueId;return this.ariaLabelledby&&(i+=" "+this.ariaLabelledby),i}_panelDoneAnimating(e){this.openedChange.emit(e)}setDescribedByIds(e){e.length?this._elementRef.nativeElement.setAttribute("aria-describedby",e.join(" ")):this._elementRef.nativeElement.removeAttribute("aria-describedby")}onContainerClick(){this.focus(),this.open()}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static#e=this.\u0275fac=function(i){return new(i||o)(t.Y36(C.rL),t.Y36(t.sBO),t.Y36(t.R0b),t.Y36(y.rD),t.Y36(t.SBq),t.Y36(V.Is,8),t.Y36(w.F,8),t.Y36(w.sg,8),t.Y36(x.G_,8),t.Y36(w.a5,10),t.$8M("tabindex"),t.Y36(K),t.Y36(k.Kd),t.Y36(X,8))};static#t=this.\u0275cmp=t.Xpm({type:o,selectors:[["mat-select"]],contentQueries:function(i,s,l){if(1&i&&(t.Suo(l,q,5),t.Suo(l,y.ey,5),t.Suo(l,y.K7,5)),2&i){let p;t.iGM(p=t.CRH())&&(s.customTrigger=p.first),t.iGM(p=t.CRH())&&(s.options=p),t.iGM(p=t.CRH())&&(s.optionGroups=p)}},viewQuery:function(i,s){if(1&i&&(t.Gf(M,5),t.Gf(S,5),t.Gf(E.pI,5)),2&i){let l;t.iGM(l=t.CRH())&&(s.trigger=l.first),t.iGM(l=t.CRH())&&(s.panel=l.first),t.iGM(l=t.CRH())&&(s._overlayDir=l.first)}},hostAttrs:["role","combobox","aria-autocomplete","none","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:19,hostBindings:function(i,s){1&i&&t.NdJ("keydown",function(p){return s._handleKeydown(p)})("focus",function(){return s._onFocus()})("blur",function(){return s._onBlur()}),2&i&&(t.uIk("id",s.id)("tabindex",s.disabled?-1:s.tabIndex)("aria-controls",s.panelOpen?s.id+"-panel":null)("aria-expanded",s.panelOpen)("aria-label",s.ariaLabel||null)("aria-required",s.required.toString())("aria-disabled",s.disabled.toString())("aria-invalid",s.errorState)("aria-activedescendant",s._getAriaActiveDescendant()),t.ekj("mat-mdc-select-disabled",s.disabled)("mat-mdc-select-invalid",s.errorState)("mat-mdc-select-required",s.required)("mat-mdc-select-empty",s.empty)("mat-mdc-select-multiple",s.multiple))},inputs:{userAriaDescribedBy:[t.lbL.None,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[t.lbL.HasDecoratorInputTransform,"disabled","disabled",t.VuI],disableRipple:[t.lbL.HasDecoratorInputTransform,"disableRipple","disableRipple",t.VuI],tabIndex:[t.lbL.HasDecoratorInputTransform,"tabIndex","tabIndex",e=>null==e?0:(0,t.Cb_)(e)],hideSingleSelectionIndicator:[t.lbL.HasDecoratorInputTransform,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",t.VuI],placeholder:"placeholder",required:[t.lbL.HasDecoratorInputTransform,"required","required",t.VuI],multiple:[t.lbL.HasDecoratorInputTransform,"multiple","multiple",t.VuI],disableOptionCentering:[t.lbL.HasDecoratorInputTransform,"disableOptionCentering","disableOptionCentering",t.VuI],compareWith:"compareWith",value:"value",ariaLabel:[t.lbL.None,"aria-label","ariaLabel"],ariaLabelledby:[t.lbL.None,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[t.lbL.HasDecoratorInputTransform,"typeaheadDebounceInterval","typeaheadDebounceInterval",t.Cb_],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth"},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],standalone:!0,features:[t._Bn([{provide:x.Eo,useExisting:o},{provide:y.HF,useExisting:o}]),t.Xq5,t.TTD,t.jDz],ngContentSelectors:j,decls:11,vars:8,consts:[["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],[1,"mat-mdc-select-value"],["class","mat-mdc-select-placeholder mat-mdc-select-min-line"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayLockPosition","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayOpen","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","backdropClick","attach","detach"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",3,"ngClass","keydown"],["panel",""]],template:function(i,s){if(1&i&&(t.F$t(Z),t.TgZ(0,"div",0,1),t.NdJ("click",function(){return s.open()}),t.TgZ(3,"div",2),t.YNc(4,U,2,1,"span",3)(5,N,3,1),t.qZA(),t.TgZ(6,"div",4)(7,"div",5),t.O4$(),t.TgZ(8,"svg",6),t._UZ(9,"path",7),t.qZA()()()(),t.YNc(10,z,3,9,"ng-template",8),t.NdJ("backdropClick",function(){return s.close()})("attach",function(){return s._onAttached()})("detach",function(){return s.close()})),2&i){const l=t.MAs(1);t.xp6(3),t.uIk("id",s._valueId),t.xp6(),t.um2(4,s.empty?4:5),t.xp6(6),t.Q6J("cdkConnectedOverlayPanelClass",s._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",s._scrollStrategy)("cdkConnectedOverlayOrigin",s._preferredOverlayOrigin||l)("cdkConnectedOverlayOpen",s.panelOpen)("cdkConnectedOverlayPositions",s._positions)("cdkConnectedOverlayWidth",s._overlayWidth)}},dependencies:[E.xu,E.pI,I.mk],styles:['.mat-mdc-select{display:inline-block;width:100%;outline:none;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-select-enabled-trigger-text-color);font-family:var(--mat-select-trigger-text-font);line-height:var(--mat-select-trigger-text-line-height);font-size:var(--mat-select-trigger-text-size);font-weight:var(--mat-select-trigger-text-weight);letter-spacing:var(--mat-select-trigger-text-tracking)}.mat-mdc-select-disabled{color:var(--mat-select-disabled-trigger-text-color)}.mat-mdc-select-trigger{display:inline-flex;align-items:center;cursor:pointer;position:relative;box-sizing:border-box;width:100%}.mat-mdc-select-disabled .mat-mdc-select-trigger{-webkit-user-select:none;user-select:none;cursor:default}.mat-mdc-select-value{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-mdc-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-mdc-select-arrow-wrapper{height:24px;flex-shrink:0;display:inline-flex;align-items:center}.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper{transform:translateY(-8px)}.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper{transform:none}.mat-mdc-select-arrow{width:10px;height:5px;position:relative;color:var(--mat-select-enabled-arrow-color)}.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow{color:var(--mat-select-focused-arrow-color)}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow{color:var(--mat-select-invalid-arrow-color)}.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow{color:var(--mat-select-disabled-arrow-color)}.mat-mdc-select-arrow svg{fill:currentColor;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.cdk-high-contrast-active .mat-mdc-select-arrow svg{fill:CanvasText}.mat-mdc-select-disabled .cdk-high-contrast-active .mat-mdc-select-arrow svg{fill:GrayText}div.mat-mdc-select-panel{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);width:100%;max-height:275px;outline:0;overflow:auto;padding:8px 0;border-radius:4px;box-sizing:border-box;position:static;background-color:var(--mat-select-panel-background-color)}.cdk-high-contrast-active div.mat-mdc-select-panel{outline:solid 1px}.cdk-overlay-pane:not(.mat-mdc-select-panel-above) div.mat-mdc-select-panel{border-top-left-radius:0;border-top-right-radius:0;transform-origin:top center}.mat-mdc-select-panel-above div.mat-mdc-select-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:bottom center}.mat-mdc-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);color:var(--mat-select-placeholder-text-color)}._mat-animation-noopable .mat-mdc-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-mdc-select-placeholder{color:rgba(0,0,0,0);-webkit-text-fill-color:rgba(0,0,0,0);transition:none;display:block}.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper{cursor:pointer}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label{max-width:calc(100% - 18px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 24px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch{max-width:calc(100% - 24px)}.mat-mdc-select-min-line:empty::before{content:" ";white-space:pre;width:1px;display:inline-block;visibility:hidden}'],encapsulation:2,data:{animation:[Q.transformPanel]},changeDetection:0})}return o})(),ie=(()=>{class o{static#e=this.\u0275fac=function(i){return new(i||o)};static#t=this.\u0275mod=t.oAB({type:o});static#i=this.\u0275inj=t.cJS({providers:[J],imports:[I.ez,E.U8,y.Ng,y.BQ,C.ZD,x.lN,y.Ng,y.BQ]})}return o})()}}]);
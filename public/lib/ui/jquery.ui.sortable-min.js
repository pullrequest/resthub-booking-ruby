(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var c=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var c=this.items.length-1;
c>=0;
c--){this.items[c].item.removeData("sortable-item")
}return this
},_setOption:function(c,d){if(c==="disabled"){this.options[c]=d;
this.widget()[d?"addClass":"removeClass"]("ui-sortable-disabled")
}else{a.Widget.prototype._setOption.apply(this,arguments)
}},_mouseCapture:function(f,g){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(f);
var e=null,d=this,c=a(f.target).parents().each(function(){if(a.data(this,"sortable-item")==d){e=a(this);
return false
}});
if(a.data(f.target,"sortable-item")==d){e=a(f.target)
}if(!e){return false
}if(this.options.handle&&!g){var h=false;
a(this.options.handle,e).find("*").andSelf().each(function(){if(this==f.target){h=true
}});
if(!h){return false
}}this.currentItem=e;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(f,g,c){var h=this.options,d=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(f);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
a.extend(this.offset,{click:{left:f.pageX-this.offset.left,top:f.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(f);
this.originalPageX=f.pageX;
this.originalPageY=f.pageY;
(h.cursorAt&&this._adjustOffsetFromHelper(h.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();
if(h.containment){this._setContainment()
}if(h.cursor){if(a("body").css("cursor")){this._storedCursor=a("body").css("cursor")
}a("body").css("cursor",h.cursor)
}if(h.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",h.opacity)
}if(h.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",h.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",f,this._uiHash());
if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!c){for(var e=this.containers.length-1;
e>=0;
e--){this.containers[e]._trigger("activate",f,d._uiHash(this))
}}if(a.ui.ddmanager){a.ui.ddmanager.current=this
}if(a.ui.ddmanager&&!h.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,f)
}this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(f);
return true
},_mouseDrag:function(g){this.position=this._generatePosition(g);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var h=this.options,c=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-g.pageY<h.scrollSensitivity){this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+h.scrollSpeed
}else{if(g.pageY-this.overflowOffset.top<h.scrollSensitivity){this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-h.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-g.pageX<h.scrollSensitivity){this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+h.scrollSpeed
}else{if(g.pageX-this.overflowOffset.left<h.scrollSensitivity){this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-h.scrollSpeed
}}}else{if(g.pageY-a(document).scrollTop()<h.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()-h.scrollSpeed)
}else{if(a(window).height()-(g.pageY-a(document).scrollTop())<h.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()+h.scrollSpeed)
}}if(g.pageX-a(document).scrollLeft()<h.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()-h.scrollSpeed)
}else{if(a(window).width()-(g.pageX-a(document).scrollLeft())<h.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()+h.scrollSpeed)
}}}if(c!==false&&a.ui.ddmanager&&!h.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,g)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var e=this.items.length-1;
e>=0;
e--){var f=this.items[e],d=f.item[0],j=this._intersectsWithPointer(f);
if(!j){continue
}if(d!=this.currentItem[0]&&this.placeholder[j==1?"next":"prev"]()[0]!=d&&!a.ui.contains(this.placeholder[0],d)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],d):true)){this.direction=j==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(f)){this._rearrange(g,f)
}else{break
}this._trigger("change",g,this._uiHash());
break
}}this._contactContainers(g);
if(a.ui.ddmanager){a.ui.ddmanager.drag(this,g)
}this._trigger("sort",g,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(d,e){if(!d){return
}if(a.ui.ddmanager&&!this.options.dropBehaviour){a.ui.ddmanager.drop(this,d)
}if(this.options.revert){var c=this;
var f=c.placeholder.offset();
c.reverting=true;
a(this.helper).animate({left:f.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:f.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(d)
})
}else{this._clear(d,e)
}return false
},cancel:function(){var c=this;
if(this.dragging){this._mouseUp();
if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}for(var d=this.containers.length-1;
d>=0;
d--){this.containers[d]._trigger("deactivate",null,c._uiHash(this));
if(this.containers[d].containerCache.over){this.containers[d]._trigger("out",null,c._uiHash(this));
this.containers[d].containerCache.over=0
}}}if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){a(this.domPosition.prev).after(this.currentItem)
}else{a(this.domPosition.parent).prepend(this.currentItem)
}return this
},serialize:function(e){var c=this._getItemsAsjQuery(e&&e.connected);
var d=[];
e=e||{};
a(c).each(function(){var f=(a(e.item||this).attr(e.attribute||"id")||"").match(e.expression||(/(.+)[-=_](.+)/));
if(f){d.push((e.key||f[1]+"[]")+"="+(e.key&&e.expression?f[1]:f[2]))
}});
if(!d.length&&e.key){d.push(e.key+"=")
}return d.join("&")
},toArray:function(e){var c=this._getItemsAsjQuery(e&&e.connected);
var d=[];
e=e||{};
c.each(function(){d.push(a(e.item||this).attr(e.attribute||"id")||"")
});
return d
},_intersectsWith:function(m){var e=this.positionAbs.left,d=e+this.helperProportions.width,k=this.positionAbs.top,j=k+this.helperProportions.height;
var f=m.left,c=f+m.width,n=m.top,i=n+m.height;
var o=this.offset.click.top,h=this.offset.click.left;
var g=(k+o)>n&&(k+o)<i&&(e+h)>f&&(e+h)<c;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>m[this.floating?"width":"height"])){return g
}else{return(f<e+(this.helperProportions.width/2)&&d-(this.helperProportions.width/2)<c&&n<k+(this.helperProportions.height/2)&&j-(this.helperProportions.height/2)<i)
}},_intersectsWithPointer:function(e){var f=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),h=f&&d,c=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();
if(!h){return false
}return this.floating?(((g&&g=="right")||c=="down")?2:1):(c&&(c=="down"?2:1))
},_intersectsWithSides:function(f){var d=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,f.top+(f.height/2),f.height),e=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,f.left+(f.width/2),f.width),c=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();
if(this.floating&&g){return((g=="right"&&e)||(g=="left"&&!e))
}else{return c&&((c=="down"&&d)||(c=="up"&&!d))
}},_getDragVerticalDirection:function(){var c=this.positionAbs.top-this.lastPositionAbs.top;
return c!=0&&(c>0?"down":"up")
},_getDragHorizontalDirection:function(){var c=this.positionAbs.left-this.lastPositionAbs.left;
return c!=0&&(c>0?"right":"left")
},refresh:function(c){this._refreshItems(c);
this.refreshPositions();
return this
},_connectWith:function(){var c=this.options;
return c.connectWith.constructor==String?[c.connectWith]:c.connectWith
},_getItemsAsjQuery:function(c){var m=this;
var h=[];
var f=[];
var k=this._connectWith();
if(k&&c){for(var e=k.length-1;
e>=0;
e--){var l=a(k[e]);
for(var d=l.length-1;
d>=0;
d--){var g=a.data(l[d],"sortable");
if(g&&g!=this&&!g.options.disabled){f.push([a.isFunction(g.options.items)?g.options.items.call(g.element):a(g.options.items,g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),g])
}}}}f.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var e=f.length-1;
e>=0;
e--){f[e][0].each(function(){h.push(this)
})
}return a(h)
},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data(sortable-item)");
for(var d=0;
d<this.items.length;
d++){for(var c=0;
c<e.length;
c++){if(e[c]==this.items[d].item[0]){this.items.splice(d,1)
}}}},_refreshItems:function(c){this.items=[];
this.containers=[this];
var k=this.items;
var q=this;
var g=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],c,{item:this.currentItem}):a(this.options.items,this.element),this]];
var m=this._connectWith();
if(m){for(var f=m.length-1;
f>=0;
f--){var n=a(m[f]);
for(var e=n.length-1;
e>=0;
e--){var h=a.data(n[e],"sortable");
if(h&&h!=this&&!h.options.disabled){g.push([a.isFunction(h.options.items)?h.options.items.call(h.element[0],c,{item:this.currentItem}):a(h.options.items,h.element),h]);
this.containers.push(h)
}}}}for(var f=g.length-1;
f>=0;
f--){var l=g[f][1];
var d=g[f][0];
for(var e=0,o=d.length;
e<o;
e++){var p=a(d[e]);
p.data("sortable-item",l);
k.push({item:p,instance:l,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(c){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var e=this.items.length-1;
e>=0;
e--){var f=this.items[e];
var d=this.options.toleranceElement?a(this.options.toleranceElement,f.item):f.item;
if(!c){f.width=d.outerWidth();
f.height=d.outerHeight()
}var g=d.offset();
f.left=g.left;
f.top=g.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var e=this.containers.length-1;
e>=0;
e--){var g=this.containers[e].element.offset();
this.containers[e].containerCache.left=g.left;
this.containers[e].containerCache.top=g.top;
this.containers[e].containerCache.width=this.containers[e].element.outerWidth();
this.containers[e].containerCache.height=this.containers[e].element.outerHeight()
}}return this
},_createPlaceholder:function(e){var c=e||this,f=c.options;
if(!f.placeholder||f.placeholder.constructor==String){var d=f.placeholder;
f.placeholder={element:function(){var g=a(document.createElement(c.currentItem[0].nodeName)).addClass(d||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!d){g.style.visibility="hidden"
}return g
},update:function(g,h){if(d&&!f.forcePlaceholderSize){return
}if(!h.height()){h.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10))
}if(!h.width()){h.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))
}}}
}c.placeholder=a(f.placeholder.element.call(c.element,c.currentItem));
c.currentItem.after(c.placeholder);
f.placeholder.update(c,c.placeholder)
},_contactContainers:function(c){var e=null,l=null;
for(var g=this.containers.length-1;
g>=0;
g--){if(a.ui.contains(this.currentItem[0],this.containers[g].element[0])){continue
}if(this._intersectsWith(this.containers[g].containerCache)){if(e&&a.ui.contains(this.containers[g].element[0],e.element[0])){continue
}e=this.containers[g];
l=g
}else{if(this.containers[g].containerCache.over){this.containers[g]._trigger("out",c,this._uiHash(this));
this.containers[g].containerCache.over=0
}}}if(!e){return
}if(this.containers.length===1){this.containers[l]._trigger("over",c,this._uiHash(this));
this.containers[l].containerCache.over=1
}else{if(this.currentContainer!=this.containers[l]){var k=10000;
var h=null;
var d=this.positionAbs[this.containers[l].floating?"left":"top"];
for(var f=this.items.length-1;
f>=0;
f--){if(!a.ui.contains(this.containers[l].element[0],this.items[f].item[0])){continue
}var m=this.items[f][this.containers[l].floating?"left":"top"];
if(Math.abs(m-d)<k){k=Math.abs(m-d);
h=this.items[f]
}}if(!h&&!this.options.dropOnEmpty){return
}this.currentContainer=this.containers[l];
h?this._rearrange(c,h,null,true):this._rearrange(c,null,this.containers[l].element,true);
this._trigger("change",c,this._uiHash());
this.containers[l]._trigger("change",c,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[l]._trigger("over",c,this._uiHash(this));
this.containers[l].containerCache.over=1
}}},_createHelper:function(d){var e=this.options;
var c=a.isFunction(e.helper)?a(e.helper.apply(this.element[0],[d,this.currentItem])):(e.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!c.parents("body").length){a(e.appendTo!="parent"?e.appendTo:this.currentItem[0].parentNode)[0].appendChild(c[0])
}if(c[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(c[0].style.width==""||e.forceHelperSize){c.width(this.currentItem.width())
}if(c[0].style.height==""||e.forceHelperSize){c.height(this.currentItem.height())
}return c
},_adjustOffsetFromHelper:function(c){if(typeof c=="string"){c=c.split(" ")
}if(a.isArray(c)){c={left:+c[0],top:+c[1]||0}
}if("left" in c){this.offset.click.left=c.left+this.margins.left
}if("right" in c){this.offset.click.left=this.helperProportions.width-c.right+this.margins.left
}if("top" in c){this.offset.click.top=c.top+this.margins.top
}if("bottom" in c){this.offset.click.top=this.helperProportions.height-c.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var c=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){c.left+=this.scrollParent.scrollLeft();
c.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){c={top:0,left:0}
}return{top:c.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:c.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var c=this.currentItem.position();
return{top:c.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:c.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var f=this.options;
if(f.containment=="parent"){f.containment=this.helper[0].parentNode
}if(f.containment=="document"||f.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(f.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(f.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(f.containment)){var d=a(f.containment)[0];
var e=a(f.containment).offset();
var c=(a(d).css("overflow")!="hidden");
this.containment=[e.left+(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0)-this.margins.top,e.left+(c?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(c?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(g,i){if(!i){i=this.position
}var e=g=="absolute"?1:-1;
var f=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=(/(html|body)/i).test(c[0].tagName);
return{top:(i.top+this.offset.relative.top*e+this.offset.parent.top*e-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(h?0:c.scrollTop()))*e)),left:(i.left+this.offset.relative.left*e+this.offset.parent.left*e-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:c.scrollLeft())*e))}
},_generatePosition:function(f){var i=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,j=(/(html|body)/i).test(c[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var e=f.pageX;
var d=f.pageY;
if(this.originalPosition){if(this.containment){if(f.pageX-this.offset.click.left<this.containment[0]){e=this.containment[0]+this.offset.click.left
}if(f.pageY-this.offset.click.top<this.containment[1]){d=this.containment[1]+this.offset.click.top
}if(f.pageX-this.offset.click.left>this.containment[2]){e=this.containment[2]+this.offset.click.left
}if(f.pageY-this.offset.click.top>this.containment[3]){d=this.containment[3]+this.offset.click.top
}}if(i.grid){var h=this.originalPageY+Math.round((d-this.originalPageY)/i.grid[1])*i.grid[1];
d=this.containment?(!(h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3])?h:(!(h-this.offset.click.top<this.containment[1])?h-i.grid[1]:h+i.grid[1])):h;
var g=this.originalPageX+Math.round((e-this.originalPageX)/i.grid[0])*i.grid[0];
e=this.containment?(!(g-this.offset.click.left<this.containment[0]||g-this.offset.click.left>this.containment[2])?g:(!(g-this.offset.click.left<this.containment[0])?g-i.grid[0]:g+i.grid[0])):g
}}return{top:(d-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(j?0:c.scrollTop())))),left:(e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():j?0:c.scrollLeft())))}
},_rearrange:function(h,g,d,f){d?d[0].appendChild(this.placeholder[0]):g.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?g.item[0]:g.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var e=this,c=this.counter;
window.setTimeout(function(){if(c==e.counter){e.refreshPositions(!f)
}},0)
},_clear:function(e,f){this.reverting=false;
var g=[],c=this;
if(!this._noFinalSort&&this.currentItem[0].parentNode){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var d in this._storedCSS){if(this._storedCSS[d]=="auto"||this._storedCSS[d]=="static"){this._storedCSS[d]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}if(this.fromOutside&&!f){g.push(function(h){this._trigger("receive",h,this._uiHash(this.fromOutside))
})
}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!f){g.push(function(h){this._trigger("update",h,this._uiHash())
})
}if(!a.ui.contains(this.element[0],this.currentItem[0])){if(!f){g.push(function(h){this._trigger("remove",h,this._uiHash())
})
}for(var d=this.containers.length-1;
d>=0;
d--){if(a.ui.contains(this.containers[d].element[0],this.currentItem[0])&&!f){g.push((function(h){return function(i){h._trigger("receive",i,this._uiHash(this))
}
}).call(this,this.containers[d]));
g.push((function(h){return function(i){h._trigger("update",i,this._uiHash(this))
}
}).call(this,this.containers[d]))
}}}for(var d=this.containers.length-1;
d>=0;
d--){if(!f){g.push((function(h){return function(i){h._trigger("deactivate",i,this._uiHash(this))
}
}).call(this,this.containers[d]))
}if(this.containers[d].containerCache.over){g.push((function(h){return function(i){h._trigger("out",i,this._uiHash(this))
}
}).call(this,this.containers[d]));
this.containers[d].containerCache.over=0
}}if(this._storedCursor){a("body").css("cursor",this._storedCursor)
}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!f){this._trigger("beforeStop",e,this._uiHash());
for(var d=0;
d<g.length;
d++){g[d].call(this,e)
}this._trigger("stop",e,this._uiHash())
}return false
}if(!f){this._trigger("beforeStop",e,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){this.helper.remove()
}this.helper=null;
if(!f){for(var d=0;
d<g.length;
d++){g[d].call(this,e)
}this._trigger("stop",e,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){if(a.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(d){var c=d||this;
return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:d?d.element:null}
}});
a.extend(a.ui.sortable,{version:"1.8.5"})
})(jQuery);
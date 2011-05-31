(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
},_mouseCapture:function(c){var d=this.options;
if(this.helper||d.disabled||a(c.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(c);
if(!this.handle){return false
}return true
},_mouseStart:function(c){var d=this.options;
this.helper=this._createHelper(c);
this._cacheHelperProportions();
if(a.ui.ddmanager){a.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
a.extend(this.offset,{click:{left:c.pageX-this.offset.left,top:c.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(c);
this.originalPageX=c.pageX;
this.originalPageY=c.pageY;
(d.cursorAt&&this._adjustOffsetFromHelper(d.cursorAt));
if(d.containment){this._setContainment()
}if(this._trigger("start",c)===false){this._clear();
return false
}this._cacheHelperProportions();
if(a.ui.ddmanager&&!d.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,c)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(c,true);
return true
},_mouseDrag:function(c,e){this.position=this._generatePosition(c);
this.positionAbs=this._convertPositionTo("absolute");
if(!e){var d=this._uiHash();
if(this._trigger("drag",c,d)===false){this._mouseUp({});
return false
}this.position=d.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,c)
}return false
},_mouseStop:function(d){var e=false;
if(a.ui.ddmanager&&!this.options.dropBehaviour){e=a.ui.ddmanager.drop(this,d)
}if(this.dropped){e=this.dropped;
this.dropped=false
}if(!this.element[0]||!this.element[0].parentNode){return false
}if((this.options.revert=="invalid"&&!e)||(this.options.revert=="valid"&&e)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,e))){var c=this;
a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(c._trigger("stop",d)!==false){c._clear()
}})
}else{if(this._trigger("stop",d)!==false){this._clear()
}}return false
},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({})
}else{this._clear()
}return this
},_getHandle:function(c){var d=!this.options.handle||!a(this.options.handle,this.element).length?true:false;
a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==c.target){d=true
}});
return d
},_createHelper:function(d){var e=this.options;
var c=a.isFunction(e.helper)?a(e.helper.apply(this.element[0],[d])):(e.helper=="clone"?this.element.clone():this.element);
if(!c.parents("body").length){c.appendTo((e.appendTo=="parent"?this.element[0].parentNode:e.appendTo))
}if(c[0]!=this.element[0]&&!(/(fixed|absolute)/).test(c.css("position"))){c.css("position","absolute")
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
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var c=this.element.position();
return{top:c.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:c.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var f=this.options;
if(f.containment=="parent"){f.containment=this.helper[0].parentNode
}if(f.containment=="document"||f.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(f.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(f.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(f.containment)&&f.containment.constructor!=Array){var d=a(f.containment)[0];
if(!d){return
}var e=a(f.containment).offset();
var c=(a(d).css("overflow")!="hidden");
this.containment=[e.left+(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0)-this.margins.left,e.top+(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0)-this.margins.top,e.left+(c?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,e.top+(c?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}else{if(f.containment.constructor==Array){this.containment=f.containment
}}},_convertPositionTo:function(g,i){if(!i){i=this.position
}var e=g=="absolute"?1:-1;
var f=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,h=(/(html|body)/i).test(c[0].tagName);
return{top:(i.top+this.offset.relative.top*e+this.offset.parent.top*e-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(h?0:c.scrollTop()))*e)),left:(i.left+this.offset.relative.left*e+this.offset.parent.left*e-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():h?0:c.scrollLeft())*e))}
},_generatePosition:function(f){var i=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,j=(/(html|body)/i).test(c[0].tagName);
var e=f.pageX;
var d=f.pageY;
if(this.originalPosition){if(this.containment){if(f.pageX-this.offset.click.left<this.containment[0]){e=this.containment[0]+this.offset.click.left
}if(f.pageY-this.offset.click.top<this.containment[1]){d=this.containment[1]+this.offset.click.top
}if(f.pageX-this.offset.click.left>this.containment[2]){e=this.containment[2]+this.offset.click.left
}if(f.pageY-this.offset.click.top>this.containment[3]){d=this.containment[3]+this.offset.click.top
}}if(i.grid){var h=this.originalPageY+Math.round((d-this.originalPageY)/i.grid[1])*i.grid[1];
d=this.containment?(!(h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3])?h:(!(h-this.offset.click.top<this.containment[1])?h-i.grid[1]:h+i.grid[1])):h;
var g=this.originalPageX+Math.round((e-this.originalPageX)/i.grid[0])*i.grid[0];
e=this.containment?(!(g-this.offset.click.left<this.containment[0]||g-this.offset.click.left>this.containment[2])?g:(!(g-this.offset.click.left<this.containment[0])?g-i.grid[0]:g+i.grid[0])):g
}}return{top:(d-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(j?0:c.scrollTop())))),left:(e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():j?0:c.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(c,d,e){e=e||this._uiHash();
a.ui.plugin.call(this,c,[d,e]);
if(c=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return a.Widget.prototype._trigger.call(this,c,d,e)
},plugins:{},_uiHash:function(c){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
a.extend(a.ui.draggable,{version:"1.8.5"});
a.ui.plugin.add("draggable","connectToSortable",{start:function(d,f){var e=a(this).data("draggable"),g=e.options,c=a.extend({},f,{item:e.element});
e.sortables=[];
a(g.connectToSortable).each(function(){var h=a.data(this,"sortable");
if(h&&!h.options.disabled){e.sortables.push({instance:h,shouldRevert:h.options.revert});
h._refreshItems();
h._trigger("activate",d,c)
}})
},stop:function(d,f){var e=a(this).data("draggable"),c=a.extend({},f,{item:e.element});
a.each(e.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
e.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(d);
this.instance.options.helper=this.instance.options._helper;
if(e.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",d,c)
}})
},drag:function(d,g){var f=a(this).data("draggable"),c=this;
var e=function(j){var p=this.offset.click.top,n=this.offset.click.left;
var h=this.positionAbs.top,l=this.positionAbs.left;
var k=j.height,m=j.width;
var q=j.top,i=j.left;
return a.ui.isOver(h+p,l+n,q,i,k,m)
};
a.each(f.sortables,function(h){this.instance.positionAbs=f.positionAbs;
this.instance.helperProportions=f.helperProportions;
this.instance.offset.click=f.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=a(c).clone().appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return g.helper[0]
};
d.target=this.instance.currentItem[0];
this.instance._mouseCapture(d,true);
this.instance._mouseStart(d,true,true);
this.instance.offset.click.top=f.offset.click.top;
this.instance.offset.click.left=f.offset.click.left;
this.instance.offset.parent.left-=f.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=f.offset.parent.top-this.instance.offset.parent.top;
f._trigger("toSortable",d);
f.dropped=this.instance.element;
f.currentItem=f.element;
this.instance.fromOutside=f
}if(this.instance.currentItem){this.instance._mouseDrag(d)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",d,this.instance._uiHash(this.instance));
this.instance._mouseStop(d,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}f._trigger("fromSortable",d);
f.dropped=false
}}})
}});
a.ui.plugin.add("draggable","cursor",{start:function(d,e){var c=a("body"),f=a(this).data("draggable").options;
if(c.css("cursor")){f._cursor=c.css("cursor")
}c.css("cursor",f.cursor)
},stop:function(c,d){var e=a(this).data("draggable").options;
if(e._cursor){a("body").css("cursor",e._cursor)
}}});
a.ui.plugin.add("draggable","iframeFix",{start:function(c,d){var e=a(this).data("draggable").options;
a(e.iframeFix===true?"iframe":e.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")
})
},stop:function(c,d){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}});
a.ui.plugin.add("draggable","opacity",{start:function(d,e){var c=a(e.helper),f=a(this).data("draggable").options;
if(c.css("opacity")){f._opacity=c.css("opacity")
}c.css("opacity",f.opacity)
},stop:function(c,d){var e=a(this).data("draggable").options;
if(e._opacity){a(d.helper).css("opacity",e._opacity)
}}});
a.ui.plugin.add("draggable","scroll",{start:function(d,e){var c=a(this).data("draggable");
if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){c.overflowOffset=c.scrollParent.offset()
}},drag:function(e,f){var d=a(this).data("draggable"),g=d.options,c=false;
if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!g.axis||g.axis!="x"){if((d.overflowOffset.top+d.scrollParent[0].offsetHeight)-e.pageY<g.scrollSensitivity){d.scrollParent[0].scrollTop=c=d.scrollParent[0].scrollTop+g.scrollSpeed
}else{if(e.pageY-d.overflowOffset.top<g.scrollSensitivity){d.scrollParent[0].scrollTop=c=d.scrollParent[0].scrollTop-g.scrollSpeed
}}}if(!g.axis||g.axis!="y"){if((d.overflowOffset.left+d.scrollParent[0].offsetWidth)-e.pageX<g.scrollSensitivity){d.scrollParent[0].scrollLeft=c=d.scrollParent[0].scrollLeft+g.scrollSpeed
}else{if(e.pageX-d.overflowOffset.left<g.scrollSensitivity){d.scrollParent[0].scrollLeft=c=d.scrollParent[0].scrollLeft-g.scrollSpeed
}}}}else{if(!g.axis||g.axis!="x"){if(e.pageY-a(document).scrollTop()<g.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)
}else{if(a(window).height()-(e.pageY-a(document).scrollTop())<g.scrollSensitivity){c=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)
}}}if(!g.axis||g.axis!="y"){if(e.pageX-a(document).scrollLeft()<g.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)
}else{if(a(window).width()-(e.pageX-a(document).scrollLeft())<g.scrollSensitivity){c=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)
}}}}if(c!==false&&a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(d,e)
}}});
a.ui.plugin.add("draggable","snap",{start:function(d,e){var c=a(this).data("draggable"),f=c.options;
c.snapElements=[];
a(f.snap.constructor!=String?(f.snap.items||":data(draggable)"):f.snap).each(function(){var h=a(this);
var g=h.offset();
if(this!=c.element[0]){c.snapElements.push({item:this,width:h.outerWidth(),height:h.outerHeight(),top:g.top,left:g.left})
}})
},drag:function(u,p){var g=a(this).data("draggable"),q=g.options;
var y=q.snapTolerance;
var x=p.offset.left,w=x+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;
for(var v=g.snapElements.length-1;
v>=0;
v--){var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,A=m+g.snapElements[v].height;
if(!((s-y<x&&x<n+y&&m-y<f&&f<A+y)||(s-y<x&&x<n+y&&m-y<e&&e<A+y)||(s-y<w&&w<n+y&&m-y<f&&f<A+y)||(s-y<w&&w<n+y&&m-y<e&&e<A+y))){if(g.snapElements[v].snapping){(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))
}g.snapElements[v].snapping=false;
continue
}if(q.snapMode!="inner"){var c=Math.abs(m-e)<=y;
var z=Math.abs(A-f)<=y;
var j=Math.abs(s-w)<=y;
var k=Math.abs(n-x)<=y;
if(c){p.position.top=g._convertPositionTo("relative",{top:m-g.helperProportions.height,left:0}).top-g.margins.top
}if(z){p.position.top=g._convertPositionTo("relative",{top:A,left:0}).top-g.margins.top
}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s-g.helperProportions.width}).left-g.margins.left
}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n}).left-g.margins.left
}}var h=(c||z||j||k);
if(q.snapMode!="outer"){var c=Math.abs(m-f)<=y;
var z=Math.abs(A-e)<=y;
var j=Math.abs(s-x)<=y;
var k=Math.abs(n-w)<=y;
if(c){p.position.top=g._convertPositionTo("relative",{top:m,left:0}).top-g.margins.top
}if(z){p.position.top=g._convertPositionTo("relative",{top:A-g.helperProportions.height,left:0}).top-g.margins.top
}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s}).left-g.margins.left
}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n-g.helperProportions.width}).left-g.margins.left
}}if(!g.snapElements[v].snapping&&(c||z||j||k||h)){(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))
}g.snapElements[v].snapping=(c||z||j||k||h)
}}});
a.ui.plugin.add("draggable","stack",{start:function(d,e){var g=a(this).data("draggable").options;
var f=a.makeArray(a(g.stack)).sort(function(i,h){return(parseInt(a(i).css("zIndex"),10)||0)-(parseInt(a(h).css("zIndex"),10)||0)
});
if(!f.length){return
}var c=parseInt(f[0].style.zIndex)||0;
a(f).each(function(h){this.style.zIndex=c+h
});
this[0].style.zIndex=c+f.length
}});
a.ui.plugin.add("draggable","zIndex",{start:function(d,e){var c=a(e.helper),f=a(this).data("draggable").options;
if(c.css("zIndex")){f._zIndex=c.css("zIndex")
}c.css("zIndex",f.zIndex)
},stop:function(c,d){var e=a(this).data("draggable").options;
if(e._zIndex){a(d.helper).css("zIndex",e._zIndex)
}}})
})(jQuery);
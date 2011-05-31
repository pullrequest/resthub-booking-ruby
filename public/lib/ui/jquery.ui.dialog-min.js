(function(b,c){var a="ui-dialog ui-widget ui-widget-content ui-corner-all ";
b.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var d=b(this).css(e).offset().top;
if(d<0){b(this).css("top",e.top-d)
}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var l=this,m=l.options,j=m.title||"&#160;",e=b.ui.dialog.getTitleId(l.element),k=(l.uiDialog=b("<div></div>")).appendTo(document.body).hide().addClass(a+m.dialogClass).css({zIndex:m.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){if(m.closeOnEscape&&n.keyCode&&n.keyCode===b.ui.keyCode.ESCAPE){l.close(n);
n.preventDefault()
}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(n){l.moveToTop(false,n)
}),g=l.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),f=(l.uiDialogTitlebar=b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),i=b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){i.addClass("ui-state-hover")
},function(){i.removeClass("ui-state-hover")
}).focus(function(){i.addClass("ui-state-focus")
}).blur(function(){i.removeClass("ui-state-focus")
}).click(function(n){l.close(n);
return false
}).appendTo(f),h=(l.uiDialogTitlebarCloseText=b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),d=b("<span></span>").addClass("ui-dialog-title").attr("id",e).html(j).prependTo(f);
if(b.isFunction(m.beforeclose)&&!b.isFunction(m.beforeClose)){m.beforeClose=m.beforeclose
}f.find("*").add(f).disableSelection();
if(m.draggable&&b.fn.draggable){l._makeDraggable()
}if(m.resizable&&b.fn.resizable){l._makeResizable()
}l._createButtons(m.buttons);
l._isOpen=false;
if(b.fn.bgiframe){k.bgiframe()
}},_init:function(){if(this.options.autoOpen){this.open()
}},destroy:function(){var d=this;
if(d.overlay){d.overlay.destroy()
}d.uiDialog.hide();
d.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
d.uiDialog.remove();
if(d.originalTitle){d.element.attr("title",d.originalTitle)
}return d
},widget:function(){return this.uiDialog
},close:function(f){var d=this,e;
if(false===d._trigger("beforeClose",f)){return
}if(d.overlay){d.overlay.destroy()
}d.uiDialog.unbind("keypress.ui-dialog");
d._isOpen=false;
if(d.options.hide){d.uiDialog.hide(d.options.hide,function(){d._trigger("close",f)
})
}else{d.uiDialog.hide();
d._trigger("close",f)
}b.ui.dialog.overlay.resize();
if(d.options.modal){e=0;
b(".ui-dialog").each(function(){if(this!==d.uiDialog[0]){e=Math.max(e,b(this).css("z-index"))
}});
b.ui.dialog.maxZ=e
}return d
},isOpen:function(){return this._isOpen
},moveToTop:function(h,g){var d=this,f=d.options,e;
if((f.modal&&!h)||(!f.stack&&!f.modal)){return d._trigger("focus",g)
}if(f.zIndex>b.ui.dialog.maxZ){b.ui.dialog.maxZ=f.zIndex
}if(d.overlay){b.ui.dialog.maxZ+=1;
d.overlay.$el.css("z-index",b.ui.dialog.overlay.maxZ=b.ui.dialog.maxZ)
}e={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};
b.ui.dialog.maxZ+=1;
d.uiDialog.css("z-index",b.ui.dialog.maxZ);
d.element.attr(e);
d._trigger("focus",g);
return d
},open:function(){if(this._isOpen){return
}var e=this,f=e.options,d=e.uiDialog;
e.overlay=f.modal?new b.ui.dialog.overlay(e):null;
if(d.next().length){d.appendTo("body")
}e._size();
e._position(f.position);
d.show(f.show);
e.moveToTop(true);
if(f.modal){d.bind("keypress.ui-dialog",function(i){if(i.keyCode!==b.ui.keyCode.TAB){return
}var h=b(":tabbable",this),j=h.filter(":first"),g=h.filter(":last");
if(i.target===g[0]&&!i.shiftKey){j.focus(1);
return false
}else{if(i.target===j[0]&&i.shiftKey){g.focus(1);
return false
}}})
}b(e.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();
e._isOpen=true;
e._trigger("open");
return e
},_createButtons:function(g){var f=this,d=false,e=b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),h=b("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
f.uiDialog.find(".ui-dialog-buttonpane").remove();
if(typeof g==="object"&&g!==null){b.each(g,function(){return !(d=true)
})
}if(d){b.each(g,function(i,k){k=b.isFunction(k)?{click:k,text:i}:k;
var j=b("<button></button>",k).unbind("click").click(function(){k.click.apply(f.element[0],arguments)
}).appendTo(h);
if(b.fn.button){j.button()
}});
e.appendTo(f.uiDialog)
}},_makeDraggable:function(){var d=this,g=d.options,h=b(document),f;
function e(i){return{position:i.position,offset:i.offset}
}d.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(i,j){f=g.height==="auto"?"auto":b(this).height();
b(this).height(b(this).height()).addClass("ui-dialog-dragging");
d._trigger("dragStart",i,e(j))
},drag:function(i,j){d._trigger("drag",i,e(j))
},stop:function(i,j){g.position=[j.position.left-h.scrollLeft(),j.position.top-h.scrollTop()];
b(this).removeClass("ui-dialog-dragging").height(f);
d._trigger("dragStop",i,e(j));
b.ui.dialog.overlay.resize()
}})
},_makeResizable:function(i){i=(i===c?this.options.resizable:i);
var e=this,h=e.options,d=e.uiDialog.css("position"),g=(typeof i==="string"?i:"n,e,s,w,se,sw,ne,nw");
function f(j){return{originalPosition:j.originalPosition,originalSize:j.originalSize,position:j.position,size:j.size}
}e.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:e.element,maxWidth:h.maxWidth,maxHeight:h.maxHeight,minWidth:h.minWidth,minHeight:e._minHeight(),handles:g,start:function(j,k){b(this).addClass("ui-dialog-resizing");
e._trigger("resizeStart",j,f(k))
},resize:function(j,k){e._trigger("resize",j,f(k))
},stop:function(j,k){b(this).removeClass("ui-dialog-resizing");
h.height=b(this).height();
h.width=b(this).width();
e._trigger("resizeStop",j,f(k));
b.ui.dialog.overlay.resize()
}}).css("position",d).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var d=this.options;
if(d.height==="auto"){return d.minHeight
}else{return Math.min(d.minHeight,d.height)
}},_position:function(e){var f=[],g=[0,0],d;
if(e){if(typeof e==="string"||(typeof e==="object"&&"0" in e)){f=e.split?e.split(" "):[e[0],e[1]];
if(f.length===1){f[1]=f[0]
}b.each(["left","top"],function(j,h){if(+f[j]===f[j]){g[j]=f[j];
f[j]=h
}});
e={my:f.join(" "),at:f.join(" "),offset:g.join(" ")}
}e=b.extend({},b.ui.dialog.prototype.options.position,e)
}else{e=b.ui.dialog.prototype.options.position
}d=this.uiDialog.is(":visible");
if(!d){this.uiDialog.show()
}this.uiDialog.css({top:0,left:0}).position(e);
if(!d){this.uiDialog.hide()
}},_setOption:function(g,h){var e=this,d=e.uiDialog,i=d.is(":data(resizable)"),f=false;
switch(g){case"beforeclose":g="beforeClose";
break;
case"buttons":e._createButtons(h);
f=true;
break;
case"closeText":e.uiDialogTitlebarCloseText.text(""+h);
break;
case"dialogClass":d.removeClass(e.options.dialogClass).addClass(a+h);
break;
case"disabled":if(h){d.addClass("ui-dialog-disabled")
}else{d.removeClass("ui-dialog-disabled")
}break;
case"draggable":if(h){e._makeDraggable()
}else{d.draggable("destroy")
}break;
case"height":f=true;
break;
case"maxHeight":if(i){d.resizable("option","maxHeight",h)
}f=true;
break;
case"maxWidth":if(i){d.resizable("option","maxWidth",h)
}f=true;
break;
case"minHeight":if(i){d.resizable("option","minHeight",h)
}f=true;
break;
case"minWidth":if(i){d.resizable("option","minWidth",h)
}f=true;
break;
case"position":e._position(h);
break;
case"resizable":if(i&&!h){d.resizable("destroy")
}if(i&&typeof h==="string"){d.resizable("option","handles",h)
}if(!i&&h!==false){e._makeResizable(h)
}break;
case"title":b(".ui-dialog-title",e.uiDialogTitlebar).html(""+(h||"&#160;"));
break;
case"width":f=true;
break
}b.Widget.prototype._setOption.apply(e,arguments);
if(f){e._size()
}},_size:function(){var e=this.options,d;
this.element.css({width:"auto",minHeight:0,height:0});
if(e.minWidth>e.width){e.width=e.minWidth
}d=this.uiDialog.css({height:"auto",width:e.width}).height();
this.element.css(e.height==="auto"?{minHeight:Math.max(e.minHeight-d,0),height:b.support.minHeight?"auto":Math.max(e.minHeight-d,0)}:{minHeight:0,height:Math.max(e.height-d,0)}).show();
if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}}});
b.extend(b.ui.dialog,{version:"1.8.5",uuid:0,maxZ:0,getTitleId:function(d){var e=d.attr("id");
if(!e){this.uuid+=1;
e=this.uuid
}return"ui-dialog-title-"+e
},overlay:function(d){this.$el=b.ui.dialog.overlay.create(d)
}});
b.extend(b.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(d){return d+".dialog-overlay"
}).join(" "),create:function(e){if(this.instances.length===0){setTimeout(function(){if(b.ui.dialog.overlay.instances.length){b(document).bind(b.ui.dialog.overlay.events,function(f){if(b(f.target).zIndex()<b.ui.dialog.overlay.maxZ){return false
}})
}},1);
b(document).bind("keydown.dialog-overlay",function(f){if(e.options.closeOnEscape&&f.keyCode&&f.keyCode===b.ui.keyCode.ESCAPE){e.close(f);
f.preventDefault()
}});
b(window).bind("resize.dialog-overlay",b.ui.dialog.overlay.resize)
}var d=(this.oldInstances.pop()||b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
if(b.fn.bgiframe){d.bgiframe()
}this.instances.push(d);
return d
},destroy:function(d){this.oldInstances.push(this.instances.splice(b.inArray(d,this.instances),1)[0]);
if(this.instances.length===0){b([document,window]).unbind(".dialog-overlay")
}d.remove();
var e=0;
b.each(this.instances,function(){e=Math.max(e,this.css("z-index"))
});
this.maxZ=e
},height:function(){var e,d;
if(b.browser.msie&&b.browser.version<7){e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(e<d){return b(window).height()+"px"
}else{return e+"px"
}}else{return b(document).height()+"px"
}},width:function(){var d,e;
if(b.browser.msie&&b.browser.version<7){d=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
e=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(d<e){return b(window).width()+"px"
}else{return d+"px"
}}else{return b(document).width()+"px"
}},resize:function(){var d=b([]);
b.each(b.ui.dialog.overlay.instances,function(){d=d.add(this)
});
d.css({width:0,height:0}).css({width:b.ui.dialog.overlay.width(),height:b.ui.dialog.overlay.height()})
}});
b.extend(b.ui.dialog.overlay.prototype,{destroy:function(){b.ui.dialog.overlay.destroy(this.$el)
}})
}(jQuery));
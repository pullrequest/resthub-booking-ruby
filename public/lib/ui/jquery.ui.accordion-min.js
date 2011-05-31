(function(a,b){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var c=this,d=c.options;
c.running=0;
c.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
c.headers=c.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(d.disabled){return
}a(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){if(d.disabled){return
}a(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){if(d.disabled){return
}a(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){if(d.disabled){return
}a(this).removeClass("ui-state-focus")
});
c.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(d.navigation){var e=c.element.find("a").filter(d.navigationFilter).eq(0);
if(e.length){var f=e.closest(".ui-accordion-header");
if(f.length){c.active=f
}else{c.active=e.closest(".ui-accordion-content").prev()
}}}c.active=c._findActive(c.active||d.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all ui-corner-top");
c.active.next().addClass("ui-accordion-content-active");
c._createIcons();
c.resize();
c.element.attr("role","tablist");
c.headers.attr("role","tab").bind("keydown.accordion",function(g){return c._keydown(g)
}).next().attr("role","tabpanel");
c.headers.not(c.active||"").attr({"aria-expanded":"false",tabIndex:-1}).next().hide();
if(!c.active.length){c.headers.eq(0).attr("tabIndex",0)
}else{c.active.attr({"aria-expanded":"true",tabIndex:0})
}if(!a.browser.safari){c.headers.find("a").attr("tabIndex",-1)
}if(d.event){c.headers.bind(d.event.split(" ").join(".accordion ")+".accordion",function(g){c._clickHandler.call(c,g,this);
g.preventDefault()
})
}},_createIcons:function(){var c=this.options;
if(c.icons){a("<span></span>").addClass("ui-icon "+c.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
this.element.addClass("ui-accordion-icons")
}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();
this.element.removeClass("ui-accordion-icons")
},destroy:function(){var c=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");
this._destroyIcons();
var d=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
if(c.autoHeight||c.fillHeight){d.css("height","")
}return a.Widget.prototype.destroy.call(this)
},_setOption:function(c,d){a.Widget.prototype._setOption.apply(this,arguments);
if(c=="active"){this.activate(d)
}if(c=="icons"){this._destroyIcons();
if(d){this._createIcons()
}}if(c=="disabled"){this.headers.add(this.headers.next())[d?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
}},_keydown:function(f){if(this.options.disabled||f.altKey||f.ctrlKey){return
}var g=a.ui.keyCode,e=this.headers.length,c=this.headers.index(f.target),d=false;
switch(f.keyCode){case g.RIGHT:case g.DOWN:d=this.headers[(c+1)%e];
break;
case g.LEFT:case g.UP:d=this.headers[(c-1+e)%e];
break;
case g.SPACE:case g.ENTER:this._clickHandler({target:f.target},f.target);
f.preventDefault()
}if(d){a(f.target).attr("tabIndex",-1);
a(d).attr("tabIndex",0);
d.focus();
return false
}return true
},resize:function(){var c=this.options,e;
if(c.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}e=this.element.parent().height();
if(a.browser.msie){this.element.parent().css("overflow",d)
}this.headers.each(function(){e-=a(this).outerHeight(true)
});
this.headers.next().each(function(){a(this).height(Math.max(0,e-a(this).innerHeight()+a(this).height()))
}).css("overflow","auto")
}else{if(c.autoHeight){e=0;
this.headers.next().each(function(){e=Math.max(e,a(this).height("").height())
}).height(e)
}}return this
},activate:function(c){this.options.active=c;
var d=this._findActive(c)[0];
this._clickHandler({target:d},d);
return this
},_findActive:function(c){return c?typeof c==="number"?this.headers.filter(":eq("+c+")"):this.headers.not(this.headers.not(c)):c===false?a([]):this.headers.filter(":eq(0)")
},_clickHandler:function(c,f){var k=this.options;
if(k.disabled){return
}if(!c.target){if(!k.collapsible){return
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(k.icons.headerSelected).addClass(k.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var h=this.active.next(),e={options:k,newHeader:a([]),oldHeader:k.active,newContent:a([]),oldContent:h},d=(this.active=a([]));
this._toggle(d,h,e);
return
}var g=a(c.currentTarget||f),i=g[0]===this.active[0];
k.active=k.collapsible&&i?false:this.headers.index(g);
if(this.running||(!k.collapsible&&i)){return
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(k.icons.headerSelected).addClass(k.icons.header);
if(!i){g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(k.icons.header).addClass(k.icons.headerSelected);
g.next().addClass("ui-accordion-content-active")
}var d=g.next(),h=this.active.next(),e={options:k,newHeader:i&&k.collapsible?a([]):g,oldHeader:this.active,newContent:i&&k.collapsible?a([]):d,oldContent:h},j=this.headers.index(this.active[0])>this.headers.index(g[0]);
this.active=i?a([]):g;
this._toggle(d,h,e,i,j);
return
},_toggle:function(c,i,g,j,k){var m=this,n=m.options;
m.toShow=c;
m.toHide=i;
m.data=g;
var d=function(){if(!m){return
}return m._completed.apply(m,arguments)
};
m._trigger("changestart",null,m.data);
m.running=i.size()===0?c.size():i.size();
if(n.animated){var f={};
if(n.collapsible&&j){f={toShow:a([]),toHide:i,complete:d,down:k,autoHeight:n.autoHeight||n.fillSpace}
}else{f={toShow:c,toHide:i,complete:d,down:k,autoHeight:n.autoHeight||n.fillSpace}
}if(!n.proxied){n.proxied=n.animated
}if(!n.proxiedDuration){n.proxiedDuration=n.duration
}n.animated=a.isFunction(n.proxied)?n.proxied(f):n.proxied;
n.duration=a.isFunction(n.proxiedDuration)?n.proxiedDuration(f):n.proxiedDuration;
var l=a.ui.accordion.animations,e=n.duration,h=n.animated;
if(h&&!l[h]&&!a.easing[h]){h="slide"
}if(!l[h]){l[h]=function(o){this.slide(o,{easing:h,duration:e||700})
}
}l[h](f)
}else{if(n.collapsible&&j){c.toggle()
}else{i.hide();
c.show()
}d(true)
}i.prev().attr({"aria-expanded":"false",tabIndex:-1}).blur();
c.prev().attr({"aria-expanded":"true",tabIndex:0}).focus()
},_completed:function(c){this.running=c?0:--this.running;
if(this.running){return
}if(this.options.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this.toHide.removeClass("ui-accordion-content-active");
this._trigger("change",null,this.data)
}});
a.extend(a.ui.accordion,{version:"1.8.5",animations:{slide:function(k,i){k=a.extend({easing:"swing",duration:300},k,i);
if(!k.toHide.size()){k.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},k);
return
}if(!k.toShow.size()){k.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},k);
return
}var d=k.toShow.css("overflow"),h=0,e={},g={},f=["height","paddingTop","paddingBottom"],c;
var j=k.toShow;
c=j[0].style.width;
j.width(parseInt(j.parent().width(),10)-parseInt(j.css("paddingLeft"),10)-parseInt(j.css("paddingRight"),10)-(parseInt(j.css("borderLeftWidth"),10)||0)-(parseInt(j.css("borderRightWidth"),10)||0));
a.each(f,function(l,n){g[n]="hide";
var m=(""+a.css(k.toShow[0],n)).match(/^([\d+-.]+)(.*)$/);
e[n]={value:m[1],unit:m[2]||"px"}
});
k.toShow.css({height:0,overflow:"hidden"}).show();
k.toHide.filter(":hidden").each(k.complete).end().filter(":visible").animate(g,{step:function(l,m){if(m.prop=="height"){h=(m.end-m.start===0)?0:(m.now-m.start)/(m.end-m.start)
}k.toShow[0].style[m.prop]=(h*e[m.prop].value)+e[m.prop].unit
},duration:k.duration,easing:k.easing,complete:function(){if(!k.autoHeight){k.toShow.css("height","")
}k.toShow.css({width:c,overflow:d});
k.complete()
}})
},bounceslide:function(c){this.slide(c,{easing:c.down?"easeOutBounce":"swing",duration:c.down?1000:200})
}}})
})(jQuery);
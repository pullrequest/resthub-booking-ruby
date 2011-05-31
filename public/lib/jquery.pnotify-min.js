(function(d){var i,a;
var e;
var b;
d.extend({pnotify_remove_all:function(){var k=e.data("pnotify");
if(k&&k.length){d.each(k,function(){if(this.pnotify_remove){this.pnotify_remove()
}})
}},pnotify_position_all:function(){if(a){clearTimeout(a)
}a=null;
var k=e.data("pnotify");
if(!k||!k.length){return
}d.each(k,function(){var o=this.opts.pnotify_stack;
if(!o){return
}if(!o.nextpos1){o.nextpos1=o.firstpos1
}if(!o.nextpos2){o.nextpos2=o.firstpos2
}if(!o.addpos2){o.addpos2=0
}if(this.css("display")!="none"){var q,p;
var l={};
var n;
switch(o.dir1){case"down":n="top";
break;
case"up":n="bottom";
break;
case"left":n="right";
break;
case"right":n="left";
break
}q=parseInt(this.css(n));
if(isNaN(q)){q=0
}if(typeof o.firstpos1=="undefined"){o.firstpos1=q;
o.nextpos1=o.firstpos1
}var m;
switch(o.dir2){case"down":m="top";
break;
case"up":m="bottom";
break;
case"left":m="right";
break;
case"right":m="left";
break
}p=parseInt(this.css(m));
if(isNaN(p)){p=0
}if(typeof o.firstpos2=="undefined"){o.firstpos2=p;
o.nextpos2=o.firstpos2
}if((o.dir1=="down"&&o.nextpos1+this.height()>b.height())||(o.dir1=="up"&&o.nextpos1+this.height()>b.height())||(o.dir1=="left"&&o.nextpos1+this.width()>b.width())||(o.dir1=="right"&&o.nextpos1+this.width()>b.width())){o.nextpos1=o.firstpos1;
o.nextpos2+=o.addpos2+10;
o.addpos2=0
}if(o.animation&&o.nextpos2<p){switch(o.dir2){case"down":l.top=o.nextpos2+"px";
break;
case"up":l.bottom=o.nextpos2+"px";
break;
case"left":l.right=o.nextpos2+"px";
break;
case"right":l.left=o.nextpos2+"px";
break
}}else{this.css(m,o.nextpos2+"px")
}switch(o.dir2){case"down":case"up":if(this.outerHeight(true)>o.addpos2){o.addpos2=this.height()
}break;
case"left":case"right":if(this.outerWidth(true)>o.addpos2){o.addpos2=this.width()
}break
}if(o.nextpos1){if(o.animation&&(q>o.nextpos1||l.top||l.bottom||l.right||l.left)){switch(o.dir1){case"down":l.top=o.nextpos1+"px";
break;
case"up":l.bottom=o.nextpos1+"px";
break;
case"left":l.right=o.nextpos1+"px";
break;
case"right":l.left=o.nextpos1+"px";
break
}}else{this.css(n,o.nextpos1+"px")
}}if(l.top||l.bottom||l.right||l.left){this.animate(l,{duration:500,queue:false})
}switch(o.dir1){case"down":case"up":o.nextpos1+=this.height()+10;
break;
case"left":case"right":o.nextpos1+=this.width()+10;
break
}}});
d.each(k,function(){var l=this.opts.pnotify_stack;
if(!l){return
}l.nextpos1=l.firstpos1;
l.nextpos2=l.firstpos2;
l.addpos2=0;
l.animation=true
})
},pnotify:function(r){if(!e){e=d("body")
}if(!b){b=d(window)
}var s;
var k;
if(typeof r=="string"){k=d.extend({},d.pnotify.defaults);
k.pnotify_text=r
}else{k=d.extend({},d.pnotify.defaults,r)
}if(k.pnotify_before_init){if(k.pnotify_before_init(k)===false){return null
}}var l;
var m=function(x,u){o.css("display","none");
var t=document.elementFromPoint(x.clientX,x.clientY);
o.css("display","block");
var w=d(t);
var v=w.css("cursor");
o.css("cursor",v!="auto"?v:"default");
if(!l||l.get(0)!=t){if(l){f.call(l.get(0),"mouseleave",x.originalEvent);
f.call(l.get(0),"mouseout",x.originalEvent)
}f.call(t,"mouseenter",x.originalEvent);
f.call(t,"mouseover",x.originalEvent)
}f.call(t,u,x.originalEvent);
l=w
};
var o=d("<div />",{"class":"ui-pnotify "+k.pnotify_addclass,css:{display:"none"},mouseenter:function(t){if(k.pnotify_nonblock){t.stopPropagation()
}if(k.pnotify_mouse_reset&&s=="out"){o.stop(true);
o.css("height","auto").animate({width:k.pnotify_width,opacity:k.pnotify_nonblock?k.pnotify_nonblock_opacity:k.pnotify_opacity},"fast")
}else{if(k.pnotify_nonblock&&s!="out"){o.animate({opacity:k.pnotify_nonblock_opacity},"fast")
}}if(k.pnotify_hide&&k.pnotify_mouse_reset){o.pnotify_cancel_remove()
}if(k.pnotify_closer&&!k.pnotify_nonblock){o.closer.show()
}},mouseleave:function(t){if(k.pnotify_nonblock){t.stopPropagation()
}l=null;
o.css("cursor","auto");
if(k.pnotify_nonblock&&s!="out"){o.animate({opacity:k.pnotify_opacity},"fast")
}if(k.pnotify_hide&&k.pnotify_mouse_reset){o.pnotify_queue_remove()
}o.closer.hide();
d.pnotify_position_all()
},mouseover:function(t){if(k.pnotify_nonblock){t.stopPropagation()
}},mouseout:function(t){if(k.pnotify_nonblock){t.stopPropagation()
}},mousemove:function(t){if(k.pnotify_nonblock){t.stopPropagation();
m(t,"onmousemove")
}},mousedown:function(t){if(k.pnotify_nonblock){t.stopPropagation();
t.preventDefault();
m(t,"onmousedown")
}},mouseup:function(t){if(k.pnotify_nonblock){t.stopPropagation();
t.preventDefault();
m(t,"onmouseup")
}},click:function(t){if(k.pnotify_nonblock){t.stopPropagation();
m(t,"onclick")
}},dblclick:function(t){if(k.pnotify_nonblock){t.stopPropagation();
m(t,"ondblclick")
}}});
o.opts=k;
if(k.pnotify_shadow&&!d.browser.msie){o.shadow_container=d("<div />",{"class":"ui-widget-shadow ui-corner-all ui-pnotify-shadow"}).prependTo(o)
}o.container=d("<div />",{"class":"ui-widget ui-widget-content ui-corner-all ui-pnotify-container "+(k.pnotify_type=="error"?"ui-state-error":"ui-state-highlight")}).appendTo(o);
o.pnotify_version="1.0.0";
o.pnotify=function(t){var u=k;
if(typeof t=="string"){k.pnotify_text=t
}else{k=d.extend({},k,t)
}o.opts=k;
if(k.pnotify_shadow!=u.pnotify_shadow){if(k.pnotify_shadow&&!d.browser.msie){o.shadow_container=d("<div />",{"class":"ui-widget-shadow ui-pnotify-shadow"}).prependTo(o)
}else{o.children(".ui-pnotify-shadow").remove()
}}if(k.pnotify_addclass===false){o.removeClass(u.pnotify_addclass)
}else{if(k.pnotify_addclass!==u.pnotify_addclass){o.removeClass(u.pnotify_addclass).addClass(k.pnotify_addclass)
}}if(k.pnotify_title===false){o.title_container.hide("fast")
}else{if(k.pnotify_title!==u.pnotify_title){o.title_container.html(k.pnotify_title).show(200)
}}if(k.pnotify_text===false){o.text_container.hide("fast")
}else{if(k.pnotify_text!==u.pnotify_text){if(k.pnotify_insert_brs){k.pnotify_text=k.pnotify_text.replace(/\n/g,"<br />")
}o.text_container.html(k.pnotify_text).show(200)
}}o.pnotify_history=k.pnotify_history;
if(k.pnotify_type!=u.pnotify_type){o.container.toggleClass("ui-state-error ui-state-highlight")
}if((k.pnotify_notice_icon!=u.pnotify_notice_icon&&k.pnotify_type=="notice")||(k.pnotify_error_icon!=u.pnotify_error_icon&&k.pnotify_type=="error")||(k.pnotify_type!=u.pnotify_type)){o.container.find("div.ui-pnotify-icon").remove();
if((k.pnotify_error_icon&&k.pnotify_type=="error")||(k.pnotify_notice_icon)){d("<div />",{"class":"ui-pnotify-icon"}).append(d("<span />",{"class":k.pnotify_type=="error"?k.pnotify_error_icon:k.pnotify_notice_icon})).prependTo(o.container)
}}if(k.pnotify_width!==u.pnotify_width){o.animate({width:k.pnotify_width})
}if(k.pnotify_min_height!==u.pnotify_min_height){o.container.animate({minHeight:k.pnotify_min_height})
}if(k.pnotify_opacity!==u.pnotify_opacity){o.fadeTo(k.pnotify_animate_speed,k.pnotify_opacity)
}if(!k.pnotify_hide){o.pnotify_cancel_remove()
}else{if(!u.pnotify_hide){o.pnotify_queue_remove()
}}o.pnotify_queue_position();
return o
};
o.pnotify_queue_position=function(){if(a){clearTimeout(a)
}a=setTimeout(d.pnotify_position_all,10)
};
o.pnotify_display=function(){if(!o.parent().length){o.appendTo(e)
}if(k.pnotify_before_open){if(k.pnotify_before_open(o)===false){return
}}o.pnotify_queue_position();
if(k.pnotify_animation=="fade"||k.pnotify_animation.effect_in=="fade"){o.show().fadeTo(0,0).hide()
}else{if(k.pnotify_opacity!=1){o.show().fadeTo(0,k.pnotify_opacity).hide()
}}o.animate_in(function(){if(k.pnotify_after_open){k.pnotify_after_open(o)
}o.pnotify_queue_position();
if(k.pnotify_hide){o.pnotify_queue_remove()
}})
};
o.pnotify_remove=function(){if(o.timer){window.clearTimeout(o.timer);
o.timer=null
}if(k.pnotify_before_close){if(k.pnotify_before_close(o)===false){return
}}o.animate_out(function(){if(k.pnotify_after_close){if(k.pnotify_after_close(o)===false){return
}}o.pnotify_queue_position();
if(k.pnotify_remove){o.detach()
}})
};
o.animate_in=function(u){s="in";
var t;
if(typeof k.pnotify_animation.effect_in!="undefined"){t=k.pnotify_animation.effect_in
}else{t=k.pnotify_animation
}if(t=="none"){o.show();
u()
}else{if(t=="show"){o.show(k.pnotify_animate_speed,u)
}else{if(t=="fade"){o.show().fadeTo(k.pnotify_animate_speed,k.pnotify_opacity,u)
}else{if(t=="slide"){o.slideDown(k.pnotify_animate_speed,u)
}else{if(typeof t=="function"){t("in",u,o)
}else{if(o.effect){o.effect(t,{},k.pnotify_animate_speed,u)
}}}}}}};
o.animate_out=function(u){s="out";
var t;
if(typeof k.pnotify_animation.effect_out!="undefined"){t=k.pnotify_animation.effect_out
}else{t=k.pnotify_animation
}if(t=="none"){o.hide();
u()
}else{if(t=="show"){o.hide(k.pnotify_animate_speed,u)
}else{if(t=="fade"){o.fadeOut(k.pnotify_animate_speed,u)
}else{if(t=="slide"){o.slideUp(k.pnotify_animate_speed,u)
}else{if(typeof t=="function"){t("out",u,o)
}else{if(o.effect){o.effect(t,{},k.pnotify_animate_speed,u)
}}}}}}};
o.pnotify_cancel_remove=function(){if(o.timer){window.clearTimeout(o.timer)
}};
o.pnotify_queue_remove=function(){o.pnotify_cancel_remove();
o.timer=window.setTimeout(function(){o.pnotify_remove()
},(isNaN(k.pnotify_delay)?0:k.pnotify_delay))
};
o.closer=d("<div />",{"class":"ui-pnotify-closer",css:{cursor:"pointer",display:"none"},click:function(){o.pnotify_remove();
o.closer.hide()
}}).append(d("<span />",{"class":"ui-icon ui-icon-circle-close"})).appendTo(o.container);
if((k.pnotify_error_icon&&k.pnotify_type=="error")||(k.pnotify_notice_icon)){d("<div />",{"class":"ui-pnotify-icon"}).append(d("<span />",{"class":k.pnotify_type=="error"?k.pnotify_error_icon:k.pnotify_notice_icon})).appendTo(o.container)
}o.title_container=d("<div />",{"class":"ui-pnotify-title",html:k.pnotify_title}).appendTo(o.container);
if(typeof k.pnotify_title!="string"){o.title_container.hide()
}if(k.pnotify_insert_brs&&typeof k.pnotify_text=="string"){k.pnotify_text=k.pnotify_text.replace(/\n/g,"<br />")
}o.text_container=d("<div />",{"class":"ui-pnotify-text",html:k.pnotify_text}).appendTo(o.container);
if(typeof k.pnotify_text!="string"){o.text_container.hide()
}if(typeof k.pnotify_width=="string"){o.css("width",k.pnotify_width)
}if(typeof k.pnotify_min_height=="string"){o.container.css("min-height",k.pnotify_min_height)
}o.pnotify_history=k.pnotify_history;
var q=e.data("pnotify");
if(q==null||typeof q!="object"){q=[]
}if(k.pnotify_stack.push=="top"){q=d.merge([o],q)
}else{q=d.merge(q,[o])
}e.data("pnotify",q);
if(k.pnotify_after_init){k.pnotify_after_init(o)
}if(k.pnotify_history){var p=e.data("pnotify_history");
if(typeof p=="undefined"){p=d("<div />",{"class":"ui-pnotify-history-container ui-state-default ui-corner-bottom",mouseleave:function(){p.animate({top:"-"+i+"px"},{duration:100,queue:false})
}}).append(d("<div />",{"class":"ui-pnotify-history-header",text:"Redisplay"})).append(d("<button />",{"class":"ui-pnotify-history-all ui-state-default ui-corner-all",text:"All",mouseenter:function(){d(this).addClass("ui-state-hover")
},mouseleave:function(){d(this).removeClass("ui-state-hover")
},click:function(){d.each(q,function(){if(this.pnotify_history&&this.pnotify_display){this.pnotify_display()
}});
return false
}})).append(d("<button />",{"class":"ui-pnotify-history-last ui-state-default ui-corner-all",text:"Last",mouseenter:function(){d(this).addClass("ui-state-hover")
},mouseleave:function(){d(this).removeClass("ui-state-hover")
},click:function(){var t=1;
while(!q[q.length-t]||!q[q.length-t].pnotify_history){if(q.length-t===0){return false
}t++
}if(q[q.length-t].pnotify_display){q[q.length-t].pnotify_display()
}return false
}})).appendTo(e);
var n=d("<span />",{"class":"ui-pnotify-history-pulldown ui-icon ui-icon-grip-dotted-horizontal",mouseenter:function(){p.animate({top:"0"},{duration:100,queue:false})
}}).appendTo(p);
i=n.offset().top+2;
p.css({top:"-"+i+"px"});
e.data("pnotify_history",p)
}}k.pnotify_stack.animation=false;
o.pnotify_display();
return o
}});
var j=/^on/;
var c=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/;
var h=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/;
var g=/^(scroll|resize|(un)?load|abort|error)$/;
var f=function(l,k){var m;
l=l.toLowerCase();
if(document.createEvent&&this.dispatchEvent){l=l.replace(j,"");
if(l.match(c)){d(this).offset();
m=document.createEvent("MouseEvents");
m.initMouseEvent(l,k.bubbles,k.cancelable,k.view,k.detail,k.screenX,k.screenY,k.clientX,k.clientY,k.ctrlKey,k.altKey,k.shiftKey,k.metaKey,k.button,k.relatedTarget)
}else{if(l.match(h)){m=document.createEvent("UIEvents");
m.initUIEvent(l,k.bubbles,k.cancelable,k.view,k.detail)
}else{if(l.match(g)){m=document.createEvent("HTMLEvents");
m.initEvent(l,k.bubbles,k.cancelable)
}}}if(!m){return
}this.dispatchEvent(m)
}else{if(!l.match(j)){l="on"+l
}m=document.createEventObject(k);
this.fireEvent(l,m)
}};
d.pnotify.defaults={pnotify_addclass:"",pnotify_nonblock:false,pnotify_nonblock_opacity:0.2,pnotify_history:true,pnotify_width:"300px",pnotify_min_height:"16px",pnotify_type:"notice",pnotify_notice_icon:"ui-icon ui-icon-info",pnotify_error_icon:"ui-icon ui-icon-alert",pnotify_animation:"fade",pnotify_animate_speed:"slow",pnotify_opacity:1,pnotify_shadow:false,pnotify_closer:true,pnotify_hide:true,pnotify_delay:8000,pnotify_mouse_reset:true,pnotify_remove:true,pnotify_insert_brs:true,pnotify_stack:{dir1:"down",dir2:"left",push:"bottom"}}
})(jQuery);
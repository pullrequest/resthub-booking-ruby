jQuery.effects||(function(h,e){h.effects={};
h.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(m,l){h.fx.step[l]=function(n){if(!n.colorInit){n.start=k(n.elem,l);
n.end=j(n.end);
n.colorInit=true
}n.elem.style[l]="rgb("+Math.max(Math.min(parseInt((n.pos*(n.end[0]-n.start[0]))+n.start[0],10),255),0)+","+Math.max(Math.min(parseInt((n.pos*(n.end[1]-n.start[1]))+n.start[1],10),255),0)+","+Math.max(Math.min(parseInt((n.pos*(n.end[2]-n.start[2]))+n.start[2],10),255),0)+")"
}
});
function j(m){var l;
if(m&&m.constructor==Array&&m.length==3){return m
}if(l=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(m)){return[parseInt(l[1],10),parseInt(l[2],10),parseInt(l[3],10)]
}if(l=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(m)){return[parseFloat(l[1])*2.55,parseFloat(l[2])*2.55,parseFloat(l[3])*2.55]
}if(l=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(m)){return[parseInt(l[1],16),parseInt(l[2],16),parseInt(l[3],16)]
}if(l=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(m)){return[parseInt(l[1]+l[1],16),parseInt(l[2]+l[2],16),parseInt(l[3]+l[3],16)]
}if(l=/rgba\(0, 0, 0, 0\)/.exec(m)){return a.transparent
}return a[h.trim(m).toLowerCase()]
}function k(n,l){var m;
do{m=h.curCSS(n,l);
if(m!=""&&m!="transparent"||h.nodeName(n,"body")){break
}l="backgroundColor"
}while(n=n.parentNode);
return j(m)
}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var f=["add","remove","toggle"],c={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function g(){var o=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,p={},m,n;
if(o&&o.length&&o[0]&&o[o[0]]){var l=o.length;
while(l--){m=o[l];
if(typeof o[m]=="string"){n=m.replace(/\-(\w)/g,function(q,r){return r.toUpperCase()
});
p[n]=o[m]
}}}else{for(m in o){if(typeof o[m]==="string"){p[m]=o[m]
}}}return p
}function b(m){var l,n;
for(l in m){n=m[l];
if(n==null||h.isFunction(n)||l in c||(/scrollbar/).test(l)||(!(/color/i).test(l)&&isNaN(parseFloat(n)))){delete m[l]
}}return m
}function i(l,n){var o={_:0},m;
for(m in n){if(l[m]!=n[m]){o[m]=n[m]
}}return o
}h.effects.animateClass=function(l,m,o,n){if(h.isFunction(o)){n=o;
o=null
}return this.each(function(){var s=h(this),p=s.attr("style")||" ",t=b(g.call(this)),r,q=s.attr("className");
h.each(f,function(u,v){if(l[v]){s[v+"Class"](l[v])
}});
r=b(g.call(this));
s.attr("className",q);
s.animate(i(t,r),m,o,function(){h.each(f,function(u,v){if(l[v]){s[v+"Class"](l[v])
}});
if(typeof s.attr("style")=="object"){s.attr("style").cssText="";
s.attr("style").cssText=p
}else{s.attr("style",p)
}if(n){n.apply(this,arguments)
}})
})
};
h.fn.extend({_addClass:h.fn.addClass,addClass:function(m,l,o,n){return l?h.effects.animateClass.apply(this,[{add:m},l,o,n]):this._addClass(m)
},_removeClass:h.fn.removeClass,removeClass:function(m,l,o,n){return l?h.effects.animateClass.apply(this,[{remove:m},l,o,n]):this._removeClass(m)
},_toggleClass:h.fn.toggleClass,toggleClass:function(n,m,l,p,o){if(typeof m=="boolean"||m===e){if(!l){return this._toggleClass(n,m)
}else{return h.effects.animateClass.apply(this,[(m?{add:n}:{remove:n}),l,p,o])
}}else{return h.effects.animateClass.apply(this,[{toggle:n},m,l,p])
}},switchClass:function(l,n,m,p,o){return h.effects.animateClass.apply(this,[{add:n,remove:l},m,p,o])
}});
h.extend(h.effects,{version:"1.8.5",save:function(m,n){for(var l=0;
l<n.length;
l++){if(n[l]!==null){m.data("ec.storage."+n[l],m[0].style[n[l]])
}}},restore:function(m,n){for(var l=0;
l<n.length;
l++){if(n[l]!==null){m.css(n[l],m.data("ec.storage."+n[l]))
}}},setMode:function(l,m){if(m=="toggle"){m=l.is(":hidden")?"show":"hide"
}return m
},getBaseline:function(m,n){var o,l;
switch(m[0]){case"top":o=0;
break;
case"middle":o=0.5;
break;
case"bottom":o=1;
break;
default:o=m[0]/n.height
}switch(m[1]){case"left":l=0;
break;
case"center":l=0.5;
break;
case"right":l=1;
break;
default:l=m[1]/n.width
}return{x:l,y:o}
},createWrapper:function(l){if(l.parent().is(".ui-effects-wrapper")){return l.parent()
}var m={width:l.outerWidth(true),height:l.outerHeight(true),"float":l.css("float")},n=h("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
l.wrap(n);
n=l.parent();
if(l.css("position")=="static"){n.css({position:"relative"});
l.css({position:"relative"})
}else{h.extend(m,{position:l.css("position"),zIndex:l.css("z-index")});
h.each(["top","left","bottom","right"],function(o,p){m[p]=l.css(p);
if(isNaN(parseInt(m[p],10))){m[p]="auto"
}});
l.css({position:"relative",top:0,left:0})
}return n.css(m).show()
},removeWrapper:function(l){if(l.parent().is(".ui-effects-wrapper")){return l.parent().replaceWith(l)
}return l
},setTransition:function(m,o,l,n){n=n||{};
h.each(o,function(q,p){unit=m.cssUnit(p);
if(unit[0]>0){n[p]=unit[0]*l+unit[1]
}});
return n
}});
function d(m,l,n,o){if(typeof m=="object"){o=l;
n=null;
l=m;
m=l.effect
}if(h.isFunction(l)){o=l;
n=null;
l={}
}if(typeof l=="number"||h.fx.speeds[l]){o=n;
n=l;
l={}
}if(h.isFunction(n)){o=n;
n=null
}l=l||{};
n=n||l.duration;
n=h.fx.off?0:typeof n=="number"?n:h.fx.speeds[n]||h.fx.speeds._default;
o=o||l.complete;
return[m,l,n,o]
}h.fn.extend({effect:function(o,n,q,r){var m=d.apply(this,arguments),p={options:m[1],duration:m[2],callback:m[3]},l=h.effects[o];
return l&&!h.fx.off?l.call(this,p):this
},_show:h.fn.show,show:function(m){if(!m||typeof m=="number"||h.fx.speeds[m]||!h.effects[m]){return this._show.apply(this,arguments)
}else{var l=d.apply(this,arguments);
l[1].mode="show";
return this.effect.apply(this,l)
}},_hide:h.fn.hide,hide:function(m){if(!m||typeof m=="number"||h.fx.speeds[m]||!h.effects[m]){return this._hide.apply(this,arguments)
}else{var l=d.apply(this,arguments);
l[1].mode="hide";
return this.effect.apply(this,l)
}},__toggle:h.fn.toggle,toggle:function(m){if(!m||typeof m=="number"||h.fx.speeds[m]||!h.effects[m]||typeof m=="boolean"||h.isFunction(m)){return this.__toggle.apply(this,arguments)
}else{var l=d.apply(this,arguments);
l[1].mode="toggle";
return this.effect.apply(this,l)
}},cssUnit:function(l){var m=this.css(l),n=[];
h.each(["em","px","%","pt"],function(o,p){if(m.indexOf(p)>0){n=[parseFloat(m),p]
}});
return n
}});
h.easing.jswing=h.easing.swing;
h.extend(h.easing,{def:"easeOutQuad",swing:function(m,n,l,p,o){return h.easing[h.easing.def](m,n,l,p,o)
},easeInQuad:function(m,n,l,p,o){return p*(n/=o)*n+l
},easeOutQuad:function(m,n,l,p,o){return -p*(n/=o)*(n-2)+l
},easeInOutQuad:function(m,n,l,p,o){if((n/=o/2)<1){return p/2*n*n+l
}return -p/2*((--n)*(n-2)-1)+l
},easeInCubic:function(m,n,l,p,o){return p*(n/=o)*n*n+l
},easeOutCubic:function(m,n,l,p,o){return p*((n=n/o-1)*n*n+1)+l
},easeInOutCubic:function(m,n,l,p,o){if((n/=o/2)<1){return p/2*n*n*n+l
}return p/2*((n-=2)*n*n+2)+l
},easeInQuart:function(m,n,l,p,o){return p*(n/=o)*n*n*n+l
},easeOutQuart:function(m,n,l,p,o){return -p*((n=n/o-1)*n*n*n-1)+l
},easeInOutQuart:function(m,n,l,p,o){if((n/=o/2)<1){return p/2*n*n*n*n+l
}return -p/2*((n-=2)*n*n*n-2)+l
},easeInQuint:function(m,n,l,p,o){return p*(n/=o)*n*n*n*n+l
},easeOutQuint:function(m,n,l,p,o){return p*((n=n/o-1)*n*n*n*n+1)+l
},easeInOutQuint:function(m,n,l,p,o){if((n/=o/2)<1){return p/2*n*n*n*n*n+l
}return p/2*((n-=2)*n*n*n*n+2)+l
},easeInSine:function(m,n,l,p,o){return -p*Math.cos(n/o*(Math.PI/2))+p+l
},easeOutSine:function(m,n,l,p,o){return p*Math.sin(n/o*(Math.PI/2))+l
},easeInOutSine:function(m,n,l,p,o){return -p/2*(Math.cos(Math.PI*n/o)-1)+l
},easeInExpo:function(m,n,l,p,o){return(n==0)?l:p*Math.pow(2,10*(n/o-1))+l
},easeOutExpo:function(m,n,l,p,o){return(n==o)?l+p:p*(-Math.pow(2,-10*n/o)+1)+l
},easeInOutExpo:function(m,n,l,p,o){if(n==0){return l
}if(n==o){return l+p
}if((n/=o/2)<1){return p/2*Math.pow(2,10*(n-1))+l
}return p/2*(-Math.pow(2,-10*--n)+2)+l
},easeInCirc:function(m,n,l,p,o){return -p*(Math.sqrt(1-(n/=o)*n)-1)+l
},easeOutCirc:function(m,n,l,p,o){return p*Math.sqrt(1-(n=n/o-1)*n)+l
},easeInOutCirc:function(m,n,l,p,o){if((n/=o/2)<1){return -p/2*(Math.sqrt(1-n*n)-1)+l
}return p/2*(Math.sqrt(1-(n-=2)*n)+1)+l
},easeInElastic:function(m,o,l,v,u){var q=1.70158;
var r=0;
var n=v;
if(o==0){return l
}if((o/=u)==1){return l+v
}if(!r){r=u*0.3
}if(n<Math.abs(v)){n=v;
var q=r/4
}else{var q=r/(2*Math.PI)*Math.asin(v/n)
}return -(n*Math.pow(2,10*(o-=1))*Math.sin((o*u-q)*(2*Math.PI)/r))+l
},easeOutElastic:function(m,o,l,v,u){var q=1.70158;
var r=0;
var n=v;
if(o==0){return l
}if((o/=u)==1){return l+v
}if(!r){r=u*0.3
}if(n<Math.abs(v)){n=v;
var q=r/4
}else{var q=r/(2*Math.PI)*Math.asin(v/n)
}return n*Math.pow(2,-10*o)*Math.sin((o*u-q)*(2*Math.PI)/r)+v+l
},easeInOutElastic:function(m,o,l,v,u){var q=1.70158;
var r=0;
var n=v;
if(o==0){return l
}if((o/=u/2)==2){return l+v
}if(!r){r=u*(0.3*1.5)
}if(n<Math.abs(v)){n=v;
var q=r/4
}else{var q=r/(2*Math.PI)*Math.asin(v/n)
}if(o<1){return -0.5*(n*Math.pow(2,10*(o-=1))*Math.sin((o*u-q)*(2*Math.PI)/r))+l
}return n*Math.pow(2,-10*(o-=1))*Math.sin((o*u-q)*(2*Math.PI)/r)*0.5+v+l
},easeInBack:function(m,n,l,q,p,o){if(o==e){o=1.70158
}return q*(n/=p)*n*((o+1)*n-o)+l
},easeOutBack:function(m,n,l,q,p,o){if(o==e){o=1.70158
}return q*((n=n/p-1)*n*((o+1)*n+o)+1)+l
},easeInOutBack:function(m,n,l,q,p,o){if(o==e){o=1.70158
}if((n/=p/2)<1){return q/2*(n*n*(((o*=(1.525))+1)*n-o))+l
}return q/2*((n-=2)*n*(((o*=(1.525))+1)*n+o)+2)+l
},easeInBounce:function(m,n,l,p,o){return p-h.easing.easeOutBounce(m,o-n,0,p,o)+l
},easeOutBounce:function(m,n,l,p,o){if((n/=o)<(1/2.75)){return p*(7.5625*n*n)+l
}else{if(n<(2/2.75)){return p*(7.5625*(n-=(1.5/2.75))*n+0.75)+l
}else{if(n<(2.5/2.75)){return p*(7.5625*(n-=(2.25/2.75))*n+0.9375)+l
}else{return p*(7.5625*(n-=(2.625/2.75))*n+0.984375)+l
}}}},easeInOutBounce:function(m,n,l,p,o){if(n<o/2){return h.easing.easeInBounce(m,n*2,0,p,o)*0.5+l
}return h.easing.easeOutBounce(m,n*2-o,0,p,o)*0.5+p*0.5+l
}})
})(jQuery);
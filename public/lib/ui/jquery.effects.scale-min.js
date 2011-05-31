(function(a,b){a.effects.puff=function(c){return this.queue(function(){var g=a(this),h=a.effects.setMode(g,c.options.mode||"hide"),f=parseInt(c.options.percent,10)||150,e=f/100,d={height:g.height(),width:g.width()};
a.extend(c.options,{fade:true,mode:h,percent:h=="hide"?f:100,from:h=="hide"?d:{height:d.height*e,width:d.width*e}});
g.effect("scale",c.options,c.duration,c.callback);
g.dequeue()
})
};
a.effects.scale=function(c){return this.queue(function(){var h=a(this);
var e=a.extend(true,{},c.options);
var k=a.effects.setMode(h,c.options.mode||"effect");
var i=parseInt(c.options.percent,10)||(parseInt(c.options.percent,10)==0?0:(k=="hide"?0:100));
var j=c.options.direction||"both";
var d=c.options.origin;
if(k!="effect"){e.origin=d||["middle","center"];
e.restore=true
}var g={height:h.height(),width:h.width()};
h.from=c.options.from||(k=="show"?{height:0,width:0}:g);
var f={y:j!="horizontal"?(i/100):1,x:j!="vertical"?(i/100):1};
h.to={height:g.height*f.y,width:g.width*f.x};
if(c.options.fade){if(k=="show"){h.from.opacity=0;
h.to.opacity=1
}if(k=="hide"){h.from.opacity=1;
h.to.opacity=0
}}e.from=h.from;
e.to=h.to;
e.mode=k;
h.effect("size",e,c.duration,c.callback);
h.dequeue()
})
};
a.effects.size=function(c){return this.queue(function(){var d=a(this),o=["position","top","left","width","height","overflow","opacity"];
var n=["position","top","left","overflow","opacity"];
var k=["width","height","overflow"];
var q=["fontSize"];
var l=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var g=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var h=a.effects.setMode(d,c.options.mode||"effect");
var j=c.options.restore||false;
var f=c.options.scale||"both";
var p=c.options.origin;
var e={height:d.height(),width:d.width()};
d.from=c.options.from||e;
d.to=c.options.to||e;
if(p){var i=a.effects.getBaseline(p,e);
d.from.top=(e.height-d.from.height)*i.y;
d.from.left=(e.width-d.from.width)*i.x;
d.to.top=(e.height-d.to.height)*i.y;
d.to.left=(e.width-d.to.width)*i.x
}var m={from:{y:d.from.height/e.height,x:d.from.width/e.width},to:{y:d.to.height/e.height,x:d.to.width/e.width}};
if(f=="box"||f=="both"){if(m.from.y!=m.to.y){o=o.concat(l);
d.from=a.effects.setTransition(d,l,m.from.y,d.from);
d.to=a.effects.setTransition(d,l,m.to.y,d.to)
}if(m.from.x!=m.to.x){o=o.concat(g);
d.from=a.effects.setTransition(d,g,m.from.x,d.from);
d.to=a.effects.setTransition(d,g,m.to.x,d.to)
}}if(f=="content"||f=="both"){if(m.from.y!=m.to.y){o=o.concat(q);
d.from=a.effects.setTransition(d,q,m.from.y,d.from);
d.to=a.effects.setTransition(d,q,m.to.y,d.to)
}}a.effects.save(d,j?o:n);
d.show();
a.effects.createWrapper(d);
d.css("overflow","hidden").css(d.from);
if(f=="content"||f=="both"){l=l.concat(["marginTop","marginBottom"]).concat(q);
g=g.concat(["marginLeft","marginRight"]);
k=o.concat(l).concat(g);
d.find("*[width]").each(function(){child=a(this);
if(j){a.effects.save(child,k)
}var r={height:child.height(),width:child.width()};
child.from={height:r.height*m.from.y,width:r.width*m.from.x};
child.to={height:r.height*m.to.y,width:r.width*m.to.x};
if(m.from.y!=m.to.y){child.from=a.effects.setTransition(child,l,m.from.y,child.from);
child.to=a.effects.setTransition(child,l,m.to.y,child.to)
}if(m.from.x!=m.to.x){child.from=a.effects.setTransition(child,g,m.from.x,child.from);
child.to=a.effects.setTransition(child,g,m.to.x,child.to)
}child.css(child.from);
child.animate(child.to,c.duration,c.options.easing,function(){if(j){a.effects.restore(child,k)
}})
})
}d.animate(d.to,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){if(d.to.opacity===0){d.css("opacity",d.from.opacity)
}if(h=="hide"){d.hide()
}a.effects.restore(d,j?o:n);
a.effects.removeWrapper(d);
if(c.callback){c.callback.apply(this,arguments)
}d.dequeue()
}})
})
}
})(jQuery);
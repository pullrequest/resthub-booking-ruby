(function(a,b){a.effects.fold=function(c){return this.queue(function(){var f=a(this),l=["position","top","left"];
var i=a.effects.setMode(f,c.options.mode||"hide");
var p=c.options.size||15;
var o=!(!c.options.horizFirst);
var h=c.duration?c.duration/2:a.fx.speeds._default/2;
a.effects.save(f,l);
f.show();
var e=a.effects.createWrapper(f).css({overflow:"hidden"});
var j=((i=="show")!=o);
var g=j?["width","height"]:["height","width"];
var d=j?[e.width(),e.height()]:[e.height(),e.width()];
var k=/([0-9]+)%/.exec(p);
if(k){p=parseInt(k[1],10)/100*d[i=="hide"?0:1]
}if(i=="show"){e.css(o?{height:0,width:p}:{height:p,width:0})
}var n={},m={};
n[g[0]]=i=="show"?d[0]:p;
m[g[1]]=i=="show"?d[1]:0;
e.animate(n,h,c.options.easing).animate(m,h,c.options.easing,function(){if(i=="hide"){f.hide()
}a.effects.restore(f,l);
a.effects.removeWrapper(f);
if(c.callback){c.callback.apply(f[0],arguments)
}f.dequeue()
})
})
}
})(jQuery);
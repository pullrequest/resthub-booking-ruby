(function(a,b){a.effects.shake=function(c){return this.queue(function(){var f=a(this),m=["position","top","left"];
var l=a.effects.setMode(f,c.options.mode||"effect");
var o=c.options.direction||"left";
var d=c.options.distance||20;
var e=c.options.times||3;
var h=c.duration||c.options.duration||140;
a.effects.save(f,m);
f.show();
a.effects.createWrapper(f);
var g=(o=="up"||o=="down")?"top":"left";
var q=(o=="up"||o=="left")?"pos":"neg";
var j={},p={},n={};
j[g]=(q=="pos"?"-=":"+=")+d;
p[g]=(q=="pos"?"+=":"-=")+d*2;
n[g]=(q=="pos"?"-=":"+=")+d*2;
f.animate(j,h,c.options.easing);
for(var k=1;
k<e;
k++){f.animate(p,h,c.options.easing).animate(n,h,c.options.easing)
}f.animate(p,h,c.options.easing).animate(j,h/2,c.options.easing,function(){a.effects.restore(f,m);
a.effects.removeWrapper(f);
if(c.callback){c.callback.apply(this,arguments)
}});
f.queue("fx",function(){f.dequeue()
});
f.dequeue()
})
}
})(jQuery);
(function(a,b){a.effects.bounce=function(c){return this.queue(function(){var f=a(this),m=["position","top","left"];
var l=a.effects.setMode(f,c.options.mode||"effect");
var o=c.options.direction||"up";
var d=c.options.distance||20;
var e=c.options.times||5;
var h=c.duration||250;
if(/show|hide/.test(l)){m.push("opacity")
}a.effects.save(f,m);
f.show();
a.effects.createWrapper(f);
var g=(o=="up"||o=="down")?"top":"left";
var q=(o=="up"||o=="left")?"pos":"neg";
var d=c.options.distance||(g=="top"?f.outerHeight({margin:true})/3:f.outerWidth({margin:true})/3);
if(l=="show"){f.css("opacity",0).css(g,q=="pos"?-d:d)
}if(l=="hide"){d=d/(e*2)
}if(l!="hide"){e--
}if(l=="show"){var j={opacity:1};
j[g]=(q=="pos"?"+=":"-=")+d;
f.animate(j,h/2,c.options.easing);
d=d/2;
e--
}for(var k=0;
k<e;
k++){var p={},n={};
p[g]=(q=="pos"?"-=":"+=")+d;
n[g]=(q=="pos"?"+=":"-=")+d;
f.animate(p,h/2,c.options.easing).animate(n,h/2,c.options.easing);
d=(l=="hide")?d*2:d/2
}if(l=="hide"){var j={opacity:0};
j[g]=(q=="pos"?"-=":"+=")+d;
f.animate(j,h/2,c.options.easing,function(){f.hide();
a.effects.restore(f,m);
a.effects.removeWrapper(f);
if(c.callback){c.callback.apply(this,arguments)
}})
}else{var p={},n={};
p[g]=(q=="pos"?"-=":"+=")+d;
n[g]=(q=="pos"?"+=":"-=")+d;
f.animate(p,h/2,c.options.easing).animate(n,h/2,c.options.easing,function(){a.effects.restore(f,m);
a.effects.removeWrapper(f);
if(c.callback){c.callback.apply(this,arguments)
}})
}f.queue("fx",function(){f.dequeue()
});
f.dequeue()
})
}
})(jQuery);
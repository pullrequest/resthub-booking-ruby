(function(a,b){a.effects.clip=function(c){return this.queue(function(){var g=a(this),k=["position","top","left","height","width"];
var j=a.effects.setMode(g,c.options.mode||"hide");
var l=c.options.direction||"vertical";
a.effects.save(g,k);
g.show();
var d=a.effects.createWrapper(g).css({overflow:"hidden"});
var f=g[0].tagName=="IMG"?d:g;
var h={size:(l=="vertical")?"height":"width",position:(l=="vertical")?"top":"left"};
var e=(l=="vertical")?f.height():f.width();
if(j=="show"){f.css(h.size,0);
f.css(h.position,e/2)
}var i={};
i[h.size]=j=="show"?e:0;
i[h.position]=j=="show"?0:e/2;
f.animate(i,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){if(j=="hide"){g.hide()
}a.effects.restore(g,k);
a.effects.removeWrapper(g);
if(c.callback){c.callback.apply(g[0],arguments)
}g.dequeue()
}})
})
}
})(jQuery);
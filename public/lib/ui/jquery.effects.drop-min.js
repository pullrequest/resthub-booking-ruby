(function(a,b){a.effects.drop=function(c){return this.queue(function(){var f=a(this),e=["position","top","left","opacity"];
var j=a.effects.setMode(f,c.options.mode||"hide");
var i=c.options.direction||"left";
a.effects.save(f,e);
f.show();
a.effects.createWrapper(f);
var g=(i=="up"||i=="down")?"top":"left";
var d=(i=="up"||i=="left")?"pos":"neg";
var k=c.options.distance||(g=="top"?f.outerHeight({margin:true})/2:f.outerWidth({margin:true})/2);
if(j=="show"){f.css("opacity",0).css(g,d=="pos"?-k:k)
}var h={opacity:j=="show"?1:0};
h[g]=(j=="show"?(d=="pos"?"+=":"-="):(d=="pos"?"-=":"+="))+k;
f.animate(h,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){if(j=="hide"){f.hide()
}a.effects.restore(f,e);
a.effects.removeWrapper(f);
if(c.callback){c.callback.apply(this,arguments)
}f.dequeue()
}})
})
}
})(jQuery);
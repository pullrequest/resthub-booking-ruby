(function(a,b){a.effects.pulsate=function(c){return this.queue(function(){var e=a(this),f=a.effects.setMode(e,c.options.mode||"show");
times=((c.options.times||5)*2)-1;
duration=c.duration?c.duration/2:a.fx.speeds._default/2,isVisible=e.is(":visible"),animateTo=0;
if(!isVisible){e.css("opacity",0).show();
animateTo=1
}if((f=="hide"&&isVisible)||(f=="show"&&!isVisible)){times--
}for(var d=0;
d<times;
d++){e.animate({opacity:animateTo},duration,c.options.easing);
animateTo=(animateTo+1)%2
}e.animate({opacity:animateTo},duration,c.options.easing,function(){if(animateTo==0){e.hide()
}(c.callback&&c.callback.apply(this,arguments))
});
e.queue("fx",function(){e.dequeue()
}).dequeue()
})
}
})(jQuery);
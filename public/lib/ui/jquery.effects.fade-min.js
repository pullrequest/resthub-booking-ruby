(function(a,b){a.effects.fade=function(c){return this.queue(function(){var d=a(this),e=a.effects.setMode(d,c.options.mode||"hide");
d.animate({opacity:e},{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){(c.callback&&c.callback.apply(this,arguments));
d.dequeue()
}})
})
}
})(jQuery);
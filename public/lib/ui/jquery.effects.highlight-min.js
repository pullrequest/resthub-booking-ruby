(function(a,b){a.effects.highlight=function(c){return this.queue(function(){var e=a(this),d=["backgroundImage","backgroundColor","opacity"],g=a.effects.setMode(e,c.options.mode||"show"),f={backgroundColor:e.css("backgroundColor")};
if(g=="hide"){f.opacity=0
}a.effects.save(e,d);
e.show().css({backgroundImage:"none",backgroundColor:c.options.color||"#ffff99"}).animate(f,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){(g=="hide"&&e.hide());
a.effects.restore(e,d);
(g=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"));
(c.callback&&c.callback.apply(this,arguments));
e.dequeue()
}})
})
}
})(jQuery);
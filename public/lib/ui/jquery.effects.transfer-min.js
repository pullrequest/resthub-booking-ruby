(function(a,b){a.effects.transfer=function(c){return this.queue(function(){var g=a(this),i=a(c.options.to),f=i.offset(),h={top:f.top,left:f.left,height:i.innerHeight(),width:i.innerWidth()},e=g.offset(),d=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({top:e.top,left:e.left,height:g.innerHeight(),width:g.innerWidth(),position:"absolute"}).animate(h,c.duration,c.options.easing,function(){d.remove();
(c.callback&&c.callback.apply(g[0],arguments));
g.dequeue()
})
})
}
})(jQuery);
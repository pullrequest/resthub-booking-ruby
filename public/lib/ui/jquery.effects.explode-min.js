(function(a,b){a.effects.explode=function(c){return this.queue(function(){var l=c.options.pieces?Math.round(Math.sqrt(c.options.pieces)):3;
var f=c.options.pieces?Math.round(Math.sqrt(c.options.pieces)):3;
c.options.mode=c.options.mode=="toggle"?(a(this).is(":visible")?"hide":"show"):c.options.mode;
var k=a(this).show().css("visibility","hidden");
var m=k.offset();
m.top-=parseInt(k.css("marginTop"),10)||0;
m.left-=parseInt(k.css("marginLeft"),10)||0;
var h=k.outerWidth(true);
var d=k.outerHeight(true);
for(var g=0;
g<l;
g++){for(var e=0;
e<f;
e++){k.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-e*(h/f),top:-g*(d/l)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h/f,height:d/l,left:m.left+e*(h/f)+(c.options.mode=="show"?(e-Math.floor(f/2))*(h/f):0),top:m.top+g*(d/l)+(c.options.mode=="show"?(g-Math.floor(l/2))*(d/l):0),opacity:c.options.mode=="show"?0:1}).animate({left:m.left+e*(h/f)+(c.options.mode=="show"?0:(e-Math.floor(f/2))*(h/f)),top:m.top+g*(d/l)+(c.options.mode=="show"?0:(g-Math.floor(l/2))*(d/l)),opacity:c.options.mode=="show"?1:0},c.duration||500)
}}setTimeout(function(){c.options.mode=="show"?k.css({visibility:"visible"}):k.css({visibility:"visible"}).hide();
if(c.callback){c.callback.apply(k[0])
}k.dequeue();
a("div.ui-effects-explode").remove()
},c.duration||500)
})
}
})(jQuery);
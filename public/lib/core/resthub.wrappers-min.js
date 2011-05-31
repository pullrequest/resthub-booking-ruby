(function(c){var b=c.ajax;
var d={error:function(g,e,f){if(g.responseText&&g.responseText.substring(0,6)!="<html>"&&g.status>=300){c.pnotify({pnotify_title:"Error "+g.status,pnotify_text:g.responseText,pnotify_type:"error"})
}else{if(g.status<400){c.pnotify({pnotify_title:"Information",pnotify_text:g.statusText})
}if(g.status>=400&&g.status<500){c.pnotify({pnotify_title:"Client error "+g.status,pnotify_text:g.statusText,pnotify_type:"error"})
}if(g.status>=500&&g.status<600){c.pnotify({pnotify_title:"Server error "+g.status,pnotify_text:g.statusText,pnotify_type:"error"})
}}}};
c.ajax=function(e){var f=jQuery.extend(true,{},d,e);
b(f)
};
var a={get:Sammy.Application.prototype.get,set:Sammy.Application.prototype.set,post:Sammy.Application.prototype.post,del:Sammy.Application.prototype.del,any:Sammy.Application.prototype.any};
Sammy.Application.prototype.get=function(f,h,e){var g=function(){return function(){if(e==undefined){h.apply(this,arguments)
}else{var i=this;
var j=arguments;
dominoes(e,function(){return function(){h.apply(this,arguments);
this.trigger("event-context-after-lazy",{context:this})
}.apply(i,j)
})
}}.apply(this,arguments)
};
a.get.apply(this,[f,g])
};
Sammy.Application.prototype.set=function(f,h,e){var g=function(){return function(){if(e==undefined){h.apply(this,arguments)
}else{var i=this;
var j=arguments;
dominoes(e,function(){return function(){h.apply(this,arguments);
this.trigger("event-context-after-lazy",{context:this})
}.apply(i,j)
})
}}.apply(this,arguments)
};
a.set.apply(this,[f,g])
};
Sammy.Application.prototype.post=function(f,h,e){var g=function(){return function(){if(e==undefined){h.apply(this,arguments)
}else{var i=this;
var j=arguments;
dominoes(e,function(){return function(){h.apply(this,arguments);
this.trigger("event-context-after-lazy",{context:this})
}.apply(i,j)
})
}}.apply(this,arguments)
};
a.post.apply(this,[f,g])
};
Sammy.Application.prototype.del=function(f,h,e){var g=function(){return function(){if(e==undefined){h.apply(this,arguments)
}else{var i=this;
var j=arguments;
dominoes(e,function(){return function(){h.apply(this,arguments);
this.trigger("event-context-after-lazy",{context:this})
}.apply(i,j)
})
}}.apply(this,arguments)
};
a.del.apply(this,[f,g])
};
Sammy.Application.prototype.any=function(f,h,e){var g=function(){return function(){if(e==undefined){h.apply(this,arguments)
}else{var i=this;
var j=arguments;
dominoes(e,function(){return function(){h.apply(this,arguments);
this.trigger("event-context-after-lazy",{context:this})
}.apply(i,j)
})
}}.apply(this,arguments)
};
a.any.apply(this,[f,g])
}
})(jQuery);
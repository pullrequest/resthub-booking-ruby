(function(a){if(!EJS){throw ("EJS is required")
}if(a.render||a.fn.render){throw ("jQuery.render or jquery.fn.render already loaded")
}a.render=function(d,g,c){var e,f,b,h;
e=a.extend({},a.render.defaults,c);
f=(e.templatePrefix||"")+d;
b={url:f,ext:e.ext,cache:e.cache,text:e.text};
h=new EJS(b).render(g);
return a(h)
};
a.render.defaults={templatePrefix:undefined,ext:".html",cache:true};
a.fn.render=function(c,d,b){var e;
e=a.render(c,d,b);
return this.each(function(){a(this).empty().append(e.clone())
})
}
}(jQuery));
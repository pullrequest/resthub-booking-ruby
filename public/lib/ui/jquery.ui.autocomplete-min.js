(function(a,b){a.widget("ui.autocomplete",{options:{appendTo:"body",delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},_create:function(){var c=this,d=this.element[0].ownerDocument;
this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(e){if(c.options.disabled){return
}var f=a.ui.keyCode;
switch(e.keyCode){case f.PAGE_UP:c._move("previousPage",e);
break;
case f.PAGE_DOWN:c._move("nextPage",e);
break;
case f.UP:c._move("previous",e);
e.preventDefault();
break;
case f.DOWN:c._move("next",e);
e.preventDefault();
break;
case f.ENTER:case f.NUMPAD_ENTER:if(c.menu.element.is(":visible")){e.preventDefault()
}case f.TAB:if(!c.menu.active){return
}c.menu.select(e);
break;
case f.ESCAPE:c.element.val(c.term);
c.close(e);
break;
default:clearTimeout(c.searching);
c.searching=setTimeout(function(){if(c.term!=c.element.val()){c.selectedItem=null;
c.search(null,e)
}},c.options.delay);
break
}}).bind("focus.autocomplete",function(){if(c.options.disabled){return
}c.selectedItem=null;
c.previous=c.element.val()
}).bind("blur.autocomplete",function(e){if(c.options.disabled){return
}clearTimeout(c.searching);
c.closing=setTimeout(function(){c.close(e);
c._change(e)
},150)
});
this._initSource();
this.response=function(){return c._response.apply(c,arguments)
};
this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",d)[0]).mousedown(function(e){var f=c.menu.element[0];
if(e.target===f){setTimeout(function(){a(document).one("mousedown",function(g){if(g.target!==c.element[0]&&g.target!==f&&!a.ui.contains(f,g.target)){c.close()
}})
},1)
}setTimeout(function(){clearTimeout(c.closing)
},13)
}).menu({focus:function(f,g){var e=g.item.data("item.autocomplete");
if(false!==c._trigger("focus",null,{item:e})){if(/^key/.test(f.originalEvent.type)){c.element.val(e.value)
}}},selected:function(g,h){var f=h.item.data("item.autocomplete"),e=c.previous;
if(c.element[0]!==d.activeElement){c.element.focus();
c.previous=e
}if(false!==c._trigger("select",g,{item:f})){c.term=f.value;
c.element.val(f.value)
}c.close(g);
c.selectedItem=f
},blur:function(e,f){if(c.menu.element.is(":visible")&&(c.element.val()!==c.term)){c.element.val(c.term)
}}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
if(a.fn.bgiframe){this.menu.element.bgiframe()
}},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();
a.Widget.prototype.destroy.call(this)
},_setOption:function(c,d){a.Widget.prototype._setOption.apply(this,arguments);
if(c==="source"){this._initSource()
}if(c==="appendTo"){this.menu.element.appendTo(a(d||"body",this.element[0].ownerDocument)[0])
}},_initSource:function(){var c=this,e,d;
if(a.isArray(this.options.source)){e=this.options.source;
this.source=function(g,f){f(a.ui.autocomplete.filter(e,g.term))
}
}else{if(typeof this.options.source==="string"){d=this.options.source;
this.source=function(g,f){if(c.xhr){c.xhr.abort()
}c.xhr=a.getJSON(d,g,function(i,h,j){if(j===c.xhr){f(i)
}c.xhr=null
})
}
}else{this.source=this.options.source
}}},search:function(d,c){d=d!=null?d:this.element.val();
this.term=this.element.val();
if(d.length<this.options.minLength){return this.close(c)
}clearTimeout(this.closing);
if(this._trigger("search")===false){return
}return this._search(d)
},_search:function(c){this.element.addClass("ui-autocomplete-loading");
this.source({term:c},this.response)
},_response:function(c){if(c.length){c=this._normalize(c);
this._suggest(c);
this._trigger("open")
}else{this.close()
}this.element.removeClass("ui-autocomplete-loading")
},close:function(c){clearTimeout(this.closing);
if(this.menu.element.is(":visible")){this._trigger("close",c);
this.menu.element.hide();
this.menu.deactivate()
}},_change:function(c){if(this.previous!==this.element.val()){this._trigger("change",c,{item:this.selectedItem})
}},_normalize:function(c){if(c.length&&c[0].label&&c[0].value){return c
}return a.map(c,function(d){if(typeof d==="string"){return{label:d,value:d}
}return a.extend({label:d.label||d.value,value:d.value||d.label},d)
})
},_suggest:function(c){var d=this.menu.element.empty().zIndex(this.element.zIndex()+1),e,f;
this._renderMenu(d,c);
this.menu.deactivate();
this.menu.refresh();
this.menu.element.show().position(a.extend({of:this.element},this.options.position));
e=d.width("").outerWidth();
f=this.element.outerWidth();
d.outerWidth(Math.max(e,f))
},_renderMenu:function(e,d){var c=this;
a.each(d,function(f,g){c._renderItem(e,g)
})
},_renderItem:function(c,d){return a("<li></li>").data("item.autocomplete",d).append(a("<a></a>").text(d.label)).appendTo(c)
},_move:function(d,c){if(!this.menu.element.is(":visible")){this.search(null,c);
return
}if(this.menu.first()&&/^previous/.test(d)||this.menu.last()&&/^next/.test(d)){this.element.val(this.term);
this.menu.deactivate();
return
}this.menu[d](c)
},widget:function(){return this.menu.element
}});
a.extend(a.ui.autocomplete,{escapeRegex:function(c){return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(e,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");
return a.grep(e,function(f){return d.test(f.label||f.value||f)
})
}})
}(jQuery));
(function(a){a.widget("ui.menu",{_create:function(){var b=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(!a(c.target).closest(".ui-menu-item a").length){return
}c.preventDefault();
b.select(c)
});
this.refresh()
},refresh:function(){var c=this;
var b=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");
b.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(d){c.activate(d,a(this).parent())
}).mouseleave(function(){c.deactivate()
})
},activate:function(e,d){this.deactivate();
if(this.hasScroll()){var f=d.offset().top-this.element.offset().top,b=this.element.attr("scrollTop"),c=this.element.height();
if(f<0){this.element.attr("scrollTop",b+f)
}else{if(f>=c){this.element.attr("scrollTop",b+f-c+d.height())
}}}this.active=d.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();
this._trigger("focus",e,{item:d})
},deactivate:function(){if(!this.active){return
}this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");
this.active=null
},next:function(b){this.move("next",".ui-menu-item:first",b)
},previous:function(b){this.move("prev",".ui-menu-item:last",b)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(e,d,c){if(!this.active){this.activate(c,this.element.children(d));
return
}var b=this.active[e+"All"](".ui-menu-item").eq(0);
if(b.length){this.activate(c,b)
}else{this.activate(c,this.element.children(d))
}},nextPage:function(d){if(this.hasScroll()){if(!this.active||this.last()){this.activate(d,this.element.children(":first"));
return
}var e=this.active.offset().top,c=this.element.height(),b=this.element.children("li").filter(function(){var f=a(this).offset().top-e-c+a(this).height();
return f<10&&f>-10
});
if(!b.length){b=this.element.children(":last")
}this.activate(d,b)
}else{this.activate(d,this.element.children(!this.active||this.last()?":first":":last"))
}},previousPage:function(c){if(this.hasScroll()){if(!this.active||this.first()){this.activate(c,this.element.children(":last"));
return
}var d=this.active.offset().top,b=this.element.height();
result=this.element.children("li").filter(function(){var e=a(this).offset().top-d+b-a(this).height();
return e<10&&e>-10
});
if(!result.length){result=this.element.children(":first")
}this.activate(c,result)
}else{this.activate(c,this.element.children(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element.attr("scrollHeight")
},select:function(b){this._trigger("selected",b,{item:this.active})
}})
}(jQuery));
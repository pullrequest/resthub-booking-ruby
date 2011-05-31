/*
 * jQuery UI Widget 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,d){if(b.cleanData){var c=b.cleanData;
b.cleanData=function(e){for(var f=0,g;
(g=e[f])!=null;
f++){b(g).triggerHandler("remove")
}c(e)
}
}else{var a=b.fn.remove;
b.fn.remove=function(e,f){return this.each(function(){if(!f){if(!e||b.filter(e,[this]).length){b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")
})
}}return a.call(b(this),e,f)
})
}
}b.widget=function(f,h,e){var g=f.split(".")[0],j;
f=f.split(".")[1];
j=g+"-"+f;
if(!e){e=h;
h=b.Widget
}b.expr[":"][j]=function(k){return !!b.data(k,f)
};
b[g]=b[g]||{};
b[g][f]=function(k,l){if(arguments.length){this._createWidget(k,l)
}};
var i=new h();
i.options=b.extend(true,{},i.options);
b[g][f].prototype=b.extend(true,i,{namespace:g,widgetName:f,widgetEventPrefix:b[g][f].prototype.widgetEventPrefix||f,widgetBaseClass:j},e);
b.widget.bridge(f,b[g][f])
};
b.widget.bridge=function(f,e){b.fn[f]=function(i){var g=typeof i==="string",h=Array.prototype.slice.call(arguments,1),j=this;
i=!g&&h.length?b.extend.apply(null,[true,i].concat(h)):i;
if(g&&i.substring(0,1)==="_"){return j
}if(g){this.each(function(){var k=b.data(this,f);
if(!k){throw"cannot call methods on "+f+" prior to initialization; attempted to call method '"+i+"'"
}if(!b.isFunction(k[i])){throw"no such method '"+i+"' for "+f+" widget instance"
}var l=k[i].apply(k,h);
if(l!==k&&l!==d){j=l;
return false
}})
}else{this.each(function(){var k=b.data(this,f);
if(k){k.option(i||{})._init()
}else{b.data(this,f,new e(i,this))
}})
}return j
}
};
b.Widget=function(e,f){if(arguments.length){this._createWidget(e,f)
}};
b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(f,g){b.data(g,this.widgetName,this);
this.element=b(g);
this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(g)[this.widgetName],f);
var e=this;
this.element.bind("remove."+this.widgetName,function(){e.destroy()
});
this._create();
this._init()
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(g,h){var f=g,e=this;
if(arguments.length===0){return b.extend({},e.options)
}if(typeof g==="string"){if(h===d){return this.options[g]
}f={};
f[g]=h
}b.each(f,function(i,j){e._setOption(i,j)
});
return e
},_setOption:function(e,f){this.options[e]=f;
if(e==="disabled"){this.widget()[f?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",f)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(f,g,h){var k=this.options[f];
g=b.Event(g);
g.type=(f===this.widgetEventPrefix?f:this.widgetEventPrefix+f).toLowerCase();
h=h||{};
if(g.originalEvent){for(var e=b.event.props.length,j;
e;
){j=b.event.props[--e];
g[j]=g.originalEvent[j]
}}this.element.trigger(g,h);
return !(b.isFunction(k)&&k.call(this.element[0],g,h)===false||g.isDefaultPrevented())
}}
})(jQuery);
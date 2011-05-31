/*
 * jQuery UI 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a,c){a.ui=a.ui||{};
if(a.ui.version){return
}a.extend(a.ui,{version:"1.8.5",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
a.fn.extend({_focus:a.fn.focus,focus:function(d,e){return typeof d==="number"?this.each(function(){var f=this;
setTimeout(function(){a(f).focus();
if(e){e.call(f)
}},d)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var d;
if((a.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){d=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(a.curCSS(this,"position",1))&&(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))
}).eq(0)
}else{d=this.parents().filter(function(){return(/(auto|scroll)/).test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!d.length?a(document):d
},zIndex:function(g){if(g!==c){return this.css("zIndex",g)
}if(this.length){var e=a(this[0]),d,f;
while(e.length&&e[0]!==document){d=e.css("position");
if(d==="absolute"||d==="relative"||d==="fixed"){f=parseInt(e.css("zIndex"));
if(!isNaN(f)&&f!=0){return f
}}e=e.parent()
}}return 0
},disableSelection:function(){return this.bind("mousedown.ui-disableSelection selectstart.ui-disableSelection",function(d){d.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
a.each(["Width","Height"],function(f,d){var e=d==="Width"?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),j={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};
function h(l,k,i,m){a.each(e,function(){k-=parseFloat(a.curCSS(l,"padding"+this,true))||0;
if(i){k-=parseFloat(a.curCSS(l,"border"+this+"Width",true))||0
}if(m){k-=parseFloat(a.curCSS(l,"margin"+this,true))||0
}});
return k
}a.fn["inner"+d]=function(i){if(i===c){return j["inner"+d].call(this)
}return this.each(function(){a.style(this,g,h(this,i)+"px")
})
};
a.fn["outer"+d]=function(i,k){if(typeof i!=="number"){return j["outer"+d].call(this,i)
}return this.each(function(){a.style(this,g,h(this,i,true,k)+"px")
})
}
});
function b(d){return !a(d).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)
}).length
}a.extend(a.expr[":"],{data:function(f,e,d){return !!a.data(f,d[3])
},focusable:function(f){var i=f.nodeName.toLowerCase(),d=a.attr(f,"tabindex");
if("area"===i){var h=f.parentNode,g=h.name,e;
if(!f.href||!g||h.nodeName.toLowerCase()!=="map"){return false
}e=a("img[usemap=#"+g+"]")[0];
return !!e&&b(e)
}return(/input|select|textarea|button|object/.test(i)?!f.disabled:"a"==i?f.href||!isNaN(d):!isNaN(d))&&b(f)
},tabbable:function(e){var d=a.attr(e,"tabindex");
return(isNaN(d)||d>=0)&&a(e).is(":focusable")
}});
a(function(){var e=document.createElement("div"),d=document.body;
a.extend(e.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
a.support.minHeight=d.appendChild(e).offsetHeight===100;
d.removeChild(e).style.display="none"
});
a.extend(a.ui,{plugin:{add:function(e,f,h){var g=a.ui[e].prototype;
for(var d in h){g.plugins[d]=g.plugins[d]||[];
g.plugins[d].push([f,h[d]])
}},call:function(d,f,e){var h=d.plugins[f];
if(!h||!d.element[0].parentNode){return
}for(var g=0;
g<h.length;
g++){if(d.options[h[g][0]]){h[g][1].apply(d.element,e)
}}}},contains:function(e,d){return document.compareDocumentPosition?e.compareDocumentPosition(d)&16:e!==d&&e.contains(d)
},hasScroll:function(g,e){if(a(g).css("overflow")==="hidden"){return false
}var d=(e&&e==="left")?"scrollLeft":"scrollTop",f=false;
if(g[d]>0){return true
}g[d]=1;
f=(g[d]>0);
g[d]=0;
return f
},isOverAxis:function(e,d,f){return(e>d)&&(e<(d+f))
},isOver:function(i,e,h,g,d,f){return a.ui.isOverAxis(i,h,d)&&a.ui.isOverAxis(e,g,f)
}})
})(jQuery);
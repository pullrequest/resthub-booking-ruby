(function(a,b){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var c=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var d;
this.refresh=function(){d=a(c.options.filter,c.element[0]);
d.each(function(){var e=a(this);
var f=e.offset();
a.data(this,"selectable-item",{element:this,$element:e,left:f.left,top:f.top,right:f.left+e.outerWidth(),bottom:f.top+e.outerHeight(),startselected:false,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=d.addClass("ui-selectee");
this._mouseInit();
this.helper=a("<div class='ui-selectable-helper'></div>")
},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy();
return this
},_mouseStart:function(e){var c=this;
this.opos=[e.pageX,e.pageY];
if(this.options.disabled){return
}var d=this.options;
this.selectees=a(d.filter,this.element[0]);
this._trigger("start",e);
a(d.appendTo).append(this.helper);
this.helper.css({left:e.clientX,top:e.clientY,width:0,height:0});
if(d.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var f=a.data(this,"selectable-item");
f.startselected=true;
if(!e.metaKey){f.$element.removeClass("ui-selected");
f.selected=false;
f.$element.addClass("ui-unselecting");
f.unselecting=true;
c._trigger("unselecting",e,{unselecting:f.element})
}});
a(e.target).parents().andSelf().each(function(){var g=a.data(this,"selectable-item");
if(g){var f=!e.metaKey||!g.$element.hasClass("ui-selected");
g.$element.removeClass(f?"ui-unselecting":"ui-selected").addClass(f?"ui-selecting":"ui-unselecting");
g.unselecting=!f;
g.selecting=f;
g.selected=f;
if(f){c._trigger("selecting",e,{selecting:g.element})
}else{c._trigger("unselecting",e,{unselecting:g.element})
}return false
}})
},_mouseDrag:function(j){var d=this;
this.dragged=true;
if(this.options.disabled){return
}var f=this.options;
var e=this.opos[0],i=this.opos[1],c=j.pageX,h=j.pageY;
if(e>c){var g=c;
c=e;
e=g
}if(i>h){var g=h;
h=i;
i=g
}this.helper.css({left:e,top:i,width:c-e,height:h-i});
this.selectees.each(function(){var k=a.data(this,"selectable-item");
if(!k||k.element==d.element[0]){return
}var l=false;
if(f.tolerance=="touch"){l=(!(k.left>c||k.right<e||k.top>h||k.bottom<i))
}else{if(f.tolerance=="fit"){l=(k.left>e&&k.right<c&&k.top>i&&k.bottom<h)
}}if(l){if(k.selected){k.$element.removeClass("ui-selected");
k.selected=false
}if(k.unselecting){k.$element.removeClass("ui-unselecting");
k.unselecting=false
}if(!k.selecting){k.$element.addClass("ui-selecting");
k.selecting=true;
d._trigger("selecting",j,{selecting:k.element})
}}else{if(k.selecting){if(j.metaKey&&k.startselected){k.$element.removeClass("ui-selecting");
k.selecting=false;
k.$element.addClass("ui-selected");
k.selected=true
}else{k.$element.removeClass("ui-selecting");
k.selecting=false;
if(k.startselected){k.$element.addClass("ui-unselecting");
k.unselecting=true
}d._trigger("unselecting",j,{unselecting:k.element})
}}if(k.selected){if(!j.metaKey&&!k.startselected){k.$element.removeClass("ui-selected");
k.selected=false;
k.$element.addClass("ui-unselecting");
k.unselecting=true;
d._trigger("unselecting",j,{unselecting:k.element})
}}}});
return false
},_mouseStop:function(e){var c=this;
this.dragged=false;
var d=this.options;
a(".ui-unselecting",this.element[0]).each(function(){var f=a.data(this,"selectable-item");
f.$element.removeClass("ui-unselecting");
f.unselecting=false;
f.startselected=false;
c._trigger("unselected",e,{unselected:f.element})
});
a(".ui-selecting",this.element[0]).each(function(){var f=a.data(this,"selectable-item");
f.$element.removeClass("ui-selecting").addClass("ui-selected");
f.selecting=false;
f.selected=true;
f.startselected=true;
c._trigger("selected",e,{selected:f.element})
});
this._trigger("stop",e);
this.helper.remove();
return false
}});
a.extend(a.ui.selectable,{version:"1.8.5"})
})(jQuery);
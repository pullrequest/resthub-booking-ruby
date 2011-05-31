(function(e,h){var c,b="ui-button ui-widget ui-state-default ui-corner-all",g="ui-state-hover ui-state-active ",f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",d=function(i){e(":ui-button",i.target.form).each(function(){var j=e(this).data("button");
setTimeout(function(){j.refresh()
},1)
})
},a=function(j){var i=j.name,k=j.form,l=e([]);
if(i){if(k){l=e(k).find("[name='"+i+"']")
}else{l=e("[name='"+i+"']",j.ownerDocument).filter(function(){return !this.form
})
}}return l
};
e.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",d);
if(typeof this.options.disabled!=="boolean"){this.options.disabled=this.element.attr("disabled")
}this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");
var i=this,k=this.options,l=this.type==="checkbox"||this.type==="radio",m="ui-state-hover"+(!l?" ui-state-active":""),j="ui-state-focus";
if(k.label===null){k.label=this.buttonElement.html()
}if(this.element.is(":disabled")){k.disabled=true
}this.buttonElement.addClass(b).attr("role","button").bind("mouseenter.button",function(){if(k.disabled){return
}e(this).addClass("ui-state-hover");
if(this===c){e(this).addClass("ui-state-active")
}}).bind("mouseleave.button",function(){if(k.disabled){return
}e(this).removeClass(m)
}).bind("focus.button",function(){e(this).addClass(j)
}).bind("blur.button",function(){e(this).removeClass(j)
});
if(l){this.element.bind("change.button",function(){i.refresh()
})
}if(this.type==="checkbox"){this.buttonElement.bind("click.button",function(){if(k.disabled){return false
}e(this).toggleClass("ui-state-active");
i.buttonElement.attr("aria-pressed",i.element[0].checked)
})
}else{if(this.type==="radio"){this.buttonElement.bind("click.button",function(){if(k.disabled){return false
}e(this).addClass("ui-state-active");
i.buttonElement.attr("aria-pressed",true);
var n=i.element[0];
a(n).not(n).map(function(){return e(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed",false)
})
}else{this.buttonElement.bind("mousedown.button",function(){if(k.disabled){return false
}e(this).addClass("ui-state-active");
c=this;
e(document).one("mouseup",function(){c=null
})
}).bind("mouseup.button",function(){if(k.disabled){return false
}e(this).removeClass("ui-state-active")
}).bind("keydown.button",function(n){if(k.disabled){return false
}if(n.keyCode==e.ui.keyCode.SPACE||n.keyCode==e.ui.keyCode.ENTER){e(this).addClass("ui-state-active")
}}).bind("keyup.button",function(){e(this).removeClass("ui-state-active")
});
if(this.buttonElement.is("a")){this.buttonElement.keyup(function(n){if(n.keyCode===e.ui.keyCode.SPACE){e(this).click()
}})
}}}this._setOption("disabled",k.disabled)
},_determineButtonType:function(){if(this.element.is(":checkbox")){this.type="checkbox"
}else{if(this.element.is(":radio")){this.type="radio"
}else{if(this.element.is("input")){this.type="input"
}else{this.type="button"
}}}if(this.type==="checkbox"||this.type==="radio"){this.buttonElement=this.element.parents().last().find("label[for="+this.element.attr("id")+"]");
this.element.addClass("ui-helper-hidden-accessible");
var i=this.element.is(":checked");
if(i){this.buttonElement.addClass("ui-state-active")
}this.buttonElement.attr("aria-pressed",i)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");
this.buttonElement.removeClass(b+" "+g+" "+f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
if(!this.hasTitle){this.buttonElement.removeAttr("title")
}e.Widget.prototype.destroy.call(this)
},_setOption:function(i,j){e.Widget.prototype._setOption.apply(this,arguments);
if(i==="disabled"){if(j){this.element.attr("disabled",true)
}else{this.element.removeAttr("disabled")
}}this._resetButton()
},refresh:function(){var i=this.element.is(":disabled");
if(i!==this.options.disabled){this._setOption("disabled",i)
}if(this.type==="radio"){a(this.element[0]).each(function(){if(e(this).is(":checked")){e(this).button("widget").addClass("ui-state-active").attr("aria-pressed",true)
}else{e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)
}})
}else{if(this.type==="checkbox"){if(this.element.is(":checked")){this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true)
}else{this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)
}}}},_resetButton:function(){if(this.type==="input"){if(this.options.label){this.element.val(this.options.label)
}return
}var l=this.buttonElement.removeClass(f),k=e("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(l.empty()).text(),j=this.options.icons,i=j.primary&&j.secondary;
if(j.primary||j.secondary){l.addClass("ui-button-text-icon"+(i?"s":(j.primary?"-primary":"-secondary")));
if(j.primary){l.prepend("<span class='ui-button-icon-primary ui-icon "+j.primary+"'></span>")
}if(j.secondary){l.append("<span class='ui-button-icon-secondary ui-icon "+j.secondary+"'></span>")
}if(!this.options.text){l.addClass(i?"ui-button-icons-only":"ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
if(!this.hasTitle){l.attr("title",k)
}}}else{l.addClass("ui-button-text-only")
}}});
e.widget("ui.buttonset",{_create:function(){this.element.addClass("ui-buttonset");
this._init()
},_init:function(){this.refresh()
},_setOption:function(i,j){if(i==="disabled"){this.buttons.button("option",i,j)
}e.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){this.buttons=this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return e(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":visible").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end().end()
},destroy:function(){this.element.removeClass("ui-buttonset");
this.buttons.map(function(){return e(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
e.Widget.prototype.destroy.call(this)
}})
}(jQuery));
(function(a,b){a.widget("ui.progressbar",{options:{value:0},min:0,max:100,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this._value()});
this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();
a.Widget.prototype.destroy.apply(this,arguments)
},value:function(c){if(c===b){return this._value()
}this._setOption("value",c);
return this
},_setOption:function(c,d){if(c==="value"){this.options.value=d;
this._refreshValue();
this._trigger("change")
}a.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var c=this.options.value;
if(typeof c!=="number"){c=0
}return Math.min(this.max,Math.max(this.min,c))
},_refreshValue:function(){var c=this.value();
this.valueDiv.toggleClass("ui-corner-right",c===this.max).width(c+"%");
this.element.attr("aria-valuenow",c)
}});
a.extend(a.ui.progressbar,{version:"1.8.5"})
})(jQuery);
(function(b,c){var a=5;
b.widget("ui.slider",b.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var d=this,e=this.options;
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");
if(e.disabled){this.element.addClass("ui-slider-disabled ui-disabled")
}this.range=b([]);
if(e.range){if(e.range===true){this.range=b("<div></div>");
if(!e.values){e.values=[this._valueMin(),this._valueMin()]
}if(e.values.length&&e.values.length!==2){e.values=[e.values[0],e.values[0]]
}}else{this.range=b("<div></div>")
}this.range.appendTo(this.element).addClass("ui-slider-range");
if(e.range==="min"||e.range==="max"){this.range.addClass("ui-slider-range-"+e.range)
}this.range.addClass("ui-widget-header")
}if(b(".ui-slider-handle",this.element).length===0){b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
}if(e.values&&e.values.length){while(b(".ui-slider-handle",this.element).length<e.values.length){b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
}}this.handles=b(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(f){f.preventDefault()
}).hover(function(){if(!e.disabled){b(this).addClass("ui-state-hover")
}},function(){b(this).removeClass("ui-state-hover")
}).focus(function(){if(!e.disabled){b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
b(this).addClass("ui-state-focus")
}else{b(this).blur()
}}).blur(function(){b(this).removeClass("ui-state-focus")
});
this.handles.each(function(f){b(this).data("index.ui-slider-handle",f)
});
this.handles.keydown(function(k){var h=true,g=b(this).data("index.ui-slider-handle"),l,i,f,j;
if(d.options.disabled){return
}switch(k.keyCode){case b.ui.keyCode.HOME:case b.ui.keyCode.END:case b.ui.keyCode.PAGE_UP:case b.ui.keyCode.PAGE_DOWN:case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:h=false;
if(!d._keySliding){d._keySliding=true;
b(this).addClass("ui-state-active");
l=d._start(k,g);
if(l===false){return
}}break
}j=d.options.step;
if(d.options.values&&d.options.values.length){i=f=d.values(g)
}else{i=f=d.value()
}switch(k.keyCode){case b.ui.keyCode.HOME:f=d._valueMin();
break;
case b.ui.keyCode.END:f=d._valueMax();
break;
case b.ui.keyCode.PAGE_UP:f=d._trimAlignValue(i+((d._valueMax()-d._valueMin())/a));
break;
case b.ui.keyCode.PAGE_DOWN:f=d._trimAlignValue(i-((d._valueMax()-d._valueMin())/a));
break;
case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:if(i===d._valueMax()){return
}f=d._trimAlignValue(i+j);
break;
case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:if(i===d._valueMin()){return
}f=d._trimAlignValue(i-j);
break
}d._slide(k,g,f);
return h
}).keyup(function(g){var f=b(this).data("index.ui-slider-handle");
if(d._keySliding){d._keySliding=false;
d._stop(g,f);
d._change(g,f);
b(this).removeClass("ui-state-active")
}});
this._refreshValue();
this._animateOff=false
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this
},_mouseCapture:function(f){var g=this.options,j,l,e,h,n,k,m,i,d;
if(g.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
j={x:f.pageX,y:f.pageY};
l=this._normValueFromMouse(j);
e=this._valueMax()-this._valueMin()+1;
n=this;
this.handles.each(function(o){var p=Math.abs(l-n.values(o));
if(e>p){e=p;
h=b(this);
k=o
}});
if(g.range===true&&this.values(1)===g.min){k+=1;
h=b(this.handles[k])
}m=this._start(f,k);
if(m===false){return false
}this._mouseSliding=true;
n._handleIndex=k;
h.addClass("ui-state-active").focus();
i=h.offset();
d=!b(f.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=d?{left:0,top:0}:{left:f.pageX-i.left-(h.width()/2),top:f.pageY-i.top-(h.height()/2)-(parseInt(h.css("borderTopWidth"),10)||0)-(parseInt(h.css("borderBottomWidth"),10)||0)+(parseInt(h.css("marginTop"),10)||0)};
this._slide(f,k,l);
this._animateOff=true;
return true
},_mouseStart:function(d){return true
},_mouseDrag:function(f){var d={x:f.pageX,y:f.pageY},e=this._normValueFromMouse(d);
this._slide(f,this._handleIndex,e);
return false
},_mouseStop:function(d){this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(d,this._handleIndex);
this._change(d,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false
},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"
},_normValueFromMouse:function(e){var d,h,g,f,i;
if(this.orientation==="horizontal"){d=this.elementSize.width;
h=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{d=this.elementSize.height;
h=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}g=(h/d);
if(g>1){g=1
}if(g<0){g=0
}if(this.orientation==="vertical"){g=1-g
}f=this._valueMax()-this._valueMin();
i=this._valueMin()+g*f;
return this._trimAlignValue(i)
},_start:function(f,e){var d={handle:this.handles[e],value:this.value()};
if(this.options.values&&this.options.values.length){d.value=this.values(e);
d.values=this.values()
}return this._trigger("start",f,d)
},_slide:function(h,g,f){var d,e,i;
if(this.options.values&&this.options.values.length){d=this.values(g?0:1);
if((this.options.values.length===2&&this.options.range===true)&&((g===0&&f>d)||(g===1&&f<d))){f=d
}if(f!==this.values(g)){e=this.values();
e[g]=f;
i=this._trigger("slide",h,{handle:this.handles[g],value:f,values:e});
d=this.values(g?0:1);
if(i!==false){this.values(g,f,true)
}}}else{if(f!==this.value()){i=this._trigger("slide",h,{handle:this.handles[g],value:f});
if(i!==false){this.value(f)
}}}},_stop:function(f,e){var d={handle:this.handles[e],value:this.value()};
if(this.options.values&&this.options.values.length){d.value=this.values(e);
d.values=this.values()
}this._trigger("stop",f,d)
},_change:function(f,e){if(!this._keySliding&&!this._mouseSliding){var d={handle:this.handles[e],value:this.value()};
if(this.options.values&&this.options.values.length){d.value=this.values(e);
d.values=this.values()
}this._trigger("change",f,d)
}},value:function(d){if(arguments.length){this.options.value=this._trimAlignValue(d);
this._refreshValue();
this._change(null,0)
}return this._value()
},values:function(e,h){var g,d,f;
if(arguments.length>1){this.options.values[e]=this._trimAlignValue(h);
this._refreshValue();
this._change(null,e)
}if(arguments.length){if(b.isArray(arguments[0])){g=this.options.values;
d=arguments[0];
for(f=0;
f<g.length;
f+=1){g[f]=this._trimAlignValue(d[f]);
this._change(null,f)
}this._refreshValue()
}else{if(this.options.values&&this.options.values.length){return this._values(e)
}else{return this.value()
}}}else{return this._values()
}},_setOption:function(e,f){var d,g=0;
if(b.isArray(this.options.values)){g=this.options.values.length
}b.Widget.prototype._setOption.apply(this,arguments);
switch(e){case"disabled":if(f){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.attr("disabled","disabled");
this.element.addClass("ui-disabled")
}else{this.handles.removeAttr("disabled");
this.element.removeClass("ui-disabled")
}break;
case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case"value":this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case"values":this._animateOff=true;
this._refreshValue();
for(d=0;
d<g;
d+=1){this._change(null,d)
}this._animateOff=false;
break
}},_value:function(){var d=this.options.value;
d=this._trimAlignValue(d);
return d
},_values:function(d){var g,f,e;
if(arguments.length){g=this.options.values[d];
g=this._trimAlignValue(g);
return g
}else{f=this.options.values.slice();
for(e=0;
e<f.length;
e+=1){f[e]=this._trimAlignValue(f[e])
}return f
}},_trimAlignValue:function(g){if(g<this._valueMin()){return this._valueMin()
}if(g>this._valueMax()){return this._valueMax()
}var d=(this.options.step>0)?this.options.step:1,f=g%d,e=g-f;
if(Math.abs(f)*2>=d){e+=(f>0)?d:(-d)
}return parseFloat(e.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var g=this.options.range,f=this.options,m=this,e=(!this._animateOff)?f.animate:false,h,d={},i,k,j,l;
if(this.options.values&&this.options.values.length){this.handles.each(function(o,n){h=(m.values(o)-m._valueMin())/(m._valueMax()-m._valueMin())*100;
d[m.orientation==="horizontal"?"left":"bottom"]=h+"%";
b(this).stop(1,1)[e?"animate":"css"](d,f.animate);
if(m.options.range===true){if(m.orientation==="horizontal"){if(o===0){m.range.stop(1,1)[e?"animate":"css"]({left:h+"%"},f.animate)
}if(o===1){m.range[e?"animate":"css"]({width:(h-i)+"%"},{queue:false,duration:f.animate})
}}else{if(o===0){m.range.stop(1,1)[e?"animate":"css"]({bottom:(h)+"%"},f.animate)
}if(o===1){m.range[e?"animate":"css"]({height:(h-i)+"%"},{queue:false,duration:f.animate})
}}}i=h
})
}else{k=this.value();
j=this._valueMin();
l=this._valueMax();
h=(l!==j)?(k-j)/(l-j)*100:0;
d[m.orientation==="horizontal"?"left":"bottom"]=h+"%";
this.handle.stop(1,1)[e?"animate":"css"](d,f.animate);
if(g==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[e?"animate":"css"]({width:h+"%"},f.animate)
}if(g==="max"&&this.orientation==="horizontal"){this.range[e?"animate":"css"]({width:(100-h)+"%"},{queue:false,duration:f.animate})
}if(g==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[e?"animate":"css"]({height:h+"%"},f.animate)
}if(g==="max"&&this.orientation==="vertical"){this.range[e?"animate":"css"]({height:(100-h)+"%"},{queue:false,duration:f.animate})
}}}});
b.extend(b.ui.slider,{version:"1.8.5"})
}(jQuery));
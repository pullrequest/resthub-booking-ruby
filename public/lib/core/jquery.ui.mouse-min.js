/*
 * jQuery UI Mouse 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(a,b){a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var c=this;
this.element.bind("mousedown."+this.widgetName,function(d){return c._mouseDown(d)
}).bind("click."+this.widgetName,function(d){if(c._preventClickEvent){c._preventClickEvent=false;
d.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(e){e.originalEvent=e.originalEvent||{};
if(e.originalEvent.mouseHandled){return
}(this._mouseStarted&&this._mouseUp(e));
this._mouseDownEvent=e;
var d=this,f=(e.which==1),c=(typeof this.options.cancel=="string"?a(e.target).parents().add(e.target).filter(this.options.cancel).length:false);
if(!f||c||!this._mouseCapture(e)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)){this._mouseStarted=(this._mouseStart(e)!==false);
if(!this._mouseStarted){e.preventDefault();
return true
}}this._mouseMoveDelegate=function(g){return d._mouseMove(g)
};
this._mouseUpDelegate=function(g){return d._mouseUp(g)
};
a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
(a.browser.safari||e.preventDefault());
e.originalEvent.mouseHandled=true;
return true
},_mouseMove:function(c){if(a.browser.msie&&!c.button){return this._mouseUp(c)
}if(this._mouseStarted){this._mouseDrag(c);
return c.preventDefault()
}if(this._mouseDistanceMet(c)&&this._mouseDelayMet(c)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,c)!==false);
(this._mouseStarted?this._mouseDrag(c):this._mouseUp(c))
}return !this._mouseStarted
},_mouseUp:function(c){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
this._preventClickEvent=(c.target==this._mouseDownEvent.target);
this._mouseStop(c)
}return false
},_mouseDistanceMet:function(c){return(Math.max(Math.abs(this._mouseDownEvent.pageX-c.pageX),Math.abs(this._mouseDownEvent.pageY-c.pageY))>=this.options.distance)
},_mouseDelayMet:function(c){return this.mouseDelayMet
},_mouseStart:function(c){},_mouseDrag:function(c){},_mouseStop:function(c){},_mouseCapture:function(c){return true
}})
})(jQuery);
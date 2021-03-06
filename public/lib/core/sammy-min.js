(function(g,i){var n,f="([^/]+)",j=/:([\w\d]+)/g,k=/\?([^#]*)$/,b=function(o){return Array.prototype.slice.call(o)
},c=function(o){return Object.prototype.toString.call(o)==="[object Function]"
},l=function(o){return Object.prototype.toString.call(o)==="[object Array]"
},h=decodeURIComponent,e=function(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
},m=function(o){return function(p,q){return this.route.apply(this,[o,p,q])
}
},a={},d=[];
n=function(){var p=b(arguments),q,o;
n.apps=n.apps||{};
if(p.length===0||p[0]&&c(p[0])){return n.apply(n,["body"].concat(p))
}else{if(typeof(o=p.shift())=="string"){q=n.apps[o]||new n.Application();
q.element_selector=o;
if(p.length>0){g.each(p,function(r,s){q.use(s)
})
}if(q.element_selector!=o){delete n.apps[o]
}n.apps[q.element_selector]=q;
return q
}}};
n.VERSION="0.6.2";
n.addLogger=function(o){d.push(o)
};
n.log=function(){var o=b(arguments);
o.unshift("["+Date()+"]");
g.each(d,function(q,p){p.apply(n,o)
})
};
if(typeof i.console!="undefined"){if(c(console.log.apply)){n.addLogger(function(){i.console.log.apply(console,arguments)
})
}else{n.addLogger(function(){i.console.log(arguments)
})
}}else{if(typeof console!="undefined"){n.addLogger(function(){console.log.apply(console,arguments)
})
}}g.extend(n,{makeArray:b,isFunction:c,isArray:l});
n.Object=function(o){return g.extend(this,o||{})
};
g.extend(n.Object.prototype,{escapeHTML:e,h:e,toHash:function(){var o={};
g.each(this,function(q,p){if(!c(p)){o[q]=p
}});
return o
},toHTML:function(){var o="";
g.each(this,function(q,p){if(!c(p)){o+="<strong>"+q+"</strong> "+p+"<br />"
}});
return o
},keys:function(o){var p=[];
for(var q in this){if(!c(this[q])||!o){p.push(q)
}}return p
},has:function(o){return this[o]&&g.trim(this[o].toString())!=""
},join:function(){var p=b(arguments);
var o=p.shift();
return p.join(o)
},log:function(){n.log.apply(n,arguments)
},toString:function(o){var p=[];
g.each(this,function(r,q){if(!c(q)||o){p.push('"'+r+'": '+q.toString())
}});
return"Sammy.Object: {"+p.join(",")+"}"
}});
n.HashLocationProxy=function(p,o){this.app=p;
this.is_native=false;
this._startPolling(o)
};
n.HashLocationProxy.prototype={bind:function(){var o=this,p=this.app;
g(i).bind("hashchange."+this.app.eventNamespace(),function(r,q){if(o.is_native===false&&!q){n.log("native hash change exists, using");
o.is_native=true;
i.clearInterval(n.HashLocationProxy._interval)
}p.trigger("location-changed")
});
if(!n.HashLocationProxy._bindings){n.HashLocationProxy._bindings=0
}n.HashLocationProxy._bindings++
},unbind:function(){g(i).unbind("hashchange."+this.app.eventNamespace());
n.HashLocationProxy._bindings--;
if(n.HashLocationProxy._bindings<=0){i.clearInterval(n.HashLocationProxy._interval)
}},getLocation:function(){var o=i.location.toString().match(/^[^#]*(#.+)$/);
return o?o[1]:""
},setLocation:function(o){return(i.location=o)
},_startPolling:function(q){var p=this;
if(!n.HashLocationProxy._interval){if(!q){q=10
}var o=function(){var r=p.getLocation();
if(!n.HashLocationProxy._last_location||r!=n.HashLocationProxy._last_location){i.setTimeout(function(){g(i).trigger("hashchange",[true])
},13)
}n.HashLocationProxy._last_location=r
};
o();
n.HashLocationProxy._interval=i.setInterval(o,q)
}}};
n.Application=function(o){var p=this;
this.routes={};
this.listeners=new n.Object({});
this.arounds=[];
this.befores=[];
this.namespace=(new Date()).getTime()+"-"+parseInt(Math.random()*1000,10);
this.context_prototype=function(){n.EventContext.apply(this,arguments)
};
this.context_prototype.prototype=new n.EventContext();
if(c(o)){o.apply(this,[this])
}if(!this._location_proxy){this.setLocationProxy(new n.HashLocationProxy(this,this.run_interval_every))
}if(this.debug){this.bindToAllEvents(function(r,q){p.log(p.toString(),r.cleaned_type,q||{})
})
}};
n.Application.prototype=g.extend({},n.Object.prototype,{ROUTE_VERBS:["get","post","put","delete"],APP_EVENTS:["run","unload","lookup-route","run-route","route-found","event-context-before","event-context-after","changed","error","check-form-submission","redirect","location-changed"],_last_route:null,_location_proxy:null,_running:false,element_selector:"body",debug:false,raise_errors:false,run_interval_every:50,template_engine:null,toString:function(){return"Sammy.Application:"+this.element_selector
},$element:function(){return g(this.element_selector)
},use:function(){var o=b(arguments),q=o.shift(),p=q||"";
try{o.unshift(this);
if(typeof q=="string"){p="Sammy."+q;
q=n[q]
}q.apply(this,o)
}catch(r){if(typeof q==="undefined"){this.error("Plugin Error: called use() but plugin ("+p.toString()+") is not defined",r)
}else{if(!c(q)){this.error("Plugin Error: called use() but '"+p.toString()+"' is not a function",r)
}else{this.error("Plugin Error",r)
}}}return this
},setLocationProxy:function(o){var p=this._location_proxy;
this._location_proxy=o;
if(this.isRunning()){if(p){p.unbind()
}this._location_proxy.bind()
}},route:function(s,p,u){var r=this,t=[],o,q;
if(!u&&c(p)){p=s;
u=p;
s="any"
}s=s.toLowerCase();
if(p.constructor==String){j.lastIndex=0;
while((q=j.exec(p))!==null){t.push(q[1])
}p=new RegExp("^"+p.replace(j,f)+"$")
}if(typeof u=="string"){u=r[u]
}o=function(v){var w={verb:v,path:p,callback:u,param_names:t};
r.routes[v]=r.routes[v]||[];
r.routes[v].push(w)
};
if(s==="any"){g.each(this.ROUTE_VERBS,function(x,w){o(w)
})
}else{o(s)
}return this
},get:m("get"),post:m("post"),put:m("put"),del:m("delete"),any:m("any"),mapRoutes:function(p){var o=this;
g.each(p,function(q,r){o.route.apply(o,r)
});
return this
},eventNamespace:function(){return["sammy-app",this.namespace].join("-")
},bind:function(o,q,s){var r=this;
if(typeof s=="undefined"){s=q
}var p=function(){var v,t,u;
v=arguments[0];
u=arguments[1];
if(u&&u.context){t=u.context;
delete u.context
}else{t=new r.context_prototype(r,"bind",v.type,u,v.target)
}v.cleaned_type=v.type.replace(r.eventNamespace(),"");
s.apply(t,[v,u])
};
if(!this.listeners[o]){this.listeners[o]=[]
}this.listeners[o].push(p);
if(this.isRunning()){this._listen(o,p)
}return this
},trigger:function(o,p){this.$element().trigger([o,this.eventNamespace()].join("."),[p]);
return this
},refresh:function(){this.last_location=null;
this.trigger("location-changed");
return this
},before:function(o,p){if(c(o)){p=o;
o={}
}this.befores.push([o,p]);
return this
},after:function(o){return this.bind("event-context-after",o)
},around:function(o){this.arounds.push(o);
return this
},isRunning:function(){return this._running
},helpers:function(o){g.extend(this.context_prototype.prototype,o);
return this
},helper:function(o,p){this.context_prototype.prototype[o]=p;
return this
},run:function(o){if(this.isRunning()){return false
}var p=this;
g.each(this.listeners.toHash(),function(q,r){g.each(r,function(t,s){p._listen(q,s)
})
});
this.trigger("run",{start_url:o});
this._running=true;
this.last_location=null;
if(this.getLocation()==""&&typeof o!="undefined"){this.setLocation(o)
}this._checkLocation();
this._location_proxy.bind();
this.bind("location-changed",function(){p._checkLocation()
});
this.bind("submit",function(r){var q=p._checkFormSubmission(g(r.target).closest("form"));
return(q===false)?r.preventDefault():false
});
g(i).bind("beforeunload",function(){p.unload()
});
return this.trigger("changed")
},unload:function(){if(!this.isRunning()){return false
}var o=this;
this.trigger("unload");
this._location_proxy.unbind();
this.$element().unbind("submit").removeClass(o.eventNamespace());
g.each(this.listeners.toHash(),function(p,q){g.each(q,function(s,r){o._unlisten(p,r)
})
});
this._running=false;
return this
},bindToAllEvents:function(p){var o=this;
g.each(this.APP_EVENTS,function(q,r){o.bind(r,p)
});
g.each(this.listeners.keys(true),function(r,q){if(o.APP_EVENTS.indexOf(q)==-1){o.bind(q,p)
}});
return this
},routablePath:function(o){return o.replace(k,"")
},lookupRoute:function(r,p){var q=this,o=false;
this.trigger("lookup-route",{verb:r,path:p});
if(typeof this.routes[r]!="undefined"){g.each(this.routes[r],function(t,s){if(q.routablePath(p).match(s.path)){o=s;
return false
}})
}return o
},runRoute:function(q,D,s,v){var r=this,B=this.lookupRoute(q,D),p,y,t,x,C,z,w,A,o;
this.log("runRoute",[q,D].join(" "));
this.trigger("run-route",{verb:q,path:D,params:s});
if(typeof s=="undefined"){s={}
}g.extend(s,this._parseQueryString(D));
if(B){this.trigger("route-found",{route:B});
if((A=B.path.exec(this.routablePath(D)))!==null){A.shift();
g.each(A,function(E,F){if(B.param_names[E]){s[B.param_names[E]]=h(F)
}else{if(!s.splat){s.splat=[]
}s.splat.push(h(F))
}})
}p=new this.context_prototype(this,q,D,s,v);
t=this.arounds.slice(0);
C=this.befores.slice(0);
w=[p].concat(s.splat);
y=function(){var E;
while(C.length>0){z=C.shift();
if(r.contextMatchesOptions(p,z[0])){E=z[1].apply(p,[p]);
if(E===false){return false
}}}r.last_route=B;
p.trigger("event-context-before",{context:p});
E=B.callback.apply(p,w);
p.trigger("event-context-after",{context:p});
return E
};
g.each(t.reverse(),function(E,F){var G=y;
y=function(){return F.apply(p,[G])
}
});
try{o=y()
}catch(u){this.error(["500 Error",q,D].join(" "),u)
}return o
}else{return this.notFound(q,D)
}},contextMatchesOptions:function(r,t,p){var q=t;
if(typeof q==="undefined"||q=={}){return true
}if(typeof p==="undefined"){p=true
}if(typeof q==="string"||c(q.test)){q={path:q}
}if(q.only){return this.contextMatchesOptions(r,q.only,true)
}else{if(q.except){return this.contextMatchesOptions(r,q.except,false)
}}var o=true,s=true;
if(q.path){if(c(q.path.test)){o=q.path.test(r.path)
}else{o=(q.path.toString()===r.path)
}}if(q.verb){s=q.verb===r.verb
}return p?(s&&o):!(s&&o)
},getLocation:function(){return this._location_proxy.getLocation()
},setLocation:function(o){return this._location_proxy.setLocation(o)
},swap:function(o){return this.$element().html(o)
},templateCache:function(o,p){if(typeof p!="undefined"){return a[o]=p
}else{return a[o]
}},clearTemplateCache:function(){return a={}
},notFound:function(q,p){var o=this.error(["404 Not Found",q,p].join(" "));
return(q==="get")?o:true
},error:function(p,o){if(!o){o=new Error()
}o.message=[p,o.message].join(" ");
this.trigger("error",{message:o.message,error:o});
if(this.raise_errors){throw (o)
}else{this.log(o.message,o)
}},_checkLocation:function(){var o,p;
o=this.getLocation();
if(!this.last_location||this.last_location[0]!="get"||this.last_location[1]!=o){this.last_location=["get",o];
p=this.runRoute("get",o)
}return p
},_getFormVerb:function(q){var p=g(q),r,o;
o=p.find('input[name="_method"]');
if(o.length>0){r=o.val()
}if(!r){r=p[0].getAttribute("method")
}return g.trim(r.toString().toLowerCase())
},_checkFormSubmission:function(q){var o,r,t,s,p;
this.trigger("check-form-submission",{form:q});
o=g(q);
r=o.attr("action");
t=this._getFormVerb(o);
if(!t||t==""){t="get"
}this.log("_checkFormSubmission",o,r,t);
if(t==="get"){this.setLocation(r+"?"+o.serialize());
p=false
}else{s=g.extend({},this._parseFormParams(o));
p=this.runRoute(t,r,s,q.get(0))
}return(typeof p=="undefined")?false:p
},_parseFormParams:function(o){var r={},q=o.serializeArray(),p;
for(p=0;
p<q.length;
p++){r=this._parseParamPair(r,q[p].name,q[p].value)
}return r
},_parseQueryString:function(r){var t={},q,p,s,o;
q=r.match(k);
if(q){p=q[1].split("&");
for(o=0;
o<p.length;
o++){s=p[o].split("=");
t=this._parseParamPair(t,h(s[0]),h(s[1]))
}}return t
},_parseParamPair:function(q,o,p){if(q[o]){if(l(q[o])){q[o].push(p)
}else{q[o]=[q[o],p]
}}else{q[o]=p
}return q
},_listen:function(o,p){return this.$element().bind([o,this.eventNamespace()].join("."),p)
},_unlisten:function(o,p){return this.$element().unbind([o,this.eventNamespace()].join("."),p)
}});
n.RenderContext=function(o){this.event_context=o;
this.callbacks=[];
this.previous_content=null;
this.content=null;
this.next_engine=false;
this.waiting=false
};
g.extend(n.RenderContext.prototype,{then:function(q){if(!c(q)){if(typeof q==="string"&&q in this.event_context){var p=this.event_context[q];
q=function(r){return p.apply(this.event_context,[r])
}
}else{return this
}}var o=this;
if(this.waiting){this.callbacks.push(q)
}else{this.wait();
i.setTimeout(function(){var r=q.apply(o,[o.content,o.previous_content]);
if(r!==false){o.next(r)
}},13)
}return this
},wait:function(){this.waiting=true
},next:function(o){this.waiting=false;
if(typeof o!=="undefined"){this.previous_content=this.content;
this.content=o
}if(this.callbacks.length>0){this.then(this.callbacks.shift())
}},load:function(o,p,r){var q=this;
return this.then(function(){var s,t,v,u;
if(c(p)){r=p;
p={}
}else{p=g.extend({},p)
}if(r){this.then(r)
}if(typeof o==="string"){v=(o.match(/\.json$/)||p.json);
s=((v&&p.cache===true)||p.cache!==false);
q.next_engine=q.event_context.engineFor(o);
delete p.cache;
delete p.json;
if(p.engine){q.next_engine=p.engine;
delete p.engine
}if(s&&(t=this.event_context.app.templateCache(o))){return t
}this.wait();
g.ajax(g.extend({url:o,data:{},dataType:v?"json":null,type:"get",success:function(w){if(s){q.event_context.app.templateCache(o,w)
}q.next(w)
}},p));
return false
}else{if(o.nodeType){return o.innerHTML
}if(o.selector){q.next_engine=o.attr("data-engine");
if(p.clone===false){return o.remove()[0].innerHTML.toString()
}else{return o[0].innerHTML.toString()
}}}})
},render:function(o,p,q){if(c(o)&&!p){return this.then(o)
}else{if(!p&&this.content){p=this.content
}return this.load(o).interpolate(p,o).then(q)
}},partial:function(o,p){return this.render(o,p).swap()
},send:function(){var q=this,p=b(arguments),o=p.shift();
if(l(p[0])){p=p[0]
}return this.then(function(r){p.push(function(s){q.next(s)
});
q.wait();
o.apply(o,p);
return false
})
},collect:function(s,r,o){var q=this;
var p=function(){if(c(s)){r=s;
s=this.content
}var t=[],u=false;
g.each(s,function(v,x){var w=r.apply(q,[v,x]);
if(w.jquery&&w.length==1){w=w[0];
u=true
}t.push(w);
return w
});
return u?t:t.join("")
};
return o?p():this.then(p)
},renderEach:function(o,p,q,r){if(l(p)){r=q;
q=p;
p=null
}return this.load(o).then(function(t){var s=this;
if(!q){q=l(this.previous_content)?this.previous_content:[]
}if(r){g.each(q,function(u,w){var x={},v=this.next_engine||o;
p?(x[p]=w):(x=w);
r(w,s.event_context.interpolate(t,x,v))
})
}else{return this.collect(q,function(u,w){var x={},v=this.next_engine||o;
p?(x[p]=w):(x=w);
return this.event_context.interpolate(t,x,v)
},true)
}})
},interpolate:function(r,q,o){var p=this;
return this.then(function(t,s){if(!r&&s){r=s
}if(this.next_engine){q=this.next_engine;
this.next_engine=false
}var u=p.event_context.interpolate(t,r,q);
return o?s+u:u
})
},swap:function(){return this.then(function(o){this.event_context.swap(o)
}).trigger("changed",{})
},appendTo:function(o){return this.then(function(p){g(o).append(p)
}).trigger("changed",{})
},prependTo:function(o){return this.then(function(p){g(o).prepend(p)
}).trigger("changed",{})
},replace:function(o){return this.then(function(p){g(o).html(p)
}).trigger("changed",{})
},trigger:function(o,p){return this.then(function(q){if(typeof p=="undefined"){p={content:q}
}this.event_context.trigger(o,p)
})
}});
n.EventContext=function(s,r,p,q,o){this.app=s;
this.verb=r;
this.path=p;
this.params=new n.Object(q);
this.target=o
};
n.EventContext.prototype=g.extend({},n.Object.prototype,{$element:function(){return this.app.$element()
},engineFor:function(q){var p=this,o;
if(c(q)){return q
}q=q.toString();
if((o=q.match(/\.([^\.]+)$/))){q=o[1]
}if(q&&c(p[q])){return p[q]
}if(p.app.template_engine){return this.engineFor(p.app.template_engine)
}return function(r,s){return r
}
},interpolate:function(p,q,o){return this.engineFor(o).apply(this,[p,q])
},render:function(o,p,q){return new n.RenderContext(this).render(o,p,q)
},renderEach:function(o,p,q,r){return new n.RenderContext(this).renderEach(o,p,q,r)
},load:function(o,p,q){return new n.RenderContext(this).load(o,p,q)
},partial:function(o,p){return new n.RenderContext(this).partial(o,p)
},send:function(){var o=new n.RenderContext(this);
return o.send.apply(o,arguments)
},redirect:function(){var q,p=b(arguments),o=this.app.getLocation();
if(p.length>1){p.unshift("/");
q=this.join.apply(this,p)
}else{q=p[0]
}this.trigger("redirect",{to:q});
this.app.last_location=[this.verb,this.path];
this.app.setLocation(q);
if(o==q){this.app.trigger("location-changed")
}},trigger:function(o,p){if(typeof p=="undefined"){p={}
}if(!p.context){p.context=this
}return this.app.trigger(o,p)
},eventNamespace:function(){return this.app.eventNamespace()
},swap:function(o){return this.app.swap(o)
},notFound:function(){return this.app.notFound(this.verb,this.path)
},json:function(o){return g.parseJSON(o)
},toString:function(){return"Sammy.EventContext: "+[this.verb,this.path,this.params].join(" ")
}});
g.sammy=i.Sammy=n
})(jQuery,window);
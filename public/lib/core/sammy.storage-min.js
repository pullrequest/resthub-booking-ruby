(function(a){Sammy=Sammy||{};
Sammy.Store=function(c){var b=this;
this.options=c||{};
this.name=this.options.name||"store";
this.element=this.options.element||"body";
this.$element=a(this.element);
if(a.isArray(this.options.type)){a.each(this.options.type,function(d,e){if(Sammy.Store.isAvailable(e)){b.type=e;
return false
}})
}else{this.type=this.options.type||"memory"
}this.meta_key=this.options.meta_key||"__keys__";
this.storage=new Sammy.Store[Sammy.Store.stores[this.type]](this.name,this.element,this.options)
};
Sammy.Store.stores={memory:"Memory",data:"Data",local:"LocalStorage",session:"SessionStorage",cookie:"Cookie"};
a.extend(Sammy.Store.prototype,{isAvailable:function(){if(a.isFunction(this.storage.isAvailable)){return this.storage.isAvailable()
}else{true
}},exists:function(b){return this.storage.exists(b)
},set:function(c,d){var b=(typeof d=="string")?d:JSON.stringify(d);
c=c.toString();
this.storage.set(c,b);
if(c!=this.meta_key){this._addKey(c);
this.$element.trigger("set-"+this.name,{key:c,value:d});
this.$element.trigger("set-"+this.name+"-"+c,{key:c,value:d})
}return d
},get:function(b){var c=this.storage.get(b);
if(typeof c=="undefined"||c==null||c==""){return c
}try{return JSON.parse(c)
}catch(d){return c
}},clear:function(b){this._removeKey(b);
return this.storage.clear(b)
},clearAll:function(){var b=this;
this.each(function(c,d){b.clear(c)
})
},keys:function(){return this.get(this.meta_key)||[]
},each:function(e){var b=0,d=this.keys(),c;
for(b;
b<d.length;
b++){c=e(d[b],this.get(d[b]));
if(c===false){return false
}}},filter:function(c){var b=[];
this.each(function(d,e){if(c(d,e)){b.push([d,e])
}return true
});
return b
},first:function(c){var b=false;
this.each(function(d,e){if(c(d,e)){b=[d,e];
return false
}});
return b
},fetch:function(b,c){if(!this.exists(b)){return this.set(b,c.apply(this))
}else{return this.get(b)
}},load:function(b,d,e){var c=this;
a.get(d,function(f){c.set(b,f);
if(e){e.apply(this,[f])
}})
},_addKey:function(b){var c=this.keys();
if(a.inArray(b,c)==-1){c.push(b)
}this.set(this.meta_key,c)
},_removeKey:function(c){var d=this.keys();
var b=a.inArray(c,d);
if(b!=-1){d.splice(b,1)
}this.set(this.meta_key,d)
}});
Sammy.Store.isAvailable=function(b){try{return Sammy.Store[Sammy.Store.stores[b]].prototype.isAvailable()
}catch(c){return false
}};
Sammy.Store.Memory=function(b,c){this.name=b;
this.element=c;
this.namespace=[this.element,this.name].join(".");
Sammy.Store.Memory.store=Sammy.Store.Memory.store||{};
Sammy.Store.Memory.store[this.namespace]=Sammy.Store.Memory.store[this.namespace]||{};
this.store=Sammy.Store.Memory.store[this.namespace]
};
a.extend(Sammy.Store.Memory.prototype,{isAvailable:function(){return true
},exists:function(b){return(typeof this.store[b]!="undefined")
},set:function(b,c){return this.store[b]=c
},get:function(b){return this.store[b]
},clear:function(b){delete this.store[b]
}});
Sammy.Store.Data=function(b,c){this.name=b;
this.element=c;
this.$element=a(c)
};
a.extend(Sammy.Store.Data.prototype,{isAvailable:function(){return true
},exists:function(b){return !!this.$element.data(this._key(b))
},set:function(b,c){return this.$element.data(this._key(b),c)
},get:function(b){return this.$element.data(this._key(b))
},clear:function(b){this.$element.removeData(this._key(b))
},_key:function(b){return["store",this.name,b].join(".")
}});
Sammy.Store.LocalStorage=function(b,c){this.name=b;
this.element=c
};
a.extend(Sammy.Store.LocalStorage.prototype,{isAvailable:function(){return("localStorage" in window)&&(window.location.protocol!="file:")
},exists:function(b){return(this.get(b)!=null)
},set:function(b,c){return window.localStorage.setItem(this._key(b),c)
},get:function(b){return window.localStorage.getItem(this._key(b))
},clear:function(b){window.localStorage.removeItem(this._key(b))
},_key:function(b){return["store",this.element,this.name,b].join(".")
}});
Sammy.Store.SessionStorage=function(b,c){this.name=b;
this.element=c
};
a.extend(Sammy.Store.SessionStorage.prototype,{isAvailable:function(){return("sessionStorage" in window)&&(window.location.protocol!="file:")&&(a.isFunction(window.sessionStorage.setItem))
},exists:function(b){return(this.get(b)!=null)
},set:function(b,c){return window.sessionStorage.setItem(this._key(b),c)
},get:function(b){var c=window.sessionStorage.getItem(this._key(b));
if(c&&typeof c.value!="undefined"){c=c.value
}return c
},clear:function(b){window.sessionStorage.removeItem(this._key(b))
},_key:function(b){return["store",this.element,this.name,b].join(".")
}});
Sammy.Store.Cookie=function(c,d,b){this.name=c;
this.element=d;
this.options=b||{};
this.path=this.options.path||"/";
this.expires_in=this.options.expires_in||(14*24*60*60)
};
a.extend(Sammy.Store.Cookie.prototype,{isAvailable:function(){return("cookie" in document)&&(window.location.protocol!="file:")
},exists:function(b){return(this.get(b)!=null)
},set:function(b,c){return this._setCookie(b,c)
},get:function(b){return this._getCookie(b)
},clear:function(b){this._setCookie(b,"",-1)
},_key:function(b){return["store",this.element,this.name,b].join(".")
},_getCookie:function(c){var d=this._key(c).replace(/(\.|\*|\(|\)|\[|\])/g,"\\$1");
var b=document.cookie.match("(^|;\\s)"+d+"=([^;]*)(;|$)");
return(b?b[2]:null)
},_setCookie:function(e,f,c){if(!c){c=(this.expires_in*1000)
}var d=new Date();
d.setTime(d.getTime()+c);
var b=[this._key(e),"=",f,"; expires=",d.toGMTString(),"; path=",this.path].join("");
document.cookie=b
}});
Sammy.Storage=function(b){this.use(Sammy.JSON);
this.stores=this.stores||{};
this.store=function(d,c){if(typeof this.stores[d]=="undefined"){var e="clear"+d.substr(0,1).toUpperCase()+d.substr(1);
this.stores[d]=new Sammy.Store(a.extend({name:d,element:this.element_selector},c||{}));
this[d]=function(f,g){if(typeof g=="undefined"){return this.stores[d].get(f)
}else{if(a.isFunction(g)){return this.stores[d].fetch(f,g)
}else{return this.stores[d].set(f,g)
}}};
this[e]=function(){return this.stores[d].clearAll()
};
this.helper(d,function(){return this.app[d].apply(this.app,arguments)
});
this.helper(e,function(){return this.app[e]()
})
}return this.stores[d]
};
this.helpers({store:function(){return this.app.store.apply(this.app,arguments)
}})
};
Sammy.Session=function(c,b){this.use(Sammy.Storage);
this.store("session",a.extend({type:["local","cookie","memory"]},b))
};
Sammy.Cache=function(c,b){this.use(Sammy.Storage);
this.cache_partials=true;
this.store("cache",a.extend({type:["local","session","memory"]},b))
}
})(jQuery);
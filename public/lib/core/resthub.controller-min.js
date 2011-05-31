(function(f){var e={_create:function(){},_init:function(){},_authenticate:function(k,i,j,h){var g=this.options.context.store("session").clear("accessToken");
f.getOauth2token(k,i,f.proxy(function(l){this.options.context.session("accessToken",l);
if(j){j.call(this)
}},this),h)
},_post:function c(g,i,h){this._ajax(g,i,"post",h)
},_get:function d(g,h){this._ajax(g,h,"get",null)
},_put:function a(g,i,h){this._ajax(g,i,"put",h)
},_delete:function b(g,h){this._ajax(g,h,"delete",null)
},_securedGet:function d(g,h){this._securedAjax(g,h,"get",null)
},_securedPut:function a(g,i,h){this._securedAjax(g,i,"put",h)
},_securedDelete:function b(g,h){this._securedAjax(g,h,"delete",null)
},_securedPost:function c(g,i,h){this._securedAjax(g,i,"post",h)
},_ajax:function(g,j,h,i){f.ajax({url:g,dataType:this.options.dataType,contentType:this.options.contentType,type:h,data:i,success:f.proxy(j,this)})
},_securedAjax:function(h,k,i,j){var g=this.options.context.session("accessToken");
f.oauth2Ajax({url:h,dataType:this.options.dataType,contentType:this.options.contentType,type:i,data:j,success:f.proxy(k,this)},g)
},_set:function(g,h){this.options[g]=h
},options:{dataType:"json",contentType:"application/json; charset=utf-8"}};
f.widget("resthub.resthubController",e)
})(jQuery);
/*
 * jQuery OAuth 2 implementation
 * 
 * May be used as standalone functions, or directly in ResthubController widget.
 * 
 * Does not manage the access token storage, nor that the protocol errors.
 * Users could thus plug their own storage and error management solutions. 
 */
(function(a){jQuery.extend({oauth2Conf:{client_id:"",client_secret:"",tokenEndPoint:""},getOauth2token:function(f,c,d,b){var e=this;
a.ajax({url:jQuery.oauth2Conf.tokenEndPoint,type:"POST",data:{client_id:jQuery.oauth2Conf.client_id,client_secret:jQuery.oauth2Conf.client_secret,grant_type:"password",username:f,password:c},success:function(h,i,g){if(d instanceof Function){d.call(this,h)
}},error:function(h,j,i){if(h.status==400||h.status==401){var g=a.parseJSON(h.responseText);
if(b instanceof Function){b.call(this,g.error,g.error_description)
}}}})
},oauth2Ajax:function(e,c){var d=e.beforeSend;
e.beforeSend=function(f){if(c&&"access_token" in c){f.setRequestHeader("Authorization","OAuth "+c.access_token)
}if(d instanceof Function){d.call(e,f)
}};
var b=e.error;
e.error=function(j,l,k){if(j.status==400||j.status==401||j.status==403){var f=j.getResponseHeader("WWW-Authenticate");
var h={};
var g=f.indexOf('error="');
if(g!=-1){h.status=f.substring(g+7,f.indexOf('"',g+7))
}else{h.status="invalid_request"
}g=f.indexOf('error_description="');
if(g!=-1){h.message=f.substring(g+19,f.indexOf('"',g+19))
}if(this.authorizationError instanceof Function){this.authorizationError.call(e,h,j)
}}if(b instanceof Function){b.call(j,j)
}};
return jQuery.ajax(e)
}})
})(jQuery);
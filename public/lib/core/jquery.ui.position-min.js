(function(f,g){f.ui=f.ui||{};
var d=/left|center|right/,e=/top|center|bottom/,a="center",b=f.fn.position,c=f.fn.offset;
f.fn.position=function(i){if(!i||!i.of){return b.apply(this,arguments)
}i=f.extend({},i);
var m=f(i.of),l=m[0],o=(i.collision||"flip").split(" "),n=i.offset?i.offset.split(" "):[0,0],k,h,j;
if(l.nodeType===9){k=m.width();
h=m.height();
j={top:0,left:0}
}else{if(l.scrollTo&&l.document){k=m.width();
h=m.height();
j={top:m.scrollTop(),left:m.scrollLeft()}
}else{if(l.preventDefault){i.at="left top";
k=h=0;
j={top:i.of.pageY,left:i.of.pageX}
}else{k=m.outerWidth();
h=m.outerHeight();
j=m.offset()
}}}f.each(["my","at"],function(){var p=(i[this]||"").split(" ");
if(p.length===1){p=d.test(p[0])?p.concat([a]):e.test(p[0])?[a].concat(p):[a,a]
}p[0]=d.test(p[0])?p[0]:a;
p[1]=e.test(p[1])?p[1]:a;
i[this]=p
});
if(o.length===1){o[1]=o[0]
}n[0]=parseInt(n[0],10)||0;
if(n.length===1){n[1]=n[0]
}n[1]=parseInt(n[1],10)||0;
if(i.at[0]==="right"){j.left+=k
}else{if(i.at[0]===a){j.left+=k/2
}}if(i.at[1]==="bottom"){j.top+=h
}else{if(i.at[1]===a){j.top+=h/2
}}j.left+=n[0];
j.top+=n[1];
return this.each(function(){var s=f(this),u=s.outerWidth(),r=s.outerHeight(),t=parseInt(f.curCSS(this,"marginLeft",true))||0,q=parseInt(f.curCSS(this,"marginTop",true))||0,w=u+t+parseInt(f.curCSS(this,"marginRight",true))||0,x=r+q+parseInt(f.curCSS(this,"marginBottom",true))||0,v=f.extend({},j),p;
if(i.my[0]==="right"){v.left-=u
}else{if(i.my[0]===a){v.left-=u/2
}}if(i.my[1]==="bottom"){v.top-=r
}else{if(i.my[1]===a){v.top-=r/2
}}v.left=parseInt(v.left);
v.top=parseInt(v.top);
p={left:v.left-t,top:v.top-q};
f.each(["left","top"],function(z,y){if(f.ui.position[o[z]]){f.ui.position[o[z]][y](v,{targetWidth:k,targetHeight:h,elemWidth:u,elemHeight:r,collisionPosition:p,collisionWidth:w,collisionHeight:x,offset:n,my:i.my,at:i.at})
}});
if(f.fn.bgiframe){s.bgiframe()
}s.offset(f.extend(v,{using:i.using}))
})
};
f.ui.position={fit:{left:function(h,i){var k=f(window),j=i.collisionPosition.left+i.collisionWidth-k.width()-k.scrollLeft();
h.left=j>0?h.left-j:Math.max(h.left-i.collisionPosition.left,h.left)
},top:function(h,i){var k=f(window),j=i.collisionPosition.top+i.collisionHeight-k.height()-k.scrollTop();
h.top=j>0?h.top-j:Math.max(h.top-i.collisionPosition.top,h.top)
}},flip:{left:function(i,k){if(k.at[0]===a){return
}var m=f(window),l=k.collisionPosition.left+k.collisionWidth-m.width()-m.scrollLeft(),h=k.my[0]==="left"?-k.elemWidth:k.my[0]==="right"?k.elemWidth:0,j=k.at[0]==="left"?k.targetWidth:-k.targetWidth,n=-2*k.offset[0];
i.left+=k.collisionPosition.left<0?h+j+n:l>0?h+j+n:0
},top:function(i,k){if(k.at[1]===a){return
}var m=f(window),l=k.collisionPosition.top+k.collisionHeight-m.height()-m.scrollTop(),h=k.my[1]==="top"?-k.elemHeight:k.my[1]==="bottom"?k.elemHeight:0,j=k.at[1]==="top"?k.targetHeight:-k.targetHeight,n=-2*k.offset[1];
i.top+=k.collisionPosition.top<0?h+j+n:l>0?h+j+n:0
}}};
if(!f.offset.setOffset){f.offset.setOffset=function(l,i){if(/static/.test(f.curCSS(l,"position"))){l.style.position="relative"
}var k=f(l),n=k.offset(),h=parseInt(f.curCSS(l,"top",true),10)||0,m=parseInt(f.curCSS(l,"left",true),10)||0,j={top:(i.top-n.top)+h,left:(i.left-n.left)+m};
if("using" in i){i.using.call(l,j)
}else{k.css(j)
}};
f.fn.offset=function(h){var i=this[0];
if(!i||!i.ownerDocument){return null
}if(h){return this.each(function(){f.offset.setOffset(this,h)
})
}return c.call(this)
}
}}(jQuery));
(function(e,a,b,d,f,g,c,h){if(!e[c]){(function(ax,Q,K,s,v,M,ag,am,X,W,ap,N,q,r,aa){function R(i,ay){throw [c,i,ay].join(": ")
}function af(){ab(E[K](arguments,0),{},{},aq);
return af
}af.run=af;
var A=a[ag]("head")[0]||a.documentElement,l={}.toString,E=[].slice,z=/loaded|complete/,p;
function aq(){}function Z(ay,i){setTimeout(function(){ay[g](i||e,E[K](arguments,2))
},0);
return af
}af.later=Z;
for(p in {Array:1,Function:1,String:1}){(function(i,ay){ay="[object "+i+"]";
af["is"+i]=function(az){return l[K](az)===ay
}
})(p)
}var O=af.isArray,F=af.isFunction,w=af.isString;
function ai(){var az=[],ay;
while(ak[X]){ay=ak.shift();
try{if(ay[0][g](E[K](ay,1))!==d){az[q](ay)
}}catch(i){}}ak=az;
if(!ak[X]){clearInterval(ad)
}}var ad,ak=[],ae=af.poll=function(i){if(F(i)){if(!ak[X]){ad=setInterval(ai,13)
}ak[q](arguments)
}return af
};
var T=[],x=d,S=d,t=d;
function av(){while(T[X]){args=T.shift();
args[0][g](a,E[K](args,1))
}t=d
}function H(){if((!a[r]||a[r]==="complete")&&a.body){S=t=b;
Z(av);
return d
}}function m(i){if(F(i)){T[q](arguments);
if(!x){x=b;
if(!H()){ae(H)
}}else{if(S&&!t){t=b;
av()
}}}return d
}function aj(i){var ay={};
return function(aB,az){var aA=arguments[X];
if(aA>1){if(az===d){if(ay[aB]){delete ay[aB]
}}else{if(i){i[g](ay,arguments)
}else{ay[aB]=az
}}}else{if(aB===d){ay={}
}else{if(aA){return ay[aB]
}}}return af
}
}var al=af.property=aj();
var y={},k=function(i,ay,az){B(i+"("+ay+")",function(aA){return function(aB){az(aA,aB);
return d
}
});
y[i]=B(i);
B(i,d)
},B=af.functor=aj(function(aI,az){var aA=/^([^$()]+)(?:\(([|SOF+]*)\))?$/.exec(aI);
if(aA){if(F(az)){var aD=this,ay=aA[1],aC=aD[ay]=aD[ay]||function(aK,i){var aL=aK,aJ=this;
if(aL){if(aH[N]&&w(aL)){if(aH[N]!==aF){aF=aH[N];
aG=C(aF)
}aL=function(aM){aG({url:aK},aM);
return d
}
}else{if(w(aL)&&(aH.S||aH.O)){if(aH.S){aL=aH.S[K](aJ,aL,i)
}else{if(aH.O){aL=aH.O[K](aJ,{url:aL},i)
}}}else{if(aL.url&&aH.O){aL=aH.O[K](aJ,aL,i)
}else{if(aH.F){aL=aH.F[K](aJ,F(aL)?aL:function(aN,aM){ab(aK,this,aM,aN);
return d
},i)
}}}}}return aL
},aG=aC.A,aH=aC.S=aC.S||{},aF=aH[N],aE=(aA[2]||"F|S|O").split(/\|/),aB=aE[X];
while(aB--){aH[aE[aB]]=az
}}}});
var au=af.rule=aj(function(aC){var aB=this,i=d,ay=[],aA=aB[aC]=aB[aC]||function(aG,aD){if(aG&&aG!==aq){ay[q](aG)
}if(!i){i=b;
var aF=this;
(function aE(){if(az[X]){ab(az.splice(0,az[X]),aF,aD,aE)
}else{if(ay[X]){while(ay[X]){(ay.shift())()
}aE()
}else{i=d
}}})()
}return d
},az=aA.A=aA.A||[];
az[q](E[K](arguments,1))
});
function ab(aG,az,aE,aF){var ay,aA;
if(aG){if(aG.O&&aF){aF();
aF=aq
}if(aG[s]){az=aG;
aG=aG[s]
}if(aG[aa]){ay=aG[aa]
}else{if(w(aG)){ay=aG
}}if(ay){ay=I(ay,az,aE);
if(w(ay)){if(w(aG)){aG={url:ay}
}else{aG[aa]=ay
}o(aG,aF)
}else{ab(ay,az,aE,aF)
}}else{if(F(aG)){if(aG[K](az,aF,aE)!==d){aF()
}}else{if(O(aG)&&(aA=aG[X])){if(aG.P){var aC=0,aD=aA;
while(aC<aA){ab(aG[aC++],az,aE,function(){if(!--aD){aF()
}})
}}else{function aB(aH){if(aH<aA){ab(aG[aH++],az,aE,function(){aB(aH)
})
}else{aF()
}}aB(0)
}}else{aF()
}}}}else{aF()
}}var P=/\s+/,D={},at=1,ah=2,ar=3,ao=4,G=5,Y=6,J="0 > >| ( ) (( ))".split(P),an=J[X];
for(;
--an;
D[J[an]]=an){}function V(aC){aC=aC.split(P);
var aB=0,aE=aC[X],ay=[],az=[],aF=az,aA,aD;
aF.P=b;
for(;
aB<aE;
aB++){if(aD=aC[aB]){if(D[aD]){aD=D[aD];
if(aD===at||aD===ah){if(aD===ah){aF[q](m)
}if(aF[X]){aA=aF.splice(0,aF[X]);
aA.P=aF.P;
aF[q](aA,[]);
aF.P=d;
aF=aF[1];
aF.P=b
}}else{if(aD===ar||aD===G){aA=[];
aF[q](aA);
ay[q](aF);
aF=aA;
aF.P=b;
aF.O=aD===G
}else{if(aD===ao||aD===Y){if(ay[X]){aF=ay.pop()
}else{R("unexpected symbol",aC[aB])
}}}}}else{aF[q](aD)
}}}return az
}function j(aD,ay,aE){var aA,az,aB={},i=0,aC;
function aF(aG){aC=/^ { ([0-9]+) } $/.exec(aG);
return aC?aB[1*aC[1]]:aG.replace(/ { ([0-9]+) } /g,function(aH,aI){aC=aB[1*aI];
if(!w(aC)){R("type mismatch","string expected")
}return aC
})
}while(!aA){aA=b;
aD=aD.replace(/\$([^$()]*)\(([^$()]*)\)/g,function(aI,aH,aG){aA=d;
if(aH&&!(az=y[aH]||B(aH))){R("unknown functor",aH)
}aG=aF(aG);
if(w(aG)){aG=I(aG,ay,aE)
}aB[++i]=aH?az[K](ay,aG,aE):al(aG);
if(w(aB[i])){aB[i]=I(aB[i],ay,aE)
}return" { "+i+" } "
})
}return aF(aD)
}function I(az,aA,i){var ay;
if(P.test(az)){ay=V(az)
}else{if(ay=aA[az]||au(az)){ay=w(ay)?I(ay,aA,i):ay
}else{ay=j(az,aA,i)
}}return ay
}function L(i){var ay={},az={};
return function(aC,aF){var aA={},aE,aB=aC[aa],aD;
if(aC[Q]===d){for(aD in aC){aA[aD]=aC[aD]
}aC=aA;
aC[aa]+=(/\?/.test(aB)?"&":"?")+"_="+(new Date()).getTime();
i(aC,aF)
}else{if(ay[aB]){aF()
}else{if(aE=az[aB]){aE[q](aF)
}else{az[aB]=aE=[aF];
i(aC,function(){while(aE[X]){(aE.shift())()
}delete az[aB];
ay[aB]=b
})
}}}}
}function C(ay){var az={},i=d;
return L(function(aA,aB){az[aA[aa]]=aB;
if(!i){i=b;
Z(function(){var aE=[],aC,aD=az;
az={};
i=d;
for(aC in aD){aE[q](aC)
}ab(ay(aE),{},{},function(){for(aC in aD){aD[aC]()
}})
})
}})
}var o=L(function(az,aA){var ay=a[M]("script"),i;
ay[ax]=ax;
if(az[v]){ay[v]=az[v]
}ay.src=az[aa];
ay[W]=ay[ap]=function(){if(!(i=ay[r])||z.test(i)){ay[W]=ay[ap]=f;
A.removeChild(ay);
if(aA){Z(aA)
}}};
A.insertBefore(ay,A.firstChild)
});
var n=L(function(i,aA){var ay=a[M]("link"),az=i.title;
ay.rel="stylesheet";
ay.type="text/css";
ay.media=i.media||"screen";
ay[am]=i[aa];
if(i[v]){ay[v]=i[v]
}ac(ay,function(){if(az){ay.title=az
}aA()
});
A.appendChild(ay)
}),u=0,aw={},U=function(){var aD,aA,aC=a.styleSheets,ay,az=aC[X];
while(az--){aA=aC[az];
if((ay=aA[am])&&(aD=aw[ay])){try{aD.r=aA.cssRules;
throw"SECURITY"
}catch(aB){if(/SECURITY/.test(aB)){Z(aD);
delete aw[ay];
if(!--u){return d
}}}}}},ac=function(i,ay){if(i[r]){i[ap]=function(){if(z.test(i[r])){i[ap]=f;
ay()
}}
}else{if(i[W]===f&&i.all){i[W]=function(){i[W]=f;
ay()
}
}else{aw[i[am]]=ay;
if(!u++){ae(U)
}}}};
k("css","O",n);
e[c]=af
})[g](e,"async cache call chain charset createElement getElementsByTagName href length onload onreadystatechange + push readyState url".split(" "))
}})(window,document,!0,!1,null,"apply","dominoes");
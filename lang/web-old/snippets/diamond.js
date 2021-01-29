#!/usr/bin/env node

function m(r){return d="123456789",str=d.substring(0,r),len=str.length,o=len>1?str+rev(str):str,sum=1,Array(12-len).join(" ")+o}function rev(r){for(var n=r.length-1,o="";n>=0;o+=r[n--]);return o}for(i=1;10>i;i++)console.log(m(i));for(i=8;i>0;i--)console.log(m(i));

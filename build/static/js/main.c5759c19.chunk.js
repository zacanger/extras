(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(3),o=n.n(a),i=n(4),s=n(5),c=n(7),l=n(6),u=n(8),p=n(1),m=n.n(p),d=m()("section")({background:"white",padding:"24px 16px",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",maxWidth:"1500px",marginLeft:"auto",marginRight:"auto"}),g=m()("span")({color:"gold",content:"star"}),f=function(){return r.createElement(g,null," \u2605")},h=function(e){var t=e.stars;return r.createElement("span",null,t," ",r.createElement(f,null))},x=m()("div")({color:"#444",fontSize:"14px"}),v=m()("article")({":hover,:focus":{boxShadow:"0 8px 16px 0 rgba(0, 0, 0, 0.15)",transform:"translate(1px, -1px)"},margin:"8px",maxHeight:"400px",overflow:"hidden",boxShadow:"2px 2px 4px #999",transition:".2s ease-in-out transform, .2s ease-in-out box-shadow",display:"flex",flexDirection:"column",padding:"8px",width:"300px",height:"150px",maxWidth:"300px",minWidth:"200px"}),b=m()("a")({textDecoration:"none",marginBottom:"8px",color:"#2cc1ed",":hover":{textDecoration:"underline"}}),y=m()("span")({fontSize:"14px",marginBottom:"16px"}),w=function(e){return r.createElement(v,{key:e.name},r.createElement(b,{href:e.url,target:"blank",rel:"noopener noreferrer"},e.name),r.createElement(y,null,r.createElement(h,{stars:e.stars}),e.language&&r.createElement(r.Fragment,null," ","\xb7 ",r.createElement("span",null,e.language))),r.createElement(x,null,e.description))},E=function(e){return r.createElement(d,null,e.repos.map(function(e){return r.createElement(w,Object.assign({},e,{key:e.name}))}))},S=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(c.a)(this,Object(l.a)(t).call(this,e))).state={repos:[]},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"getFromStorage",value:function(){try{var e=JSON.parse(localStorage.getItem("angrytech"));if((new Date-new Date(e.date))/36e5<=24)return Promise.resolve(e.repos)}catch(t){return Promise.resolve([])}}},{key:"setInStorage",value:function(e){try{localStorage.setItem("angrytech",JSON.stringify({repos:e,date:new Date}))}catch(t){}}},{key:"componentDidMount",value:function(){var e=this,t=document.createElement("style");t.innerHTML='\nhtml, body {\n  margin: 0;\n  padding: 0;\n  font-family: "Proxima Nova", "Montserrat", "Helvetica Neue", "Noto Sans", sans-serif;\n  box-sizing: border-box;\n}\n',document.head.appendChild(t),this.getFromStorage().then(function(t){t&&t.length?e.setState({repos:t}):fetch("https://api.github.com/users/zacanger/repos?sort=updated").then(function(e){return e.json()}).then(function(t){var n=t.filter(function(e){return!e.fork&&!e.archived}).map(function(e){var t=e.description,n=e.html_url;return{description:t,language:e.language,name:e.name,stars:e.stargazers_count,url:n}}).sort(function(e,t){return t.stars-e.stars});e.setInStorage(n),e.setState({repos:n})})})}},{key:"render",value:function(){return r.createElement("div",null,r.createElement(E,{repos:this.state.repos}))}}]),t}(r.Component);o.a.render(r.createElement(S,null),document.getElementById("root"))},9:function(e,t,n){e.exports=n(19)}},[[9,2,1]]]);
//# sourceMappingURL=main.c5759c19.chunk.js.map
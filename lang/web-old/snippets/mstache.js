module.exports=(s,c)=>s.split(/\{\{|\}\}/).map((t,i)=>!(i%2)?t:c[t]).join('')

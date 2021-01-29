const {r,g,b,w,c,m,y,k}=[['r',1],['g',2],['b',4],['w',7],['c',6],['m',5],['y',3],['k',0]].reduce((p,c)=>({...p,[c[0]]:f=>`\x1b[3${c[1]}m${f}\x1b[0m`}),{})
console.log(`${r('hello')}`)

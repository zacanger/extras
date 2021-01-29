// <script type="text/javascript">
// this is a neat little globe animation on the canvas yo

var
  d       = document
, canvas  = d.body.appendChild(d.createElement('canvas'))
, context = canvas.getContext('2d')
, time    = 0
, w       = canvas.width  = innerWidth
, h       = canvas.height = innerHeight
, m       = Math
, cos     = m.cos
, sin     = m.sin
, PI      = m.PI

setInterval(function(){ // main animation loop
  canvas.width = canvas.width // clear
  time += .1
  i = 10000 // number of particles to generate
  while(i--){
    // math. i mean, magic. but math.
    r = (w+h)/2 * (cos((time + i) * (.05 + (sin(time/100000) / PI * .2 ))) / PI)
    context.fillRect(sin(i) * r + w/2
  , cos(i) * r + h/2
  , 1.5
  , 1.5)
  }
}, 16)
//</script>


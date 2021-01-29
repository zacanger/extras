$(document).ready(function() {
  $('div').click(function() {
    $('.square').each(function() {
      $(this).css('background',randomColor());
    });
  });
});

var colors = ['00','33','66','99','cc','ff'];
var rand = function() {
    return Math.floor(Math.random()*6);
};
var randomColor = function() {
    var r = colors[rand()];
    var g = colors[rand()];
    var b = colors[rand()];
    return "#"+r+g+b;
};



dy(function() {
​
​
$('.row-one').on('click', function() {
	$(this).css('background-color', 'pink');
	$('.row-one').not($(this)).css('background-color', 'yellow');
});
​
$('.row-two').on('click', function() {
	$(this).css('background-color', 'black');
	$('.row-two').not($(this)).css('background-color', 'limegreen');
});
​
$('.row-three').on('click', function() {
	$(this).css('background-color', 'white');
	$('.row-three').not($(this)).css('background-color', 'skyblue');
});
	
​
});


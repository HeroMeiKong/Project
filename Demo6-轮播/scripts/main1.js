var allButtons = $('#buttons > span')
for (let i = allButtons.length - 1; i >= 0; i--) {
	$(allButtons[i]).on('click',function(x){
		var index = $(x.currentTarget).index();
		var p = index * -200;
		$('#images').css({
			transform: 'translateX('+ p + 'px)'
		})
		n = index;
		activeButton(allButtons.eq(n));
	})
}

var n = 0;
var size = allButtons.length;
playSlide(n % size);
var timerID = setTimer();

function setTimer(){
	return setInterval(() => {
		n += 1;
		playSlide(n % size);
	},3000);
}

function playSlide(index){
	allButtons.eq(index).trigger('click');
}

function activeButton($button){
	$button.addClass('highlight').siblings('.highlight').removeClass('highlight');
}

$('.window').on('mouseenter',function(){
	window.clearInterval(timerID);
})

$('.window').on('mouseleave',function(){
	timerID = setTimer();
})
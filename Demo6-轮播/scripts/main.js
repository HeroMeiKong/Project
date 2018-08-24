var allButtons = $('#buttons > span')
for (var i = allButtons.length - 1; i >= 0; i--) {
	$(allButtons[i]).on('click',function(x){
		var index = $(x.currentTarget).index();
		var p = index * -200;
		$('#images').css({
			transform: 'translate('+ p + 'px)'
		})
		n = index;
		allButtons.eq(n).addClass('highlight').siblings('.highlight').removeClass('highlight');
	})
}
var n = 0;
var size = allButtons.length;
allButtons.eq(n % size).trigger('click').addClass('highlight').siblings('.highlight').removeClass('highlight');
var timerID = setInterval(() => {
	n += 1;
	allButtons.eq(n % size).trigger('click').addClass('highlight').siblings('.highlight').removeClass('highlight');
},2000);

$('.window').on('mouseenter',function(){
	window.clearInterval(timerID);
})

$('.window').on('mouseleave',function(){
	timerID = setInterval(() => {
	n += 1;
	allButtons.eq(n % size).trigger('click').addClass('highlight').siblings('.highlight').removeClass('highlight');
},2000);
})
var allButtons = $('#menu ul li div')
for (let i = allButtons.length - 1; i >= 0; i--) {
	$(allButtons[i]).on('click',function(x){
		var p = i * -920;
		$('#images').css({
			transform: 'translateX('+ p + 'px)'
		})
	})
}

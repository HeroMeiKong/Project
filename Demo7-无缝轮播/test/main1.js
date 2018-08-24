let n;
initImage()
setInterval(() =>{
	makeLeave(getImage(n))
	.one('transitionend',(e) =>{
		makeEnter($(e.currentTarget))
	})
	makeShowMe(getImage(n+1))
	n += 1
},2000)

function getImage(n){
	return $(`.images > img:nth-child(${x(n)})`)
}

function x(n){
	if(n > 6){
		n = n%6
		if(n===0){
			n =6;
		}
	}
	return n;
}

function initImage(){
	n = 1;
	$(`.images > img:nth-child(${n})`).addClass('showMe')
	.siblings().addClass('enter')

}

function makeShowMe($node){
	return $node.removeClass('enter leave').addClass('showMe')
}
function makeLeave($node){
	return $node.removeClass('enter showMe').addClass('leave')
}
function makeEnter($node){
	return $node.removeClass('showMe leave').addClass('enter')
}
/*setTimeout(function(){
	$('.images>img:nth-child(2)').removeClass('showMe').addClass('leave')
	.one('transitionend',function(e){
		$(e.currentTarget).removeClass('leave').addClass('enter')
	})
	$('.images>img:nth-child(3)').removeClass('enter').addClass('showMe')
},4000)

setTimeout(function(){
	$('.images>img:nth-child(3)').removeClass('showMe').addClass('leave')
	.one('transitionend',function(e){
		$(e.currentTarget).removeClass('leave').addClass('enter')
	})
	$('.images>img:nth-child(1)').removeClass('enter').addClass('showMe')
},6000)*/
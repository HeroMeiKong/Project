let $buttons = $('#buttonWrapper > button');
let $slides = $('#slides');
let current = 0;
let $images = $slides.children('img');

makeFakeSlides()
$slides.css({transform: 'translateX(-200px)'})
bindEvents()

$(previous).on('click',function(){
	gotoSlide(current-1)
})
$(next).on('click',function(){
	gotoSlide(current+1)
})

let timer = setInterval(function(){
	gotoSlide(current+1)
},2000)

$('.container').on('mouseenter',function(){
	window.clearInterval(timer)
}).on('mouseleave',function(){
	timer = setInterval(function(){
		gotoSlide(current+1)
	},2000)
})

function bindEvents(){
	$('#buttonWrapper').on('click','button',function(e){
		let $button = $(e.currentTarget)
		let index = $button.index()
		gotoSlide(index)
	})
}

function gotoSlide(index){
	if(index > $buttons.length-1){
		index = 0;
	}else if(index < 0){
		index = $buttons.length - 1
	}
	if(current === $buttons.length-1 && index === 0){
		$slides.css({transform: `translateX(${-($buttons.length + 1)*200}px)`})
		.one('transitionend',function(){
			$slides.hide().offset()
			$slides.css({transform: `translateX(${-(index+1)*200}px)`}).show()
		})
	}else if (current === 0 && index === $buttons.length-1) {
		$slides.css({transform: 'translateX(0px)'})
		.one('transitionend',function(){
			$slides.hide().offset()
			$slides.css({transform: `translateX(${-(index+1)*200}px)`}).show()
		})
	}else{
		$slides.css({transform: `translateX(${-(index+1)*200}px)`})
	}
	current = index;
}
function makeFakeSlides(){
	let $firstCopy = $images.eq(0).clone(true);
	let $lastCopy = $images.eq($images.length-1).clone(true);

	$slides.append($firstCopy)
	$slides.prepend($lastCopy)
}
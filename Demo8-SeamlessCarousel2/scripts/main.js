let $buttons = $('#buttons > button');
let $slides = $('#slides');
let current = 0;
let $images = $slides.children('img');
let $firstCopy = $images.eq(0).clone(true);
let $lastCopy = $images.eq($images.length-1).clone(true);

$slides.append($firstCopy)
$slides.prepend($lastCopy)

$slides.css({transform: 'translateX(-200px)'})

$buttons.eq(0).on('click',function(){
	if(current == 2){
		$slides.css({transform: 'translateX(-800px)'})
		.one('transitionend',function(){
			$slides.hide().offset()
			$slides.css({transform: 'translateX(-200px'}).show()
		})
	}else{
		$slides.css({transform: 'translateX(-200px)'})
	}
	current = 0;
})
$buttons.eq(1).on('click',function(){
	$slides.css({transform: 'translateX(-400px)'})
	current = 1;
})
$buttons.eq(2).on('click',function(){
	if(current == 0){
		$slides.css({transform: 'translateX(0)'})
		.one('transitionend',function(){
			$slides.hide().offset()
			$slides.css({transform: 'translateX(-600px'}).show()
		})
	}else{
		$slides.css({transform: 'translateX(-600px)'})
	}
	current = 2;
})
!function(){
  var duration = 50;
  $('.actions').on('click','button',function(e){
    let $button = $(e.currentTarget)
    let speed = $button.attr('data-speed')
    $button.addClass('active').siblings('.active').removeClass('active')
    switch(speed){
      case 'slow':
        duration = 100
        break
      case 'normal':
        duration = 50
        break
      case 'fast':
        duration = 10
        break
      default:
        duration = 50
    }
  })
  function writeCode(code,fn){
    let container = document.querySelector('#code')
    let styleTag = document.querySelector('#styleTag')
    let n = 0
    setTimeout(function controllerSpeed(){
      n += 1
      container.innerHTML = code.substring(0,n)
      styleTag.innerHTML = code.substring(0,n)
      container.scrollTop = container.scrollHeight
      if(n<code.length){
        setTimeout(controllerSpeed,duration)
      }else{
        fn && fn.call()
      }
    },duration)
  }
  let code = `
  /*画皮卡丘的皮肤*/
  .preview{
    height: 100%;
    border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FEE433;
  }
  .wrapper{
    width: 100%;
    height: 165px;
    position: relative;
  }
  /*画皮卡丘的鼻子*/
  .nose{
    height: 0px;
    width: 0px;
    border-style: solid;
    border-width: 12px;
    border-color:black transparent transparent transparent;
    border-radius: 11px;
    position: absolute;
    left: 50%;
    top: 28px;
    margin-left: -12px;
  }
  /*画皮卡丘的眼睛*/
  .eye{
    width: 49px;
    height: 49px;
    border: 2px solid black;
    border-radius: 50%;
    background: #2e2e2e;
    position: absolute;
  }
  .eye::before{
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    border: 2px solid black;
    background: white;
    position: absolute;
    border-radius: 50%;
    left: 6px;
    top: 0px;
  }
  .eye.left{
    right: 50%;
    margin-right: 90px;
  }
  .eye.right{
    left: 50%;
    margin-left: 90px;
  }
  /*画皮卡丘的酒窝*/
  .face{
    width:68px;
    height: 68px;
    border: 2px solid black;
    background: #FC0D1C;
    border-radius: 50%;
    position: absolute;
    top: 85px;
  }
  .face.left{
    right: 50%;
    margin-right: 116px;
  }
  .face.right{
    left: 50%;
    margin-left: 116px;
  }
  /*画皮卡丘的上嘴唇*/
  .upperLip{
    height: 30px;
    width: 70px;
    border: 2px solid black;
    position: absolute;
    top: 43px;
    background: #FEE433;
  }
  .upperLip.left{
    right: 50%;
    transform: rotate(-25deg);
    border-top: none;
    border-right: none;
    border-bottom-left-radius: 60px 30px; 
    margin-right: 2px;
  }
  .upperLip.right{
    left: 50%;
    transform: rotate(25deg);
    border-top: none;
    border-left: none;
    border-bottom-right-radius: 60px 30px; 
    margin-left: 2px;
  }
  /*画皮卡丘的下嘴唇*/
  .lowerLip-wrapper{
    height: 110px;
    width: 300px;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    bottom: 0;
    overflow: hidden;
  }
  .lowerLip{
    height: 3000px;
    width: 300px;
    background: #990513;
    border: 2px solid black;
    position: absolute;
    bottom: 0;
    border-radius: 300px/3000px;
    overflow: hidden;
  }
  .lowerLip::after{
    content: '';
    position: absolute;
    bottom: -20px;
    width: 100px;
    height: 100px;
    background: #FC4A62;
    left: 50%;
    margin-left: -50px;
    border-radius: 50%;
  }
  /*这样就画完了这只可爱的皮卡丘*/`
  writeCode(code)
}.call()
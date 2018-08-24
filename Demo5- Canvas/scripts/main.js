var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');


autoSetCanvasSize(yyy)

listenToMouse(yyy)

var eraserEnabled = false
var circleShape = true
var defaultColor = 'black'
let nodes = document.querySelectorAll('#actions')
changeLineWidth(nodes)

let colors = document.querySelectorAll('#colors')
changeColor(colors)

clear.onclick = function () {
  context.clearRect(0, 0, yyy.width, yyy.height)
}
download.onclick = function () {
  fillCanvasBackgroundWithColor(yyy, 'white');
  let url = yyy.toDataURL("image/png")
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的作品'
  a.target = '_blank'
  a.click()
}

function fillCanvasBackgroundWithColor(canvas, color) {
  const context = canvas.getContext('2d');
  context.save();
  context.globalCompositeOperation = 'destination-over';
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

function changeColor(aim) {
  length = aim[0].children
  let activeicn = null
  for (i = 0; i < length.length; i++) {
    length[i].onclick = function (x) {
      if (eraserEnabled) {
        alert('您正在使用橡皮擦，不能更换颜色！')
      } else {
        activeicn = x.currentTarget
        activeicn.classList.add('active')
        defaultColor = x.currentTarget.id
        context.strokeStyle = defaultColor
        console.log(defaultColor)
        let siblings = allSiblings(activeicn)
        for (j = 0; j < siblings.length; j++) {
          siblings[j].classList.remove('active')
        }
      }
    }
  }
}

function changeLineWidth(aim) {
  length = aim[0].children
  let activeicn = null
  for (i = 0; i < length.length; i++) {
    length[i].onclick = function (x) {
      activeicn = x.currentTarget
      activeicn.classList.add('active')
      switch (x.currentTarget.id) {
        case 'pensmall':
          context.lineWidth = 1
          eraserEnabled = false
          context.strokeStyle = defaultColor
          break
        case 'penmiddle':
          context.lineWidth = 3
          eraserEnabled = false
          context.strokeStyle = defaultColor
          break
        case 'penbig':
          context.lineWidth = 5
          eraserEnabled = false
          context.strokeStyle = defaultColor
          console.log(defaultColor)
          console.log(context.strokeStyle)
          break
        case 'eraser-circle':
          context.lineWidth = 5
          eraserEnabled = true
          circleShape = true
          context.strokeStyle = 'white'
          break
        case 'eraser-rect':
          context.lineWidth = 5
          eraserEnabled = true
          circleShape = false
          context.strokeStyle = 'white'
          break
        default:
          break
      }
      let siblings = allSiblings(activeicn)
      for (j = 0; j < siblings.length; j++) {
        siblings[j].classList.remove('active')
      }
    }
  }
}

function allSiblings(context) {
  var siblings = [];
  var parent = context.parentNode;
  var childs = parent.children;
  for (var i = 0; i < childs.length; i++) {
    if (childs[i] !== context) {
      siblings.push(childs[i])
    }
  }
  return siblings;
}

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}


function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function drawClear(x1, y1, x2, y2) {
  context.lineWidth = 6
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  var eraserPoint = {
    x: undefined,
    y: undefined
  }
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        if (circleShape) {
          context.globalCompositeOperation = 'destination-out';
          context.strokeStyle = "#000";
          context.beginPath();
          context.arc(x, y, 5, 0, Math.PI * 2);
          context.fill();
        } else {
          context.clearRect(x - 5, y - 5, 10, 10)
        }
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        if (circleShape) {
          context.globalCompositeOperation = 'destination-out';
          context.strokeStyle = "#000";
          context.beginPath();
          context.arc(x, y, 5, 0, Math.PI * 2);
          context.fill();
        } else {
          context.clearRect(x - 5, y - 5, 10, 10)
        }
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      context.fillStyle = '#FFFFFF'
      if (eraserEnabled) {
        if (circleShape) {
          context.beginPath();
          context.arc(x, y, 3, 0, Math.PI * 2);
          context.fill();
          context.closePath()
        } else {
          context.clearRect(x - 3, y - 3, 6, 6)
        }
        eraserPoint = {
          "x": x,
          "y": y
        }
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.strokeStyle = 'white'
        context.clearRect(x - 3, y - 3, 6, 6)
        let newPoint = {
          "x": x,
          "y": y
        }
        drawClear(eraserPoint.x, eraserPoint.y, newPoint.x, newPoint.y)
        eraserPoint = newPoint
      } else {
        let newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function () {
      using = false
    }
  }
}
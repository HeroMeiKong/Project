var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']
var lock = 0

generateKeyboard(keys, hash)
listenToUser(hash)
let keyboards = document.querySelectorAll('.key')
addActive(keyboards)
deleteActive(keyboards)
let texts = document.querySelectorAll('#texts')
search(texts)
let tool = document.querySelectorAll('#search > .searchcontext > .button')
searchTool(texts, tool)

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName) {
  return document.createElement(tagName)
}

function createSpan(textContent) {
  var span = tag('span')
  span.textContent = textContent
  span.className = "text"
  return span
}

function createButton(id) {
  var button = tag('button')
  button.textContent = '编辑'
  button.id = id
  button.onclick = function (aim) {
    var button2 = aim['target']
    var img2 = button2.previousSibling
    var key = button2['id']
    var x = prompt('给我一个网址(不加协议)')
    hash[key] = x
    img2.src = 'http://' + x + '/favicon.ico'
    img2.onerror = function (aim) {
      aim.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    localStorage.setItem('keyboardStorage', JSON.stringify(hash))
  }
  return button
}

function createImage(domain) {
  var img = tag('img')
  if (domain) {
    img.src = 'http://' + domain + '/favicon.ico'
  } else {
    img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  img.onerror = function (aim) {
    aim.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  return img
}

function init() {
  var keys = {
    0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    length: 3
  }
  var hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    'e': 'ele.me',
    'r': 'www.rstudio.com',
    't': 't.tt',
    'y': 'youtube.com',
    'u': 'www.uc.cn',
    'i': 'iqiyi.com',
    'o': 'opera.com',
    'p': 'www.pptv.com',
    'a': 'www.acfun.cn',
    's': 'www.sogou.com',
    'd': 'www.dilidili.wang',
    'f': 'www.facebook.com',
    'g': 'www.google.com',
    'h': 'www.douyu.com',
    'j': 'www.jd.com',
    'k': 'www.kugou.com',
    'l': 'lol.qq.com',
    'z': 'zhihu.com',
    'x': 'www.x.org',
    'c': 'www.cuit.edu.cn',
    'v': 'www.voices.com',
    'b': 'www.baidu.com',
    'n': 'www.netflix.com',
    'm': 'movie.yahoo-leisure.hk'
  }
  var hashInLocalStorage = getFromLocalStorage('keyboardStorage')
  if (hashInLocalStorage) {
    hash = hashInLocalStorage
  }
  return {
    "keys": keys,
    "hash": hash
  }
}

function generateKeyboard(keys, hash) {
  for (var index = 0; index < keys['length']; index = index + 1) {
    var div = tag('div')
    div.className = 'row'
    main.appendChild(div)
    var row = keys[index]
    for (var index2 = 0; index2 < row['length']; index2 = index2 + 1) {
      var span = createSpan(row[index2])
      var button = createButton(row[index2])
      var img = createImage(hash[row[index2]])
      var kbd = tag('kbd')
      kbd.className = 'key'
      kbd.appendChild(span)
      kbd.appendChild(img)
      kbd.appendChild(button)
      div.appendChild(kbd)
    }
  }
}

function listenToUser(hash) {
  document.onkeypress = function (aim) {
    var key = aim['key']
    var website = hash[key]
    if (lock) {} else {
      window.open('http://' + website, '_blank')
    }
  }
}

function addActive(keyboard) {
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].onmousedown = function (x) {
      x.currentTarget.classList.add('active');
    }
  }
}

function deleteActive(keyboard) {
  for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].onmouseup = function (x) {
      x.currentTarget.classList.remove('active');
    }
  }
}

function search(text) {
  for (let i = 0; i < text.length; i++) {
    text[i].onfocus = function () {
      lock = 1
    }
    text[i].onblur = function () {
      lock = 0
    }
  }
}

function searchTool(texts, tool) {
  for (let i = 0; i < tool.length; i++) {
    tool[i].onclick = function (aim) {
      if (i == 0) {
        window.open('http://www.baidu.com/s?wd= ' + texts[0].value, '')
      } else {
        window.open('http://www.google.com/search?q=' + texts[0].value, '')
      }
    }
  }
}
//把code写到#code和style标签里
function writeCss(prefix,code,fn){
  let domCode = document.querySelector('#code')
  let n = 0;
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n),Prism.languages.css)
    console.log(code)
    styleTag.innerHTML = prefix + code.substring(0,n)
    domCode.scrollTop = domCode.scrollHeight
    if(n >= code.length){
      window.clearInterval(id)
      fn && fn.call()
    }
  },200)
}
function writeMarkdown(markdown,fn){
  let dompaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    dompaper.innerHTML = markdown.substring(0,n)
    dompaper.scrollTop = dompaper.scrollHeight
    if(n >= markdown.length){
      window.clearInterval(id)
      fn && fn.call()
    }
  },100)
}
function createPaper(fn){
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}
function convertMarkdownToHtml(md,fn){
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}




var css1 = `/* 
 * 面试官你好，我叫杨昆
 * 我打算用代码来做自我介绍
 * 首先准备一些样式
 */
*{
  transition: all 0.3s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}
/* 我需要一点代码高亮 */
.token.selector{ color: #690; }
.token.property{ color: #905; }
/* 加一个呼吸效果 */
#code{
  animation: breath 0.75s infinite alternate-reverse;
}
/* 现在正式开始 */
/* 我需要一张白纸 */
#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
/* 于是我就可以在白纸上写字了，请看右边 */
`

var md = `
# 自我介绍
我叫杨昆,1994年12月出生,成都信息工程大学毕业,自学前端一年半,希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. 无缝轮播
2. 个人简历
3. Cavnas画板
# 联系方式
- QQ：1255309829
- Email：xiaopangfeng4@hotmail.com
- 手机: 18228277577
`
var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢您的耐心观看
 */
`

writeCss('',css1,() => {
  //call function
  createPaper(() => {
    writeMarkdown(md,() => {
      writeCss(css1,css2,() => {
        convertMarkdownToHtml(md,() => {
          writeCss(css1+css2,css3,() => {
            alert('介绍完毕')
          })
        })
      })
    })
  })
})

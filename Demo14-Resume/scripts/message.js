!function (){
  var model = {
    init: function (){
      var APP_ID = 'RXUUPp68EacDal2omal4h3lP-gzGzoHsz';
      var APP_KEY = '7JIhb6w2sDIausaNyaf4NqsH';
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function(){ 
      var query = new AV.Query('Message');
      var now = new Date();
      query.lessThanOrEqualTo('createdAt', now); //查询今天之前创建的 Todo
      query.limit(6);
      query.descending('createdAt');
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function(name, content){
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  // Promise 对象
        'name': name,
        'content': content
      })
    }
  }

  var view = document.querySelector('#siteMessageBoard')


  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view, model){
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function(){
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item)=> item.attributes )
          array.forEach((item)=>{
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        } 
      )
    },
    bindEvents: function(){
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function(){
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function(object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.childNodes[0].insertBefore(li)
        length = messageList.childNodes.length
        for(let i=1;i<length-1;i++){
          messageList.childNodes[i] = messageList.childNodes[i+1]
        }
        messageList.childNodes[length-1].removeChild(li);
        //messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }

  }

  controller.init(view, model)


}.call()
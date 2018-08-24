! function () {
  var specialTags = document.querySelectorAll('[data-x]');
  for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset');
  }
  findclosedAndRemoveOffset();
  window.addEventListener('scroll', function (x) {
    findclosedAndRemoveOffset();
  })

  function findclosedAndRemoveOffset() {
    let specialTags = document.querySelectorAll('[data-x]');
    let minIndex = 0;
    for (let i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i;
      }
    }
    specialTags[minIndex].classList.remove('offset');
    let id = specialTags[minIndex].id;
    let a = document.querySelector('a[href="#' + id + '"]');
    let li = a.parentNode;
    let brother = li.parentNode.children;
    for (let i = 0; i < brother.length; i++) {
      brother[i].classList.remove('highlight');
    }
    li.classList.add('highlight');
  }
  let liTags = document.querySelectorAll('nav.menu > ul > li');
  for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
      x.currentTarget.classList.remove('deactive');
      x.currentTarget.classList.add('active');
    }
    liTags[i].onmouseleave = function (x) {
      x.currentTarget.classList.remove('active');
      x.currentTarget.classList.add('deactive');
    }
  }
  let funliTags = document.querySelectorAll('nav.menu > ul > li > ul > li');
  addActive(funliTags);
  let worksDiv = document.querySelectorAll('#portfoliosAll div.portfolios');
  addActiveAll(worksDiv);
  let cssPortfolios = document.querySelectorAll('#portfoliosCSS >  div');
  addActive(cssPortfolios);
  let btn = document.querySelectorAll('#siteWorks .more .btn');
  addActive(btn);
  let blogImgs = document.querySelectorAll('#myBlog .Blogs .myBlog');
  addActive(blogImgs);
  
  let others = document.querySelectorAll('#siteOther .other-box li');
  for (let i = 0; i < others.length; i++) {
    others[i].onclick = function(x){
      console.log(x.currentTarget.classList)
      if(x.currentTarget.classList.value === ''){
        x.currentTarget.classList.add('active');
        console.log(1)
      }else{
        x.currentTarget.classList.remove('active');
        console.log(2)
      }
    }
  }

  
  function addActive(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active');
      }
      arr[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active');
      }
    }
  }
  function addActiveAll(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active');
        let length = x.currentTarget.children[1].children.length;
        let childrens = x.currentTarget.children[1].children;
        for( let j = 0 ;j < length;j++){
          childrens[j].classList.add('active');
        }
      }
      arr[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active');
        let length = x.currentTarget.children[1].children.length;
        let childrens = x.currentTarget.children[1].children;
        for( let j = 0 ;j < length;j++){
          childrens[j].classList.remove('active');
        }
      }
    }
  }
}.call()
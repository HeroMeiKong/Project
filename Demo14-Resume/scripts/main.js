setTimeout(function () {
  WelcomeAnimation.classList.remove('active');
}, 1000);
subbtn.addEventListener('click',(x)=>{
  window.location.reload();
  alert('添加成功')
})
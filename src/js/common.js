import '../css/common.less';
(function() {
  const welcome = (name) => {
    alert('hello:'+ name + 'hahaha')
  }
  window.functions = window.functions || {}
  return window.functions.welcome = welcome
})()
(function() {
  const welcome = (name) => {
    alert('hello:'+ name)
  }
  window.functions = window.functions || {}
  return window.functions.welcome = welcome
})()
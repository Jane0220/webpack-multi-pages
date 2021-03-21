(function() {
  const alert = (content) => {
    alert(content)
  }
  window.functions = window.functions || {}
  return window.functions.alert = alert
})()
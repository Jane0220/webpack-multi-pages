import '../css/main.css';
(function() {
  const getTotal = () => {
    const total = arguments.reduce((preValue, currentValue) => {
      return preValue + currentValue
    }, 0)
    const person1 = {
      name: 'Kimi',
      title: 'the king of Spa',
      age: 40
    }
    const person2 = {
      ...person1,
      age: 41
    }
    console.log('getTotal: ', total, person1, person2)
    return total
  }
  axios.get('/api/img/flexible/logo/pc/result@2.png')
  window.functions = window.functions || {}
  return window.functions.getTotal = getTotal
})()
import { getTime } from '../js/main'
import Vue from 'Vue'
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    time: getTime()
  }
})
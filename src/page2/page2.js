import { getTime } from '../js/main'
import Vue from 'Vue'
import { commonAlert } from '@/components/alert'
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    time: getTime(),
    alert: null
  },
  methods: {
    showAlert() {
      commonAlert.showAlert({
        title: 'alert 标题', 
        content: `${Date.now()} alert 内容，确认这些信息无误吗？`
      });
    },
    hideAlert() {
      commonAlert.hideAlert()
    }
  }
})


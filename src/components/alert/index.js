import { Component } from '@/components/base';
import '@/components/base/common.less';

class Alert extends Component {
  static name = 'alert-component';

  constructor({container} = {}) {
    super({
      container
    });
    const commonAlertWrap = document.getElementById('commonAlertWrap')
    commonAlertWrap.querySelector('.common-ui__action-confirm-btn').addEventListener('click', (ev) => {
      this.hideAlert();
      ev.preventDefault();
    })
  }

  showAlert({title = '', content = '', btnText = '确认'} = {}) {
    const commonAlertWrap = document.getElementById('commonAlertWrap')
    commonAlertWrap.querySelector('.common-ui__modal-header').innerText = title
    commonAlertWrap.querySelector('.common-ui__modal-body').innerText = content
    commonAlertWrap.querySelector('.common-ui__btn').innerText = btnText
    commonAlertWrap.className = 'common-ui__modal-wrap common-ui__modal-wrap-transition-show'
  }

  hideAlert() {
    const commonAlertWrap = document.getElementById('commonAlertWrap')
    const commonModalWrap = commonAlertWrap.querySelector('.common-ui__modal-box')
    commonAlertWrap.classList.remove('common-ui__modal-wrap-transition-show')
    function hideAnimation() {
      commonAlertWrap.classList.add('common-ui__hide')
    }
    commonModalWrap.addEventListener('transitionend', hideAnimation, false)
    commonModalWrap.addEventListener('webkitTransitionEnd', hideAnimation, false)
  }

  render() {
    return `<div class="common-ui__modal-wrap common-ui__hide" id="commonAlertWrap">
              <div class="common-ui__mask"></div>
              <div class="common-ui__modal-box">
                <div class="common-ui__modal-header"></div>
                <div class="common-ui__modal-body"></div>
                <div class="common-ui__modal-footer">
                  <a class="common-ui__btn common-ui__action-confirm-btn"></a>
                </div>
              </div>
            </div>`.trim()
  }
}

export const commonAlert = new Alert({container: document.querySelector('body')})
(self.webpackChunkwebpack_multi_pages=self.webpackChunkwebpack_multi_pages||[]).push([[864],{61:function(n,e,o){"use strict";o.d(e,{D:function(){return l}});var t=o(610),i=o(991),r=o(255),c=o(724),a=o(608),m=o(156);var u=function(n){(0,r.Z)(u,n);var e,o,m=(e=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,t=(0,a.Z)(e);if(o){var i=(0,a.Z)(this).constructor;n=Reflect.construct(t,arguments,i)}else n=t.apply(this,arguments);return(0,c.Z)(this,n)});function u(){var n,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=e.container;(0,t.Z)(this,u),n=m.call(this,{container:o});var i=document.getElementById("commonAlertWrap");return i.querySelector(".common-ui__action-confirm-btn").addEventListener("click",(function(e){n.hideAlert(),e.preventDefault()})),n}return(0,i.Z)(u,[{key:"showAlert",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.title,o=void 0===e?"":e,t=n.content,i=void 0===t?"":t,r=n.btnText,c=void 0===r?"确认":r,a=document.getElementById("commonAlertWrap");a.querySelector(".common-ui__modal-header").innerText=o,a.querySelector(".common-ui__modal-body").innerText=i,a.querySelector(".common-ui__btn").innerText=c,a.className="common-ui__modal-wrap common-ui__modal-wrap-transition-show"}},{key:"hideAlert",value:function(){var n=document.getElementById("commonAlertWrap"),e=n.querySelector(".common-ui__modal-box");function o(){n.classList.add("common-ui__hide")}n.classList.remove("common-ui__modal-wrap-transition-show"),e.addEventListener("transitionend",o,!1),e.addEventListener("webkitTransitionEnd",o,!1)}},{key:"render",value:function(){return'<div class="common-ui__modal-wrap common-ui__hide" id="commonAlertWrap">\n              <div class="common-ui__mask"></div>\n              <div class="common-ui__modal-box">\n                <div class="common-ui__modal-header"></div>\n                <div class="common-ui__modal-body"></div>\n                <div class="common-ui__modal-footer">\n                  <a class="common-ui__btn common-ui__action-confirm-btn"></a>\n                </div>\n              </div>\n            </div>'.trim()}}]),u}(o(242).w);(0,m.Z)(u,"name","alert-component");var l=new u({container:document.querySelector("body")})}}]);
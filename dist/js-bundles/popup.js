(()=>{"use strict";var n=function(n,e,t,r){return new(t||(t=Promise))((function(o,a){function l(n){try{c(r.next(n))}catch(n){a(n)}}function u(n){try{c(r.throw(n))}catch(n){a(n)}}function c(n){var e;n.done?o(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,u)}c((r=r.apply(n,e||[])).next())}))},e=function(n,e){var t,r,o,a,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;l;)try{if(t=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,r=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!((o=(o=l.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){l=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){l.label=a[1];break}if(6===a[0]&&l.label<o[1]){l.label=o[1],o=a;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(a);break}o[2]&&l.ops.pop(),l.trys.pop();continue}a=e.call(n,l)}catch(n){a=[6,n],r=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};function t(n){return"local"===n?chrome.storage.local:"sync"===n?chrome.storage.sync:null}function r(r){return void 0===r&&(r="local"),n(this,void 0,void 0,(function(){var n;return e(this,(function(e){switch(e.label){case 0:return(n=t(r))?[4,n.get()]:[2,null];case 1:return[2,e.sent()]}}))}))}function o(r,o){return void 0===o&&(o="local"),n(this,void 0,void 0,(function(){var n,a;return e(this,(function(e){switch(e.label){case 0:if(!(n=t(o)))return[2,null];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,n.set(r)];case 2:return e.sent(),[2,!0];case 3:return a=e.sent(),console.log(a),[2,!1];case 4:return[2]}}))}))}window.addEventListener("load",(function(n){return e=void 0,t=void 0,l=function(){var n,e;return function(n,e){var t,r,o,a,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;l;)try{if(t=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,r=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!((o=(o=l.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){l=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){l.label=a[1];break}if(6===a[0]&&l.label<o[1]){l.label=o[1],o=a;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(a);break}o[2]&&l.ops.pop(),l.trys.pop();continue}a=e.call(n,l)}catch(n){a=[6,n],r=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}}(this,(function(t){switch(t.label){case 0:return[4,o({showTags:"all"})];case 1:return n=t.sent(),console.log(n),[4,r("local")];case 2:return e=t.sent(),console.log(e),[2]}}))},new((a=void 0)||(a=Promise))((function(n,r){function o(n){try{c(l.next(n))}catch(n){r(n)}}function u(n){try{c(l.throw(n))}catch(n){r(n)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(n){n(t)}))).then(o,u)}c((l=l.apply(e,t||[])).next())}));var e,t,a,l}))})();
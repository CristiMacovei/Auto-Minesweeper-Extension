(()=>{"use strict";var e;!function(e){e[e.UNCOVERED=-1]="UNCOVERED",e[e.FLAG=-2]="FLAG",e[e.REVEAL_0=0]="REVEAL_0",e[e.REVEAL_1=1]="REVEAL_1",e[e.REVEAL_2=2]="REVEAL_2",e[e.REVEAL_3=3]="REVEAL_3",e[e.REVEAL_4=4]="REVEAL_4",e[e.REVEAL_5=5]="REVEAL_5",e[e.REVEAL_6=6]="REVEAL_6",e[e.REVEAL_7=7]="REVEAL_7",e[e.REVEAL_8=8]="REVEAL_8"}(e||(e={}));var n=function(){return n=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},n.apply(this,arguments)};function t(n){switch(n.split(" ")[1]){case"blank":return e.UNCOVERED;case"bombflagged":return e.FLAG;case"open0":return e.REVEAL_0;case"open1":return e.REVEAL_1;case"open2":return e.REVEAL_2;case"open3":return e.REVEAL_3;case"open4":return e.REVEAL_4;case"open5":return e.REVEAL_5;case"open6":return e.REVEAL_6;case"open7":return e.REVEAL_7;case"open8":return e.REVEAL_8;default:return null}}function r(e,n,t,r){return[{deltaRow:-1,deltaCol:0},{deltaRow:-1,deltaCol:1},{deltaRow:0,deltaCol:1},{deltaRow:1,deltaCol:1},{deltaRow:1,deltaCol:0},{deltaRow:1,deltaCol:-1},{deltaRow:0,deltaCol:-1},{deltaRow:-1,deltaCol:-1}].map((function(t){var r=t.deltaRow,o=t.deltaCol;return{row:e+r,col:n+o}})).filter((function(e){var n=e.row,o=e.col;return 0<=n&&n<t&&0<=o&&o<r}))}window.addEventListener("load",(function(o){return a=void 0,l=void 0,c=function(){var o;return function(e,n){var t,r,o,a,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;l;)try{if(t=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,r=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!((o=(o=l.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){l=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){l.label=a[1];break}if(6===a[0]&&l.label<o[1]){l.label=o[1],o=a;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(a);break}o[2]&&l.ops.pop(),l.trys.pop();continue}a=n.call(e,l)}catch(e){a=[6,e],r=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}(this,(function(a){return o=function(){for(var e=Array.from(document.querySelectorAll("div.square")),n=-1,t=-1,r=e.map((function(e){var r=e.id.split("_").map((function(e){return parseInt(e)})),o=r[0],a=r[1];return o>=n&&(n=o+1),a>=t&&(t=a+1),{div:e,row:o,col:a}})),o=[],a=0;a<n;++a){o.push([]);for(var l=0;l<t;++l)o[a].push(null)}return r.forEach((function(e){o[e.row][e.col]={tileDiv:e.div}})),{matrix:o,numRows:n-1,numCols:t-1}}(),console.log(o),setInterval((function(){var a,l,i,c=(a=o.matrix,l=o.numRows,i=o.numCols,[].concat(function(o,a,l){for(var i=[],c=function(c){for(var u=function(u){var f=t(o[c][u].tileDiv.className);if(null!==f&&f>=0){var s=r(c,u,a,l).map((function(e){return{pos:e,tileDiv:o[e.row][e.col].tileDiv}})),E=s.filter((function(n){return t(n.tileDiv.className)===e.FLAG})),v=s.filter((function(n){return t(n.tileDiv.className)===e.UNCOVERED}));v.length>0&&E.length===f&&(console.log(c,u),i=i.concat(v.map((function(e){var t=e.pos,r=e.tileDiv;return n(n({type:"reveal"},t),{tileDiv:r,reason:"(".concat(c,", ").concat(u,") fully flagged")})}))))}},f=0;f<l;++f)u(f)},u=0;u<a;++u)c(u);return i}(a,l,i)).concat(function(o,a,l){for(var i=[],c=function(c){for(var u=function(u){var f=t(o[c][u].tileDiv.className);if(null!==f&&f>=0){var s=r(c,u,a,l).map((function(e){return{pos:e,tileDiv:o[e.row][e.col].tileDiv}})),E=s.filter((function(n){return t(n.tileDiv.className)===e.FLAG})),v=s.filter((function(n){return t(n.tileDiv.className)===e.UNCOVERED})),p=f-E.length;v.length>0&&v.length===p&&(console.log(c,u),i=i.concat(v.map((function(e){var t=e.pos,r=e.tileDiv;return n(n({type:"flag"},t),{tileDiv:r,reason:"(".concat(c,", ").concat(u,") not flagged")})}))))}},f=0;f<l;++f)u(f)},u=0;u<a;++u)c(u);return i}(a,l,i)));console.log(c),o.matrix.forEach((function(e){return e.forEach((function(e){e.tileDiv.classList.remove("red"),e.tileDiv.classList.remove("green")}))})),c.forEach((function(e){e.tileDiv.classList.add("flag"===e.type?"red":"green")}))}),50),[2]}))},new((i=void 0)||(i=Promise))((function(e,n){function t(e){try{o(c.next(e))}catch(e){n(e)}}function r(e){try{o(c.throw(e))}catch(e){n(e)}}function o(n){var o;n.done?e(n.value):(o=n.value,o instanceof i?o:new i((function(e){e(o)}))).then(t,r)}o((c=c.apply(a,l||[])).next())}));var a,l,i,c}))})();
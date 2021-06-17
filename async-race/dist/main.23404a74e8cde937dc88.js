(()=>{"use strict";var t={38:(t,e,n)=>{t.exports=n.p+"assets/finish.svg"},473:(t,e,n)=>{n.r(e)},936:(t,e,n)=>{n.r(e)},173:(t,e,n)=>{n.r(e)},951:(t,e,n)=>{n.r(e)},20:(t,e,n)=>{n.r(e)},852:(t,e,n)=>{n.r(e)},292:(t,e,n)=>{n.r(e)},156:(t,e,n)=>{n.r(e)},721:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const a=n(833);n(936),e.default=class{constructor(){this.container=document.createElement("form"),this.container.classList.add("car-settings"),this.name=""}render(){var t,e,n,i,r,s,o,c,d,l,u,h,v;return this.container.innerHTML=`\n    <fieldset class="new-car">\n      <input class="car-name car-name_new" type="text"\n      value="${(null===(t=a.state.newCarData)||void 0===t?void 0:t.name)?null===(e=a.state.newCarData)||void 0===e?void 0:e.name:""}" \n      >\n      <input class="color-picker color-picker_new" type="color" value=\n      "${(null===(n=a.state.newCarData)||void 0===n?void 0:n.color)?null===(i=a.state.newCarData)||void 0===i?void 0:i.color:"#FFFFFF"}" \n      >\n      <button class="btn-car btn-car_new">Create</button>\n    </fieldset>\n    <fieldset class="update-car" \n      ${(null===(r=a.state.updateCarData)||void 0===r?void 0:r.id)?`data-id="${null===(s=a.state.updateCarData)||void 0===s?void 0:s.id}"`:""}\n    >\n      <input class="car-name car-name_update" type="text" \n        value="${(null===(o=a.state.updateCarData)||void 0===o?void 0:o.name)?null===(c=a.state.updateCarData)||void 0===c?void 0:c.name:""}" \n        ${(null===(d=a.state.updateCarData)||void 0===d?void 0:d.name)?"":"disabled"}\n      >\n      <input class="color-picker color-picker_update" type="color" \n      value=\n      "${(null===(l=a.state.updateCarData)||void 0===l?void 0:l.color)?null===(u=a.state.updateCarData)||void 0===u?void 0:u.color:"#FFFFFF"}" \n        ${(null===(h=a.state.updateCarData)||void 0===h?void 0:h.color)?"":"disabled"}\n      >\n      <button class="btn-car btn-car_update" \n        ${(null===(v=a.state.updateCarData)||void 0===v?void 0:v.id)?"":"disabled"}\n      >Update</button>\n    </fieldset>\n    <fieldset class="controls">\n      <button class="controls__btn controls__btn_race">Race</button>\n      <button class="controls__btn controls__btn_reset">Reset</button>\n      <button class="controls__btn controls__btn_generate">Generate Cars</button>\n    </fieldset>\n    `,this.addListeners(),this.container}addCar(t,e){return i(this,void 0,void 0,(function*(){const n=yield this.generateCarData(e);n&&(yield fetch("http://127.0.0.1:3000/garage",{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}})).ok&&t&&document.dispatchEvent(new CustomEvent("carsUpdated"))}))}updateCar(){var t;return i(this,void 0,void 0,(function*(){this.name="",(yield fetch(`http://127.0.0.1:3000/garage/${null===(t=a.state.updateCarData)||void 0===t?void 0:t.id}`,{method:"PUT",body:JSON.stringify(a.state.updateCarData),headers:{"Content-Type":"application/json"}})).ok&&document.dispatchEvent(new CustomEvent("carsUpdated"))}))}generateCarData(t){return t?this.carFromInputs():this.carFromCode()}carFromCode(){this.generateName();const t=`#${Math.floor(16777215*Math.random()).toString(16)}`,e=Math.round(1e8*Math.random());return{name:this.name,color:t,id:e}}generateName(){const t=`${["Tesla","Ford","Ferrari","Mitsubishi","Dads","Kia","BMW","Audi","Lada","Toyota"][Math.floor(10*Math.random())]} ${["Y","Mustang","Spider","Lancer","Glory","Rio","x5","A7","Vedro","Land-Cruiser"][Math.floor(10*Math.random())]}`;this.name=t}carFromInputs(){if(!a.state.newCarData.name||!a.state.newCarData.color)return;this.name=a.state.newCarData.name;const t=Math.round(1e8*Math.random());return{name:a.state.newCarData.name,color:a.state.newCarData.color,id:t}}addListeners(){var t,e,n,i,r,s,o,c,d;null===(t=this.container.querySelector(".btn-car_new"))||void 0===t||t.addEventListener("click",(t=>{t.preventDefault(),this.addCar(!0,t)})),null===(e=this.container.querySelector(".controls__btn_generate"))||void 0===e||e.addEventListener("click",(t=>{t.preventDefault();for(let t=0;t<99;t++)this.addCar(!1);this.addCar(!0)})),document.addEventListener("selectedCar",(()=>{if(a.state.updateCarData){const{name:t,color:e,id:n}=a.state.updateCarData,i=document.querySelector(".update-car");if(i){const a=i.querySelector(".car-name_update");a&&(a.value=t,a.removeAttribute("disabled"));const r=i.querySelector(".color-picker_update");r&&(r.value=e,r.removeAttribute("disabled"));const s=i.querySelector(".btn-car_update");s&&s.removeAttribute("disabled"),i.setAttribute("data-id",`${n}`)}}})),null===(n=this.container.querySelector(".car-name_new"))||void 0===n||n.addEventListener("input",(t=>{const e=t.target;e instanceof HTMLInputElement&&(a.state.newCarData=Object.assign(Object.assign({},a.state.newCarData),{name:e.value}))})),null===(i=this.container.querySelector(".color-picker_new"))||void 0===i||i.addEventListener("input",(t=>{const e=t.target;e instanceof HTMLInputElement&&(a.state.newCarData=Object.assign(Object.assign({},a.state.newCarData),{color:e.value}))})),null===(r=this.container.querySelector(".car-name_update"))||void 0===r||r.addEventListener("input",(t=>{const e=t.target;e instanceof HTMLInputElement&&a.state.updateCarData&&(a.state.updateCarData=Object.assign(Object.assign({},a.state.updateCarData),{name:e.value}))})),null===(s=this.container.querySelector(".color-picker_update"))||void 0===s||s.addEventListener("input",(t=>{const e=t.target;e instanceof HTMLInputElement&&a.state.updateCarData&&(a.state.updateCarData=Object.assign(Object.assign({},a.state.updateCarData),{color:e.value}))})),null===(o=this.container.querySelector(".btn-car_update"))||void 0===o||o.addEventListener("click",(()=>{this.updateCar()})),null===(c=this.container.querySelector(".controls__btn_race"))||void 0===c||c.addEventListener("click",(t=>{t.preventDefault(),document.dispatchEvent(new CustomEvent("raceStart"))})),null===(d=this.container.querySelector(".controls__btn_reset"))||void 0===d||d.addEventListener("click",(t=>{t.preventDefault(),document.dispatchEvent(new CustomEvent("raceReset"))}))}}},642:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=a(n(38)),s=n(833);n(173),e.default=class{constructor(t){this.carData=t,this.container=document.createElement("div"),this.container.classList.add("car"),this.container.dataset.id=`${this.carData.id}`,this.velocityPercent=0,this.isBroken=!1,this.isFinsed=!1,this.rideTime=void 0}render(){return this.container.innerHTML=`\n      <div class="car-controls">\n        <button class="car-controls__btn car-controls__btn_select">Select</button>\n        <button class="car-controls__btn car-controls__btn_remove">Remove</button>\n        <h3 class="car__name">${this.carData.name}</h3> \n      </div>\n      <div class="car-view">\n        <button class="car-view__btn car-view__btn_start car-view__btn_active">A</button>\n        <button class="car-view__btn car-view__btn_reset" disabled>B</button>\n        <svg class="car-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">\n         <g id="_13-car" data-name="13-car">\n           <g id="glyph" fill="${this.carData.color}">\n            <path\n              d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"/>\n            <path \n              d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"/>\n             <path \n               d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,\n                 100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,\n                 36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,\n                 125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,\n                 36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,\n                 1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,\n                 121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,\n                 0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,\n                 12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"/>\n            </g>\n          </g>\n        </svg>\n        <img class="flag-img" src="${r.default}" alt="flag" width="40">\n      </div> \n    `,this.addListeners(),this.container}deleteCar(){var t;return i(this,void 0,void 0,(function*(){(yield fetch(`http://127.0.0.1:3000/garage/${null===(t=this.carData)||void 0===t?void 0:t.id}`,{method:"DELETE"})).ok&&document.dispatchEvent(new CustomEvent("carsUpdated"))}))}startCarEngine(){var t;return i(this,void 0,void 0,(function*(){try{const e=yield fetch(`http://127.0.0.1:3000/engine?id=${null===(t=this.carData)||void 0===t?void 0:t.id}&status=started`);if(e.ok){const t=yield e.json();this.velocityPercent=100*t.velocity/t.distance,this.rideTime=(new Date).getTime()}}catch(t){console.log(t)}}))}stopCarEngine(){var t;return i(this,void 0,void 0,(function*(){try{(yield fetch(`http://127.0.0.1:3000/engine?id=${null===(t=this.carData)||void 0===t?void 0:t.id}&status=stopped`)).ok&&(this.velocityPercent=0)}catch(t){console.log(t)}}))}switchEngineToDrive(){var t;return i(this,void 0,void 0,(function*(){try{const e=yield fetch(`http://127.0.0.1:3000/engine?id=${null===(t=this.carData)||void 0===t?void 0:t.id}&status=drive`);if(e.ok)return void(this.isBroken=!1);500===e.status&&(this.isBroken=!0,this.rideTime=void 0,this.isFinsed=!1,console.log(`Car ${this.carData.name} is broken`))}catch(t){console.log(t)}}))}carStart(){return i(this,void 0,void 0,(function*(){yield this.startCarEngine();const t=document.querySelector(`.car[data-id="${this.carData.id}"]`),e=null==t?void 0:t.querySelector(".car-img"),n=null==t?void 0:t.querySelector(".car-view__btn_start"),i=null==t?void 0:t.querySelector(".car-view__btn_reset");e&&n&&i&&(e.style.animation=`drive ${100*this.velocityPercent+5}s 0s linear forwards`,e.addEventListener("animationend",(()=>{this.rideTime=this.rideTime?(new Date).getTime()-this.rideTime:void 0,this.isFinsed=!0,document.dispatchEvent(new CustomEvent("finishedCar"))}),{once:!0}),n.classList.remove("car-view__btn_active"),n.setAttribute("disabled","true"),i.removeAttribute("disabled"),i.classList.add("car-view__btn_active")),yield this.switchEngineToDrive(),this.isBroken&&e&&(e.style.animationPlayState="paused")}))}carReset(){return i(this,void 0,void 0,(function*(){yield this.stopCarEngine(),this.isBroken=!1,this.rideTime=void 0,this.isFinsed=!1;const t=document.querySelector(`.car[data-id="${this.carData.id}"]`),e=null==t?void 0:t.querySelector(".car-img"),n=null==t?void 0:t.querySelector(".car-view__btn_start"),i=null==t?void 0:t.querySelector(".car-view__btn_reset");e&&n&&i&&(e.style.cssText="",i.classList.remove("car-view__btn_active"),i.setAttribute("disabled","true"),n.removeAttribute("disabled"),n.classList.add("car-view__btn_active"))}))}addListeners(){var t,e,n,a;null===(t=this.container.querySelector(".car-controls__btn_select"))||void 0===t||t.addEventListener("click",(t=>{t.preventDefault(),s.state.updateCarData=this.carData,document.dispatchEvent(new CustomEvent("selectedCar"))})),null===(e=this.container.querySelector(".car-controls__btn_remove"))||void 0===e||e.addEventListener("click",(t=>{t.preventDefault(),this.deleteCar()})),null===(n=this.container.querySelector(".car-view__btn_start"))||void 0===n||n.addEventListener("click",(t=>i(this,void 0,void 0,(function*(){t.preventDefault(),yield this.carStart()})))),null===(a=this.container.querySelector(".car-view__btn_reset"))||void 0===a||a.addEventListener("click",(t=>i(this,void 0,void 0,(function*(){t.preventDefault(),yield this.carReset()}))))}}},463:function(t,e){var n=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.container=document.createElement("article"),this.container.classList.add("404"),this.isUpdateble=!1}render(){return this.container.innerHTML=`\n    <h2>404</h2>\n    <p>${100*Math.random()}</p>\n    `,this.container}update(){return n(this,void 0,void 0,(function*(){return this.isUpdateble}))}}},581:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=a(n(721)),s=a(n(642)),o=n(833),c=a(n(992));n(951),e.default=class{constructor(){this.container=document.createElement("article"),this.container.classList.add("garage"),this.carSettings=new r.default,this.carsArray=[],this.currentCars=[],this.isUpdateble=!0,this.loader=(new c.default).render(),this.currentWinner=void 0,document.addEventListener("carsUpdated",(()=>this.carsUpdatedHandler())),document.addEventListener("raceStart",(()=>this.raceStartHandler())),document.addEventListener("raceReset",(()=>this.raceResetHandler())),document.addEventListener("finishedCar",(()=>this.finishedCarHandler()))}render(){var t;return this.container.innerHTML=`\n      <h2>Garage (<span class="car-count">${this.carsArray.length}</span>)</h2>\n      <h3>Page <span class="car-count">${o.state.garagePage+1}</span></h3>\n      <section class="cars"></section>\n      <div class="pagination">\n        <button class="pagination__btn pagination__btn_prev" \n        ${o.state.garagePage<=0?"disabled":""}\n        > Previous</button>\n        <button class="pagination__btn pagination__btn_next"\n        ${o.state.garagePage>=this.carsArray.length/7-1?"disabled":""}\n        > Next</button>\n      </div>\n      <h3 class="winner"></h3>\n    `,this.renderCars(),null===(t=this.container.querySelector("h2"))||void 0===t||t.before(this.carSettings.render()),this.addListeners(),this.container}renderCars(){this.currentCars.forEach((t=>{var e;null===(e=this.container.querySelector(".cars"))||void 0===e||e.append(t.render())}))}getCars(){return i(this,void 0,void 0,(function*(){const t=yield fetch("http://127.0.0.1:3000/garage");if(t.ok){const e=yield t.json();this.carsArray=e.map((t=>new s.default(t))),this.currentCars=this.carsArray.slice(7*o.state.garagePage,7*o.state.garagePage+7)}}))}update(){return i(this,void 0,void 0,(function*(){yield this.getCars()}))}updateCarsRender(){return i(this,void 0,void 0,(function*(){const t=this.container.querySelector(".cars");t&&(t.innerHTML="",this.renderCars())}))}updateCarsCount(){return i(this,void 0,void 0,(function*(){const t=this.container.querySelector(".car-count");t&&(t.innerHTML=`${this.carsArray.length}`)}))}carsUpdatedHandler(){var t;return i(this,void 0,void 0,(function*(){null===(t=this.container.querySelector(".cars"))||void 0===t||t.append(this.loader),yield this.update(),yield this.updateCarsCount(),yield this.updateCarsRender(),this.loader.remove(),this.render()}))}raceStartHandler(){return i(this,void 0,void 0,(function*(){this.currentCars.forEach((t=>{t.carStart()}))}))}raceResetHandler(){return i(this,void 0,void 0,(function*(){this.currentWinner=void 0,this.currentCars.forEach((t=>{t.carReset()}))}))}finishedCarHandler(){return i(this,void 0,void 0,(function*(){if(!this.currentWinner){let t,e;this.currentCars.forEach((n=>{var i;n.isFinsed&&(this.currentWinner=this.currentWinner?this.currentWinner:n,t=t||n.carData.name,e=e||n.rideTime,(null===(i=this.currentWinner)||void 0===i?void 0:i.rideTime)&&n.rideTime&&this.currentWinner.rideTime>n.rideTime&&(this.currentWinner=n,t=n.carData.name,e=n.rideTime))}));const n=document.querySelector(".winner");n&&e&&(n.classList.add("winner_shown"),n.innerHTML=`Win ${t} in ${e/1e3} seconds`,this.sendWinner(),setTimeout((()=>{null==n||n.classList.remove("winner_shown")}),5e3))}}))}sendWinner(){var t,e,n,a,r;return i(this,void 0,void 0,(function*(){try{const i=yield fetch(`http://127.0.0.1:3000/winners/${null===(t=this.currentWinner)||void 0===t?void 0:t.carData.id}`);if(i.ok){const t=yield i.json();let a=null===(e=this.currentWinner)||void 0===e?void 0:e.rideTime;a&&(a/=1e3),yield fetch(`http://127.0.0.1:3000/winners/${null===(n=this.currentWinner)||void 0===n?void 0:n.carData.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({wins:t.wins+1,time:a&&a<t.time?a:t.time})})}if(404===i.status){let t=null===(a=this.currentWinner)||void 0===a?void 0:a.rideTime;t&&(t/=1e3),yield fetch("http://127.0.0.1:3000/winners",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:null===(r=this.currentWinner)||void 0===r?void 0:r.carData.id,wins:1,time:t})})}}catch(t){console.log("just error")}}))}toNextPage(){o.state.garagePage+=1,this.currentCars=this.carsArray.slice(7*o.state.garagePage,7*o.state.garagePage+7)}toPrevPage(){o.state.garagePage-=1,this.currentCars=this.carsArray.slice(7*o.state.garagePage,7*o.state.garagePage+7)}addListeners(){var t,e;null===(t=this.container.querySelector(".pagination__btn_next"))||void 0===t||t.addEventListener("click",(t=>{t.preventDefault(),this.toNextPage(),this.render(),this.raceResetHandler()})),null===(e=this.container.querySelector(".pagination__btn_prev"))||void 0===e||e.addEventListener("click",(t=>{t.preventDefault(),this.toPrevPage(),this.render(),this.raceResetHandler()}))}}},135:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),n(20),e.default=class{constructor(t){this.container=document.createElement("header"),this.container.classList.add("header"),this.router=t,this.activeElem=void 0}setActive(){const t=document.querySelector(`.nav__element[data-src="${this.router.currentHash}"]`);if(t){if(!this.activeElem)return this.activeElem=t,void this.activeElem.classList.add("nav__element_active");this.activeElem.classList.remove("nav__element_active"),t.classList.add("nav__element_active"),this.activeElem=t}}render(){return this.container.innerHTML='\n      <ul class="nav">\n        <li class="nav__element" data-src="">Garage</li>\n        <li class="nav__element" data-src="winners">Winners</li>\n      </ul>\n    ',this.container.addEventListener("click",(t=>{if(!(t.target instanceof HTMLElement))return;const e=t.target;this.router.changeRoute(`${e.dataset.src}`),this.setActive()})),this.container}}},992:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),n(852),e.default=class{constructor(){this.container=document.createElement("div"),this.container.classList.add("loader")}render(){return this.container.innerHTML='\n    <div class="loader-inner semi-circle-spin">\n      <div></div>\n    </div>\n    ',this.container}}},260:function(t,e){var n=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this.routes=t,this.currentHash=window.location.hash.slice(2),window.addEventListener("popstate",(()=>{this.popStateHandler()})),window.addEventListener("load",(()=>{this.popStateHandler()}))}popStateHandler(){return n(this,void 0,void 0,(function*(){const t=window.location.hash.slice(2),e=this.findRoute(t),n=document.getElementById("root");if(n){if(!e)return n.innerHTML="",void n.append(this.findRoute("404").component.render());e.component.isUpdateble&&(yield e.component.update()),this.currentHash=t,n.innerHTML="",n.append(e.component.render())}}))}findRoute(t){return this.routes.filter((e=>t===e.path))[0]}changeRoute(t){window.location.hash=`/${t}`,this.currentHash=t}}},833:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.state=void 0,e.state=new class{constructor(){this.garagePage=0,this.winnersPage=0,this.updateCarData=void 0,this.newCarData={name:"",color:"#FFFFFF",id:0},this.sortedByWins=!0,this.isAscending=!0}}},256:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),n(292),e.default=class{constructor(t){this.container=document.createElement("tr"),this.container.classList.add("winners__item"),this.id=t.id,this.wins=t.wins,this.time=t.time,this.color="",this.name="",this.index=0}render(){return this.container.innerHTML=`\n      <td class="winner-number">${this.index}</td>\n      <td class="winner-img">\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">\n          <g id="_13-car" data-name="13-car">\n            <g id="glyph" fill="${this.color}">\n             <path\n               d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"/>\n             <path \n              d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"/>\n             <path \n              d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,\n                100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,\n                36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,\n                125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,\n                36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,\n                1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,\n                121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,\n                0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,\n                12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"/>\n           </g>\n         </g>\n        </svg>\n      </td>\n      <td class="winner-name">${this.name}</td>\n      <td class="winner-wins">${this.wins}</td>\n      <td class="winner-time">${this.time}</td>\n    `,this.container}getCar(){return i(this,void 0,void 0,(function*(){try{const t=yield fetch(`http://127.0.0.1:3000/garage/${this.id}`);if(t.ok){const e=yield t.json();this.name=e.name,this.color=e.color,this.render()}}catch(t){console.log(t)}}))}setIndex(t){this.index=t+1}}},988:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(a,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function o(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}c((i=i.apply(t,e||[])).next())}))},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=n(833),s=a(n(256));function o(t){if(t.length<2)return t;const e=t[Math.floor(t.length/2)],n=t.filter((t=>t.wins<e.wins)),i=t.filter((t=>t.wins>e.wins)),a=t.filter((t=>t.wins===e.wins));return[...o(n),...a,e,...o(i)]}function c(t){if(t.length<2)return t;const e=t[Math.floor(t.length/2)],n=t.filter((t=>t.time<e.time)),i=t.filter((t=>t.time>e.time)),a=t.filter((t=>t.time===e.time));return[...c(n),...a,e,...c(i)]}n(156),e.default=class{constructor(){this.container=document.createElement("article"),this.container.classList.add("winners-page"),this.isUpdateble=!0,this.winners=[],this.currentWinners=[]}render(){return this.container.innerHTML=`\n    <h2>Winners (<span class="car-count">${this.winners.length}</span>)</h2>\n    <h3>Page <span class="car-count">${r.state.winnersPage+1}</span></h3>\n    <table class="winners">\n      <thead>\n        <td>Number</td>\n        <td>Car</td>\n        <td>Name</td>\n        <td class="wins"><span class="wins-selector\n        ${r.state.isAscending?"selector-asc":"selector-desc"}\n        ${r.state.sortedByWins?"selector_active":""}\n        ">Wins</span></td>\n        <td class="time"><span class="time-selector \n        ${r.state.isAscending?"selector-asc":"selector-desc"}\n        ${r.state.sortedByWins?"":"selector_active"}\n        ">Best Time</span></td>\n      </thead>\n    </table>\n    <div class="pagination">\n      <button class="pagination__btn pagination__btn_prev" \n      ${r.state.winnersPage<=0?"disabled":""}\n      > Previous</button>\n      <button class="pagination__btn pagination__btn_next"\n      ${r.state.winnersPage>=this.winners.length/10-1?"disabled":""}\n      > Next</button>\n    </div>\n    `,this.renderWinners(),this.addListeners(),this.container}renderWinners(){this.currentWinners.forEach(((t,e)=>{var n;t.setIndex(10*r.state.winnersPage+e),null===(n=this.container.querySelector(".winners"))||void 0===n||n.append(t.render())}))}getWinners(){return i(this,void 0,void 0,(function*(){const t=yield fetch("http://127.0.0.1:3000/winners");if(t.ok){const e=yield t.json();this.winners=e.map((t=>new s.default(t))),this.sort(),this.currentWinners=this.winners.slice(10*r.state.winnersPage,10*r.state.winnersPage+10),this.winners.forEach((t=>t.getCar()))}}))}update(){return i(this,void 0,void 0,(function*(){yield this.getWinners()}))}sortByWins(){return o(this.winners)}sortByTime(){return c(this.winners)}sort(){r.state.sortedByWins?this.winners=r.state.isAscending?this.sortByWins():this.sortByWins().reverse():this.winners=r.state.isAscending?this.sortByTime():this.sortByTime().reverse()}toNextPage(){r.state.winnersPage+=1,this.currentWinners=this.winners.slice(10*r.state.winnersPage,10*r.state.winnersPage+10)}toPrevPage(){r.state.winnersPage-=1,this.currentWinners=this.winners.slice(10*r.state.winnersPage,10*r.state.winnersPage+10)}addListeners(){var t,e,n,a;null===(t=this.container.querySelector(".pagination__btn_next"))||void 0===t||t.addEventListener("click",(t=>{t.preventDefault(),this.toNextPage(),this.render()})),null===(e=this.container.querySelector(".pagination__btn_prev"))||void 0===e||e.addEventListener("click",(t=>{t.preventDefault(),this.toPrevPage(),this.render()})),null===(n=this.container.querySelector(".wins"))||void 0===n||n.addEventListener("click",(t=>i(this,void 0,void 0,(function*(){t.preventDefault(),r.state.sortedByWins&&(r.state.isAscending=!r.state.isAscending),r.state.sortedByWins=!0,yield this.update(),yield this.render()})))),null===(a=this.container.querySelector(".time"))||void 0===a||a.addEventListener("click",(t=>i(this,void 0,void 0,(function*(){t.preventDefault(),r.state.sortedByWins||(r.state.isAscending=!r.state.isAscending),r.state.sortedByWins=!1,yield this.update(),yield this.render()}))))}}},607:function(t,e,n){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=i(n(135)),r=i(n(260)),s=n(263);n(473),(new class{constructor(){this.root=document.createElement("div"),this.root.setAttribute("id","root"),this.header=void 0}init(){this.root.appendChild(document.createElement("p"));const t=new r.default(s.routes);this.header=new a.default(t),document.body.appendChild(this.header.render()),this.header.setActive(),document.body.append(this.root)}}).init()},263:function(t,e,n){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Route=e.routes=void 0;const a=i(n(581)),r=i(n(988)),s=i(n(463));class o{constructor(t,e){this.path=t,this.component=e}}e.Route=o;const c=[new o("404",new s.default),new o("",new a.default),new o("winners",new r.default)];e.routes=c}},e={};function n(i){var a=e[i];if(void 0!==a)return a.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var i=e.getElementsByTagName("script");i.length&&(t=i[i.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),n(607)})();
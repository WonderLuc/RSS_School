function goToDonate(){
  window.location.assign("../donate/donate.html");
}

function scrollToHeader(e){
  e.preventDefault();
  window.scrollTo(0,0);
}

class AmountPoint{
  constructor(element){
    this.element = element;
    this.isActive = this.element.classList.contains('money-bar__point_current');
    this.amount = +element.innerText;
  }

  toggleActive () {
    this.element.classList.toggle('money-bar__point_current');
    this.isActive = !this.isActive;
  }

  getAmount () {
    return this.amount;
  }
}

class InputAmount{
  constructor (element, parent) {
    this.element = element;
    this.parent = parent;
    this._amount = 0;
    this.addEventListener('input', (e) => {
      if (this.element.value.length > 4){
        e.preventDefault();
        this.element.value = this.amount;
        return;
      }
      this.amount = this.element.value;
      this.sendValueToParent();
    })
  }

  get amount (){ 
    return this._amount;
  }

  set amount (value) {
    this._amount = value;
    this.element.value = this.amount;
  }

  addEventListener (event,func) {
    this.element.addEventListener(event, func.bind(this));
  }

  sendValueToParent () {
    this.parent.update(+this.amount);
  }
}

class PaymentControler{
  constructor (element) {
    this.element = element;
    this.amounts = [].map.call(element.children, elem => new AmountPoint(elem));
    this.inputAmount = new InputAmount(document.querySelector('.custom-input'), this);
    this.addEventListener('click', this.changeActiveEvent);
    this.inputAmount.amount = this.getActive().getAmount();
  }

  addEventListener (event,func) {
    this.element.addEventListener(event, func.bind(this));
  }

  getActive(){
    return this.amounts.filter(amount => amount.isActive)[0];
  }

  changeActiveEvent (e) {
    let currentElem = e.target;
    if (currentElem.classList.contains('money-bar')){
      return;
    }
    while (!currentElem.classList.contains('money-bar__point')){
      currentElem = currentElem.parentElement;
    }
   this.changeActive(currentElem);
  }

  changeActive (element) {
    this.getActive() ? this.getActive().toggleActive() : '';
    let currentActive = this.amounts.filter(amount => amount.element === element)[0];
    currentActive.toggleActive();
    this.inputAmount.amount = currentActive.getAmount();
  }

  update (newAmount) {
    let сoincidence = this.amounts.filter(amount => amount.amount === newAmount)[0];
    if (сoincidence) {
      this.changeActive(сoincidence.element);
      return;
    }
    let activeAmount =  this.getActive() ? this.getActive().amount : '';
    if (newAmount === 0 || activeAmount !== newAmount) {
      this.getActive() ? this.getActive().toggleActive() : '';
    }
  }
  
}

let payment = new PaymentControler(document.querySelector('.money-bar'));
document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
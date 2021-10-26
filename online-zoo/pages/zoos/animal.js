function goToDonate(){
  window.location.assign("../donate/donate.html");
}

function scrollToHeader(e){
  e.preventDefault();
  window.scrollTo(0,0);
}

function switchToMainCamera(e){
  if (!e.target.classList.contains('fake')){
    return ;
  }
  let iframe = e.target.parentElement.querySelector('iframe');
  let mainIframe = document.querySelector('.camera iframe');
  let temporaryLink = mainIframe.getAttribute('src');
  mainIframe.setAttribute('src', iframe.getAttribute('src'));
  iframe.setAttribute('src', temporaryLink);
}

function scrollCamSlider(isForward = true){
  let camContainer = document.querySelector('.cams');
  if ((camContainer.scrollLeft === 0 && !isForward) ||
     ((camContainer.scrollWidth - (camContainer.clientWidth + camContainer.scrollLeft)) === 0) && isForward) {
      isForward = !isForward;
      let x = isForward? camContainer.scrollWidth + 30 : -camContainer.scrollWidth - 30;
      camContainer.scrollBy(x,0);
      return;
  }
  let x = isForward? camContainer.clientWidth + 30 : -camContainer.clientWidth - 30;
  camContainer.scrollBy(x,0);
}

// Show/hide text about animal 
let contentWrapper = document.querySelector('.content-wrapper');
let textInfoWrapper = document.querySelector('.info__view');
let buttonMore = document.querySelector('.form-btn_more');
let buttonLess = document.querySelector('.form-btn_less');

function showMore() {
  contentWrapper.style = '';
  textInfoWrapper.style = '';
  buttonMore.style.display = 'none';
  buttonLess.style.display = 'block';
}

function showLess() {
  contentWrapper.style = ' grid-template-rows: 112px 652px 290px 664px 50vh;';
  textInfoWrapper.style = 'height: 300px';
  buttonLess.style.display = 'none';
  buttonMore.style.display = 'block';
}

showLess();

// Fix for sticky aside 
let isAbsolute = false;
let lastPageOffset;

function debounce (func , delay) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return ;
    func.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, delay);
  }
}

function fixAnimalNav(){
  let positionAside = document.querySelector('.animal-nav').getBoundingClientRect().y + window.pageYOffset;
  let positionAnimalHeader = document.querySelector('.about-animal__title').getBoundingClientRect().y + window.pageYOffset;
 
  if (!isAbsolute && positionAnimalHeader - positionAside < 450){
    document.querySelector('.animal-nav').style = `position: absolute; top:${positionAside - 203}px;`;
    isAbsolute = true;
    lastPageOffset = window.pageYOffset;
    return;
  }
  if (isAbsolute && lastPageOffset > window.pageYOffset){
    document.querySelector('.animal-nav').style = '';
    isAbsolute = false;
  }
}

if ( window.outerWidth < 1600 && window.outerWidth > 999) {
  let debounced = debounce(fixAnimalNav, 50);
  document.addEventListener('scroll', debounced);
}



document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
document.querySelector('.about-animal .btn').addEventListener('click', goToDonate);
document.querySelector('.cams').addEventListener('click' , switchToMainCamera);
document.querySelector('.additional-cam .arrow_right').addEventListener('click', () => {
  scrollCamSlider();
})
document.querySelector('.additional-cam .arrow_left').addEventListener('click', () => {
  scrollCamSlider(false);
});

buttonMore.addEventListener('click', showMore);
buttonLess.addEventListener('click', showLess);
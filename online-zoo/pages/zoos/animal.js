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


document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
document.querySelector('.about-animal .btn').addEventListener('click', goToDonate);
document.querySelector('.cams').addEventListener('click' , switchToMainCamera);
document.querySelector('.additional-cam .arrow_right').addEventListener('click', () => {
  scrollCamSlider();
})
document.querySelector('.additional-cam .arrow_left').addEventListener('click', () => {
  scrollCamSlider(false);
})
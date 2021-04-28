//temporary array with animal pages. He MUST be removed when pages will have appears
const pages = ['panda', 'gorilla', 'eagle', 'alligator'];

function goToZoos(){
  window.location.assign("./pages/zoos/panda.html");
}

function goToMap(){
  window.location.assign("./pages/map/map.html");
}

function goToDonate(){
  window.location.assign("./pages/donate/donate.html");
}
function scrollToHeader(e){
  e.preventDefault();
  window.scrollTo(0,0);
}

function goToAnimal(e){
  let elem = e.target;
  while(!elem.classList.contains('animals')){
    if(elem.classList.contains('animal')){
      break;
    }
    elem = elem.parentElement;
  }

  if(elem.classList.contains('animals')){
    return;
  }

  let pageName = elem.classList.toString().match(/animal_(.+)/)[1];
  //REMOVE WITH PAGES-ARRAY
  return pages.includes(pageName)? window.location.assign(`./pages/zoos/${pageName}.html`) :
                                   window.location.assign(`./pages/404/404.html`);
  
}

function scrollPetsSlider(isForward = true){
  let animalsContainer = document.querySelector('.animals');
  if ((animalsContainer.scrollLeft === 0 && !isForward) ||
     ((animalsContainer.scrollWidth - (animalsContainer.clientWidth + animalsContainer.scrollLeft)) === 0) && isForward) {
      isForward = !isForward;
      let x = isForward? animalsContainer.scrollWidth: - animalsContainer.scrollWidth;
      animalsContainer.scrollBy(x,0);
      return;
  }
  let x = isForward? animalsContainer.clientWidth: - animalsContainer.clientWidth;
  animalsContainer.scrollBy(x,0);
}

document.querySelector('.watch .btn').addEventListener('click', goToZoos);
document.querySelector('.zoos .btn').addEventListener('click', goToMap);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.animals').addEventListener('click', goToAnimal);
document.querySelector('.zoos-wrapper .arrow_right').addEventListener('click', () => {
  scrollPetsSlider();
})
document.querySelector('.zoos-wrapper .arrow_left').addEventListener('click', () => {
  scrollPetsSlider(false);
})
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

// Scroll for Pets-slider
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

let wrapper =  document.querySelector('.testimonials');
let testimonial = document.querySelector('.testimonial-wrapper');
let widthCalc = Math.floor(wrapper.clientWidth / testimonial.clientWidth);
let heightCalc = Math.floor(wrapper.clientHeight / testimonial.clientHeight);

//Testimonials behaviour
function renderTestimonials(){  
  let viewElements = (widthCalc > heightCalc? widthCalc : heightCalc) + 7;
  while (wrapper.children.length != viewElements) {
    let newTestimonial = document.createElement('div');
    newTestimonial.classList.add('testimonial-wrapper');
    newTestimonial.innerHTML = `
    <div class="testimonial">
    <div class="testimonial__about">
      <img class="avatar" src="./assets/images/ava-${Math.round(Math.random()*2 + 2)}.png" alt="avatar">
      <div class="description">
        <h4 class="description__name">User_${Math.round(Math.random()*10000)}</h4>
        <p class="description__place">Local Austria</p>
        <p class="description__time">Week Ago</p>
      </div>
    </div>
    <p class="testimonial__text">My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas.
      The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.                
    </p>
    </div>
    `;
    wrapper.append(newTestimonial);
  }
}
renderTestimonials();

let interval = setInterval(scrollTestimonials, 10000);
let offset = 1;
let isEnd = false;

function scrollTestimonials(){
  if(isEnd){
    wrapper.scrollTo(0,0);
    offset = 1;
    document.querySelector('.progress-bar__current').style.left = `0%`;
    isEnd= false;
    return;
  }
  widthCalc > heightCalc ? wrapper.scrollBy(testimonial.clientWidth + 30,0) :
                           wrapper.scrollBy(0, testimonial.clientHeight + 15);
  offset++;
  let percent = (offset * 100)/wrapper.children.length;
  document.querySelector('.progress-bar__current').style.left = `${percent}%`;
  if ((wrapper.scrollWidth - (wrapper.clientWidth + wrapper.scrollLeft)) === 0) {
    isEnd = true;
  }
}


// Stop for testimonial
document.querySelector('.testimonials').addEventListener('click', (e) => {
  let elem = e.target;
  while (!elem.classList.contains('testimonial-wrapper')) {
    if (elem.classList.contains('testimonials')) {
      return;
    }
    elem = elem.parentElement;
  }
  clearInterval(interval);
  console.log('Start 40sec pause');
  setTimeout( () => {
    console.log('continue slide every 10sec');
    scrollTestimonials();
    interval = setInterval(scrollTestimonials, 10000);
  }, 40000)
});

// progress-bar move
let progress = document.querySelector('.progress-bar__current');
function moveProgressBar(event){
  let progressContainer = document.querySelector('.progress-bar');
  if (progressContainer.getBoundingClientRect().x >= progress.getBoundingClientRect().x ) {
    progress.style.left = '1px';
    return ;
  }
  if ((progressContainer.getBoundingClientRect().x + progressContainer.getBoundingClientRect().width) <=
     (progress.getBoundingClientRect().x + progress.getBoundingClientRect().width)) {
    progress.style.left = '81%';
    return ;
  }
  let position = event.pageX - progressContainer.getBoundingClientRect().x - progress.getBoundingClientRect().width/3;
  progress.style.left = `${position}px`;
  let currentPercent = Math.round((100*position)/progressContainer.getBoundingClientRect().width);
  if ( currentPercent%10 === 0) {
    offset = currentPercent/10;
    wrapper.scrollTo(offset*(testimonial.getBoundingClientRect().width +30), 0);
  }
}
document.querySelector('.progress-bar__current').ondragstart = () => {return false};
document.querySelector('.progress-bar__current').addEventListener('mousedown', (e) => {
  clearInterval(interval);
  document.addEventListener('mousemove', moveProgressBar);
});
document.addEventListener('mouseup', (e) => {
  document.removeEventListener('mousemove', moveProgressBar);
  interval = setInterval(scrollTestimonials, 10000);
});

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
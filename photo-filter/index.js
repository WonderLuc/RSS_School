let image = document.querySelector('.editor img');
let editor = document.querySelector('.editor');

// Fullscreen behaviour
let fullscreenBtn = document.querySelector('.fullscreen');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
    return;
  }
  document.exitFullscreen();
});

// Filters behaviour 
let filtersContainer = document.querySelector('.filters');
let baseFilters = getFilters();
const FILTERS = {
  'blur' : {measure: 'px', base: 0},
  'invert' : {measure: '%', base: 0},
  'sepia' : {measure: '%', base: 0},
  'saturate' : {measure: '%', base: 100},
  'hue' : {measure: 'deg', base: 0},
  'contrast' : {measure: '%', base: 100},
  'brightness' : {measure: '%', base: 100}  
}

function updateValue (event) {
  // takes current input[type="range"]
  const elem = event.target;
  // takes output
  const output = elem.nextElementSibling;
  const name = elem.getAttribute('name');
  output.innerText = elem.value;
  document.documentElement.style.setProperty(`--${name}`, `${elem.value}${FILTERS[name].measure}`);
  drawFiltredImage();
}

[].forEach.call(filtersContainer.children, function (elem) {
  elem.addEventListener('input', updateValue);
} );

// Canvas
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
updateCanvasSize();
canvas.style.display = 'none';
editor.append(canvas);

function updateCanvasSize() {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
}

function getFilters() {
  return getComputedStyle(image)['filter'];
}

function drawFiltredImage(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //Blur correction
  let blurOriginal = +getFilters().match(/(?<=blur\()\d/);
  let blurСoefficient =  Math.round(blurOriginal * (image.naturalHeight/image.height));
  // Filters + correction for blur
  ctx.filter = getFilters().replace(/(?<=blur\()\d/,`${blurСoefficient}`);
  ctx.drawImage(image, 0, 0);
}


document.body.onload = () => {
  drawFiltredImage();
};



//Buttons behaviour 
//Reset
function clearValue(elem) {
  let input = elem.querySelector('input');
  if (!input) {
    return;
  }
  let output = input.nextElementSibling;
  let name = input.getAttribute('name');
  input.value = FILTERS[name].base;
  output.innerText = input.value;
  document.documentElement.style.setProperty(`--${name}`, `${input.value}${FILTERS[name].measure}`);
}

document.querySelector('.btn-reset').addEventListener('click', () => {
  document.documentElement.style.filter = baseFilters;
  [].forEach.call(filtersContainer.children, function (elem) {
    clearValue(elem);
  });
  drawFiltredImage();
});

//Save picture
document.querySelector('.btn-save').addEventListener('click', () => {
  let dataLink = document.createElement('a');
  dataLink.href = `${canvas.toDataURL()}`; 
  dataLink.download = 'awesome-image';
  dataLink.click();  
});

//Load picture
document.querySelector('.btn-load--input').addEventListener('input', e => {
  let file = e.target.files[0];
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    updateCanvasSize();
    drawFiltredImage();
    e.target.value = '';
  }
})

//next picture
let imgCounter = 1;
let currentTime;
let date = new Date().getHours();
if(date >= 0 && date <= 5){
  currentTime = 'night';
}
if(date >= 6 && date <= 11){
  currentTime = 'morning';
}
if(date >= 12 && date <= 17){
  currentTime = 'day';
}
if(date >= 18 && date <= 23){
  currentTime = 'evening';
}
const PRELOAD_IMG = [];
for (let i = 1; i <= 20; i++) {
  i = i < 10 ? `0${i}` : i;
  fetch(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${currentTime}/${i}.jpg`)
  .then(res => {
    return res.blob();
  })
  .then(blob => {
    PRELOAD_IMG.push(URL.createObjectURL(blob));
  })
}

document.querySelector('.btn-next').addEventListener('click', (e) => {
  let imgNumber = imgCounter < 10 ? `0${imgCounter}` : imgCounter;
  image.src = PRELOAD_IMG[imgCounter - 1];
  image.onload = () => {
    updateCanvasSize();
    drawFiltredImage();
  }
  imgCounter++;
  imgCounter = imgCounter >= 20 ? 1 : imgCounter;
});

// Additional behaviour
let preFiltersContainer = document.querySelector('.pre-filters');
const PREFILTERS = [
  {
    name: '1977',
    preset: { 'contrast' : 110, 'brightness': 110, 'saturate': 130 }
  },
  {
    name: 'Aden',
    preset: { 'contrast' : 90, 'brightness': 120, 'saturate': 85, 'hue': 20 }
  },
  {
    name: 'Amaro',
    preset: { 'contrast' : 90, 'brightness': 110, 'saturate': 150, 'hue': -10 }
  },
  {
    name: 'Brannan',
    preset: { 'contrast' : 140, 'brightness': 100, 'saturate': 100, 'sepia': 50 }
  },
  {
    name: 'Maven',
    preset: { 'contrast' : 95, 'brightness': 95, 'saturate': 150, 'sepia' : 25 }
  },
  {
    name: 'Clarendon',
    preset: { 'contrast' : 120, 'brightness': 125, 'saturate': 100 }
  },
  {
    name: 'Inlwell',
    preset: { 'contrast' : 110, 'brightness': 110, 'saturate': 0 }
  },
  {
    name: 'Reyes',
    preset: { 'contrast' : 85, 'brightness': 110, 'saturate': 75, 'sepia' : 22 }
  },
  {
    name: 'Walden',
    preset: { 'contrast' : 110, 'brightness': 160, 'saturate': 100, 'sepia' : 30, 'hue' : 350 }
  },
];
function getFilterString(object){
  let str = '';
  let preset = object.preset;
  for (let [key, value] of Object.entries(preset)) {
    if (key === 'hue') {
      str += `hue-rotate(${value}${FILTERS[key].measure}) `;
      continue;
    }
    str += `${key}(${value}${FILTERS[key].measure}) `;
  }
  return str;
}

function renderPreFilter(filter) {
  let elem = document.createElement('figure');
  let img = document.createElement('img');
  let caption = document.createElement('figcaption');
  changeImgSRC(img);
  img.setAttribute('alt', 'image');
  img.dataset.name = filter.name;
  img.style.filter = getFilterString(filter);
  caption.innerText = filter.name;
  elem.classList.add('pre-filters__filter');
  elem.append(img);
  elem.append(caption);
  preFiltersContainer.append(elem);
}
PREFILTERS.forEach((filter) => {
  renderPreFilter(filter);
});

function changeImgSRC(img) {
  img.src = image.src;
}

function setValue(elem, filter){
  let input = elem.querySelector('input');
  let output = input.nextElementSibling;
  let name = input.getAttribute('name');
  input.value = filter.preset[name];
  output.innerText = input.value;
  document.documentElement.style.setProperty(`--${name}`, `${input.value}${FILTERS[name].measure}`);
}

// Open\close window functionality 
document.querySelector('.btn-show-all').addEventListener('click', () => {
  preFiltersContainer.style.display = 'flex';
  // Change url for current image
  [].forEach.call(preFiltersContainer.children, elem => {
    if (elem.tagName !== 'FIGURE'){
      return;
    }
    changeImgSRC(elem.querySelector('img'));
  });
});

document.querySelector('.pre-filters .btn').addEventListener('click', () => {
  preFiltersContainer.style.display = 'none';
});

//Choose filter and set variables
preFiltersContainer.addEventListener('click', e => {
  let elem = e.target;
  if(elem.tagName === 'FIGCAPTION'){
    elem = elem.parentElement;
  }
  if (elem.tagName === 'BUTTON' || elem.tagName === "DIV"){
    return;
  }
  let name = elem.querySelector('img').dataset.name;
  let filter = PREFILTERS.filter(el => el.name === name)[0];
  document.querySelector('.btn-reset').click();
  [].forEach.call(filtersContainer.children, function (elem) {
    if (!elem.querySelector('input')){
      return;
    }
    if( filter.preset[elem.querySelector('input').getAttribute('name')] ){
      setValue(elem, filter)
    }
  });
  document.querySelector('.pre-filters .btn').click();
});
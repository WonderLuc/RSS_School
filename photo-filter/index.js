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
const filter = {
  'blur' : {measure: 'px', base: 0},
  'invert' : {measure: '%', base: 0},
  'sepia' : {measure: '%', base: 0},
  'saturate' : {measure: '%', base: 100},
  'hue' : {measure: 'deg', base: 0}
}

function updateValue (event) {
  // takes current input[type="range"]
  const elem = event.target;
  // takes output
  const output = elem.nextElementSibling;
  const name = elem.getAttribute('name');
  output.innerText = elem.value;
  document.documentElement.style.setProperty(`--${name}`, `${elem.value}${filter[name].measure}`);
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
  let output = input.nextElementSibling;
  let name = input.getAttribute('name');
  input.value = filter[name].base;
  output.innerText = input.value;
  document.documentElement.style.setProperty(`--${name}`, `${input.value}${filter[name].measure}`);
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


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
const measure = {
  'blur' : 'px',
  'invert' : '%',
  'sepia' : '%',
  'saturate' : '%',
  'hue' : 'deg'
}

function updateValue (event) {
  const elem = event.target;
  const output = elem.nextElementSibling;
  const name = elem.getAttribute('name');
  output.innerText = elem.value;
  document.documentElement.style.setProperty(`--${name}`, `${elem.value}${measure[name]}`);
}

[].forEach.call(filtersContainer.children, function (elem) {
  elem.addEventListener('input', updateValue);
} )
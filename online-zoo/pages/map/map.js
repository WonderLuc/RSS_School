function goToDonate(){
  window.location.assign("../donate/donate.html");
}

function scrollToHeader(e){
  e.preventDefault();
  window.scrollTo(0,0);
}

const props = {
  mapImg : document.querySelector('.earth-map'),
  mapWidth : +document.querySelector('.earth-map').width,
  mapWidthPercent : 100,
  mapLegend : document.querySelector('.map__legend'),
  scale: 1,
  animals : [].map.call(document.querySelector('.map__legend').children, elem => {
    return {
      animal: elem,
      name: elem.classList[1]
    }
  })
}

props.animals.map(obj => {
  let originalW = obj.animal.getBoundingClientRect().x - props.mapImg.getBoundingClientRect().x;
  let wPercent = (originalW * 100) / props.mapImg.getBoundingClientRect().width;
  let originalH;
  let hPercent;
  setTimeout( () => {
    resizeLegend();
    originalH = obj.animal.getBoundingClientRect().y - props.mapImg.getBoundingClientRect().y;
    hPercent = (originalH * 100) / props.mapImg.getBoundingClientRect().height;
    obj.wPercent = wPercent;
    obj.hPercent = hPercent;
    console.log( wPercent, hPercent)
  }, 700);
})

function resizeLegend(){
  props.mapLegend.style = `height: ${props.mapImg.getBoundingClientRect().height}px; width:${props.mapWidth}px;`;
}

function changeZoomValue(rateOfChange){
  props.mapWidthPercent += rateOfChange;
  props.mapImg.style.width = props.mapWidthPercent + '%';
  props.mapWidth = +document.querySelector('.earth-map').width;
}

function zoomIn() {
  changeZoomValue(100);
  resizeLegend();
  props.scale = props.scale < 4? props.scale + 0.2 : 4;
  props.animals.forEach(obj => {
    obj.hPercent += 0.2;
    obj.wPercent += 0.05;
    obj.animal.style = `top:${obj.hPercent}%; left: ${obj.wPercent}%; transform: scale(${props.scale});`;
  });
}

function zoomOut() {
  if ( props.mapWidthPercent === 100) return;
  changeZoomValue(-100);  
  resizeLegend();
  props.scale = props.scale <= 1? 1 : props.scale - 0.2;
  props.animals.forEach(obj => {
    obj.hPercent -= 0.2;
    obj.wPercent -= 0.05;
    obj.animal.style = `top:${obj.hPercent}%; left: ${obj.wPercent}%; transform: scale(${props.scale});`;
  });
}

let lastActive;

function activeTooltip () {
  lastActive = this.querySelector('.tooltip');
  lastActive.classList.add('tooltip_active');
}

function deactiveTooltip () {
  if (lastActive) {
    lastActive.classList.remove('tooltip_active');
    lastActive = undefined;
  } 
  return;
}

document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
document.querySelector('.zoom__btn_plus').addEventListener('click', zoomIn);
document.querySelector('.zoom__btn_minus').addEventListener('click', zoomOut);
props.animals.forEach(obj => {
  obj.animal.addEventListener('click', activeTooltip);
});
document.querySelector('.map-container').addEventListener('click', deactiveTooltip, true);
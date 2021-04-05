function goToZoos(){
  window.location.assign("./pages/zoos/template.html");
}

function goToMap(){
  window.location.assign("./pages/map/map.html");
}

document.querySelector('.watch .btn').addEventListener('click', goToZoos);
document.querySelector('.zoos .btn').addEventListener('click', goToMap);

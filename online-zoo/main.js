function goToZoos(){
  window.location.assign("./pages/zoos/panda.html");
}

function goToMap(){
  window.location.assign("./pages/map/map.html");
}

function goToDonate(){
  window.location.assign("./pages/donate/donate.html");
}

document.querySelector('.watch .btn').addEventListener('click', goToZoos);
document.querySelector('.zoos .btn').addEventListener('click', goToMap);
document.querySelector('.feed .btn').addEventListener('click', goToDonate);
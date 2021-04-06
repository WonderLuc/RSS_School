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


document.querySelector('.watch .btn').addEventListener('click', goToZoos);
document.querySelector('.zoos .btn').addEventListener('click', goToMap);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
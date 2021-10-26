function goToDonate(){
  window.location.assign("../donate/donate.html");
}

function scrollToHeader(e){
  e.preventDefault();
  window.scrollTo(0,0);
}

function goToZoos(){
  window.location.assign("../zoos/panda.html");
}

document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
document.querySelector('.solution .btn').addEventListener('click', goToZoos);
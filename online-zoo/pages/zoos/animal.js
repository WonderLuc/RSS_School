function goToDonate(){
  window.location.assign("../donate/donate.html");
}

function scrollToHeader(e){
  e.preventDefault();
  window.scrollTo(0,0);
}

document.querySelector('footer .logo').addEventListener('click', scrollToHeader);
document.querySelector('.contacts .btn').addEventListener('click', goToDonate);
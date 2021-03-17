// button switch

function changeSign(str){
  let keys = document.querySelectorAll('.piano-key');
  switch (str){
    case 'notes':
      document.querySelector(".btn-letters").classList.remove('btn-active');
      document.querySelector(".btn-notes").classList.add('btn-active');
     for(let i =0; i < keys.length; i++){
        keys[i].classList.remove('piano-key-letter');
     }
     break;
    case 'letters':
      document.querySelector(".btn-notes").classList.remove('btn-active');
      document.querySelector(".btn-letters").classList.add('btn-active');
      for(let i =0; i < keys.length; i++){
        keys[i].classList.add('piano-key-letter');
      }
      break;
  }
}

document.querySelector(".btn-container").addEventListener('click',e=>{
  let elem = e.target;
  if(elem.classList.contains('btn-notes')){
    changeSign('notes');
    return;
  }
  if(elem.classList.contains('btn-letters')){
    changeSign('letters');
  }
})
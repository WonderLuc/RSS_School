let keys = document.querySelectorAll('.piano-key');
let piano = document.querySelector('.piano');

// button switch

function changeSign(str){
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
});

// fullSrceen switch

document.querySelector('.fullscreen').addEventListener('click',()=>{
  document.fullscreenElement? document.exitFullscreen(): document.body.requestFullscreen();
})

// Play sound 
let audios={};

function playSound(event){
  let elem = event.target;
  if(event.code){
    for(let i =0; i < keys.length; i++){
      let letter = keys[i].dataset.letter;
      if(event.code === `Key${letter}`){
        elem = keys[i];
        break;
      }
    }
    if(elem == event.target){
      return;
    }
  }
  let audio;
  if(!audios[elem.dataset.note]){
    audio = document.createElement('audio');
    audio.src=`./assets/audio/${elem.dataset.note}.mp3`;
    audios[elem.dataset.note] = audio;
  }
  elem.classList.add('piano-key-active');
  elem.classList.add('piano-key-active-pseudo');
  audios[elem.dataset.note].load();
  audios[elem.dataset.note].play();
}

function stopSound(event){
  let elem = event.target;
  if(event.code){
    for(let i =0; i < keys.length; i++){
      let letter = keys[i].dataset.letter;
      if(event.code === `Key${letter}`){
        elem = keys[i];
        break;
      }
    }
    if(elem == event.target){
      return;
    }
  }
  elem.classList.remove('piano-key-active');
  elem.classList.remove('piano-key-active-pseudo');
}


// on button
document.addEventListener('keydown', e=>{
  if(e.repeat !== true){
    playSound(e);
  }
});
document.addEventListener('keyup', e=>{
  stopSound(e);
});


// on mousedown and move
piano.addEventListener('mousedown',e=>{
  playSound(e);
  for(let i =0; i < keys.length; i++){
    keys[i].addEventListener('mouseover',playSound,false);
    keys[i].addEventListener('mouseout',stopSound,false);
  }
});

document.querySelector('main').addEventListener('mouseup',e=>{
  stopSound(e);
  for(let i =0; i < keys.length; i++){
    keys[i].removeEventListener('mouseover',playSound);
    keys[i].removeEventListener('mouseout',stopSound,false);
  }
});
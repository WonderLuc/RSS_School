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
    if(VIEWER){
      VIEWER.changeNoteSign();
    }
    
    return;
  }
  if(elem.classList.contains('btn-letters')){
    changeSign('letters');
    if(VIEWER){
      VIEWER.changeNoteSign();
    }
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
  }
  if(!elem.classList.contains('piano-key')){
    return;
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
  if(VIEWER&&VIEWER.playing){
    VIEWER.checkHit(elem.dataset.note);
  }
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
  }
  if(!elem.classList.contains('piano-key')){
    return;
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

//ADDITIONAL CONTENT
// Song viewer

// Contains songs for play
let songs = {
  grasshopper:{
    letters: ["G", "D", "G", "D", "G", "H", "H", "H", "D", "H", "D", "H", "G", "G", "G", "D", "G", "H", "D", "H", "D", "H", "G", "G", "D", "G", "H", "H", "J", "J", "J", "J", "J", "I", "I", "I", "I", "I", "I", "J", "H", "G", "H", "H", "H", "J", "J", "J", "J", "J", "I", "I", "I", "I", "I", "I", "J", "H", "G", "H"],
    notes: ["e", "c", "e", "c", "e", "f", "f", "f", "c", "f", "c", "f", "e", "e", "e", "c", "e", "f", "c", "f", "c", "f", "e", "e", "c", "e", "f", "f", "g", "g", "g", "g", "g", "g♯", "g♯", "g♯", "g♯", "g♯", "g♯", "g", "f", "e", "f", "f", "f", "g", "g", "g", "g", "g", "g♯", "g♯", "g♯", "g♯", "g♯", "g♯", "g", "f", "e", "f"],
    speed: 3
  },
  geese:{
    letters:["H", "G", "F", "D", "J", "J", "H", "G", "F", "D", "J", "J", "H", "K", "K", "H", "G", "J", "J", "G", "F", "G", "H", "F", "D", "D", "H", "K", "K", "H", "G", "J", "J", "G", "F", "G", "H", "F", "D", "D"],
    notes: ["f", "e", "d", "c", "g", "g", "f", "e", "d", "c", "g", "g", "f", "a", "a", "f", "e", "g", "g", "e", "d", "e", "f", "d", "c", "c", "f", "a", "a", "f", "e", "g", "g", "e", "d", "e", "f", "d", "c", "c"],
    speed: 3
  }
}

class SongViewer{
  constructor(selector){
    this.elem = document.querySelector(selector);

    this.startBtn = document.querySelector('.start-btn'); 
    this.restartBtn = document.querySelector('.restart-btn');
    this.playingZone = document.querySelector('.playing-zone');
    this.message = document.querySelector('.message');
    this.messageText = this.message.querySelector('.message-text');
    this.song;
    this.allId;
    this.currentNotes;
    this.interval;
    this.playing = false;
    this.counter = 0;
    this.score = 0;
  }
// Create a new elements for play
  initSong(song){
    if(this.elem.children.length){
      this.restartPlaying.bind(this);
      this.elem.innerHTML ='';
    }
    this.song = song; 
    this.elem.classList.add(this.elem.classList[0]+'-active');
    this.allId = song.notes.map(el=>{
      let customId = `${el}-${Math.round(Math.random()*10000)}`;
      let note = document.createElement('p');
      note.classList.add('song-workplace-note');
      note.style.top = Math.round(Math.random()*100)+'px';
      note.style.background = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
      note.setAttribute('id',customId);
      note.dataset.note = el;
      note.innerHTML = `<span>${el}</span>`;
      this.elem.appendChild(note);
      return customId;
    });
    this.startBtn.style.display ='block';
    this.playingZone.style.display ='block';
    this.message.style.display = 'flex';
    this.messageText.innerHTML ="Are you ready? Click Start!"
    this.currentNotes = [...this.allId];
    this.changeNoteSign(); 
    let lastElem = document.createElement('div');
    lastElem.classList.add('last-element');
    lastElem.innerText = 'END';
    this.elem.appendChild(lastElem);
  }
// Cechk's current signification status and return true if it's notes
  isNotesSign(){
    let btn = document.querySelector('.btn-active');
    if(btn.classList.contains('btn-notes')){
      return true;
    }
    return false;
  }
// cahnge sidgification 
  changeNoteSign(){
    let el = this.elem.children;

    if(this.isNotesSign()){
      for(let i = 0; i<el.length-1; i++){
        el[i].innerHTML = `<span>${this.song.notes[i]}</span>`;
      }
    }else{
      for(let i = 0; i<el.length-1; i++){
        el[i].innerHTML = `<span>${this.song.letters[i]}</span>`;
      }
    }
  }

  isPlaying(){
    return this.playing;
  }

  startPlaying(){
    let context = this;
    context.playing = true;
    context.score = 0;
    context.counter = 0;
    let scrollWidth = context.elem.scrollWidth;
    let clientWidth = context.elem.clientWidth;
    context.startBtn.style.display ="none";
    context.restartBtn.style.display ="block";
     context.interval = setInterval(() => {
       
       context.elem.scrollBy(context.song.speed,0);
       this.checkHit();
       context.messageText.innerHTML = `Count: x${context.counter}<br> Score:${context.score}`;
       if(context.elem.scrollLeft+clientWidth == scrollWidth || context.currentNotes.length == 0){
        context.messageText.innerHTML = `Your Score: ${this.score}`;
        context.pausePlaying();        
      }
     }, 20);
     
  }

  pausePlaying(){
    this.playing = false;
    clearInterval(this.interval);
  }

  restartPlaying(){
    this.pausePlaying();
    this.messageText.innerHTML = `Your Score: ${this.score}`;
    this.elem.scrollTo(0,0);
    this.currentNotes = [...this.allId];
    this.restartBtn.style.display ="none";
    this.startBtn.style.display ="block";
  }

  checkHit(elem=undefined){
    let currentElem = document.getElementById(this.currentNotes[0]);
    let notePosition = currentElem.getBoundingClientRect();
    let playzonePosition = this.playingZone.getBoundingClientRect();
    if(!!elem){
      if(currentElem.dataset.note == elem){
        if(notePosition.x > playzonePosition.x + +getComputedStyle(this.playingZone).width.replace('px','')){
          console.log('too early!');
          return;
        }
        if(notePosition.x > playzonePosition.x 
          && notePosition.x < playzonePosition.x + +getComputedStyle(this.playingZone).width.replace('px','')){

          if(notePosition.x < (playzonePosition.x + (+getComputedStyle(this.playingZone).width.replace('px','')/3))){
            this.score += this.counter*10 + 10; 
            this.counter++;
          }
          this.score += this.counter*10 + 10; 
          this.counter++;
          this.currentNotes.shift();
          return;
        }
      }
      this.score -=  this.score<= 0? 0:10; 
      this.counter = 0;
      return; 
    }else{
      if(notePosition.x < playzonePosition.x){
        this.score -=  this.score<= 0? 0:10; 
        this.counter = 0;
        this.currentNotes.shift();
        return;
      }
      if(notePosition.x > playzonePosition.x + +getComputedStyle(this.playingZone).width.replace('px','')){
        return;
      }
    }
    
    
  }
}

let VIEWER; 

document.querySelector('.songs-container input').addEventListener('change', e=>{
  if(!VIEWER){
    VIEWER = new SongViewer('.song-workplace');
    VIEWER.initSong(songs[document.querySelector('.songs-container input').value]);
    VIEWER.startBtn.addEventListener('click',VIEWER.startPlaying.bind(VIEWER));
    VIEWER.restartBtn.addEventListener('click',VIEWER.restartPlaying.bind(VIEWER));
    
  }else{
    VIEWER.initSong(songs[document.querySelector('.songs-container input').value]);
  }
  document.querySelector('.change-song h4').innerHTML = 'Current Song: ' + document.querySelector('.songs-container input').value;
  document.querySelector('.change-song').style.display = 'flex';  
  document.querySelector('.songs-container input').value = '';
  document.querySelector('.songs-container input').style.display = 'none';
  document.querySelector('.songs-container h3').style.display = 'none';   
});

document.querySelector('.change-song button').addEventListener('click',()=>{
  document.querySelector('.change-song').style.display = 'none';  
  document.querySelector('.songs-container input').style.display = 'block';
  document.querySelector('.songs-container h3').style.display = 'block';   
})

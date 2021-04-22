//Fullscreen behaviour
let fullscreenBtn = document.querySelector('.fullscreen');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
    return;
  }
  document.exitFullscreen();
});
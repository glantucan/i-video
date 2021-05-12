function VideoPlayerActions(state$) {
  return {
    setVideo(url) {
      //??
    },
    play() {
      if (state$().status !== state$().STATUS.PLAYING) {
        state$().videoDom.play();
      }
    },
    pause(){
      if (state$().status !== state$().STATUS.PAUSED) {
        state$().videoDom.pause();
      }
    },
    seek(percent) {
      state$().videoDom.currentTime = state$().duration * percent / 100;
      
    }
  }
}

export default VideoPlayerActions;
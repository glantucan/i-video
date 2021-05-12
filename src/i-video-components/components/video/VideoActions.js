function VideoPlayerActions(state$) {
  return {
    setVideo(url) {
      //??
    },
    play() {
      if (state$().vState !== state$().STATES.PLAYING) {
        state$().videoDom.play();
      }
    },
    pause(){
      if (state$().vState !== state$().STATES.PAUSED) {
        state$().videoDom.pause();
      }
    },
    seek(percent) {
      state$().videoDom.currentTime = state$().duration * percent / 100;
      
    }
  }
}

export default VideoPlayerActions;
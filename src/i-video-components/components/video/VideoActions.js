function VideoPlayerActions(state$) {
  return {
    setVideo(url) {
      //??
    },
    play() {
      console.log(state$());
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
      if (videoReady$().loaded) {
        state$().dom.currentTime = state$().duration * percent / 100;
      }
    }
  }
}

export default VideoPlayerActions;
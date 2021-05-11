import m from 'mithril';
import stream from 'mithril/stream';
import VideoModel, { VSTATES } from './VideoModel';
import Video from './Video';
import VideoActions from './VideoActions';
import VideoControls from './VideoControls';

var initialState = {
  STATES: VSTATES,
  vState: VSTATES.NOT_READY,
  videoDom: undefined,
  duration: 0,
  progress: 0,  
};
var events = {
  vStateChanges$: stream(VSTATES.NOT_READY),
  videoReady$: stream(false),
  videoProgress$: stream({
    target: {
      duration:1,
      currentTime: 0
    }
  })
};

function VideoPlayer() {

  var state$ = VideoModel(initialState, events);
  var actions = VideoActions(state$);
  return {
    view({ attrs: { url, canSeek = true } }) {
      return m('.mc-video-player' , {},
        m( Video, { 
          url,
          state: state$(),
          events: events,
        }),
        m( VideoControls, {
          state: state$(),
          actions,
          canSeek: canSeek
        })
      );
    }
  };
}

export default VideoPlayer;

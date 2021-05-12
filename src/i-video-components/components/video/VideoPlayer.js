import m from 'mithril';
import stream from 'mithril/stream';
import VideoModel, { STATUS } from './VideoModel';
import Video from './Video';
import VideoActions from './VideoActions';
import VideoControls from './VideoControls';

var initialState = {
  STATUS,
  status: STATUS.NOT_READY,
  videoDom: undefined,
  duration: 0,
  progress: 0,  
  currentTime: 0,
};

var internalEvents = {
  status$: stream({type:'unready'}),
  progress$: stream({
    target: {
      duration:1,
      currentTime: 0
    }
  })
};

function VideoPlayer() {

  var state$ = VideoModel(initialState, internalEvents);
  state$.map(m.redraw);
  var actions = VideoActions(state$);
  return {
    oninit(v) {
      v.sinks = {
        videoState$: state$.map( s => ({
          status: s.status, 
          progress: s.progress,
          currentTime: s.currentTime
        })),
      };
    },
    view({ attrs: { url, canSeek = true } }) {
      
      return m('.mc-video-player' , {
          style: {
            width: '90%',
            border: 'lightgray solid 1px'
          }
        },
        m( Video, { 
          url,
          state: state$(),
          sources: internalEvents,
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

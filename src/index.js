import m from 'mithril';
import stream from 'mithril/stream';
import {STATUS} from './i-video-components/components/video/VideoModel';

import VideoPlayer from './i-video-components/components/video/VideoPlayer';
import iVideoModel from './i-video-components/IVideoModel';
import {relay} from './libs/streamUtils';

console.log(STATUS)

var initialState$ = stream({
  video: {
    url: 'https://embed-ssl.wistia.com/deliveries/8b7abcbaa3fe8e31dd9dd426b3a9485483778d02/file.mp4',
    status: STATUS.NOT_READY,
    progress: 0,
    currentTime: 0,
  }
});

var sources = {
  video: {
    videoState$: stream({
      status: STATUS.NOT_READY,
      progress: 0
    })
  }
}

var state$ = stream.lift(
  (state, {status, progress, currentTime} ) => {
    return {
      ...state,
      video: {
        ...state.video,
        status,
        progress: Math.round(progress),
        currentTime,
      }
    }
  },
  initialState$, 
  sources.video.videoState$
);

var mRoot = document.getElementById('mithril-app');

m.mount(mRoot, {
  view() {
    return m( '.app-container', {},
      m( VideoPlayer, {
        url: state$().video.url,
        oninit({sinks:{videoState$}}) {
          relay(videoState$, sources.video.videoState$);
        }
      }),
      m('p', `Video state: ${state$().video.status}`),
      m('p', `Video.progress: ${state$().video.progress}`),
      m('p', `Video.currantTime: ${state$().video.currentTime}`)
    );
  }
});

/**
 Points of friction:
 -------------------
 - relay(streamA, streamB) is a side effect
 - v.sinks = ... is another side effect

 Both happen on oninit() functions of the component vnodes. State can be trusted after the oncreate is executed but not before.
 
 */
import stream from 'mithril/stream';

const VSTATES = {
  NOT_READY: 'not-ready',
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
};

/**
 * Generates the state stream
 * @param {Object} initial Initial state object
 * @param {*} sources Event or change streams sources
 * @returns {stream}
 */
function VideoModel(initial, sources) {

  var { 
      vStateChanges$, videoReady$, videoProgress$
  } = sources;
  

  var afterVideoReady$ = stream.merge( [
    stream(initial), 
    videoReady$
  ]).map( ([state, videoReadyEvent]) => {
    return {
      ...state,
      vState: videoReadyEvent ? VSTATES.IDLE : state.vState,
      videoDom: videoReadyEvent ? videoReadyEvent.target : undefined,
      duration: videoReadyEvent ? videoReadyEvent.target.duration : 0
    }
  });

  return stream.merge( [
    afterVideoReady$, 
    
    vStateChanges$.map(({type}) => ({
      play: VSTATES.PLAYING,
      pause: VSTATES.PAUSED
    }[type])), 
    
    videoProgress$.map( 
      ({target: {currentTime:t, duration:d}}) => 100 * t / d ), 
  ])
  .map(([state, stateChange, progress]) => {
    return {
      ...state,
      vState: stateChange ? stateChange : state.vState,
      progress
    }
  });  

}

export {
  VideoModel as default,
  VSTATES,
};
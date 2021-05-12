import stream from 'mithril/stream';

const STATUS = {
  NOT_READY: 'not-ready',
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  UNKNOWN: 'unknown',
  ERROR: 'error'
};

/**
 * Generates the state stream
 * @param {Object} initial Initial state object
 * @param {*} sources Event or change streams sources
 * @returns {stream}
 */
function VideoModel(initial, sources) {

  var { 
      status$, progress$
  } = sources;


  return stream.lift(
    (state, statusEvent, progressEvent) => {
      return {
        ...state, 
        status: eventTypeToStatus(statusEvent),
        videoDom: eventTypeToStatus(statusEvent) !== STATUS.NOT_READY 
          ? statusEvent.target 
          : undefined,
        duration: eventTypeToStatus(statusEvent) !== STATUS.NOT_READY 
          ? statusEvent.target.duration 
          : 0,
        progress: 100 * progressEvent.target.currentTime / progressEvent.target.duration,
        currentTime: progressEvent.target.currentTime
      };
    },
    stream(initial), status$, progress$
  );

}

function eventTypeToStatus({type}) {
  return {
    unready: STATUS.NOT_READY,
    canplay: STATUS.IDLE,
    play: STATUS.PLAYING,
    pause: STATUS.PAUSED
  }[type] || STATUS.UNKNOWN;
}


export {
  VideoModel as default,
  STATUS,
};
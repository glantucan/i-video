import stream from 'mithril/stream';

const VSTATES = {
  NOT_READY: 'not-ready',
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
};

function iVideoModel(initial, sources) {
  console.log(sources)
  
  var { 
    player:{
      video: { 
        vStateChanges$, videoProgress$
      }
    }
  } = sources;
  


  return stream( initial );  

}

export default iVideoModel;

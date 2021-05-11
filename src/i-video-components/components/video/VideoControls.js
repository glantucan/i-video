import m, { parseQueryString } from 'mithril';

function VideoControls() {
  
  return {
    view({attrs: { actions, state }}) {
      
      return m( '.video-controls', {},
        m('button', {
            onclick: state.vState === state.STATES.PLAYING
              ? actions.pause
              : actions.play
          },
          state.vState === state.STATES.PLAYING
            ? 'Pause'
            : 'Play'
        ),
        m('input[type=range]', {
          id: 'video-progress',
          min: 0,
          max: 100,
          step: 1,
          // call the stream fuction the get the current value
          value: state.progress, 
          // Pass a new value to the stream function to modify the value
          oninput: (e) => cookies$(e.target.value)

        }),
        
      );
    }
  };
}

export default VideoControls;
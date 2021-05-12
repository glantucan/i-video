import m, { parseQueryString } from 'mithril';

function VideoControls() {
  
  return {
    view({attrs: { actions, state }}) {
      
      return m( '.video-controls', {},
        m(Button, {
          onclick: state.status === state.STATUS.PLAYING
            ? actions.pause
            : actions.play
          },
          state.status === state.STATUS.PLAYING
            ? m('span',{style:{fontSize:'60%'}}, m.trust('&#9611;&#9611;'))
            : m.trust('&#9654;')//&#9654;
        ),
        m('input[type=range]', {
          id: 'video-progress',
          min: 0,
          max: 100,
          step: .01,
          // call the stream fuction the get the current value
          value: state.progress, 
          // Pass a new value to the stream function to modify the value
          oninput: (e) => {
            actions.seek(e.target.value);
          },
          style: {
            width: 'calc(100% - 3em)'
          }

        }),
        
      );
    }
  };
}



function Button() {
  
  return {
    view({attrs: {class: className, onclick }, children}) {
      
      return m('.mc-button' , {
          class: className,
          style: {
            boxSizing: 'border-box',
            userSelect: 'none',
            padding: '.45em .65em',
            display: 'inline-block',
            borderRadius: '5px',
            backgroundColor: '#60a9ff',
            cursor: 'pointer',
            width: '2em',
            height: '2em',
            color: 'white'
          },
          onmouseover({target}){
            target.style.backgroundColor = '#0075ff';
          },
          onmouseout({target}){
            target.style.backgroundColor = '#60a9ff';
          },
          onclick
        },
        m('.label', {style:{pointerEvents:'none'}}, children)
        
        
      );
    }
  };
}

export default VideoControls;
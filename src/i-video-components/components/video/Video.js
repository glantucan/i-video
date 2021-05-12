import m from 'mithril';



function Video({attrs: { sources: { status$ } } }) {

  function onCanPlay(e) {
    e.target.removeEventListener('canplay', onCanPlay);
    status$(e);
  }
  return {
    
    view(vnode) {
      var { attrs: { state: { STATES, status } , url, sources: { status$, progress$ } }} = vnode;
      return m( 'video', {
          style: {
            width: '100%'
          },
          oncreate(v) {
            v.dom.addEventListener('canplay', onCanPlay);
          },
          ontimeupdate: progress$,
          onpause: status$,
          onplay: status$
        },
        m('source', {
          src: url,
          type:'video/mp4',
        })
        
      );
    }
  };
}

export default Video;
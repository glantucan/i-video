import m from 'mithril';

function Video() {
  return {
    view(vnode) {
      var { attrs: { state: { STATES, vState } , url, sources: { vStateChanges$, videoReady$, videoProgress$ } }} = vnode;

      return m( 'video', {
          style: {
            width: '100%'
          },
          oncanplay: videoReady$,
          ontimeupdate: videoProgress$,
          onpause: vStateChanges$,
          onplay: vStateChanges$
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
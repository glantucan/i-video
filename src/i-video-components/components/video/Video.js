import m from 'mithril';

function Video() {
  return {
    oncreate({dom}){
      console.log(dom);
    },
    view(vnode) {
      var { attrs: { state: { STATES, vState } , url, events: { vStateChanges$, videoReady$, videoProgress$ } }} = vnode;

      return m( 'video', {
          style: {
            width: '90%'
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
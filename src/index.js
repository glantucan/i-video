import m from 'mithril';
import stream from 'mithril/stream';

//import VideoActions from './i-video-components/components/video/VideoActions';
import VideoPlayer from './i-video-components/components/video/VideoPlayer';
import iVideoModel from './i-video-components/IVideoModel';


var state$ = stream();


var mRoot = document.getElementById('mithril-app');

m.mount(mRoot, {
  view() {
    return m( '.app-container', {},
      m( VideoPlayer, {
        url: 'https://embed-ssl.wistia.com/deliveries/8b7abcbaa3fe8e31dd9dd426b3a9485483778d02/file.mp4'
      })
    );
  }
});

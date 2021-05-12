import stream from 'mithril/stream';

export function relay(in$, out$) {
  in$.map( v => out$(v) );
}

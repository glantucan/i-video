import m from 'mithril';
import './Grid.scss';

function Grid() {
  
  return {
    oncreate({attrs: { minCellWidth }, dom}) {
      if( minCellWidth != undefined) {
        dom.style.setProperty('--cell-min-width', minCellWidth);
      }
    },

    view({attrs: {}, children}) {  
      return m( '.mc-grid', {},
        children    
      );
    }
  };
}

export default Grid;
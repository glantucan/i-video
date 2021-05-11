import m from 'mithril';
import './Table.scss';

/**
 * 
 * @param {object} data Table data
 */
function Table() {
  return {
    view({attrs: {header, data, ...attrs}}) {
      return m( 'table.mc-table', 
        { ...attrs },
        header 
          ? m('thead.mc-table__header',
              m('tr.mc-table__header-row',
                header.map( cell =>  m('th.mc-table__header-cell', cell) ) 
              )
            )
        : '',
        m('tbody.mc-table__body',
          data.map( row =>
            m('tr.mc-table__row',
              row.map( cell =>
                m('td.mc-table__cell', cell) ) 
            )
          )
        )
      );
    }
  };
}
  
export default Table;
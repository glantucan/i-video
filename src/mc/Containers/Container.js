import m from 'mithril';
import './Container.scss';

/**
 * Expected vnode attrs:
 *    class:    string  (optional) extra HTML class attribute
 *    id:       string  (optional) HTML id attribute
 *    vScroll:  Boolean (optional) Activate vertical scroll  
 *    height:   string  (optional) container height CSS value 
 */
function Container ({attrs: {class: className}}) {

  // Using a function like this is necessary when css classes need to be created responding to attrs parameters
  function computeCssClasses(className, vScroll) {
    return [
      vScroll ? 'mc-container--v-scroll' : '', 
      className ? className : ''
    ].join(' ').trim();
  }

  return {
    view({attrs: { class: className, id, vScroll, style}, children}) {
      return m('div.mc-container', 
        { class: computeCssClasses(className, vScroll), id, style }, 
        children
      );
    }
  }
}


export default Container

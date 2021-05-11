import m from 'mithril';
import './Tabs.scss';


/**
 * Tabs component. The tab labels are generated from the id and label attributes of the children.
 * @param {string} id HTML id attribute
 * @param {string} class CSS custom class name 
 * @param {string} defeaultTab Default active tab id (optional)
 * @returns 
 */
function Tabs({attrs: {defaultTab}, children}) {
  
  var activeTab = defaultTab ? defaultTab : children[0].attrs.id;  
  
  function selectTab(id) {
    activeTab = id;
  }

  return {
      view({attrs: { class: className, id }, children}) {
          return m( '.mc-tabs', { className, id },
            m('.mc-tabs__labels', { 
                onclick: e => selectTab(e.target.id) 
              },
              children.map(
                child => m('.mc-tabs__label', { 
                    id: child.attrs.id, 
                    class: child.attrs.id == activeTab 
                      ? 'selected' 
                      : '' 
                  }, 
                  child.attrs.label
                )
              )
            ), 
            m('.mc-tabs__contents',
              children.map( 
                child => m('.mc-tabs__content', { 
                  class: child.attrs.id == activeTab 
                    ? 'selected' 
                    : ''
                  }, 
                  child
                ) 
              )
            )
          );
      }
  };
}

/* More efficient but complex version
function Tabs({attrs: {defaultTab}, children}) {
  // Convert the children into a data structure to easily manage the tabs
  var tabs = children.reduce(
    function(carry, child) {
      return {
        tabLabels: [...carry.tabLabels, { id: child.attrs.id, text: child.attrs.label }],
        tabContents:  [...carry.tabContents, child],
      }
    },
    { tabLabels: [], tabContents: []}
  );

  var activeTab = defaultTab ? defaultTab : tabs.tabLabels[0].id;  
  
  function selectTab(id) {
    console.log(id);
    activeTab = id;
  }

  return {
      view({attrs: { class: className, id }}) {
          return m( '.mc-tabs', { className, id },
            m('.mc-tabs__labels', { onclick: e => selectTab(e.target.id) },
              tabs.tabLabels.map(
                label => 
                  m('.mc-tabs__label', { id: label.id, class: label.id == activeTab ? 'selected' : '' },label.text)
              )
            ), 
            m('.mc-tabs__contents',
              tabs.tabContents.map( 
                content => {
                  return m('.mc-tabs__content', { class: content.attrs.id == activeTab ? 'selected' : ''}, content) 
                }
              )
            )
          );
      }
  };
}
 */
export default Tabs;
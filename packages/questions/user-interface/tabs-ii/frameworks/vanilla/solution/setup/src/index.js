import './styles.css';

(() => {
  // Encapsulate the ID generation so that it can only
  // be read and is protected from external modification.
  const newID = (() => {
    let id = 0;
    return () => id++;
  })();

  function getTabListItemId(tabsId, value) {
    return tabsId + '-tab-' + value;
  }

  function getTabPanelId(tabsId, value) {
    return tabsId + '-tabpanel-' + value;
  }

  function tabs(
    $rootEl,
    { defaultValue, items: itemsParam },
  ) {
    const DOM = {
      $tabBar: document.createElement('div'),
      $tabpanels: document.createElement('div'),
    };

    const items = itemsParam;
    const state = {
      value: defaultValue || items[0].value,
    };
    const tabsId = `tabs-${newID()}`;

    function update() {
      const $tabsFragment =
        document.createDocumentFragment();
      items.forEach(({ label, value: itemValue }) => {
        const $tabEl = document.createElement('button');
        const isTabActive = itemValue === state.value;

        $tabEl.textContent = label;
        $tabEl.type = 'button';
        $tabEl.role = 'tab';
        $tabEl.setAttribute('data-value', itemValue);
        $tabEl.id = getTabListItemId(tabsId, itemValue);
        $tabEl.setAttribute(
          'aria-controls',
          getTabPanelId(tabsId, itemValue),
        );
        $tabEl.classList.add('tabs-list-item');

        $tabEl.setAttribute('aria-selected', isTabActive);
        if (isTabActive) {
          $tabEl.classList.add('tabs-list-item--active');
        }

        $tabsFragment.appendChild($tabEl);
      });

      DOM.$tabBar.innerHTML = '';
      DOM.$tabBar.appendChild($tabsFragment);

      const $tabpanelsFragment =
        document.createDocumentFragment();
      items.forEach(({ panel, value: itemValue }) => {
        const isTabActive = itemValue === state.value;

        const $tabpanelEl = document.createElement('div');
        $tabpanelEl.role = 'tabpanel';
        $tabpanelEl.id = getTabPanelId(tabsId, itemValue);
        $tabpanelEl.setAttribute(
          'aria-labelledby',
          getTabListItemId(tabsId, itemValue),
        );
        $tabpanelEl.textContent = panel;
        $tabpanelEl.hidden = !isTabActive;

        $tabpanelsFragment.appendChild($tabpanelEl);
      });

      DOM.$tabpanels.innerHTML = '';
      DOM.$tabpanels.appendChild($tabpanelsFragment);
    }

    function attachEvents() {
      // Use Event Delegation.
      DOM.$tabBar.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
          return;
        }

        state.value =
          event.target.getAttribute('data-value');
        update();
      });
    }

    function init() {
      $rootEl.classList.add('tabs');

      DOM.$tabBar.className = 'tabs-list';
      DOM.$tabBar.role = 'tabslist';
      $rootEl.appendChild(DOM.$tabBar);

      $rootEl.appendChild(DOM.$tabpanels);
    }

    init();
    update();
    attachEvents();
  }

  tabs(document.getElementById('tabs'), {
    items: [
      {
        value: 'html',
        label: 'HTML',
        panel:
          'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
      },
      {
        value: 'css',
        label: 'CSS',
        panel:
          'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
      },
      {
        value: 'javascript',
        label: 'JavaScript',
        panel:
          'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
      },
    ],
  });
})();

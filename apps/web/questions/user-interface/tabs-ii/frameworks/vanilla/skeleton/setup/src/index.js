import './styles.css';

(() => {
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

    function update() {
      const $tabsFragment =
        document.createDocumentFragment();
      items.forEach(({ label, value: itemValue }) => {
        const $tabEl = document.createElement('button');
        const isTabActive = itemValue === state.value;

        $tabEl.textContent = label;
        $tabEl.type = 'button';
        $tabEl.setAttribute('data-value', itemValue);
        $tabEl.classList.add('tabs-list-item');

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

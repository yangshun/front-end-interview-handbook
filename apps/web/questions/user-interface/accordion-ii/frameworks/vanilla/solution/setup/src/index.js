import './styles.css';

(() => {
  // Encapsulate the ID generation so that it can only
  // be read and is protected from external modification.
  const newID = (() => {
    let id = 0;
    return () => id++;
  })();

  function getAccordionHeaderId(accordionId, value) {
    return accordionId + '-header-' + value;
  }

  function getAccordionPanelId(accordionId, value) {
    return accordionId + '-panel-' + value;
  }

  function accordion($rootEl, { sections }) {
    const accordionId = `accordion-${newID()}`;

    function attachEvents() {
      // Use Event Delegation.
      $rootEl.addEventListener('click', (event) => {
        const target = event.target;
        if (
          target.tagName !== 'BUTTON' ||
          !target.classList.contains('accordion-item-title')
        ) {
          return;
        }

        const isExpanded =
          target.getAttribute('aria-expanded') === 'true';
        target.setAttribute('aria-expanded', !isExpanded);

        // Find the icon and toggle the direction.
        const $icon = target.querySelector(
          '.accordion-icon',
        );
        $icon.classList.toggle(
          'accordion-icon--rotated',
          !isExpanded,
        );

        // Find the accordion contents and toggle the
        // contents' visibility.
        const $accordionContents = target.nextSibling;
        $accordionContents.hidden = isExpanded;
      });
    }

    function init() {
      $rootEl.classList.add('accordion');

      const $accordionSections =
        document.createDocumentFragment();

      sections.forEach(({ value, title, contents }) => {
        const headerId = getAccordionHeaderId(
          accordionId,
          value,
        );
        const panelId = getAccordionPanelId(
          accordionId,
          value,
        );

        const $accordionSection =
          document.createElement('div');
        $accordionSection.classList.add('accordion-item');

        const $accordionTitleBtn =
          document.createElement('button');
        $accordionTitleBtn.classList.add(
          'accordion-item-title',
        );
        $accordionTitleBtn.type = 'button';
        $accordionTitleBtn.setAttribute(
          'data-value',
          value,
        );
        $accordionTitleBtn.id = headerId;
        $accordionTitleBtn.setAttribute(
          'aria-controls',
          panelId,
        );
        $accordionTitleBtn.setAttribute(
          'aria-expanded',
          false,
        );

        const $accordionIcon =
          document.createElement('span');
        $accordionIcon.classList.add('accordion-icon');
        $accordionIcon.setAttribute('aria-hidden', 'true');

        $accordionTitleBtn.append(title, $accordionIcon);

        const $accordionSectionContents =
          document.createElement('div');
        $accordionSectionContents.classList.add(
          'accordion-item-contents',
        );
        $accordionSectionContents.hidden = true;
        $accordionSectionContents.textContent = contents;
        $accordionSectionContents.role = 'region';
        $accordionSectionContents.id = panelId;
        $accordionSectionContents.setAttribute(
          'aria-labelledby',
          headerId,
        );

        $accordionSection.append(
          $accordionTitleBtn,
          $accordionSectionContents,
        );
        $accordionSections.append($accordionSection);
      });

      $rootEl.appendChild($accordionSections);
    }

    init();
    attachEvents();
  }

  accordion(document.getElementById('accordion'), {
    sections: [
      {
        value: 'html',
        title: 'HTML',
        contents:
          'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
      },
      {
        value: 'css',
        title: 'CSS',
        contents:
          'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
      },
      {
        value: 'javascript',
        title: 'JavaScript',
        contents:
          'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
      },
    ],
  });
})();

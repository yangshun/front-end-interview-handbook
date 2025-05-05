import './styles.css';

(() => {
  function starRating(
    $rootElement,
    { max = 5, value = 0 },
  ) {
    const STAR_ICON_CLASS = 'star-icon';
    const STAR_ICON_FILLED_CLASS = 'star-icon-filled';
    const STAR_TEMPLATE = `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="${STAR_ICON_CLASS}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>`;

    let currentValue = value;

    function initialize() {
      const html = Array.from(
        { length: max },
        () => STAR_TEMPLATE,
      ).join('');
      // Using .innerHTML is safe here since it's non-user content.
      $rootElement.innerHTML = html;

      $rootElement.addEventListener('click', (event) => {
        const $starEl = event.target.closest(
          `.${STAR_ICON_CLASS}`,
        );
        if ($starEl == null) {
          return;
        }

        const value =
          [...$rootElement.children].indexOf($starEl) + 1;
        setValue(value);
      });

      $rootElement.addEventListener(
        'mouseover',
        (event) => {
          const $starEl = event.target.closest(
            `.${STAR_ICON_CLASS}`,
          );
          if ($starEl == null) {
            return;
          }

          const value =
            [...$rootElement.children].indexOf($starEl) + 1;
          highlightStars(value);
        },
      );

      $rootElement.addEventListener('mouseout', () => {
        setValue(currentValue);
      });
    }

    function setValue(value) {
      currentValue = value;
      highlightStars(currentValue);
    }

    function highlightStars(index) {
      for (
        let i = 0;
        i < $rootElement.children.length;
        i++
      ) {
        if (i < index) {
          $rootElement.children[i].classList.add(
            STAR_ICON_FILLED_CLASS,
          );
        } else {
          $rootElement.children[i].classList.remove(
            STAR_ICON_FILLED_CLASS,
          );
        }
      }
    }

    initialize(max);
    setValue(currentValue);

    return {
      // Expose a setValue function so that users can imperatively
      // change the value of the widget in the case of external
      // events. Not strictly necessary but helpful if the need arises.
      setValue,
    };
  }

  starRating(document.getElementById('star-rating'), {
    max: 5,
    value: 3,
  });
  starRating(document.getElementById('star-rating-2'), {
    max: 10,
    value: 5,
  });
})();

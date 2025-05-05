import './styles.css';

(() => {
  function progressBar($rootElement, initialValue) {
    const MIN = 0;
    const MAX = 100;
    $rootElement.classList.add('progress');

    const $progressBarEl = document.createElement('div');
    $progressBarEl.className = 'progress-bar';
    // Set attributes for a11y.
    $progressBarEl.setAttribute('role', 'progressbar');
    $progressBarEl.setAttribute('aria-valuemin', MIN);
    $progressBarEl.setAttribute('aria-valuemax', MAX);

    function setValue(value) {
      // Handle invalid values and convert them to be within [0, 100].
      const clampedValue = Math.min(
        Math.max(value, MIN),
        MAX,
      );

      $progressBarEl.style.width = `${clampedValue}%`;
      $progressBarEl.textContent = `${clampedValue}%`;
      $progressBarEl.setAttribute(
        'aria-valuenow',
        clampedValue,
      );
    }

    $rootElement.appendChild($progressBarEl);
    setValue(initialValue);

    return {
      setValue,
    };
  }

  // Initialize some examples.
  progressBar(document.querySelector('#progress-0'), 0);
  progressBar(document.querySelector('#progress-25'), 25);
  progressBar(document.querySelector('#progress-50'), 50);
  progressBar(document.querySelector('#progress-75'), 75);
  progressBar(document.querySelector('#progress-100'), 100);
  progressBar(document.querySelector('#progress-2'), 2);
  progressBar(document.querySelector('#progress--10'), -10);
  progressBar(document.querySelector('#progress-120'), 120);

  // Initialize the slider example which controls the progress of
  // the progress bar below.
  const progressSlider = progressBar(
    document.querySelector('#progress-slider'),
    50,
  );

  document
    .querySelector('#slider')
    .addEventListener('change', (event) => {
      progressSlider.setValue(event.target.value);
    });
})();

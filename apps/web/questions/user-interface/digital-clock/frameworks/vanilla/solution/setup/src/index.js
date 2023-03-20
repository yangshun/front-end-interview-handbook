import './styles.css';

(() => {
  const ALL_SIDES = [
    'digit-square-border-top',
    'digit-square-border-left',
    'digit-square-border-right',
    'digit-square-border-bottom',
  ];

  const NUMBER_TO_CLASSES = {
    0: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-right',
      ],
      bottom: [
        'digit-square-border-bottom',
        'digit-square-border-left',
        'digit-square-border-right',
      ],
    },
    1: {
      top: ['digit-square-border-right'],
      bottom: ['digit-square-border-right'],
    },
    2: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
    },
    3: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
    4: {
      top: [
        'digit-square-border-left',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-right',
        'digit-square-border-top',
      ],
    },
    5: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
    6: {
      top: [
        'digit-square-border-top',
        'digit-square-border-left',
        'digit-square-border-bottom',
      ],
      bottom: ALL_SIDES,
    },
    7: {
      top: [
        'digit-square-border-top',
        'digit-square-border-right',
      ],
      bottom: ['digit-square-border-right'],
    },
    8: {
      top: ALL_SIDES,
      bottom: ALL_SIDES,
    },
    9: {
      top: ALL_SIDES,
      bottom: [
        'digit-square-border-top',
        'digit-square-border-right',
        'digit-square-border-bottom',
      ],
    },
  };

  function padTwoDigit(number) {
    return number >= 10 ? String(number) : `0${number}`;
  }

  function separator() {
    const $separator = document.createElement('div');
    $separator.classList.add('separator');

    const $separatorDotTop = document.createElement('div');
    $separatorDotTop.classList.add('separator-dot');

    const $separatorDotBottom =
      document.createElement('div');
    $separatorDotBottom.classList.add('separator-dot');

    $separator.append(
      $separatorDotTop,
      $separatorDotBottom,
    );
    return $separator;
  }

  function digit(number) {
    const { top, bottom } = NUMBER_TO_CLASSES[number];
    const $digit = document.createElement('div');
    const $topSquare = document.createElement('div');
    $topSquare.classList.add(
      'digit-square',
      'digit-square-top',
      ...top,
    );

    const $bottomSquare = document.createElement('div');
    $bottomSquare.classList.add(
      'digit-square',
      'digit-square-bottom',
      ...bottom,
    );

    $digit.append($topSquare, $bottomSquare);
    return $digit;
  }

  function render($rootEl, date) {
    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const dateTimeDisplay = `${padTwoDigit(
      date.getHours(),
    )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

    const $timeEl = document.createElement('time');
    $timeEl.classList.add('clock');
    $timeEl.dateTime = dateTimeDisplay;

    $timeEl.append(
      digit(parseInt(hours / 10, 10)),
      digit(hours % 10),
      separator(),
      digit(parseInt(minutes / 10, 10)),
      digit(minutes % 10),
      separator(),
      digit(parseInt(seconds / 10, 10)),
      digit(seconds % 10),
    );

    $rootEl.innerHTML = '';
    $rootEl.appendChild($timeEl);
  }

  function clock($rootEl) {
    const timer = window.setInterval(() => {
      render($rootEl, new Date());
    }, 100);

    // The beforeunload event is fired before the tab/window is closed.
    // Clear the interval when the tab/window is about to be closed.
    window.addEventListener('beforeunload', () => {
      window.clearInterval(timer);
    });

    render($rootEl, new Date());
  }

  clock(document.getElementById('clock'));
})();

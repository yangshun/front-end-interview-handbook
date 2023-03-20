import './styles.css';

(() => {
  const config = {
    red: {
      backgroundColor: 'red',
      duration: 4000,
      next: 'green',
    },
    yellow: {
      backgroundColor: 'yellow',
      duration: 500,
      next: 'red',
    },
    green: {
      backgroundColor: 'green',
      duration: 3000,
      next: 'yellow',
    },
  };

  function light({ backgroundColor }) {
    const $lightEl = document.createElement('div');
    $lightEl.classList.add('traffic-light');
    $lightEl.setAttribute('aria-hidden', true);

    if (backgroundColor != null) {
      $lightEl.style.backgroundColor = backgroundColor;
    }
    return $lightEl;
  }

  function trafficLight(
    $rootEl,
    { initialColor, config, layout },
  ) {
    let currentColor = initialColor;
    const $containerEl = document.createElement('div');
    $containerEl.classList.add('traffic-light-container');
    $containerEl.setAttribute('aria-live', 'polite');
    if (layout === 'vertical') {
      $containerEl.classList.add(
        'traffic-light-container--vertical',
      );
    }

    let timer = null;

    function setTransition() {
      const { duration, next } = config[currentColor];
      timer = setTimeout(() => {
        currentColor = next;
        renderLoop();
      }, duration);
    }

    function render() {
      $containerEl.innerHTML = '';
      $containerEl.setAttribute(
        'aria-label',
        `Current light: ${currentColor}`,
      );
      Object.keys(config).map((color) => {
        $containerEl.append(
          light({
            backgroundColor:
              color === currentColor
                ? config[color].backgroundColor
                : undefined,
          }),
        );
      });
    }

    function renderLoop() {
      render();
      setTransition();
    }

    // The beforeunload event is fired before the tab/window is closed.
    // Clear the timer when the tab/window is about to be closed.
    window.addEventListener('beforeunload', () => {
      window.clearInterval(timer);
    });

    $rootEl.append($containerEl);
    renderLoop();
  }

  trafficLight(document.getElementById('traffic-light'), {
    initialColor: 'red',
    config,
    layout: 'horizontal',
  });

  trafficLight(document.getElementById('traffic-light-2'), {
    initialColor: 'red',
    config,
    layout: 'vertical',
  });
})();

import './styles.css';

(() => {
  const FULL_ROTATION_DEGREES = 360;

  function padTwoDigit(number) {
    return number >= 10 ? String(number) : `0${number}`;
  }

  function hand({ height = 1, width = 1, angle }) {
    const $hand = document.createElement('div');
    $hand.classList.add('clock-hand');
    $hand.setAttribute('aria-hidden', true);
    $hand.style.transform = `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`;
    return $hand;
  }

  function render($rootEl, date, size) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const secondsPercentage = seconds / 60;
    // To have second-level precision in the minute hand angle.
    const minutesPercentage =
      (minutes + secondsPercentage) / 60;
    // To have minute-level precision in the hour hand angle.
    const hoursPercentage =
      ((hours % 12) + minutesPercentage) / 12;

    const hourAngle =
      hoursPercentage * FULL_ROTATION_DEGREES;
    const minutesAngle =
      minutesPercentage * FULL_ROTATION_DEGREES;
    const secondsAngle =
      secondsPercentage * FULL_ROTATION_DEGREES;

    const dateTimeDisplay = `${padTwoDigit(
      date.getHours(),
    )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

    const $timeEl = document.createElement('time');
    $timeEl.classList.add('clock');
    $timeEl.dateTime = dateTimeDisplay;
    $timeEl.setAttribute('style', `--size: ${size}px`);

    $timeEl.append(
      hand({ angle: hourAngle, height: 0.5, width: 3 }),
      hand({ angle: minutesAngle, height: 0.9, width: 2 }),
      hand({ angle: secondsAngle, height: 0.8 }),
    );

    $rootEl.innerHTML = '';
    $rootEl.appendChild($timeEl);
  }

  function clock($rootEl, size) {
    const timer = window.setInterval(() => {
      render($rootEl, new Date(), size);
    }, 100);

    // The beforeunload event is fired before the tab/window is closed.
    // Clear the interval when the tab/window is about to be closed.
    window.addEventListener('beforeunload', () => {
      window.clearInterval(timer);
    });

    render($rootEl, new Date(), size);
  }

  clock(document.getElementById('clock'), 200);
})();

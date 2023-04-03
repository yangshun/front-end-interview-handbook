import './styles.css';

(() => {
  const MS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const MS_IN_HOUR =
    MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
  const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

  function formatTime(timeParam) {
    let time = timeParam;
    const parts = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      ms: 0,
    };
    if (time > MS_IN_HOUR) {
      parts.hours = Math.floor(time / MS_IN_HOUR);
      time %= MS_IN_HOUR;
    }

    if (time > MS_IN_MINUTE) {
      parts.minutes = Math.floor(time / MS_IN_MINUTE);
      time %= MS_IN_MINUTE;
    }

    if (time > MS_IN_SECOND) {
      parts.seconds = Math.floor(time / MS_IN_SECOND);
      time %= MS_IN_SECOND;
    }

    parts.ms = time;
    return parts;
  }

  function padTwoDigit(number) {
    return number >= 10 ? String(number) : `0${number}`;
  }

  function timeSegment(value, unit, isSmall = false) {
    const $containerEl = document.createElement('span');

    const $digitEl = document.createElement('span');
    $digitEl.classList.add('time-number');
    $digitEl.textContent = value;
    if (isSmall) {
      $digitEl.classList.add('time-number--small');
    }
    $containerEl.append($digitEl);

    if (unit != null) {
      const $unitEl = document.createElement('span');
      $unitEl.classList.add('time-unit');
      $unitEl.textContent = unit;
      $containerEl.append($unitEl);
    }

    return $containerEl;
  }

  function stopwatch($rootEl) {
    // Timer ID of the active interval, if one is running.
    let timerId = null;
    let lastTickTiming = null;
    let totalDuration = 0;
    const $DOM = {
      container: document.createElement('div'),
      timeDisplay: document.createElement('button'),
      timeInner: document.createElement('div'),
      startStopButton: document.createElement('button'),
      resetButton: document.createElement('button'),
    };

    function updateTime() {
      $DOM.timeInner.innerHTML = '';
      const formattedTime = formatTime(totalDuration);
      if (formattedTime.hours > 0) {
        $DOM.timeInner.append(
          timeSegment(formattedTime.hours, 'h'),
        );
      }

      if (formattedTime.minutes > 0) {
        $DOM.timeInner.append(
          timeSegment(formattedTime.minutes, 'm'),
        );
      }

      $DOM.timeInner.append(
        timeSegment(formattedTime.seconds, 's'),
      );

      $DOM.timeInner.append(
        timeSegment(
          padTwoDigit(Math.floor(formattedTime.ms / 10)),
          null,
          true,
        ),
      );
    }

    function tick() {
      const now = Date.now();
      const timePassed = now - lastTickTiming;
      totalDuration += timePassed;
      lastTickTiming = now;
      updateTime();
    }

    function startTimer() {
      lastTickTiming = Date.now();
      timerId = window.setInterval(() => {
        tick();
      }, 1);
      $DOM.startStopButton.textContent = 'Stop';
    }

    function stopInterval() {
      window.clearInterval(timerId);
      timerId = null;
      $DOM.startStopButton.textContent = 'Start';
    }

    function resetTimer() {
      stopInterval();
      totalDuration = 0;
      updateTime();
    }

    function toggleTimer() {
      if (timerId != null) {
        stopInterval();
      } else {
        startTimer();
      }
    }

    function init() {
      $DOM.timeDisplay.classList.add('time');
      $DOM.timeDisplay.addEventListener('click', () => {
        toggleTimer();
      });
      const $cover = document.createElement('span');
      $cover.classList.add('time-cover');
      $DOM.timeDisplay.append($cover);

      $DOM.timeInner.classList.add('time-inner');
      $DOM.timeDisplay.append($DOM.timeInner);

      $DOM.container.append($DOM.timeDisplay);

      const $buttonContainerEl =
        document.createElement('div');

      $DOM.startStopButton.addEventListener('click', () => {
        toggleTimer();
      });
      $DOM.startStopButton.textContent = 'Start';

      $DOM.resetButton.addEventListener('click', () => {
        resetTimer();
      });
      $DOM.resetButton.textContent = 'Reset';

      $buttonContainerEl.append(
        $DOM.startStopButton,
        $DOM.resetButton,
      );
      $DOM.container.append($buttonContainerEl);

      updateTime();
    }

    // The beforeunload event is fired before the tab/window is closed.
    // Clear the timer when the tab/window is about to be closed.
    window.addEventListener('beforeunload', () => {
      window.clearInterval(timerId);
    });

    init();
    $rootEl.append($DOM.container);
  }

  stopwatch(document.getElementById('stopwatch'));
})();

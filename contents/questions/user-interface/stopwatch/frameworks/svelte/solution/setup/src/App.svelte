<script>
  const MS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const MS_IN_HOUR =
    MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
  const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

  function formatTime(timeParam) {
    let time = timeParam;
    let toPadTime = false;
    const padTime = (number) =>
      toPadTime
        ? padTwoDigit(number)
        : number === 0
        ? ''
        : number;
    const parts = {
      hours: '',
      minutes: '',
      seconds: '0',
      ms: '00',
    };
    if (time > MS_IN_HOUR) {
      parts.hours = Math.floor(time / MS_IN_HOUR);
      time %= MS_IN_HOUR;
      toPadTime = true;
    }

    if (time > MS_IN_MINUTE) {
      parts.minutes = padTime(
        Math.floor(time / MS_IN_MINUTE),
      );
      time %= MS_IN_MINUTE;
      toPadTime = true;
    } else {
      parts.minutes = padTime(0);
    }

    if (time > MS_IN_SECOND) {
      parts.seconds = padTime(
        Math.floor(time / MS_IN_SECOND),
      );
      time %= MS_IN_SECOND;
      toPadTime = true;
    } else if (toPadTime) {
      parts.seconds = padTime(0);
    }

    parts.ms = padTwoDigit(Math.floor(time / 10));

    return parts;
  }

  function padTwoDigit(number) {
    return number >= 10 ? String(number) : `0${number}`;
  }

  let lastTickTiming = null;
  let totalDuration = 0;
  // Timer ID of the active interval, if one is running.
  let timerId = null;
  // Derived state to determine if there's a timer running.
  $: isRunning = timerId != null;
  $: formattedTime = formatTime(totalDuration);

  function startTimer() {
    lastTickTiming = Date.now();
    timerId = window.setInterval(() => {
      const now = Date.now();
      const timePassed = now - lastTickTiming;
      totalDuration += timePassed;
      lastTickTiming = now;
    }, 1);
  }

  function stopInterval() {
    window.clearInterval(timerId);
    timerId = null;
  }

  function resetTimer() {
    stopInterval();
    totalDuration = 0;
  }

  function toggleTimer() {
    if (isRunning) {
      stopInterval();
    } else {
      startTimer();
    }
  }
</script>

<div>
  <button
    class="time"
    on:click={() => {
      toggleTimer();
    }}>
    {#if formattedTime.hours}
      <span>
        <span class="time-number">
          {formattedTime.hours}
        </span>
        <span class="time-unit">h</span>
      </span>
    {/if}
    {#if formattedTime.minutes}
      <span>
        <span class="time-number">
          {formattedTime.minutes}
        </span>
        <span class="time-unit">m</span>
      </span>
    {/if}
    <span>
      <span class="time-number">
        {formattedTime.seconds}
      </span>
      <span class="time-unit">s</span>
    </span>
    <span class="time-number time-number--small">
      {formattedTime.ms}
    </span>
  </button>
  <div>
    <button
      on:click={() => {
        toggleTimer();
      }}>
      {isRunning ? 'Stop' : 'Start'}
    </button>
    <button
      on:click={() => {
        resetTimer();
      }}>
      Reset
    </button>
  </div>
</div>

<style>
  .time {
    align-items: baseline;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    gap: 16px;
    user-select: none;
  }

  .time-unit {
    font-size: 24px;
  }

  .time-number {
    font-size: 62px;
  }

  .time-number--small {
    font-size: 36px;
  }
</style>

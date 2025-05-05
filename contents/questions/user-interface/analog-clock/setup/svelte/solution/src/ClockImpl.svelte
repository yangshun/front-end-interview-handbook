<script>
  // Separate out into a component that takes the time as a prop,
  // so as to make it easy to test the rendering for specific times.
  import Hand from './Hand.svelte';

  const FULL_ROTATION_DEGREES = 360;

  export let hours;
  export let minutes;
  export let seconds;
  export let size;

  $: secondsPercentage = seconds / 60;
  // To have second-level precision in the minute hand angle.
  $: minutesPercentage = (minutes + secondsPercentage) / 60;
  // To have minute-level precision in the hour hand angle.
  $: hoursPercentage =
    ((hours % 12) + minutesPercentage) / 12;

  $: hourAngle = hoursPercentage * FULL_ROTATION_DEGREES;
  $: minutesAngle =
    minutesPercentage * FULL_ROTATION_DEGREES;
  $: secondsAngle =
    secondsPercentage * FULL_ROTATION_DEGREES;

  $: dateTimeDisplay = `${padTwoDigit(hours)}:${padTwoDigit(
    minutes,
  )}:${padTwoDigit(seconds)}`;

  function padTwoDigit(number) {
    return number >= 10 ? String(number) : `0${number}`;
  }
</script>

<time dateTime={dateTimeDisplay} style:--size="{size}px">
  <Hand height={0.5} angle={hourAngle} width={3} />
  <Hand height={0.9} angle={minutesAngle} width={2} />
  <Hand height={0.8} angle={secondsAngle} />
</time>

<style>
  time {
    display: block;
    flex-shrink: 0;
    position: relative;
    width: var(--size);
    height: var(--size);
    border-radius: 100%;
    border: 2px solid #ccc;
    transform: rotate(180deg);
  }
</style>

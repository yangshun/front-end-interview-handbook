<script>
  import { onMount } from 'svelte';
  import Digit from './Digit.svelte';
  import Separator from './Separator.svelte';

  let date = new Date();

  onMount(() => {
    const timer = window.setInterval(() => {
      date = new Date();
    }, 100);

    // Clear the timer upon unmount.
    return () => {
      window.clearInterval(timer);
    };
  });

  let hours;
  $: {
    hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours;
  }
  $: minutes = date.getMinutes();
  $: seconds = date.getSeconds();

  $: dateTimeDisplay = `${padTwoDigit(
    date.getHours(),
  )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

  function padTwoDigit(number) {
    return number >= 10 ? String(number) : `0${number}`;
  }
</script>

<div>
  <time dateTime={dateTimeDisplay}>
    <Digit number={parseInt(hours / 10, 10)} />
    <Digit number={hours % 10} />
    <Separator />
    <Digit number={parseInt(minutes / 10, 10)} />
    <Digit number={minutes % 10} />
    <Separator />
    <Digit number={parseInt(seconds / 10, 10)} />
    <Digit number={seconds % 10} />
  </time>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  time {
    --segment-width: 10px;
    --segment-size: 40px;
    --segment-color: #fff;

    background-color: #000;
    border: 10px solid #ccc;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    padding: 20px;
  }
</style>

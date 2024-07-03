<script>
  import { onMount } from 'svelte';
  import ClockImpl from './ClockImpl.svelte';

  let date = new Date();

  // Kick off the timer.
  onMount(() => {
    const timer = window.setInterval(() => {
      date = new Date();
    }, 100);

    // Clear the timer upon unmount.
    return () => {
      window.clearInterval(timer);
    };
  });

  $: hours = date.getHours() % 12;
  $: minutes = date.getMinutes();
  $: seconds = date.getSeconds();
</script>

<ClockImpl {hours} {minutes} {seconds} size={300} />

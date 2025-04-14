<script>
  import TrafficLight from './TrafficLight.svelte';

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
</script>

<div class="wrapper">
  <TrafficLight {config} />
  <TrafficLight {config} layout="horizontal" />
</div>

<style>
  .wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
  }
</style>

<script>
  import Canvas from './Canvas.svelte';
  import Toolbar from './Toolbar.svelte';

  let mode = 'draw';
  let selectedColor = 'black';
</script>

<div class="app">
  <Canvas {selectedColor} {mode} />
  <Toolbar
    {selectedColor}
    on:set-selected-color={(event) => {
      selectedColor = event.detail.selectedColor;
    }}
    {mode}
    on:set-mode={(event) => {
      mode = event.detail.mode;
    }} />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>

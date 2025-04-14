<script>
  export let angle;
  export let height = 1;
  export let width = 1;
</script>

<div
  aria-hidden={true}
  style="transform: rotate({angle}deg) scaleY({height}) scaleX({width})" />

<style>
  div {
    background-color: #ccc;
    position: absolute;
    width: 1px;
    height: calc(var(--size) / 2);
    left: calc(var(--size) / 2);
    top: calc(var(--size) / 2);
    transform-origin: top center;
  }
</style>

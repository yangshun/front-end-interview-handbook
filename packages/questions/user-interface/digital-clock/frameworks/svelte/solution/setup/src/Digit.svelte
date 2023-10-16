<script>
  export let number;

  const ALL_SIDES = {
    top: true,
    left: true,
    right: true,
    bottom: true,
  };

  const NUMBER_TO_CLASSES = {
    0: {
      top: {
        top: true,
        left: true,
        right: true,
      },
      bottom: {
        bottom: true,
        left: true,
        right: true,
      },
    },
    1: {
      top: { right: true },
      bottom: { right: true },
    },
    2: {
      top: {
        top: true,
        right: true,
        bottom: true,
      },
      bottom: {
        top: true,
        left: true,
        bottom: true,
      },
    },
    3: {
      top: {
        top: true,
        right: true,
        bottom: true,
      },
      bottom: {
        top: true,
        right: true,
        bottom: true,
      },
    },
    4: {
      top: {
        left: true,
        right: true,
        bottom: true,
      },
      bottom: {
        right: true,
        top: true,
      },
    },
    5: {
      top: {
        top: true,
        left: true,
        bottom: true,
      },
      bottom: {
        top: true,
        right: true,
        bottom: true,
      },
    },
    6: {
      top: {
        top: true,
        left: true,
        bottom: true,
      },
      bottom: ALL_SIDES,
    },
    7: {
      top: {
        top: true,
        right: true,
      },
      bottom: { right: true },
    },
    8: {
      top: ALL_SIDES,
      bottom: ALL_SIDES,
    },
    9: {
      top: ALL_SIDES,
      bottom: {
        top: true,
        right: true,
        bottom: true,
      },
    },
  };

  $: ({ top, bottom } = NUMBER_TO_CLASSES[number]);
</script>

<div>
  <div
    class="digit-square digit-square-top"
    class:digit-square-border-top={top.top}
    class:digit-square-border-left={top.left}
    class:digit-square-border-right={top.right}
    class:digit-square-border-bottom={top.bottom} />
  <div
    class="digit-square digit-square-bottom"
    class:digit-square-border-top={bottom.top}
    class:digit-square-border-left={bottom.left}
    class:digit-square-border-right={bottom.right}
    class:digit-square-border-bottom={bottom.bottom} />
</div>

<style>
  .digit-square {
    border-style: solid;
    border-color: transparent;
    border-width: var(--segment-width);
    box-sizing: border-box;
    height: var(--segment-size);
    width: var(--segment-size);
  }

  .digit-square-top {
    border-bottom-width: calc(var(--segment-width) / 2);
  }

  .digit-square-bottom {
    border-top-width: calc(var(--segment-width) / 2);
  }

  .digit-square-border-top {
    border-top-color: var(--segment-color);
  }

  .digit-square-border-left {
    border-left-color: var(--segment-color);
  }

  .digit-square-border-right {
    border-right-color: var(--segment-color);
  }

  .digit-square-border-bottom {
    border-bottom-color: var(--segment-color);
  }
</style>

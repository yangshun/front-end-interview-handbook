<script>
  const COLORS = {
    white: '#fff',
    gray: '#e9ecef',
    black: '#000',
    red: '#cc0001',
    orange: '#fb940b',
    yellow: '#ffff01',
    green: '#01cc00',
    teal: '#38d9a9',
    blue: '#228be6',
    purple: '#7950f2',
    beige: '#ff8787',
  };

  let message = 'Hello World!';
</script>

<div>
  {message}
  <ul>
    {#each Object.entries(COLORS) as [color, hex] (color)}
      <li>
        <span style:color={hex}>{color}</span>
      </li>
    {/each}
  </ul>
</div>

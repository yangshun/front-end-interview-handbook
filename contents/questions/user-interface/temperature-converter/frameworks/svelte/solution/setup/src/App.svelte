<script>
  let celsius;
  let fahrenheit;

  function round(number) {
    return Number(number.toFixed(4));
  }
</script>

<div class="temperature-converter">
  <label>
    <input
      class="temperature-converter-column-top-row"
      type="number"
      value={celsius}
      on:input={(event) => {
        celsius = event.target.value;
        fahrenheit = round((celsius * 9) / 5 + 32);
      }} />
    <div class="temperature-converter-column-bottom-row">
      Celsius
    </div>
  </label>
  <div>
    <div class="temperature-converter-column-top-row">
      =
    </div>
  </div>
  <label>
    <input
      class="temperature-converter-column-top-row"
      type="number"
      value={fahrenheit}
      on:input={(event) => {
        fahrenheit = event.target.value;
        celsius = round(((fahrenheit - 32) * 5) / 9);
      }} />
    <div class="temperature-converter-column-bottom-row">
      Fahrenheit
    </div>
  </label>
</div>

<style>
  .temperature-converter {
    display: flex;
  }

  .temperature-converter-column-top-row {
    align-items: center;
    display: flex;
    font-size: 18px;
    height: 24px;
    padding: 4px;
    text-align: center;
  }

  .temperature-converter-column-bottom-row {
    padding: 4px;
    text-align: center;
  }
</style>

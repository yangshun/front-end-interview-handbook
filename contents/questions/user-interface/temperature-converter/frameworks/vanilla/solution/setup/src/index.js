import './styles.css';

(() => {
  const $celsiusInputEl =
    document.getElementById('celsius-input');
  const $fahrenheitInputEl = document.getElementById(
    'fahrenheit-input',
  );

  function bindInput($source, $dest, calculateValue) {
    $source.addEventListener('input', (event) => {
      const numericValue = Number(event.target.value);
      const isValid =
        !Number.isNaN(numericValue) &&
        Boolean(event.target.value);
      $dest.value = isValid
        ? format(calculateValue(numericValue))
        : '';
    });
  }

  function format(number) {
    // Show 4 d.p. if number has more than 4 decimal places.
    return /\.\d{5}/.test(number)
      ? Number(number).toFixed(4)
      : number;
  }

  bindInput(
    $celsiusInputEl,
    $fahrenheitInputEl,
    (value) => (value * 9) / 5 + 32,
  );

  bindInput(
    $fahrenheitInputEl,
    $celsiusInputEl,
    (value) => ((value - 32) * 5) / 9,
  );
})();

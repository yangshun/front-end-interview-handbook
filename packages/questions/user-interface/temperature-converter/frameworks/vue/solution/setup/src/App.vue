<script setup>
import { ref } from 'vue';

const celsius = ref('');
const fahrenheit = ref('');

function format(number) {
  // Show 4 d.p. if number has more than 4 decimal places.
  return /\.\d{5}/.test(number)
    ? Number(number).toFixed(4)
    : number;
}

function convert(value, destination, calculateValue) {
  const numericValue = Number(value);
  const isValid =
    !Number.isNaN(numericValue) && Boolean(value);
  destination.value = isValid
    ? format(calculateValue(numericValue))
    : '';
}

function setCelsius(event) {
  const newValue = event.target.value;
  celsius.value = newValue;
  convert(
    newValue,
    fahrenheit,
    (value) => (value * 9) / 5 + 32,
  );
}

function setFahrenheit(event) {
  const newValue = event.target.value;
  fahrenheit.value = newValue;
  convert(
    newValue,
    celsius,
    (value) => ((value - 32) * 5) / 9,
  );
}
</script>

<template>
  <div>
    <div className="temperature-converter">
      <!-- Use a label for better a11y. -->
      <label className="temperature-converter-column">
        <input
          className="temperature-converter-column-top-row"
          type="number"
          :value="celsius"
          @input="setCelsius" />
        <div
          className="temperature-converter-column-bottom-row">
          Celsius
        </div>
      </label>
      <div className="temperature-converter-column">
        <div
          className="temperature-converter-column-top-row">
          =
        </div>
      </div>
      <!-- Use a label for better a11y. -->
      <label className="temperature-converter-column">
        <input
          className="temperature-converter-column-top-row"
          type="number"
          :value="fahrenheit"
          @input="setFahrenheit" />
        <div
          className="temperature-converter-column-bottom-row">
          Fahrenheit
        </div>
      </label>
    </div>
  </div>
</template>

<style>
.temperature-converter {
  display: flex;
}

.temperature-converter
  .temperature-converter-column-top-row {
  align-items: center;
  display: flex;
  font-size: 18px;
  height: 24px;
  padding: 4px;
  text-align: center;
}

.temperature-converter
  .temperature-converter-column-bottom-row {
  padding: 4px;
  text-align: center;
}
</style>

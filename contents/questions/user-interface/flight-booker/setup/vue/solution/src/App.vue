<script setup>
import { ref } from 'vue';

const TODAY = formatDate(new Date());
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return [year, month, day].join('-');
}

const flightOption = ref('one-way');
const departureDate = ref(
  formatDate(new Date(Date.now() + DAY_IN_MILLISECONDS)), // Tomorrow.
);
const returnDate = ref(departureDate.value);

function onSubmit(event) {
  event.preventDefault();
  if (flightOption.value === 'one-way') {
    alert(
      `You have booked a one-way flight on ${departureDate.value}`,
    );
    return;
  }

  alert(
    `You have booked a round-trip flight, departing on ${departureDate.value} and returning on ${returnDate.value}`,
  );
}
</script>

<template>
  <div>
    <form className="flight-booker" @submit="onSubmit">
      <select v-model="flightOption">
        <option value="one-way">One-way flight</option>
        <option value="round-trip">
          Round-trip flight
        </option>
      </select>
      <input
        aria-label="Departure date"
        type="date"
        v-model="departureDate"
        :min="TODAY" />
      <input
        aria-label="Return date"
        type="date"
        v-show="flightOption === 'round-trip'"
        v-model="returnDate"
        :min="departureDate" />
      <button>Book</button>
    </form>
  </div>
</template>

<style>
.flight-booker {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
  max-width: 320px;
}
</style>

<script>
  import './styles.css';

  const TODAY = formatDate(new Date());
  const DAY_IN_SECONDS = 24 * 60 * 60 * 1000;

  let flightOption = 'one-way';
  let departureDate = formatDate(
    new Date(Date.now() + DAY_IN_SECONDS),
  );
  let returnDate = departureDate;

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return [year, month, day].join('-');
  }
</script>

<div>
  <form
    on:submit={(event) => {
      event.preventDefault();
      if (flightOption === 'one-way') {
        alert(
          `You have booked a one-way flight on ${departureDate}`,
        );
        return;
      }

      alert(
        `You have booked a return flight, departing on ${departureDate} and returning on ${returnDate}`,
      );
    }}>
    <select bind:value={flightOption}>
      <option value="one-way">One-way flight</option>
      <option value="return">Return flight</option>
    </select>
    <input
      aria-label="Departure date"
      type="date"
      bind:value={departureDate}
      min={TODAY} />

    {#if flightOption === 'return'}
      <input
        aria-label="Return date"
        type="date"
        bind:value={returnDate}
        min={departureDate} />
    {/if}
    <button>Book</button>
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0 auto;
    max-width: 320px;
  }
</style>

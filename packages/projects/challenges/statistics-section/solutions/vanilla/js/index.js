// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.

// Get stats data
fetch(
  'https://www.greatfrontend.com/api/projects/challenges/statistics-metrics',
).then(async (response) => {
  if (response.ok) {
    const { data } = await response.json();
    document.getElementById('downloads-stats').innerText =
      data[0].value.toLocaleString();
    document.getElementById('paid-users-stats').innerText =
      data[1].value.toLocaleString();
    document.getElementById('images-stats').innerText =
      data[2].value.toLocaleString();
  }
});

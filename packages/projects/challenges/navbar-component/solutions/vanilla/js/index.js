// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.
document.getElementById('mobile-menu-button').addEventListener('click', () => {
  document.getElementById('slideout-menu').classList.toggle('open');
});

document
  .getElementById('mobile-close-menu-button')
  .addEventListener('click', () => {
    document.getElementById('slideout-menu').classList.toggle('open');
  });

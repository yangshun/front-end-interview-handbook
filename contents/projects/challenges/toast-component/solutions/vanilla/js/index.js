function showToast(duration = 7000) {
  const toast = document.getElementById('toast');

  toast.classList.add('show');

  // Automatically hide the toast after the duration
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, duration);

  // Remove the hide class after the animation is done to reset the toast
  toast.addEventListener('transitionend', () => {
    if (toast.classList.contains('hide')) {
      toast.classList.remove('hide');
    }
  });
}

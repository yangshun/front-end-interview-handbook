document.querySelectorAll('.tabs__button').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // Update selected state for buttons
    document.querySelectorAll('.tabs__button').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-value') === value);
      btn.setAttribute(
        'aria-selected',
        btn.getAttribute('data-value') === value,
      );
    });

    // Show the corresponding tab panel
    document.querySelectorAll('.tabs__panel').forEach((panel) => {
      panel.hidden = panel.getAttribute('data-value') !== value;
    });
  });
});

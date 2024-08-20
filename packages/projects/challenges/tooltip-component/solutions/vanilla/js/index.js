document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.tooltip-trigger');

  triggers.forEach((trigger) => {
    const tooltipText = trigger.dataset.tooltip;
    if (tooltipText) {
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      trigger.appendChild(tooltip);

      trigger.addEventListener('mouseenter', () =>
        showTooltip(trigger, tooltip),
      );
      trigger.addEventListener('mouseleave', () => hideTooltip(tooltip));
    }
  });
});

function showTooltip(trigger, tooltip) {s
  const position = trigger.dataset.position || 'top-center';
  tooltip.className = `tooltip ${position} visible`;
}

function hideTooltip(tooltip) {
  tooltip.classList.remove('visible');
}

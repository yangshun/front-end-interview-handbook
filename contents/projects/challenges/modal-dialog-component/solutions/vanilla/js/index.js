const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalAction = document.getElementById('modalPrimaryAction');
const closeModalButton = document.getElementById('closeModal');
const modalCancelButton = document.getElementById('modalCancel');

// variant can be: primary or danger
function openModal(variant, title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;

  // Set the button style based on the variant
  modalAction.classList.add(`button--${variant}`);
  modalAction.textContent = variant === 'primary' ? 'Yes' : 'Delete';

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('show');
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('show');
}

closeModalButton.addEventListener('click', closeModal);
modalCancelButton.addEventListener('click', closeModal);

// Close modal when clicking outside of the content
modal.addEventListener('click', function (event) {
  if (
    event.target === modal ||
    event.target === document.querySelector('.modal__overlay')
  ) {
    closeModal();
  }
});

openModal(
  'primary',
  'Are you sure you want to leave the process?',
  'Your upgrade plan process will be cancelled. You need to start again if you leave the process.',
);

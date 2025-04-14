const emailField = document.getElementById('email');
const emailError = document.getElementById('email-error');
const newsletterForm = document.getElementById('newsletter-form');

const toast = document.getElementById('toaster');

emailField.addEventListener('input', function () {
  if (this.validity.valid) {
    emailError.style.display = 'none';
    emailField.classList.remove('input__field--error');
  } else if (this.validity.typeMismatch) {
    emailError.style.display = 'block';
    emailError.textContent = 'Please enter valid email address.';
    emailField.classList.add('input__field--error');
  } else if (this.validity.valueMissing) {
    emailError.style.display = 'block';
    emailError.textContent = 'Email address is required';
    emailField.classList.add('input__field--error');
  }
});

newsletterForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: emailField.value,
    }), // Send the data in JSON format
  };

  // Make the request
  const response = await fetch(
    'https://www.greatfrontend.com/api/projects/challenges/newsletter',
    requestOptions,
  );
  const result = await response.json();

  const toastContent = toast.firstElementChild;
  const toastContentBadge = toastContent.firstElementChild;
  const toastContentMessage = toastContent.lastElementChild;

  // Display toast
  toast.style.display = 'block';
  if (response.ok) {
    toastContent.classList.add('toast__content--success');
    toastContentBadge.innerText = 'Success';
    toastContentMessage.innerText = result.message;

    //clear all the values after submit
    emailField.value = '';
  } else {
    toastContent.classList.add('toast__content--error');
    toastContentBadge.classList.add('toast__content__badge--error');
    toastContentBadge.innerText = 'Error';
    toastContentMessage.innerText = result.error;
  }
});

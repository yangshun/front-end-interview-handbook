import './styles.css';

/**
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirm
 */
async function submitForm(
  username,
  email,
  password,
  passwordConfirm,
) {
  try {
    const response = await fetch(
      'https://questions.greatfrontend.com/api/questions/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }),
      },
    );

    const { message } = await response.json();
    alert(message);
  } catch (_) {
    alert('Error submitting form!');
  }
}

(() => {
  const $form = document.querySelector('form');
  const $passwordConfirmInput = document.getElementById(
    'password-confirm-input',
  );
  const $passwordMismatchError = document.getElementById(
    'password-mismatch-error',
  );

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Reset the password confirm field.
    $passwordConfirmInput.removeAttribute('aria-invalid');
    $passwordMismatchError.classList.add('hidden');

    // Construct a FormData object based on form values.
    const formData = new FormData($form);
    const password = formData.get('password');
    const passwordConfirm = formData.get(
      'password_confirm',
    );

    // The only fields we cannot leverage the browser to validate
    // is the password confirmation, so we use JavaScript to achieve that.
    if (password !== passwordConfirm) {
      $passwordConfirmInput.setAttribute(
        'aria-invalid',
        'true',
      );
      $passwordMismatchError.classList.remove('hidden');
      return;
    }

    await submitForm(
      formData.get('username'),
      formData.get('email'),
      formData.get('password'),
      formData.get('password_confirm'),
    );
  });
})();

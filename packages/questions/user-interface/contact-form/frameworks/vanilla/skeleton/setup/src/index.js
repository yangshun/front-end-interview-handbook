import './styles.css';

(() => {
  const SUBMIT_URL =
    'https://www.greatfrontend.com/api/questions/contact-form';

  const $form = document.querySelector('form');
  $form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if ($form.action !== SUBMIT_URL) {
      alert('Incorrect form action value');
      return;
    }

    if ($form.method.toLowerCase() !== 'post') {
      alert('Incorrect form method value');
      return;
    }

    try {
      const formData = new FormData($form);
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      const text = await response.text();
      alert(text);
    } catch (_) {
      alert('Error submitting form!');
    }
  });
})();

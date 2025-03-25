<script>
  import submitForm from './submitForm';
</script>

<form
  on:submit={submitForm}
  action="https://questions.greatfrontend.com/api/questions/contact-form"
  method="post">
  <div>
    <label for="name-input">Name</label>
    <input id="name-input" name="name" type="text" />
  </div>
  <div>
    <label for="email-input">Email</label>
    <input id="email-input" name="email" type="email" />
  </div>
  <div>
    <label for="message-input">Message</label>
    <textarea id="message-input" name="message" />
  </div>
  <div>
    <button>Send</button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  label {
    font-size: 12px;
  }

  input,
  textarea {
    display: block;
  }
</style>

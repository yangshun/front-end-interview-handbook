<script>
  import submitForm from './submitForm';
</script>

<!-- Ignore the on:submit attribute, it's used by GFE to intercept the form submit event to check your solution. -->
<form on:submit={submitForm}>
  <input type="text" />
</form>

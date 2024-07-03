export default function App() {
  function onSubmit() {
    fetch(
      'https://www.greatfrontend.com/api/questions/two-factor-auth-input',
      {
        method: 'POST',
        body: JSON.stringify({ otp: '123456' }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((res) => res.text());
  }

  return (
    <form>
      <input type="text" />
      <button type="reset">Reset</button>
      <button type="submit">Verify</button>
    </form>
  );
}

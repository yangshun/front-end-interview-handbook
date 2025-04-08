export default function AuthCodeInput({
  onSubmit,
}: Readonly<{
  onSubmit: () => void;
}>) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
      <input type="text" />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}

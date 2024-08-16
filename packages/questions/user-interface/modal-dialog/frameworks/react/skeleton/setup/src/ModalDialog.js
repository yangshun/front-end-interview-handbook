export default function ModalDialog({ children, title }) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

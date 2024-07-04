export default function VueLogo(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 19 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m14.8 0h3.7l-9.25 15.95625-9.25-15.95625h7.07625l2.17375 3.7 2.1275-3.7z"
        fill="#41b883"
      />
      <path
        d="m0 0 9.25 15.95625 9.25-15.95625h-3.7l-5.55 9.57375-5.59625-9.57375z"
        fill="#41b883"
      />
      <path
        d="m3.65375 0 5.59625 9.62 5.55-9.62h-3.4225l-2.1275 3.7-2.17375-3.7z"
        fill="#35495e"
      />
    </svg>
  );
}

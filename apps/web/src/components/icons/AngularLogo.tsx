export default function AngularLogo(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m16 2-13.034 4.648 1.988 17.234 11.046 6.118 11.046-6.118 1.988-17.234z"
        fill="#dd0031"
      />
      <path
        d="m16 2v3.108-.014 14.182 10.724l11.046-6.118 1.988-17.234z"
        fill="#c3002f"
      />
      <path
        d="m16 5.094-8.148 18.27h3.038l1.638-4.088h6.916l1.638 4.088h3.038zm2.38 11.662h-4.76l2.38-5.726z"
        fill="#fff"
      />
    </svg>
  );
}

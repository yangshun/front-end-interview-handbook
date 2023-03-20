export default function AngularLogo(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentCOlor"
      height="512"
      viewBox="0 0 512 512"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <polygon points="213.57 256 298.42 256 255.99 166.64 213.57 256" />
      <path d="M256,32,32,112,78.12,384,256,480l177.75-96L480,112Zm88,320-26.59-56H194.58L168,352H128L256,72,384,352Z" />
    </svg>
  );
}

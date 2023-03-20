export default function VueLogoMonochrome(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      height="512"
      viewBox="0 0 512 512"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <polygon points="256 144.03 200.51 47.92 121.08 47.92 256 281.61 390.92 47.92 311.49 47.92 256 144.03" />
      <polygon points="409.4 47.92 256 313.61 102.6 47.92 15.74 47.92 256 464.08 496.26 47.92 409.4 47.92" />
    </svg>
  );
}

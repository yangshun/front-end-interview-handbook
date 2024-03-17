export default function NpmLogo(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      height="256"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 256"
      width="256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="m0 256v-256h256v256z" fill="#c12127" />
      <path d="m48 48h160v160h-32v-128h-48v128h-80z" fill="#fff" />
    </svg>
  );
}

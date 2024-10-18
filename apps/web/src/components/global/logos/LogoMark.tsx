import { themeFillColor } from '~/components/ui/theme';

type Props = Readonly<{
  height?: number;
  width?: number;
}>;

export default function LogoMark({ height = 20, width = 26 }: Props) {
  return (
    <svg
      aria-label="GreatFrontEnd"
      className={themeFillColor}
      height={height}
      viewBox="0 0 26 19"
      width={width}
      xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M9.88273 0L13.0103 3.17047L6.75515 9.48828L13.0103 15.8061L9.88273 18.9766L0.5 9.48828L9.88273 0ZM16.1173 12.6589L12.9897 15.8294L16.1173 18.9999L19.2448 15.8294L16.1173 12.6589ZM25.5 9.48797L22.3724 12.6584L19.2448 9.48797L16.1173 12.6584L12.9897 9.48797L19.2448 3.17017L25.5 9.48797Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

type Props = React.ComponentProps<'svg'> &
  Readonly<{
    title?: string;
  }>;

export default function GoogleAnalyticsLogo({ title, ...props }: Props) {
  return (
    <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title && <title>{title}</title>}
      <rect fill="none" height="192" width="192" x="0" y="0" />
      <g>
        <g>
          <path
            d="M130,29v132c0,14.77,10.19,23,21,23c10,0,21-7,21-23V30c0-13.54-10-22-21-22S130,17.33,130,29z"
            fill="#F9AB00"
          />
        </g>
        <g>
          <path
            d="M75,96v65c0,14.77,10.19,23,21,23c10,0,21-7,21-23V97c0-13.54-10-22-21-22S75,84.33,75,96z"
            fill="#E37400"
          />
        </g>
        <g>
          <circle cx="41" cy="163" fill="#E37400" r="21" />
        </g>
      </g>
    </svg>
  );
}

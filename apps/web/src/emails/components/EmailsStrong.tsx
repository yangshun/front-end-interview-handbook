type Props = React.ComponentProps<'strong'>;

export default function EmailsStrong({ style, ...props }: Props) {
  return (
    <strong
      style={{
        fontWeight: 600,
        ...style,
      }}
      {...props}
    />
  );
}

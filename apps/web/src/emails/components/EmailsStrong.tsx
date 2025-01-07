type Props = React.ComponentProps<'strong'>;

export default function EmailsStrong({ style, ...props }: Props) {
  return (
    <strong
      style={{
        color: '#18181b',
        fontWeight: 600,
        ...style,
      }}
      {...props}
    />
  );
}

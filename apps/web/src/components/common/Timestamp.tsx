type Props = Readonly<{
  date: Date;
}>;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function Timestamp({ date }: Props) {
  return (
    <span suppressHydrationWarning={true}>{dateFormatter.format(date)}</span>
  );
}

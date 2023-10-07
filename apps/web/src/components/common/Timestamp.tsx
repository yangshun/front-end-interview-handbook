type Props = Readonly<{
  date: string;
}>;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function Timestamp({ date }: Props) {
  return (
    <span suppressHydrationWarning={true}>
      {dateFormatter.format(new Date(date))}
    </span>
  );
}

type Props = Readonly<{
  date: number;
}>;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
});

export default function BlogTimestamp({ date }: Props) {
  return (
    <span suppressHydrationWarning={true}>
      {dateFormatter.format(new Date(date))}
    </span>
  );
}

import Button from '~/components/ui/Button';

type Props = Readonly<{
  onReloadClick: () => void;
}>;

export default function ErrorMessageBlock({ onReloadClick }: Props) {
  return (
    <div className="flex flex-col gap-y-4 py-12 text-center">
      <h1 className="text-lg text-slate-700">
        There's a newer version of the site available.
      </h1>
      <div>
        <Button
          label="Reload Page"
          type="button"
          variant="primary"
          onClick={onReloadClick}
        />
      </div>
    </div>
  );
}

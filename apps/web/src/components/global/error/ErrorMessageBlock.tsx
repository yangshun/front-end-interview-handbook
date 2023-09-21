import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

export default function ErrorMessageBlock() {
  return (
    <div className="flex flex-col gap-y-4 py-12 text-center">
      <h1 className="text-lg">
        <Text>An error has occurred and we're looking into it.</Text>
      </h1>
      <div>
        <Button
          label="Reload page"
          size="lg"
          type="button"
          variant="primary"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
}

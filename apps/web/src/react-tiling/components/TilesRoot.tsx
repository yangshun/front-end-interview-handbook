import { TilesPanelConfig } from '../types';
import { TilesProvider } from '../state/TilesProvider';
import { Props, TilesPanelRoot } from './TilesPanelRoot';

export default function TilesRoot({
  defaultValue,
  ...props
}: Props & Readonly<{ defaultValue: TilesPanelConfig }>) {
  return (
    <TilesProvider defaultValue={defaultValue}>
      <TilesPanelRoot {...props} />
    </TilesProvider>
  );
}

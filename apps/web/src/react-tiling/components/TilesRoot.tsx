import type { Props} from './TilesPanelRoot';
import { TilesPanelRoot } from './TilesPanelRoot';
import { TilesProvider } from '../state/TilesProvider';
import type { TilesPanelConfig } from '../types';

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

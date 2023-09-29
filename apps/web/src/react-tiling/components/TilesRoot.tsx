import type { Props } from './TilesPanelRoot';
import { TilesPanelRoot } from './TilesPanelRoot';
import { TilesProvider } from '../state/TilesProvider';
import type { TilesPanelConfig } from '../types';

export default function TilesRoot<TabType extends string>({
  defaultValue,
  ...props
}: Props<TabType> & Readonly<{ defaultValue: TilesPanelConfig<TabType> }>) {
  return (
    <TilesProvider defaultValue={defaultValue}>
      <TilesPanelRoot {...props} />
    </TilesProvider>
  );
}

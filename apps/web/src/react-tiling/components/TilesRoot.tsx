import type { Props as ProviderProps } from '../state/TilesProvider';
import { TilesProvider } from '../state/TilesProvider';
import type { Props as PanelRootProps } from './TilesPanelRoot';
import { TilesPanelRoot } from './TilesPanelRoot';

export default function TilesRoot<TabType extends string>({
  defaultValue,
  ...props
}: PanelRootProps<TabType> & ProviderProps<TabType>) {
  return (
    <TilesProvider defaultValue={defaultValue}>
      <TilesPanelRoot {...props} />
    </TilesProvider>
  );
}

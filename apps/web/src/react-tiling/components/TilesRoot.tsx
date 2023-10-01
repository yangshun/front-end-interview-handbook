import type { Props as PanelRootProps } from './TilesPanelRoot';
import { TilesPanelRoot } from './TilesPanelRoot';
import type { Props as ProviderProps } from '../state/TilesProvider';
import { TilesProvider } from '../state/TilesProvider';

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

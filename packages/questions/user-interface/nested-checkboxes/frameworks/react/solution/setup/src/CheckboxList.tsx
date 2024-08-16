import CheckboxInput, {
  CheckboxValue,
} from './CheckboxInput';

export interface CheckboxItem {
  id: number;
  name: string;
  checked: CheckboxValue;
  children?: CheckboxItem[];
}

export default function CheckboxList({
  items,
  onCheck,
}: Readonly<{
  items: ReadonlyArray<CheckboxItem>;
  onCheck: (
    value: boolean,
    indices: ReadonlyArray<number>,
  ) => void;
}>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          <div>
            <CheckboxInput
              checked={item.checked}
              label={item.name}
              onChange={(event) => {
                onCheck(event.target.checked, [index]);
              }}
            />
          </div>
          {item.children && item.children.length > 0 && (
            <CheckboxList
              items={item.children}
              onCheck={(newValue, indices) => {
                onCheck(newValue, [index, ...indices]);
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

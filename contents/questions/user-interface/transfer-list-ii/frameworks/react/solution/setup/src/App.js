import { useEffect, useId, useRef, useState } from 'react';

function CheckboxItem({ onChange, label, checked }) {
  // Let React generate a unique ID for each item so as to maximize
  // reusability of the component.
  const id = useId();

  return (
    <div className="transfer-list__section__items__item">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function BulkSelectionCheckbox({
  disabled,
  onChange,
  state,
  selectedCount,
  totalCount,
}) {
  const ref = useRef();
  const bulkSelectionId = useId();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    switch (state) {
      case 'none':
        setChecked(false);
        ref.current.indeterminate = false;
        break;
      case 'partial':
        setChecked(false);
        ref.current.indeterminate = true;
        break;
      case 'all':
        setChecked(true);
        ref.current.indeterminate = false;
        break;
    }
  }, [state]);

  return (
    <div className="transfer-list__section__items__item">
      <input
        ref={ref}
        disabled={disabled}
        type="checkbox"
        id={bulkSelectionId}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={bulkSelectionId}>
        {selectedCount} / {totalCount} Selected
      </label>
    </div>
  );
}

function ItemList({ items, setItems }) {
  const [newItem, setNewItem] = useState('');
  const listState = determineListSelectionState(items);

  return (
    <div className="transfer-list__section">
      <form
        onSubmit={(event) => {
          // Prevent page reload on form submission.
          event.preventDefault();

          // Trim value.
          const newItemValue = newItem.trim();

          // No-op if input is empty.
          if (newItemValue === '') {
            return;
          }

          // Add new item to list.
          const newItems = new Map(items);
          newItems.set(newItem, false);
          setItems(newItems);

          setNewItem('');
        }}>
        <input
          type="text"
          value={newItem}
          onChange={(event) => {
            setNewItem(event.target.value);
          }}
        />
      </form>
      <hr />
      <BulkSelectionCheckbox
        selectedCount={countSelectedItems(items)}
        totalCount={items.size}
        state={listState}
        disabled={items.size === 0}
        onChange={() => {
          switch (listState) {
            case 'none':
            case 'partial':
              setItems(
                setAllItemsSelectionState(items, true),
              );
              break;
            case 'all':
              setItems(
                setAllItemsSelectionState(items, false),
              );
              break;
          }
        }}
      />
      <hr />
      <ul className="transfer-list__section__items">
        {Array.from(items.entries()).map(
          ([label, checked]) => (
            <li key={label}>
              <CheckboxItem
                label={label}
                checked={checked}
                onChange={() => {
                  const newItems = new Map(items);
                  newItems.set(label, !items.get(label));
                  setItems(newItems);
                }}
              />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

const DEFAULT_ITEMS_LEFT = [
  'HTML',
  'JavaScript',
  'CSS',
  'TypeScript',
];
const DEFAULT_ITEMS_RIGHT = [
  'React',
  'Angular',
  'Vue',
  'Svelte',
];

// Convert the default array of items into a map with the item
// name as a key and the value as a boolean.
function generateItemsMap(items) {
  return new Map(items.map((label) => [label, false]));
}

function countSelectedItems(items) {
  return Array.from(items.values()).filter((val) =>
    Boolean(val),
  ).length;
}

// Determine the selected state of the list.
function determineListSelectionState(items) {
  const selectedItems = countSelectedItems(items);
  const totalItems = items.size;

  // Also handles the case where the list is empty.
  if (selectedItems === 0) {
    return 'none';
  }

  if (selectedItems < totalItems) {
    return 'partial';
  }

  return 'all';
}

// Transfer all items from a source list to a destination list.
function setAllItemsSelectionState(items, newState) {
  const newItems = new Map(items);

  Array.from(newItems.keys()).forEach((key) => {
    newItems.set(key, newState);
  });

  return newItems;
}

// Transfer selected items from a source list to a destination list.
function transferSelectedItems(
  itemsSrc,
  setItemsSrc,
  itemsDst,
  setItemsDst,
) {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDst = new Map(itemsDst);

  // Remove selected items from source list and add to the destination list.
  itemsSrc.forEach((value, key) => {
    if (!value) {
      return;
    }

    newItemsDst.set(key, value);
    newItemsSrc.delete(key);
  });
  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
}

export default function App() {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT),
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT),
  );

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="transfer-list__actions">
        <button
          aria-label="Transfer selected items to left list"
          disabled={
            determineListSelectionState(itemsRight) ===
            'none'
          }
          onClick={() => {
            transferSelectedItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft,
            );
          }}>
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to right list"
          disabled={
            determineListSelectionState(itemsLeft) ===
            'none'
          }
          onClick={() => {
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight,
            );
          }}>
          <span aria-hidden={true}>&gt;</span>
        </button>
      </div>
      <ItemList
        items={itemsRight}
        setItems={setItemsRight}
      />
    </div>
  );
}

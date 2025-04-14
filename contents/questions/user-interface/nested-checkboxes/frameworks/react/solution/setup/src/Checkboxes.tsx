import { useState } from 'react';
import CheckboxList, { CheckboxItem } from './CheckboxList';

/**
 * Recursively set descendants of the modified checkbox
 * to the new value.
 */
function updateCheckboxAndDescendants(
  checkboxItem: CheckboxItem,
  checked: boolean,
) {
  checkboxItem.checked = checked;
  if (!checkboxItem.children) {
    return;
  }

  checkboxItem.children.forEach((childItem) =>
    updateCheckboxAndDescendants(childItem, checked),
  );
}

/**
 * Update checkbox states based on the modified checkbox's new state.
 * Only direct ancestors of the modified checkbox are affected.
 */
function resolveCheckboxStates(
  checkboxItem: CheckboxItem,
  indices: ReadonlyArray<number>,
) {
  if (indices.length > 0 && checkboxItem.children) {
    resolveCheckboxStates(
      checkboxItem.children[indices[0]],
      indices.slice(1),
    );
  }

  if (!checkboxItem.children) {
    return;
  }

  // Determine new checkbox state based on children.
  const checkedChildren = checkboxItem.children.reduce(
    (total, item) => total + Number(item.checked === true),
    0,
  );
  const uncheckedChildren = checkboxItem.children.reduce(
    (total, item) => total + Number(item.checked === false),
    0,
  );

  if (checkedChildren === checkboxItem.children.length) {
    checkboxItem.checked = true;
  } else if (
    uncheckedChildren === checkboxItem.children.length
  ) {
    checkboxItem.checked = false;
  } else {
    checkboxItem.checked = 'indeterminate';
  }
}

export default function Checkboxes({
  defaultCheckboxData,
}: Readonly<{
  defaultCheckboxData: ReadonlyArray<CheckboxItem>;
}>) {
  const [checkboxData, setCheckboxData] = useState(
    defaultCheckboxData,
  );

  return (
    <CheckboxList
      items={checkboxData}
      onCheck={(checked, indices) => {
        // Simple way to make a clone.
        const newCheckboxData = JSON.parse(
          JSON.stringify(checkboxData),
        );

        const nonFirstLevelIndices = indices.slice(1);
        const modifiedCheckboxItem =
          nonFirstLevelIndices.reduce(
            (modifiedItem, index) =>
              modifiedItem.children[index],
            newCheckboxData[indices[0]],
          );

        updateCheckboxAndDescendants(
          modifiedCheckboxItem,
          checked,
        );
        resolveCheckboxStates(
          newCheckboxData[indices[0]],
          nonFirstLevelIndices,
        );

        setCheckboxData(newCheckboxData);
      }}
    />
  );
}

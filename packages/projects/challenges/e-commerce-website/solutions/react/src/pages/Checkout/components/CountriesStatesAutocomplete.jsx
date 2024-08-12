import { useEffect, useState } from 'react';

import Autocomplete from 'src/components/ui/Autocomplete';

const CountriesStatesAutocomplete = ({
  onSelect,
  value,
  OPTIONS,
  ...props
}) => {
  const [options, setOptions] = useState(OPTIONS);
  const [selectedValue, setSelectedValue] = useState(
    OPTIONS.find(option => option.id === value)?.name ?? value ?? ''
  );

  useEffect(() => {
    if (selectedValue) {
      setOptions(
        OPTIONS.filter(option =>
          option.name.toLowerCase().includes(selectedValue.toLowerCase())
        )
      );
    } else {
      setOptions(OPTIONS);
    }
  }, [selectedValue, OPTIONS]);

  const handleSelect = item => {
    onSelect(item);
    setSelectedValue(OPTIONS.find(option => option.id === item.id)?.name ?? '');
  };

  return (
    <Autocomplete
      {...props}
      onChange={setSelectedValue}
      value={selectedValue}
      onSelect={handleSelect}
      options={options}
    />
  );
};

export default CountriesStatesAutocomplete;

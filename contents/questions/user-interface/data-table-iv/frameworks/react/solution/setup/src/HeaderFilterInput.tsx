export type FilterPayloadRange = {
  type: 'range';
  max?: number | null;
  min?: number | null;
};
export type FilterPayloadString = {
  type: 'string';
  value: string | null;
};
export type Filters = Record<
  string,
  FilterPayloadRange | FilterPayloadString
>;

export default function HeaderFilterInput({
  field,
  filterType,
  filters,
  onFilterChange,
}: Readonly<{
  field: string;
  filterType: 'range' | 'string';
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}>) {
  return (
    <div className="filter-input">
      {(() => {
        switch (filterType) {
          case 'string': {
            const filterData = filters[
              field
            ] as FilterPayloadString | null;
            return (
              <input
                placeholder="Search..."
                type="search"
                value={filterData?.value || ''}
                onChange={(event) => {
                  const newFilters: Filters = {
                    ...filters,
                    [field]: {
                      type: 'string',
                      value: event.target.value,
                    },
                  };

                  onFilterChange(newFilters);
                }}
              />
            );
          }
          case 'range': {
            const filterData = filters[
              field
            ] as FilterPayloadRange | null;

            return (
              <div className="filter-input--range">
                <input
                  placeholder="Min"
                  type="number"
                  value={filterData?.min || ''}
                  onChange={(event) => {
                    const newFilters: Filters = {
                      ...filters,
                      [field]: {
                        ...filterData,
                        type: 'range',
                        min:
                          event.target.value !== ''
                            ? Number(event.target.value)
                            : null,
                      },
                    };

                    onFilterChange(newFilters);
                  }}
                />
                <input
                  placeholder="Max"
                  type="number"
                  value={filterData?.max || ''}
                  onChange={(event) => {
                    const newFilters: Filters = {
                      ...filters,
                      [field]: {
                        ...filterData,
                        type: 'range',
                        max:
                          event.target.value !== ''
                            ? Number(event.target.value)
                            : null,
                      },
                    };

                    onFilterChange(newFilters);
                  }}
                />
              </div>
            );
          }
        }
      })()}
    </div>
  );
}

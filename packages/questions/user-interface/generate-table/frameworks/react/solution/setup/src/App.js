import { useState } from 'react';

function Table({ rows, columns }) {
  return (
    <table>
      <tbody>
        {Array.from({ length: rows }, () => 0).map(
          (_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }, () => 0).map(
                (_, col) => (
                  <td key={col}>
                    {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                  </td>
                ),
              )}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

export default function App() {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');

  return (
    <div className="app">
      <form
        onSubmit={(event) => {
          // To prevent a page reload.
          event.preventDefault();

          // Obtain data from the form.
          const data = new FormData(event.target);
          const rows = data.get('rows');
          setRows(Number(rows));
          const columns = data.get('columns');
          setColumns(Number(columns));
        }}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input
            id="rows"
            name="rows"
            type="number"
            min={1}
            defaultValue={rows}
          />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <input
            id="columns"
            name="columns"
            type="number"
            min={1}
            defaultValue={columns}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {Boolean(rows) && Boolean(columns) && (
        <Table rows={rows} columns={columns} />
      )}
    </div>
  );
}

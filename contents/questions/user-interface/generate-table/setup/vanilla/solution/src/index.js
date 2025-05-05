import './styles.css';

(() => {
  const $formEl = document.querySelector('#form');
  const $tableContainerEl = document.querySelector(
    '#table-container',
  );

  function renderTable(rows, columns) {
    // It's safe to use innerHTML here since we control
    // the rendered contents (not user input).
    $tableContainerEl.innerHTML = `<table>
      <tbody>
        ${Array.from({ length: rows }, () => 0)
          .map(
            (_, row) =>
              `<tr>
              ${Array.from({ length: columns }, () => 0)
                .map(
                  (_, col) =>
                    `<td>
                    ${
                      col % 2 === 0
                        ? rows * col + (row + 1)
                        : rows * (col + 1) - row
                    }
                  </td>`,
                )
                .join('')}
            </tr>`,
          )
          .join('')}
      </tbody>
    </table>`;
  }

  $formEl.addEventListener('submit', (event) => {
    // To prevent a page reload.
    event.preventDefault();

    // Obtain data from the form.
    const data = new FormData(event.target);
    const rows = data.get('rows');
    const columns = data.get('columns');
    renderTable(rows, columns);
  });
})();

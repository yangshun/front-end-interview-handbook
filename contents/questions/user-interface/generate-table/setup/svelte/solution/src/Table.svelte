<script>
  export let rows;
  export let columns;
</script>

<table>
  <tbody>
    {#each { length: rows } as _, row (row)}
      <tr>
        {#each { length: columns } as _, col (col)}
          <td>
            {col % 2 === 0
              ? rows * col + (row + 1)
              : rows * (col + 1) - row}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
  }

  table td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
  }
</style>

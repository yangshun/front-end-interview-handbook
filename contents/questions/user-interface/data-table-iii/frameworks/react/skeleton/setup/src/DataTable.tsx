import { useState } from 'react';
import users from './data/users';

type SortField = 'id' | 'name' | 'age' | 'occupation';
type SortDirection = 'asc' | 'desc';
type User = (typeof users)[number];

const columns = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
] as const;

function sortUsers(
  usersList: Array<User>,
  field: SortField,
  direction: SortDirection,
) {
  const usersClone = usersList.slice();

  switch (field) {
    case 'id':
    case 'age': {
      return usersClone.sort((a, b) =>
        direction === 'asc'
          ? a[field] - b[field]
          : b[field] - a[field],
      );
    }
    case 'name':
    case 'occupation': {
      return usersClone.sort((a, b) =>
        direction === 'asc'
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]),
      );
    }
  }
}

function paginateUsers(
  usersList: Array<User>,
  page: number,
  pageSize: number,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageUsers = usersList.slice(start, end);
  const totalPages = Math.ceil(usersList.length / pageSize);
  return { pageUsers, totalPages };
}

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [sortField, setSortField] =
    useState<SortField>('id');
  const [sortDirection, setSortDirection] =
    useState<SortDirection>('asc');

  const sortedUsers = sortUsers(
    users,
    sortField,
    sortDirection,
  );
  const { totalPages, pageUsers } = paginateUsers(
    sortedUsers,
    page,
    pageSize,
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
                <button
                  onClick={() => {
                    if (sortField !== key) {
                      setSortField(key);
                      setSortDirection('asc');
                    } else {
                      setSortDirection(
                        sortDirection === 'asc'
                          ? 'desc'
                          : 'asc',
                      );
                    }
                    setPage(1);
                  }}>
                  {label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageUsers.map(
            ({ id, name, age, occupation }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{occupation}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}>
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}>
            Prev
          </button>
          <span aria-label="Page number">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

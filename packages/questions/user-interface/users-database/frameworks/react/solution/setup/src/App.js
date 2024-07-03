import { useState } from 'react';

const generateId = (() => {
  let id = 0;
  return () => `${id++}`;
})();

export default function App() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [users, setUsers] = useState([
    { first: 'Hans', last: 'Emil', id: generateId() },
    { first: 'Max', last: 'Mustermann', id: generateId() },
    { first: 'Roman', last: 'Tisch', id: generateId() },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.first
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.last
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const hasSelectedUser = selected != null;

  const canCreateUser =
    !hasSelectedUser && first !== '' && last !== '';

  const canUpdateUser =
    hasSelectedUser && first !== '' && last !== '';

  function create() {
    setUsers(
      users.concat({
        first,
        last,
        id: generateId(),
      }),
    );
    setFirst('');
    setLast('');
  }

  function update() {
    const newUsers = [...users];
    const foundUser = newUsers.find(
      ({ id }) => selected === id,
    );
    foundUser.first = first;
    foundUser.last = last;
    setUsers(newUsers);
  }

  function del() {
    setUsers(users.filter((user) => user.id !== selected));
    cancel();
  }

  function cancel() {
    setSelected(null);
    setFirst('');
    setLast('');
  }

  function onSubmit(event) {
    // To prevent a page reload.
    event.preventDefault();
    const formData = new FormData(
      event.target,
      event.nativeEvent.submitter,
    );
    const intent = formData.get('intent');

    switch (intent) {
      case 'create':
        create();
        break;

      case 'update':
        update();
        break;

      case 'delete':
        del();
        break;

      case 'cancel':
        cancel();
        break;

      default:
        throw new Error(`Invalid intent: ${intent}`);
    }
  }

  return (
    <form className="app" onSubmit={onSubmit}>
      <div>
        <input
          aria-label="Search users"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div className="middle-row">
        <select
          size={5}
          className="users-list"
          value={selected}
          onChange={(e) => {
            const newSelected = e.target.value;
            setSelected(newSelected);

            const foundUser = users.find(
              ({ id }) => id === newSelected,
            );
            setFirst(foundUser.first);
            setLast(foundUser.last);
          }}>
          {filteredUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.first} {user.last}
            </option>
          ))}
        </select>
        <div className="inputs">
          <label>
            First Name:
            <input
              type="text"
              required
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              required
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="buttons">
        <button
          name="intent"
          value="create"
          disabled={!canCreateUser}>
          Create
        </button>
        <button
          name="intent"
          value="update"
          disabled={!canUpdateUser}>
          Update
        </button>
        <button
          name="intent"
          value="delete"
          disabled={!hasSelectedUser}>
          Delete
        </button>
        <button
          name="intent"
          value="cancel"
          disabled={!hasSelectedUser}>
          Cancel
        </button>
      </div>
    </form>
  );
}

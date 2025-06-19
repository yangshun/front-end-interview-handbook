import DataTable, {
  Columns,
  SortDirection,
} from './DataTable';
import users from './data/users';
import houses from './data/houses';

type User = (typeof users)[number];
const userColumns: Columns<User> = [
  {
    label: 'ID',
    key: 'id',
    renderCell: (user: User) => user.id,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
  },
  {
    label: 'Name',
    key: 'name',
    renderCell: (user: User) => user.name,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
  },
  {
    label: 'Age',
    key: 'age',
    renderCell: (user: User) => user.age,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) =>
      direction === 'asc' ? a.age - b.age : b.age - a.age,
  },
  {
    label: 'Occupation',
    key: 'occupation',
    renderCell: (user: User) => user.occupation,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.occupation.localeCompare(b.occupation)
        : b.occupation.localeCompare(a.occupation),
  },
];

type House = (typeof houses)[number];
const houseColumns: Columns<House> = [
  {
    label: 'ID',
    key: 'id',
    renderCell: (house: House) => house.id,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
  },
  {
    label: 'Street',
    key: 'street',
    renderCell: (house: House) => house.street,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street),
  },
  {
    label: 'City',
    key: 'city',
    renderCell: (house: House) => house.city,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city),
  },
  {
    label: 'State',
    key: 'state',
    renderCell: (house: House) => house.state,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state),
  },
  {
    label: 'Built Year',
    key: 'built_year',
    renderCell: (house: House) => house.built_year,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.built_year - b.built_year
        : b.built_year - a.built_year,
  },
];

export default function App() {
  return (
    <div>
      <h2>Users</h2>
      <DataTable data={users} columns={userColumns} />
      <br />
      <h2>Houses</h2>
      <DataTable data={houses} columns={houseColumns} />
    </div>
  );
}

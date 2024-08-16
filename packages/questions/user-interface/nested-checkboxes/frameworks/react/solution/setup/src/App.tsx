import Checkboxes from './Checkboxes';

export default function App() {
  const checkboxesData = [
    {
      id: 1,
      name: 'Electronics',
      checked: false,
      children: [
        {
          id: 2,
          name: 'Mobile phones',
          checked: false,
          children: [
            {
              id: 3,
              name: 'iPhone',
              checked: false,
            },
            {
              id: 4,
              name: 'Android',
              checked: false,
            },
          ],
        },
        {
          id: 5,
          name: 'Laptops',
          checked: false,
          children: [
            {
              id: 6,
              name: 'MacBook',
              checked: false,
            },
            {
              id: 7,
              name: 'Surface Pro',
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: 'Books',
      checked: false,
      children: [
        {
          id: 9,
          name: 'Fiction',
          checked: false,
        },
        {
          id: 10,
          name: 'Non-fiction',
          checked: false,
        },
      ],
    },
    {
      id: 11,
      name: 'Toys',
      checked: false,
    },
  ];

  return (
    <div>
      <Checkboxes defaultCheckboxData={checkboxesData} />
    </div>
  );
}

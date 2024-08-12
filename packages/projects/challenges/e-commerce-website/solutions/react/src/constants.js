export const COLORS = {
  white: { value: '#fff', label: 'White' },
  black: { value: '#000', label: 'Black' },
  red: { value: '#DC2626', label: 'Red' },
  orange: { value: '#EA580C', label: 'Orange' },
  yellow: { value: '#F59E0B', label: 'Yellow' },
  green: { value: '#10B981', label: 'Green' },
  blue: { value: '#4F46E5', label: 'Blue' },
  brown: { value: '#CA8A04', label: 'Brown' },
  beige: { value: '#d2b08a', label: 'Beige' },
  pink: { value: '#EC4899', label: 'Pink' },
};

export const SIZE = {
  xs: { short: 'XS', long: 'Extra Small' },
  sm: { short: 'S', long: 'Small' },
  md: { short: 'M', long: 'Medium' },
  lg: { short: 'L', long: 'Large' },
  xl: { short: 'XL', long: 'Extra Large' },
};

export const COLLECTIONS_OPTIONS = {
  title: 'Collections',
  key: 'collection',
  items: [
    {
      name: 'Latest arrivals',
      value: 'latest',
      href: '/products?collectionId=latest',
    },
    {
      name: 'Urban Oasis',
      value: 'urban',
      href: '/products?collectionId=urban',
    },
    {
      name: 'Cozy Comfort',
      value: 'cozy',
      href: '/products?collectionId=cozy',
    },
    {
      name: 'Fresh Fusion',
      value: 'fresh',
      href: '/products?collectionId=fresh',
    },
  ],
};

export const COLORS_OPTIONS = {
  title: 'Colors',
  key: 'color',
  items: [
    {
      color: COLORS.white.value,
      value: 'white',
    },
    {
      color: COLORS.black.value,
      value: 'black',
    },
    {
      color: COLORS.red.value,
      value: 'red',
    },
    {
      color: COLORS.orange.value,
      value: 'orange',
    },
    {
      color: COLORS.yellow.value,
      value: 'yellow',
    },
    {
      color: COLORS.green.value,
      value: 'green',
    },
    {
      color: COLORS.blue.value,
      value: 'blue',
    },
    {
      color: COLORS.brown.value,
      value: 'brown',
    },
    {
      color: COLORS.beige.value,
      value: 'beige',
    },
    {
      color: COLORS.pink.value,
      value: 'pink',
    },
  ],
};

export const CATEGORY_OPTIONS = {
  title: 'Category',
  key: 'category',
  items: [
    {
      name: 'Unisex',
      value: 'unisex',
      href: '/products?categoryId=unisex',
    },
    {
      name: 'Women',
      value: 'women',
      href: '/products?categoryId=women',
    },
    {
      name: 'Men',
      value: 'men',
      href: '/products?categoryId=men',
    },
  ],
};

export const RATING_OPTIONS = {
  title: 'Rating',
  key: 'rating',
  items: [
    {
      value: 5,
      name: '5 star rating',
    },
    {
      value: 4,
      name: '4 star rating',
    },
    {
      value: 3,
      name: '3 star rating',
    },
    {
      value: 2,
      name: '2 star rating',
    },
    {
      value: 1,
      name: '1 star rating',
    },
  ],
};

export const SORT_OPTIONS = [
  {
    name: 'Newest',
    value: 'created',
    direction: 'desc',
  },
  {
    name: 'Best rating',
    value: 'rating',
    direction: 'desc',
  },
  {
    name: 'Most popular',
    value: 'popularity',
    direction: 'desc',
  },
  {
    name: 'Price: Low to high',
    value: 'price',
    direction: 'asc',
  },
  {
    name: 'Price: High to low',
    value: 'price',
    direction: 'desc',
  },
];

export const FIELD_NAME = {
  email: 'Email',
  country: 'Country',
  firstName: 'First name',
  lastName: 'Last name',
  address1: 'Address',
  address2: '',
  city: 'City',
  state: 'State',
  zip: 'Zip',
  deliveryMethod: 'Delivery method',
  cardNumber: 'Card number',
  nameOnCard: 'Name on card',
  cardExpiry: 'Expiry',
  cardCvv: 'CVV',
};


export const COUNTRIES = [
  {
    id: 'US',
    name: 'United States',
  },
  {
    id: 'IN',
    name: 'India',
  },
];

export const STATES = {
  US: [
    {
      id: 'AZ',
      name: 'Arizona',
    },
    {
      id: 'CA',
      name: 'California',
    },
    {
      id: 'FL',
      name: 'Florida',
    },
    {
      id: 'IA',
      name: 'Iowa',
    },
  ],
  IN: [
    {
      id: 'AP',
      name: 'Andhra Pradesh',
    },
    {
      id: 'AS',
      name: 'Assam',
    },
    {
      id: 'JH',
      name: 'Jharkhand',
    },
    {
      id: 'KA',
      name: 'Karnataka',
    },
  ],
};
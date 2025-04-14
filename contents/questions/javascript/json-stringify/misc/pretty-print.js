function prettyPrint(json) {
  const INDENTATION_WIDTH = 2;

  function printPadded(content, prefix, level, comma) {
    const padding = Array(level * INDENTATION_WIDTH)
      .fill(' ')
      .join('');
    let string = `${padding}${content}`;

    if (prefix) {
      string = `${padding}"${prefix}": ${content}`;
    }

    if (comma) {
      string += ',';
    }

    return string + '\n';
  }

  function print(obj, prefix, level, comma) {
    let string = '';
    if (Array.isArray(obj)) {
      string += printPadded('[', prefix, level, false);
      obj.forEach((item, index) => {
        string += print(item, null, level + 1, index !== obj.length - 1);
      });
      string += printPadded(']', null, level, comma);
      return string;
    }

    if (typeof obj === 'object' && obj !== null) {
      string += printPadded('{', prefix, level, false);
      const keys = Object.keys(obj);
      keys.forEach((key, index) => {
        string += print(obj[key], key, level + 1, index !== keys.length - 1);
      });
      string += printPadded('}', null, level, comma);
      return string;
    }

    if (typeof obj === 'string') {
      return printPadded(`"${obj}"`, prefix, level, comma);
    }

    return printPadded(obj, prefix, level, comma);
  }

  return print(json, '', 0, false);
}

console.log(
  prettyPrint({
    null_value: null,
    undefined: undefined,
    true: true,
    false: false,
    hello: [
      {
        _id: '5988946e45e52d60b33a25c7',
        latitude: 50.087977,
        longitude: 72.167197,
        tags: ['nulla', 'ullamco'],
        friends: [
          {
            id: 0,
            name: 'Robinson Woods',
          },
          {
            id: 1,
            name: 'Lottie Hogan',
          },
        ],
      },
      {
        _id: '5988946ef6090217857d7b0f',
        latitude: 47.460772,
        longitude: 85.95137,
        tags: ['aliqua', 'nulla'],
        friends: [
          {
            id: 0,
            name: 'Mamie Wyatt',
          },
          {
            id: 1,
            name: 'Alejandra Mcdaniel',
          },
        ],
      },
    ],
  }),
);

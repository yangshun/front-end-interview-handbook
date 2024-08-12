export const getUnavailableColors = product => {
  const colorsInStock = new Set();
  const allColors = new Set(product.colors);

  product.inventory.forEach(item => {
    if (item.stock > 0) {
      colorsInStock.add(item.color);
    }
  });

  const unavailableColors = [...allColors].filter(
    color => !colorsInStock.has(color)
  );

  return unavailableColors;
};

export const getUnavailableSizes = ({ product, color }) => {
  const sizesInStock = new Set();
  const allSizes = new Set(product.sizes);

  product.inventory.forEach(item => {
    if (item.stock > 0 && item.color === color) {
      sizesInStock.add(item.size);
    }
  });

  const unavailableSizes = [...allSizes].filter(
    size => !sizesInStock.has(size)
  );

  return unavailableSizes;
};

export const getInventoryData = ({ product, color, size }) => {
  let data = {};
  product.inventory.forEach(item => {
    if (item.size === size && item.color === color) {
      data = item;
    }
  });

  return data;
};

export const getSelectedColorImages = ({ product, color }) => {
  const images = product.images?.filter(image => image.color === color);
  return images;
};

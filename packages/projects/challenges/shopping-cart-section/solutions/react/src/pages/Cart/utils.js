export const getSubtotal = (items) => {
  const totalAmount = items.reduce((acc, item) => {
    const price = !!item.total_sale_price
      ? item.total_sale_price
      : item.total_list_price;
    return acc + price;
  }, 0);

  return totalAmount.toFixed(2);
};

export const getFinalAmount = (subtotal, discount) => {
  if (discount) {
    const discountAmount = discount.discount_amount
      ? discount.discount_amount
      : subtotal * (discount.discount_percentage / 100);

    return (subtotal - discountAmount).toFixed(2);
  }

  return subtotal;
};

// Fake stock change data
export const getStockChangedData = (items) => {
  const products = [
    {
      product: {
        product_id: 'stepsoft-socks',
        name: 'StepSoft Socks',
      },
      unit: {
        sku: 'ss-orange-xs',
        size: 'xs',
        color: 'orange',
        image_url:
          'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/stepsoft-socks/stepsoft-socks-1.jpg',
      },
      stock: 5,
    },
    {
      product: {
        product_id: 'elemental-sneakers',
        name: 'Elemental Sneakers',
      },
      unit: {
        sku: 'es-beige-6',
        size: '6',
        color: 'beige',
        image_url:
          'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/elemental-sneakers/elemental-sneakers-3.jpg',
      },
      stock: 3,
    },
    {
      product: {
        product_id: 'azure-attitude-shades',
        name: 'Azure Attitude Shades',
      },
      unit: {
        sku: 'aas-blue',
        size: null,
        color: 'blue',
        image_url:
          'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/azure-attitude-shades/azure-attitude-shades-1.jpg',
      },
      stock: 2,
    },
  ];
  const filteredProducts = products.reduce((acc, item) => {
    const product = items.find(
      (cartItem) =>
        cartItem.product.product_id === item.product.product_id &&
        cartItem.unit.sku === item.unit.sku &&
        cartItem.quantity > item.stock,
    );
    if (product) {
      acc.push({
        ...item,
        cartQuantity: product ? product.quantity : item.quantity,
      });
    }
    return acc;
  }, []);
  return new Promise((resolve) => {
    setTimeout(() => resolve(filteredProducts), 250);
  });
};

export const mergeSampleAndStorageCartItems = (sampleCartItems) => {
  // Retrieve cart from localStorage
  const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const mergedMap = new Map();

  // Add items from the sample cart items to the map
  sampleCartItems.forEach((item) => {
    mergedMap.set(item.unit.sku, item);
  });

  // Add items from the local storage to the map (overwrites duplicates from sampleCartItems)
  storedCartItems.forEach((item) => {
    mergedMap.set(item.unit.sku, item);
  });

  // Convert the map back to an array
  return Array.from(mergedMap.values());
};

export const formatPrice = (price) =>
  Number.isInteger(price) ? price : price.toFixed(2);

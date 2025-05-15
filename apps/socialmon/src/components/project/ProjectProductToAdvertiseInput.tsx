import {
  Button,
  CloseButton,
  Fieldset,
  Group,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { useProjectFormContext } from './ProjectForm';

type Product = Readonly<{
  description: string;
  id: number;
  url: string;
}>;

export default function ProjectsProductsToAdvertiseInput() {
  const form = useProjectFormContext();
  const fieldName = 'productsToAdvertise';

  const [products, setProducts] = useState<Array<Product>>(
    form.values.productsToAdvertise.map((product) => ({
      ...product,
      id: Math.random(),
    })),
  );

  const addProduct = () => {
    const newProducts = [
      ...products,
      { description: '', id: Math.random(), url: '' },
    ];

    setProducts(newProducts);
    form.setFieldValue(
      fieldName,
      newProducts.map((product) => ({
        description: product.description,
        url: product.url,
      })),
    );
  };

  const removeProduct = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);

    setProducts(newProducts);
    form.setFieldValue(
      fieldName,
      newProducts.map((product) => ({
        description: product.description,
        url: product.url,
      })),
    );
  };

  const handleInputChange = (
    index: number,
    field: keyof Product,
    value: string,
  ) => {
    const newProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product,
    );

    setProducts(newProducts);
    form.setFieldValue(fieldName, newProducts);
  };

  return (
    <Fieldset className="flex flex-col gap-4" legend="Products to advertise">
      {products.map((product, index) => (
        <Group key={product.id} className="w-full" mt="xs">
          <TextInput
            className="flex-1"
            error={form.errors[`${fieldName}.${index}.url`]}
            placeholder="URL"
            required={true}
            value={product.url}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, 'url', event.currentTarget.value)
            }
          />
          <Textarea
            autosize={true}
            className="flex-1"
            error={form.errors[`${fieldName}.${index}.description`]}
            minRows={1}
            placeholder="Description"
            required={true}
            value={product.description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(index, 'description', event.currentTarget.value)
            }
          />
          <CloseButton onClick={() => removeProduct(index)} />
        </Group>
      ))}
      {form.errors.productsToAdvertise && (
        <Text c="red" size="sm">
          {form.errors.productsToAdvertise}
        </Text>
      )}
      <Button onClick={addProduct}>Add Product</Button>
    </Fieldset>
  );
}

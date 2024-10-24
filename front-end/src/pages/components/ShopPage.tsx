import { useState } from 'react';
import FilterMenu from './FilterMenu';
import ProductList from './ProductList';

const ShopPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState('16'); // Valor inicial

  return (
    <div>
      <FilterMenu setItemsPerPage={setItemsPerPage} />
      <ProductList itemsPerPage={Number(itemsPerPage)} />
    </div>
  );
};

export default ShopPage;

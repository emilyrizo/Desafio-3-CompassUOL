import CategoryList from "./components/categories/CategoryList";
import ProductList from "./components/products/ProductList";

const MainComponent = () => {
  return (
    <div>
      <h1>Categories</h1>
      <CategoryList />
      <h1>Products</h1>
      <ProductList />
    </div>
  );
};

export default MainComponent;
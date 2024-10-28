import { useState } from "react";
import BannerShop from "./components/BannerShop";
import FilterMenu from "./components/FilterMenu";
import Footer from "./components/Footer";
import InfoBar from "./components/InfoBar";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(100 / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
  };

  return (
    <div className="home-container">
      <Navbar />
      <BannerShop />
      <FilterMenu setItemsPerPage={handleItemsPerPageChange} /> 
      <ProductList itemsPerPage={itemsPerPage} currentPage={currentPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <InfoBar />
      <Footer />
    </div>
  );
};

export default Shop;

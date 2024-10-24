import { useState } from "react";
import BannerShop from "./components/BannerShop";
import FilterMenu from "./components/FilterMenu";
import Footer from "./components/Footer";
import InfoBar from "./components/InfoBar";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

const Shop = () => {
  const [ itemsPerPage, setItemsPerPage] = useState<string>("16");

  return (
    <div className="home-container">
      <Navbar />
      <BannerShop />
      <FilterMenu setItemsPerPage={setItemsPerPage} />
      <ProductList itemsPerPage={itemsPerPage}/>
      {/* <ProductList /> */}
      <InfoBar />
      <Footer />
    </div>
  );
};

export default Shop;

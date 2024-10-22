import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  return <h1>Product ID: {id}</h1>;
};

export default SingleProduct;

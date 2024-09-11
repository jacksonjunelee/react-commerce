import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../state/actions/productActions';

const ProductList = ({ onAddToCart }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="productList">
          {products.map((product) => (
            <div className='product' key={product.id}>
              <img src="https://via.placeholder.com/150" alt={`Product ${product.id}`} />
              <h2>{ product.id }</h2>
              <h3>{ product.title }</h3>
              <p>${ product.price }</p>
              <button onClick={() => onAddToCart(product)} >Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;

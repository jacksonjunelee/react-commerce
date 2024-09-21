import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import SalesForecasting from "./SalesForecasting";
import RecommendedProducts from "./RecommendedProducts";
import ImageClassification from "./ImageClassification";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../state/actions/productActions';

const MachineLearning = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="productContainer">
        <header className="productHeader">
          <h1>React Commerce</h1>
        </header>

        <nav>
          <Link to={`/`}>Home</Link>
          <Link to={`/`}>Products</Link>
          <Link to={`/cart`}>Cart</Link>
          <Link to={`/machine-learning`}>Machine Learning</Link>
        </nav>

        <h1 className="ml-title">Machine Learning Functionalties for Ecommerce</h1>

        <div>
          <SalesForecasting />
        </div>

        <div>
          <RecommendedProducts products={products} />
        </div>

        <div>
          <ImageClassification />
        </div>
      </div>
    </div>
  );
};

export default MachineLearning;

import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import SalesForecasting from "./SalesForecasting";
import RecommendedProducts from "./RecommendedProducts";
import ImageClassification from "./ImageClassification";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../state/actions/productActions";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons
import Analytics from "../utils/Analytics";

const MachineLearning = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>


        <h1 className="ml-title">
          Machine Learning Functionalties for Ecommerce
        </h1>

        <div>
          <RecommendedProducts products={products} />
        </div>

        <div>
          <SalesForecasting />
        </div>

        <div>
          <ImageClassification products={products} />
        </div>
      </div>
    </div>
  );
};

export default MachineLearning;

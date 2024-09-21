import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import SalesForecasting from "./SalesForecasting";
import RecommendedProducts from "./RecommendedProducts";
import ImageClassification from "./ImageClassification";
import { Link } from "react-router-dom";

const MachineLearning = () => {
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
          <RecommendedProducts />
        </div>

        <div>
          <ImageClassification />
        </div>
      </div>
    </div>
  );
};

export default MachineLearning;

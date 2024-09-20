import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useSelector } from "react-redux";

const RecommendedProducts = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const purchaseHistory = useSelector((state) => state.sales.purchaseHistory);

  const makeRecommendations = async () => {
    // Create user preferences based on purchased items bought before
    const tensorArray = [0, 1, 2].map((ind) => {
      const productId = ind + 1;
      const item = cartItems.find(
        (item) => item.id === productId
      );
      return item ? 1 : 0; // 1 if the product is in the cart, 0 otherwise
    });

    console.log("Tensor Array: ", tensorArray);

    // Create a user-product matrix (1 user, 3 products)
    const userProductMatrix = tf.tensor2d(
      [tensorArray],
      [1, tensorArray.length]
    );

    // Create a quantity tensor from the product data
    const qtyTensorArray = [0, 1, 2].map((ind) => {
      const productId = ind + 1;
      const item = cartItems.find(
        (item) => item.id === productId
      );
      return item ? item.qty : 0; // Quantity of each product
    });

    const qtyMatrix = tf.tensor1d(qtyTensorArray);
    console.log("Quantity Matrix: ", qtyMatrix.arraySync());

    // Adjust user preferences by multiplying with quantities
    const adjustedUserProductMatrix = userProductMatrix.mul(
      qtyMatrix.reshape([1, -1]) // Reshape qtyMatrix to (1, 3) for broadcasting
    );

    console.log("Adjusted User Product Matrix: ", adjustedUserProductMatrix);

    // Function to recommend products based on user preferences
    const recommendProducts = () => {
      // Recommendation logic using available products in the cart
      const allProductsMatrix = tf.tensor2d([
        [1, 0, 0], // Similar to Product 1
        [0, 1, 0], // Similar to Product 2
        [0, 0, 1], // Similar to Product 3
      ]);

      const userPreferences = adjustedUserProductMatrix; // Your current user's preferences
      // Calculate scores for each product based on user preferences
      const scores = userPreferences.matMul(allProductsMatrix.transpose());

      console.log("Scores: ", scores.arraySync());

      return scores.arraySync()[0]; // Return the score array

      // // Use purchase history to create a product similarity matrix
      // const allProductsMatrix = purchaseHistory.flatMap((purchase) =>
      //   purchase.productsBought.map((product) => {
      //     const productMatrix = Array(3).fill(0);
      //     productMatrix[product.id - 1] = 1; // Assuming product.id starts from 1
      //     return productMatrix;
      //   })
      // );

      // const allProductsTensor = tf.tensor2d(allProductsMatrix);

      // // Calculate scores for each product based on user preferences
      // const scores = adjustedUserProductMatrix.matMul(
      //   allProductsTensor.transpose()
      // );

      // console.log("Scores: ", scores.arraySync());

      // return scores.arraySync()[0]; // Return the score array
    };

    // Get recommendations for the only user (User 1)
    const recommendations = recommendProducts();

    console.log("Recommendations: ", recommendations);

    // Sort products by scores and get indices
    const productIndices = recommendations
      .map((score, index) => ({ score, index }))
      .filter((item) => item.score >= 2) // Filter scores greater than 2
      .sort((a, b) => b.score - a.score) // Sort by score
      .map((item) => item.index); // Extract indices

    // Set the top 2 recommended products for User 1
    setRecommendedProducts(productIndices.slice(0, 2));
  };

  return (
    <div>
      <div>
        <h1>Product Recommendation System</h1>
        <button onClick={makeRecommendations}>
          Recommend Products for User 1
        </button>
        {recommendedProducts.length > 0 && (
          <div>
            <h3>Recommended Products for User 1:</h3>
            <ul>
              {recommendedProducts.map((product) => (
                <li key={product}>Product {product + 1}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;

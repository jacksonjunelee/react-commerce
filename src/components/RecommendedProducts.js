import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useSelector } from "react-redux";

const RecommendedProducts = ({ products }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productScores, setProductScores] = useState([]); // To store scores of recommended products
  const cartItems = useSelector((state) => state.cart.cartItems);
  const purchaseHistory = useSelector((state) => state.sales.purchaseHistory);
  const productArrayLength = products.length;

  const makeAllProductsMatrix = (length) => {
    return tf.tensor2d(
      Array.from({ length }, (_, rowIndex) =>
        Array.from({ length }, (_, colIndex) => (rowIndex === colIndex ? 1 : 0))
      )
    );
  };

  const makeRecommendations = async () => {
    // Create the cart tensor array
    const cartTensorArray = Array.from(
      { length: productArrayLength },
      (_, ind) => {
        const productId = ind + 1;
        const item = cartItems.find((item) => item.id === productId);
        return item ? 1 : 0;
      }
    );
  
    const userProductMatrix = tf.tensor2d([cartTensorArray], [1, cartTensorArray.length]);
  
    const qtyTensorArray = Array.from(
      { length: productArrayLength },
      (_, ind) => {
        const productId = ind + 1;
        const item = cartItems.find((item) => item.id === productId);
        return item ? item.qty : 0;
      }
    );
  
    const qtyMatrix = tf.tensor1d(qtyTensorArray);
    const adjustedUserProductMatrix = userProductMatrix.mul(qtyMatrix.reshape([1, -1]));
  
    // Create the purchase matrix
    const purchaseMatrix = purchaseHistory.flatMap((purchase) =>
      purchase.productsBought.map((product) => {
        const productMatrix = Array(productArrayLength).fill(0);
        productMatrix[product.id - 1] = product.qty || 1;
        return productMatrix;
      })
    );
  
    let combinedPreferences = adjustedUserProductMatrix;
  
    if (purchaseMatrix.length > 0) {
      const purchaseTensor = tf.tensor2d(purchaseMatrix, [purchaseMatrix.length, productArrayLength]);
      const avgPurchaseMatrix = purchaseTensor.mean(0);
  
      // Create the mask safely
      const mask = userProductMatrix.equal(1).reshape([1, -1]);
      
      // Check the shape and value of the mask
      if (mask) {
        console.log("Mask: ", mask.arraySync());
        const positiveScores = avgPurchaseMatrix.where(mask);
        
        // Ensure positiveScores is a valid tensor before adding
        if (positiveScores) {
          combinedPreferences = combinedPreferences.add(positiveScores.reshape([1, -1])).maximum(0);
        } else {
          console.warn("Positive scores tensor is invalid.");
        }
      } else {
        console.warn("Mask tensor is invalid.");
      }
    } else {
      console.warn("No purchase history available.");
    }
  
    const allProductsMatrix = makeAllProductsMatrix(productArrayLength);
    const scores = combinedPreferences.matMul(allProductsMatrix.transpose());
  
    const recommendations = scores.arraySync()[0];
  
    const productIndicesWithScores = recommendations
      .map((score, index) => ({ score, index }))
      .filter((item) => item.score >= 3)
      .sort((a, b) => b.score - a.score);
  
    const topRecommendations = productIndicesWithScores.slice(0, 3);
    setRecommendedProducts(topRecommendations.map((item) => item.index));
    setProductScores(topRecommendations.map((item) => item.score));
  };
  

  return (
    <div className="recommendation-container">
      <h1 className="text-align-center">Product Recommendation System</h1>
      <p className="text-align-left">
        This component recommends products based on your{" "}
        <span className="style-bold">current cart items</span> and{" "}
        <span className="style-bold">purchase history</span>. Click the button
        below to get your personalized recommendations!
      </p>
      <p className="text-align-left description">
        This component creates tensors for cart items, cart item quantity,
        purchased items, and purchased item quantities. The tensors are
        multiplied to generate a recommendation score. Products with a
        recommendation score of 3 or higher will be suggested. This component
        suggests the top 3 products based on your recommendation score.
      </p>
      <div className="text-align-left instructions">
        How to use:
        <ol>
          <li>Add items to your cart.</li>
          <li>
            Note: You need to add enough of an item for the algorithm to
            generate a score higher than 3. This indicates that you have a
            strong preference for the item.
          </li>
          <li>
            Purchasing items also increases their score. Observe how the
            recommendations change as you add items to your cart and make
            purchases.
          </li>
        </ol>
      </div>

      <div className="text-align-left instructions">
        <h4>Ways to Improve the Recommendation System:</h4>
        <ol>
          <li>
            <strong>Adjust Scores Dynamically:</strong> Fine-tune the score
            based on user actions, like frequently adding items or repeated
            purchases.
          </li>
          <li>
            <strong>Penalty for Disliked Products:</strong> Decrease scores for
            products removed from the cart or abandoned.
          </li>
          <li>
            <strong>Negative Feedback Adjustments:</strong> Incorporate feedback
            loops to lower scores for negative interactions (returns, low
            ratings).
          </li>
          <li>
            <strong>
              Dynamic Adjustments for Different Product Categories:
            </strong>{" "}
            Tailor recommendation logic based on category needs.
          </li>
          <li>
            <strong>Incorporate User-Specific Preferences:</strong> Adjust
            recommendations based on long-term user preferences.
          </li>
        </ol>
      </div>

      <button className="recommendation-button" onClick={makeRecommendations}>
        Recommend Products for You
      </button>
      {recommendedProducts.length > 0 && (
        <div className="recommended-products">
          <h3>Recommended Products for You:</h3>
          <ul className="display-flex">
            {recommendedProducts.map((productIndex, i) => {
              const product = products[productIndex];
              const score = productScores[i];
              return (
                <li key={product.id} className="recommended-product">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h4>{product.title}</h4>
                    <p>Price: ${product.price}</p>
                    <p>Recommendation Score: {score.toFixed(2)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
